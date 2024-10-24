import Link from 'next/link';
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from 'next/image';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(216,216,205)]">
      {/* Navigation Bar */}
      <nav className="bg-[rgb(216,216,205)] border-b border-gray-300 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="text-2xl font-bold text-green-600 font-serif">Bill Breeze</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/features" className="text-gray-600 hover:text-green-600 transition duration-300">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-green-600 transition duration-300">Pricing</Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition duration-300">About</Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <LoginLink className="px-4 py-2 text-green-600 font-semibold hover:bg-green-50 rounded transition duration-300">
              Sign in
            </LoginLink>
            <RegisterLink className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow-md hover:bg-green-700 transition duration-300">
              Sign up
            </RegisterLink>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          {/* Left side: Call to Action */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Money Does <span className="text-green-600">Grow</span> On Trees
            </h1>
            <p className="text-xl text-gray-600">
              Discover our powerful tools to manage invoices, products, and customers effortlessly.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center"><CheckIcon /> Streamline your invoicing process</li>
              <li className="flex items-center"><CheckIcon /> Manage products effortlessly</li>
              <li className="flex items-center"><CheckIcon /> Improve customer relationships</li>
            </ul>
            <div className="space-x-4">
              <Link href="/dashboard" className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                Get Paid
              </Link>
              <Link href="/demo" className="inline-block px-6 py-3 bg-green-100 text-green-800 font-semibold rounded-lg shadow-md hover:bg-green-200 transition duration-300">
                Watch a Demo
              </Link>
            </div>
            <div className="mt-8 text-gray-600">
              <p>Trusted by over 10,000 businesses worldwide</p>
              {/* Add logos of well-known clients or trust badges */}
            </div>
          </div>
          
          {/* Right side: Image */}
          <div className="w-full md:w-1/2">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/hero-image.jpg" // Replace with your actual image path
                alt="Business Management"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Jane Doe", role: "CEO, XYZ Company", text: "Bill Breeze has revolutionized our business operations. We&apos;ve saved countless hours on invoicing alone!" },
              { name: "John Smith", role: "Freelancer", text: "As a freelancer, keeping track of my finances was a nightmare. Bill Breeze made it a breeze!" },
              { name: "Emily Johnson", role: "CFO, ABC Corp", text: "The insights we&apos;ve gained from Bill Breeze have helped us make better financial decisions." },
              { name: "Michael Brown", role: "Small Business Owner", text: "I can&apos;t imagine running my business without Bill Breeze now. It&apos;s become an essential tool." },
              { name: "Sarah Lee", role: "Accountant", text: "Bill Breeze has streamlined our accounting processes, making tax season much less stressful." },
              { name: "David Wilson", role: "Startup Founder", text: "For startups, cash flow is king. Bill Breeze helps us stay on top of our finances effortlessly." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <p className="text-gray-600 italic mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
