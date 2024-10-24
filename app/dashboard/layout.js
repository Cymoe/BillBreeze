import Link from 'next/link';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-200">
              Overview
            </Link>
          </li>
          <li>
            <Link href="/dashboard/invoices" className="block py-2 px-4 hover:bg-gray-200">
              Invoices
            </Link>
          </li>
          <li>
            <Link href="/dashboard/products" className="block py-2 px-4 hover:bg-gray-200">
              Products
            </Link>
          </li>
          <li>
            <Link href="/dashboard/customers" className="block py-2 px-4 hover:bg-gray-200">
              Customers
            </Link>
          </li>
        </ul>
        <div className="p-4">
          <Link href="/" className="block py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">
            Log out
          </Link>
        </div>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
