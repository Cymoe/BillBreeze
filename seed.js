import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { Customer } from './app/models/Customer.js';
import { Product } from './app/models/Product.js';
import { Invoice } from './app/models/Invoice.js';
import { Category } from './app/models/Category.js';

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/saaspak';

const NUM_CUSTOMERS = 50;
const NUM_CATEGORIES = 10;
const NUM_PRODUCTS = 100;
const MAX_INVOICES_PER_CUSTOMER = 5;

const generateCustomers = () => 
  Array.from({ length: NUM_CUSTOMERS }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(true)
  }));

const generateCategories = () => 
  Array.from({ length: NUM_CATEGORIES }, () => ({
    name: faker.commerce.department(),
    description: faker.lorem.sentence()
  }));

const generateProducts = (categories) => 
  Array.from({ length: NUM_PRODUCTS }, () => ({
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    category: faker.helpers.arrayElement(categories)._id,
    description: faker.commerce.productDescription()
  }));

const generateInvoices = (customers, products) => 
  customers.flatMap(customer => 
    Array.from({ length: faker.number.int({ min: 1, max: MAX_INVOICES_PER_CUSTOMER }) }, () => ({
      customerId: customer._id,
      items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => {
        const product = faker.helpers.arrayElement(products);
        return {
          productId: product._id,
          quantity: faker.number.int({ min: 1, max: 10 }),
          price: product.price
        };
      }),
      total: 0
    }))
  ); // Add this closing parenthesis

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Invoice.deleteMany({});

    // Insert new data
    const createdCustomers = await Customer.create(generateCustomers());
    const createdCategories = await Category.create(generateCategories());
    const createdProducts = await Product.create(generateProducts(createdCategories));
    const createdInvoices = await Invoice.create(generateInvoices(createdCustomers, createdProducts));

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDatabase();
