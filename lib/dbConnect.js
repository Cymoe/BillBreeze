import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB...', MONGODB_URI);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('New database connection established');
      console.log('Connected to database:', mongoose.connection.name);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('Connection successful, readyState:', mongoose.connection.readyState);
  } catch (e) {
    cached.promise = null;
    console.error('Error connecting to the database:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
