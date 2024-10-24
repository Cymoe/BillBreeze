import mongoose from 'mongoose';
import { Product } from '../app/models/Product';
import { Category } from '../app/models/Category';
import dbConnect from '../lib/dbConnect';

async function updateProducts() {
  await dbConnect();

  const defaultCategory = await Category.findOne();

  if (!defaultCategory) {
    console.log('No categories found. Please add categories first.');
    return;
  }

  const result = await Product.updateMany(
    { category: { $exists: false } },
    { $set: { category: defaultCategory._id } }
  );

  console.log(`Updated ${result.nModified} products`);

  mongoose.connection.close();
}

updateProducts().catch(console.error);
