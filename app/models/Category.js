import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // Add any other fields you need for categories
}, { timestamps: true });

// Clear the model from the cache if it exists
mongoose.models = {};

export const Category = mongoose.model('Category', categorySchema);
