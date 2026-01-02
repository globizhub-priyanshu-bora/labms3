import { createFileRoute } from '@tanstack/react-router';
import { AlertCircle, ArrowLeft, Download, Printer } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getBillById } from '@/routes/apis/bill-apis';

export const Route = createFileRoute('/bills/bill/$id')({
  component: () => (
    <Layout requiredRole={['admin', 'cashier', 'lab_tech']}>
      <BillDetailPage />
    </Layout>
  ),
  loader: async ({ params }: { params: { id: string } }) => {
    try {
      const result = await getBillById({
        data: { id: parseInt(params.id) },
      });
      return result;
    } catch (error) {
      console.error('Error fetching bill:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to fetch bill' };
    }
  },
});

function BillDetailPage() {
  const billData = Route.useLoaderData();
  const navigate = useNavigate();

  if (!billData.success || !billData.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700 mb-4">Bill not found</p>
          <p className="text-sm text-gray-600 mb-6">{billData.error || 'Unable to load the requested bill'}</p>
          <Button onClick={() => navigate({ to: '/lab-management' })}>
            Back to Lab Management
          </Button>
        </div>
      </div>
    );
  }

  const { bill, patient, tests } = billData.data;

  const handlePrint = () => {
    const printContent = document.getElementById('bill-print-content');
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=900,height=700');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bill - ${bill.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; }
            @page { size: A4; margin: 15mm; }
            @media print { body { margin: 0; } }
            .container { width: 100%; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .lab-name { font-size: 20px; font-weight: bold; }
            .bill-title { font-size: 16px; font-weight: bold; margin-top: 10px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; border-bottom: 1px solid #000; margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f0f0f0; font-weight: bold; }
            .text-right { text-align: right; }
            .total-row { font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .amount-words { margin: 10px 0; font-style: italic; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const totalAmount = parseFloat(bill.totalAmount);
  const discountPercent = parseFloat(bill.discount || '0');
  const taxPercent = parseFloat(bill.tax || '0');
  const discountAmount = (totalAmount * discountPercent) / 100;
  const taxAmount = ((totalAmount - discountAmount) * taxPercent) / 100;
  const finalAmount = parseFloat(bill.finalAmount);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Header Actions */}
        <div className="mb-6 flex justify-between items-center">
          <Button
            onClick={() => navigate({ to: '/lab-management' })}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              onClick={() => {
                const element = document.getElementById('bill-print-content');
                if (element) {
                  const link = document.createElement('a');
                  link.href = 'data:text/html,' + encodeURIComponent(element.innerHTML);
                  link.download = `bill-${bill.invoiceNumber}.html`;
                  link.click();
                }
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Bill Content */}
        <div id="bill-print-content" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8 border-b border-gray-300 pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GlobPathology</h1>
            <p className="text-sm text-gray-600">Professional Laboratory Management System</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">BILL / INVOICE</h2>
          </div>

          {/* Bill & Patient Info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">BILL INFORMATION</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice Number:</span>
                  <span className="font-medium text-gray-900">{bill.invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">{formatDate(bill.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium text-gray-900">{formatTime(bill.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold px-2 py-1 rounded text-xs ${bill.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {bill.isPaid ? 'PAID' : 'UNPAID'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">PATIENT INFORMATION</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium text-gray-900">{patient?.name || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Phone:</span>
                  <p className="font-medium text-gray-900">{patient?.phoneNumber || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Age/Gender:</span>
                  <p className="font-medium text-gray-900">
                    {patient?.age && `${patient.age} years`}
                    {patient?.age && patient?.gender ? ' / ' : ''}
                    {patient?.gender}
                  </p>
                </div>
                {patient?.addressLine1 && (
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <p className="font-medium text-gray-900">
                      {[patient.addressLine1, patient.city, patient.state, patient.pincode]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tests Table */}
          {tests && tests.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">TESTS PERFORMED</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900 border border-gray-300">Test Name</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-gray-900 border border-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-sm text-gray-900 border border-gray-300">
                        {test.test?.name || 'Unknown Test'}
                      </td>
                      <td className="px-3 py-2 text-center text-sm border border-gray-300">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          test.patientTest.status.toLowerCase() === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {test.patientTest.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Amount Summary */}
          <div className="max-w-xs ml-auto mb-8">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="px-3 py-2 text-sm text-gray-600">Total Amount:</td>
                  <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">₹{totalAmount.toFixed(2)}</td>
                </tr>
                {discountPercent > 0 && (
                  <tr className="border-b border-gray-300">
                    <td className="px-3 py-2 text-sm text-gray-600">Discount ({discountPercent}%):</td>
                    <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">-₹{discountAmount.toFixed(2)}</td>
                  </tr>
                )}
                {taxPercent > 0 && (
                  <tr className="border-b border-gray-300">
                    <td className="px-3 py-2 text-sm text-gray-600">Tax ({taxPercent}%):</td>
                    <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">₹{taxAmount.toFixed(2)}</td>
                  </tr>
                )}
                <tr className="bg-blue-50">
                  <td className="px-3 py-3 text-sm font-bold text-gray-900">Final Amount:</td>
                  <td className="px-3 py-3 text-lg font-bold text-gray-900 text-right">₹{finalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 pt-6 text-center text-xs text-gray-600">
            <p>This is an electronically generated bill and does not require a signature.</p>
            <p className="mt-2">Thank you for choosing GlobPathology. We appreciate your trust in our services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
