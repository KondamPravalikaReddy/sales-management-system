import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSalesData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvFilePath = path.join(__dirname, '../../data/sales_data.csv');

    if (!fs.existsSync(csvFilePath)) {
      console.warn('  CSV file not found. Using empty dataset.');
      resolve([]);
      return;
    }

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        const cleanedData = {
          transactionId: data['Transaction ID'] || data.transactionId || '',
          date: data['Date'] || data.date || '',
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
        results.push(cleanedData);
      })
      .on('end', () => {
        console.log(` Successfully loaded ${results.length} records from CSV`);
        resolve(results);
      })
      .on('error', (error) => {
        console.error(' Error reading CSV file:', error);
        reject(error);
      });
  });
};