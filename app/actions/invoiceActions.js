'use server'

import dbConnect from '../../lib/dbConnect';
import { Invoice } from '../models/Invoice';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';

export async function getInvoices() {
  await dbConnect();
  try {
    const invoices = await Invoice.find({})
      .populate('customerId')
      .sort({ createdAt: -1 })
      .lean();

    return invoices.map(invoice => ({
      id: invoice._id.toString(),
      customer: invoice.customerId ? {
        id: invoice.customerId._id.toString(),
        name: invoice.customerId.name
      } : { id: null, name: invoice.customer || 'Unknown' },
      total: invoice.totalAmount,
      date: invoice.date ? invoice.date.toISOString() : null,
      createdAt: invoice.createdAt ? invoice.createdAt.toISOString() : null,
    }));
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
}

export async function getCustomersAndProducts() {
  await dbConnect();
  const [customers, products] = await Promise.all([
    Customer.find({}).lean(),
    Product.find({}).lean(),
  ]);
  return {
    customers: customers.map(c => ({
      id: c._id.toString(),
      name: c.name,
      // Add other customer fields as needed
    })),
    products: products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      price: p.price
    }))
  };
}

export async function addInvoice(formData) {
  try {
    await dbConnect();
    const invoiceData = {
      customerId: formData.get('customerId'),
      items: JSON.parse(formData.get('items')),
      total: parseFloat(formData.get('total')),
    };

    const invoice = await Invoice.create(invoiceData);
    return {
      id: invoice._id.toString(),
      customerId: invoice.customerId.toString(),
      items: invoice.items.map(item => ({
        productId: item.productId.toString(),
        quantity: item.quantity,
        price: item.price
      })),
      total: invoice.total,
      date: invoice.date.toISOString(),
      createdAt: invoice.createdAt.toISOString(),
      updatedAt: invoice.updatedAt.toISOString()
    };
  } catch (error) {
    console.error("Error adding invoice:", error);
    throw error;
  }
}
