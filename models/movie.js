let mongoose = require('mongoose');
let movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});


module.exports = mongoose.model('Movie', movieSchema);