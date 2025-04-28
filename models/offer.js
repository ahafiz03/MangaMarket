const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Offer amount is required'],
        min: [0.01, 'Offer amount must be at least 0.01']
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    manga: {
        type: Schema.Types.ObjectId,
        ref: 'Manga',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
