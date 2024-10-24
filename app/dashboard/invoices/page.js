import { getInvoices, getCustomersAndProducts } from '../../actions/invoiceActions';
import AddInvoiceForm from './AddInvoiceForm';

export default async function Invoices() {
  try {
    const [invoices, { customers, products }] = await Promise.all([
      getInvoices(),
      getCustomersAndProducts()
    ]);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Invoices</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Create New Invoice</h2>
          <AddInvoiceForm customers={customers} products={products} />
        </div>

        <h2 className="text-xl font-bold mb-2">Invoice List</h2>
        {invoices && invoices.length > 0 ? (
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="text-left">Customer</th>
                <th className="text-left">Total</th>
                <th className="text-left">Date Created</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td>{invoice.customer.name}</td>
                  <td>${invoice.total.toFixed(2)}</td>
                  <td>{new Date(invoice.createdAt).toLocaleString()}</td>
                  <td>
                    <a href={`/dashboard/invoices/${invoice.id}`} className="text-blue-500 hover:underline mr-2">View</a>
                    <a href={`/dashboard/invoices/${invoice.id}/edit`} className="text-green-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices found. Create your first invoice using the form above.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in Invoices component:", error);
    return <div className="p-4">Error loading invoices. Please try again later.</div>;
  }
}
