import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import { Customer } from '../../../app/models/Customer';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    const customers = await Customer.find({}).lean();
    const count = await Customer.countDocuments();
    
    // Get collection names using mongoose connection
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    return NextResponse.json({
      customers,
      count,
      collectionNames,
      modelName: Customer.modelName,
      collectionName: Customer.collection.name,
      databaseName: mongoose.connection.name
    });
  } catch (error) {
    console.error('Error in test-db route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
