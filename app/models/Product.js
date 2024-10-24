import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  // Add any other fields you need for products
}, { timestamps: true });

productSchema.set('strictPopulate', false);

// Clear the model from the cache if it exists
mongoose.models = {};

export const Product = mongoose.model('Product', productSchema);
