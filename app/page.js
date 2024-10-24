import Link from 'next/link';
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to our store</h1>
      <div className="space-y-4">
        <LoginLink className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sign in
        </LoginLink>
        <RegisterLink className="block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Sign up
        </RegisterLink>
        <Link href="/dashboard" className="block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
