'use server'

import dbConnect from '../../lib/dbConnect';
import { Customer } from '../models/Customer';

export async function getCustomers() {
  try {
    await dbConnect();
    const customers = await Customer.find({}).lean();
    return customers.map(customer => ({
      id: customer._id.toString(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: typeof customer.address === 'object'
        ? `${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.zip}, ${customer.address.country}`
        : customer.address,
      createdAt: customer.createdAt ? customer.createdAt.toISOString() : null,
      updatedAt: customer.updatedAt ? customer.updatedAt.toISOString() : null
    }));
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
}

export async function addCustomer(formData) {
  try {
    await dbConnect();
    const customerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    };

    const customer = await Customer.create(customerData);
    return {
      id: customer._id.toString(),
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      createdAt: customer.createdAt.toISOString(),
      updatedAt: customer.updatedAt.toISOString()
    };
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
}
