'use client'

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { addInvoice } from '../../actions/invoiceActions';

export default function AddInvoiceForm({ customers, products }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [items, setItems] = useState([{ productId: '', quantity: 1, price: 0, subtotal: 0 }]);
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set('items', JSON.stringify(items.map(({ productId, quantity, price }) => ({ productId, quantity, price }))));

    startTransition(async () => {
      await addInvoice(formData);
      router.refresh();
    });
  };

  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1, price: 0, subtotal: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === 'productId') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        newItems[index].price = selectedProduct.price;
      }
    }
    newItems[index].subtotal = newItems[index].price * newItems[index].quantity;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="customerId"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>

      {items.map((item, index) => (
        <div key={index} className="flex space-x-2">
          <select
            value={item.productId}
            onChange={(e) => updateItem(index, 'productId', e.target.value)}
            className="border p-2 flex-grow"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
            className="border p-2 w-20"
            min="1"
            required
          />
          <input
            type="number"
            value={item.price}
            readOnly
            className="border p-2 w-24 bg-gray-100"
          />
          <input
            type="number"
            value={item.subtotal.toFixed(2)}
            readOnly
            className="border p-2 w-24 bg-gray-100"
          />
        </div>
      ))}

      <button type="button" onClick={addItem} className="bg-green-500 text-white p-2 rounded">
        Add Item
      </button>

      <div>Total: ${calculateTotal().toFixed(2)}</div>
      <input type="hidden" name="total" value={calculateTotal()} />

      <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Invoice'}
      </button>
    </form>
  );
}
