import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  }],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  // Add any other fields you need for invoices
}, { timestamps: true });

export const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
