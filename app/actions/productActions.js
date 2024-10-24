'use server'

import dbConnect from '../../lib/dbConnect';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import mongoose from 'mongoose';

export async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).lean();
  
  const categoryNames = [...new Set(products.map(p => p.category).filter(c => typeof c === 'string'))];
  const categories = await Category.find({ name: { $in: categoryNames } }).lean();
  const categoryMap = new Map(categories.map(c => [c.name, c._id]));

  return Promise.all(products.map(async product => {
    let categoryId = product.category;
    let categoryName = null;

    if (typeof product.category === 'string') {
      categoryId = categoryMap.get(product.category);
      categoryName = product.category;
      
      // Update the product in the database
      await Product.findByIdAndUpdate(product._id, { category: categoryId });
    } else if (product.category instanceof mongoose.Types.ObjectId) {
      const category = await Category.findById(product.category).lean();
      categoryName = category ? category.name : null;
    }

    return {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: categoryId ? {
        id: categoryId.toString(),
        name: categoryName
      } : null,
      createdAt: product.createdAt ? product.createdAt.toISOString() : null,
      updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null
    };
  }));
}

export async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}).lean();
  return categories.map(category => ({
    id: category._id.toString(),
    name: category.name,
  }));
}

export async function addProduct(formData) {
  try {
    await dbConnect();
    const productData = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
    };

    const product = await Product.create(productData);
    return {
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      category: product.category.toString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}
