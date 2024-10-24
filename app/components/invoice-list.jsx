import React, { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch('/api/invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    }
    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <Link to="/invoices/new">Create New Invoice</Link>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customer.name}</td>
              <td>${invoice.totalAmount.toFixed(2)}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>
                <Link to={`/invoices/${invoice._id}`}>View</Link>
                <Link to={`/invoices/${invoice._id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
