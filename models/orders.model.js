const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    establishment: { type: Schema.Types.ObjectId, ref: 'Establishment' },
    bags: [{ type: Schema.Types.ObjectId, ref: 'Bag' }],
    totalAmount: { type: Number },
    status: {
        type: String,
        enum: ["placed", "paid", "inProgress", "outForDelivery", "delivered"],
    },
    createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Order', orderSchema);