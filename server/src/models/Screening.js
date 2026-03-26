const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    movie: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    },
    price: {
        type: Number,
        min: 0
    },
    showTimings : [
        {
            type: String, // ["03:00 PM", "06:00 PM" ]
            required: true
        }
    ]
}, { timestamps: true });

const Screenings = mongoose.model('Screening', screenSchema);

module.exports = Screenings;