import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
  customerId: { type: String, index: true },
  customerName: { type: String, required: true, index: true },
  phoneNumber: { type: String, index: true },
  gender: { type: String, index: true },
  age: { type: Number, index: true },
  customerRegion: { type: String, index: true },
  customerType: String,
  productId: String,
  productName: String,
  brand: String,
  productCategory: { type: String, index: true },
  tags: { type: String, index: true },
  quantity: { type: Number, default: 0 },
  pricePerUnit: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, default: 0, index: true },
  paymentMethod: { type: String, index: true },
  orderStatus: String,
  deliveryType: String,
  storeId: String,
  storeLocation: String,
  salespersonId: String,
  employeeName: String
}, {
  timestamps: true
});

// Indexes for better query performance
saleSchema.index({ customerName: 'text', phoneNumber: 'text' });
saleSchema.index({ date: -1 });
saleSchema.index({ quantity: -1 });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;