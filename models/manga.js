const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mangaSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'] },
    member: { type: Schema.Types.ObjectId, ref: 'User'},
    condition: { 
        type: String, 
        enum: ['New', 'Like New', 'Very Good', 'Good', 'Acceptable'], 
        required: [true, 'Condition is required']
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'], 
        min: [0.01, 'Price must be at least 0.01'] 
    },
    details: { type: String, required: [true, 'Details are required'] },
    image: { type: String, required: [true, 'Image file path is required'] },
    active: { type: Boolean, default: true },
    totalOffers: { type: Number, default: 0 }, 
    highestOffer: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// collection name is mangas in the database
module.exports = mongoose.model('Manga', mangaSchema);