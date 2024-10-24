'use client'

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addCustomer } from '../../actions/customerActions';

export default function AddCustomerForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      await addCustomer(formData);
      router.refresh();
    });
  };

  return (
    <form action={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="name"
        placeholder="Customer name"
        className="border p-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Customer'}
      </button>
    </form>
  );
}
