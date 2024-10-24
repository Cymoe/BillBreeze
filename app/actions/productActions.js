'use server'

import dbConnect from '../../lib/dbConnect';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

export async function getProducts() {
  await dbConnect();
  const products = await Product.find({}).populate('category').lean();
  return products.map(product => ({
    id: product._id.toString(),
    name: product.name,
    price: product.price,
    category: product.category ? {
      id: product.category._id.toString(),
      name: product.category.name
    } : null,
    createdAt: product.createdAt ? product.createdAt.toISOString() : null,
    updatedAt: product.updatedAt ? product.updatedAt.toISOString() : null
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
