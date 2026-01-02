// --- Patient Registration with Toasts and Bill Modal ---
import { createFileRoute } from '@tanstack/react-router';
import { AlertCircle, RefreshCw, Search, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast, useToast } from '@/components/Toast';
import { getAllDoctors } from '@/routes/apis/doctor-apis';
import {
  createPatientWithTests,
  searchPatientByPhone,
} from '@/routes/apis/patient-apis';
import { getAllTests } from '@/routes/apis/test-apis';

export const Route = createFileRoute('/patients/register')({
  component: PatientRegistration,
  loader: async () => {
    const [testsResult, doctorsResult] = await Promise.all([
      getAllTests({
        data: { limit: 100, offset: 0, sortBy: 'name', sortOrder: 'asc' },
      }),
      getAllDoctors({
        data: { limit: 100, offset: 0, sortBy: 'name', sortOrder: 'asc' },
      }),
    ]);
    return { tests: testsResult, doctors: doctorsResult };
  },
});

// ... (rest of your interfaces remain unchanged)

function PatientRegistration() {
  const { showToast } = useToast();
  // ... (all your state and form hooks remain unchanged)

  // --- Replace all alert() with showToast ---
  const onSearchPhone = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast('Please enter a valid phone number', 'error');
      return;
    }
    try {
      const result = await searchPatientByPhone({
        data: { phoneNumber: parseInt(phoneNumber) },
      });
      if (result.exists && result.data) {
        setExistingPatient({ ...result.data, phoneNumber: parseInt(phoneNumber) });
        setStep('tests');
      } else {
        setStep('register');
      }
    } catch (error) {
      showToast('Failed to search patient', 'error');
    }
  };

  const onRegisterPatient = async (data) => {
    setExistingPatient({ ...data, phoneNumber: parseInt(phoneNumber) });
    setStep('tests');
  };

  const onSubmitTests = async (data) => {
    if (selectedTests.length === 0) {
      showToast('Please select at least one test', 'error');
      return;
    }
    setTestFormData(data);
    setStep('payment');
  };

  const handlePaymentConfirmation = async () => {
    if (paymentStatus !== 'paid') {
      showToast('Please mark the payment as PAID to generate the bill and complete registration', 'error');
      return;
    }
    if (!testFormData) {
      showToast('Test data is missing. Please go back and select tests again!', 'error');
      return;
    }
    setIsProcessing(true);
    try {
      const doctorId = testFormData.doctorId && !isNaN(Number(testFormData.doctorId)) 
        ? Number(testFormData.doctorId) 
        : undefined;
      const isNewPatient = !existingPatient.id;
      const result = await createPatientWithTests({
        data: {
          isNewPatient: isNewPatient,
          patientId: existingPatient.id ? existingPatient.id : undefined,
          patient: {
            name: existingPatient.name,
            age: existingPatient.age,
            gender: existingPatient.gender,
            phoneNumber: existingPatient.phoneNumber || parseInt(phoneNumber),
            addressLine1: existingPatient.addressLine1,
            city: existingPatient.city,
            state: existingPatient.state,
            country: existingPatient.country,
            pincode: existingPatient.pincode,
          },
          tests: {
            testIds: selectedTests,
            doctorId: doctorId,
            reportDeliveryDate: testFormData.reportDeliveryDate,
            discount: discount || '0',
            tax: tax || '0',
            totalAmount: totals.total,
            finalAmount: totals.final,
          },
        },
      });
      if (result.success) {
        const fullTestDetails = selectedTests.map(testId => {
          const test = allTests.find((t) => t.id === testId);
          const patientTest = result.data.tests.find((pt) => pt.testId === testId);
          const doctor = doctorId ? allDoctors.find((d) => d.id === doctorId) : null;
          return { patientTest, test, doctor };
        });
        const completeBillData = {
          bill: result.data.bill,
          patient: result.data.patient,
          tests: fullTestDetails
        };
        setBillData(completeBillData);
        setShowBillModal(true);
        showToast('Patient registered successfully!', 'success');
      }
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to register patient', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseBill = () => {
    setShowBillModal(false);
    setTimeout(() => {
      window.location.href = '/lab-management';
    }, 1200);
  };

  // ... (rest of your component remains unchanged, including UI and BillModal usage)
}
