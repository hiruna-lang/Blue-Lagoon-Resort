const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  try {
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected to', mongoUri);
      return;
    }
    throw new Error('MONGO_URI not set');
  } catch (err) {
    console.warn('Primary MongoDB connection failed:', err && err.message ? err.message : err);
    console.log('Falling back to an in-memory MongoDB for development (mongodb-memory-server)');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB');
      return;
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr);
      throw memErr;
    }
  }
};

module.exports = connectDB;
