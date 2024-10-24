'use client'

import { useTransition, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct, getCategories } from '../../actions/productActions';

export default function AddProductForm() {
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      await addProduct(formData);
      router.refresh();
    });
  };

  return (
    <form action={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="name"
        placeholder="Product name"
        className="border p-2"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        className="border p-2"
        required
      />
      <select name="category" className="border p-2" required>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}
