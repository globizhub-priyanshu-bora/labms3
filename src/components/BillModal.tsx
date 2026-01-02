import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/Toast';
import { Label } from '@/components/ui/label';
import { createBill } from '@/routes/apis/bill-apis';
import { getAllPatients } from '@/routes/apis/patient-apis';
import { getAllTests } from '@/routes/apis/test-apis';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBillCreated?: () => void;
}

interface BillFormData {
  patientId: number;
  testIds: number[];
  discount?: number;
  tax?: number;
}

interface Patient {
  id: number;
  name: string;
}

interface Test {
  id: number;
  name: string;
  price: string;
}

export function BillModal({ isOpen, onClose, onBillCreated }: BillModalProps) {
  const { showToast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTests, setSelectedTests] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BillFormData>();

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [patientsRes, testsRes] = await Promise.all([
        getAllPatients({ data: { limit: 100, offset: 0 } }),
        getAllTests({ data: { limit: 100, offset: 0 } }),
      ]);

      if (patientsRes.success) setPatients(patientsRes.data || []);
      if (testsRes.success) setTests(testsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Failed to load patient and test data', 'error');
    }
  };

  const onSubmit = async (data: BillFormData) => {
    if (selectedTests.length === 0) {
      showToast('Please select at least one test', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createBill({
        data: {
          patientId: data.patientId,
          testIds: selectedTests,
          discount: data.discount ? Number(data.discount) : 0,
          tax: data.tax ? Number(data.tax) : 0,
        },
      });

      if (result.success) {
        showToast('Bill created successfully', 'success');
        reset();
        setSelectedTests([]);
        onClose();
        onBillCreated?.();
      } else {
        showToast('Failed to create bill', 'error');
      }
    } catch (error) {
      console.error('Error creating bill:', error);
      showToast(error instanceof Error ? error.message : 'Failed to create bill', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const calculateTotal = () => {
    return selectedTests.reduce((sum, testId) => {
      const test = tests.find(t => t.id === testId);
      return sum + (test ? Number(test.price) : 0);
    }, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Create New Bill</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="patient">Patient *</Label>
            <select
              id="patient"
              {...register('patientId', { required: 'Patient is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="text-red-500 text-sm mt-1">{errors.patientId.message}</p>
            )}
          </div>

          <div>
            <Label>Select Tests *</Label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto bg-gray-50">
              {tests.length === 0 ? (
                <p className="text-gray-500 text-sm">No tests available</p>
              ) : (
                tests.map(test => (
                  <label key={test.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer rounded">
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(test.id)}
                      onChange={() => {
                        setSelectedTests(prev =>
                          prev.includes(test.id)
                            ? prev.filter(id => id !== test.id)
                            : [...prev, test.id]
                        );
                      }}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="flex-1">
                      <span className="font-medium text-gray-900">{test.name}</span>
                      <span className="text-gray-600 ml-2">₹{Number(test.price).toFixed(2)}</span>
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discount">Discount %</Label>
              <input
                id="discount"
                {...register('discount')}
                type="number"
                min="0"
                max="100"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="tax">Tax %</Label>
              <input
                id="tax"
                {...register('tax')}
                type="number"
                min="0"
                max="100"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {selectedTests.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-900">
                Total: ₹{calculateTotal().toFixed(2)}
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Bill'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
