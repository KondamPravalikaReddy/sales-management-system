import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Sale from '../models/Sales.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config
const batchSize = 1000;
const csvFilePath = path.join(__dirname, '../../data/sales_data.csv');

// Function to insert batch
const insertBatch = async (batch) => {
  try {
    await Sale.insertMany(batch, { ordered: false });
  } catch (error) {
    console.error('❌ Batch insert error:', error.message);
  }
};

// Main import function
const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Sale.deleteMany({});
    console.log('✅ Existing data cleared');

    if (!fs.existsSync(csvFilePath)) {
      console.error('❌ CSV file not found at:', csvFilePath);
      process.exit(1);
    }

    const results = [];
    let processedCount = 0;

    const stream = fs.createReadStream(csvFilePath).pipe(csv());

    stream.on('data', async function(data) {
      const saleData = {
        transactionId: data['Transaction ID'] || data.transactionId || '',
        date: new Date(data['Date'] || data.date),
        customerId: data['Customer ID'] || data.customerId || '',
        customerName: data['Customer Name'] || data.customerName || '',
        phoneNumber: data['Phone Number'] || data.phoneNumber || '',
        gender: data['Gender'] || data.gender || '',
        age: parseInt(data['Age'] || data.age) || 0,
        customerRegion: data['Customer Region'] || data.customerRegion || '',
        customerType: data['Customer Type'] || data.customerType || '',
        productId: data['Product ID'] || data.productId || '',
        productName: data['Product Name'] || data.productName || '',
        brand: data['Brand'] || data.brand || '',
        productCategory: data['Product Category'] || data.productCategory || '',
        tags: data['Tags'] || data.tags || '',
        quantity: parseInt(data['Quantity'] || data.quantity) || 0,
        pricePerUnit: parseFloat(data['Price per Unit'] || data.pricePerUnit) || 0,
        discountPercentage: parseFloat(data['Discount Percentage'] || data.discountPercentage) || 0,
        totalAmount: parseFloat(data['Total Amount'] || data.totalAmount) || 0,
        finalAmount: parseFloat(data['Final Amount'] || data.finalAmount) || 0,
        paymentMethod: data['Payment Method'] || data.paymentMethod || '',
        orderStatus: data['Order Status'] || data.orderStatus || '',
        deliveryType: data['Delivery Type'] || data.deliveryType || '',
        storeId: data['Store ID'] || data.storeId || '',
        storeLocation: data['Store Location'] || data.storeLocation || '',
        salespersonId: data['Salesperson ID'] || data.salespersonId || '',
        employeeName: data['Employee Name'] || data.employeeName || ''
      };

      results.push(saleData);
      processedCount++;

      if (results.length >= batchSize) {
        stream.pause();
        await insertBatch(results.splice(0, batchSize));
        stream.resume();
      }

      if (processedCount % 10000 === 0) {
        console.log(`📊 Processed ${processedCount} records...`);
      }
    });

    stream.on('end', async () => {
      if (results.length > 0) {
        await insertBatch(results);
      }

      console.log(`\n✅ Import completed successfully! Total records: ${processedCount}`);

      console.log('🔍 Creating indexes...');
      await Sale.createIndexes();
      console.log('✅ Indexes created');

      mongoose.connection.close();
      process.exit(0);
    });

    stream.on('error', (error) => {
      console.error('❌ Error reading CSV:', error);
      mongoose.connection.close();
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Import Error:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

console.log('🚀 Starting data import...');
importData();
