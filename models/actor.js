let mongoose = require('mongoose');
let actorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    bYear:{
        validate: {
            validator: function (newAge) {
                if (Number.isInteger(newAge))
                    return true;
                else {
                    console.log('aaa');
                    return false
                }
            },
            message:'output some errors'
        },
        type:Number,
        required:true
    },
    movies:[{
        type: mongoose.Schema.ObjectId,
        ref:'Movie'
    }]
});



module.exports = mongoose.model('Actor',actorSchema);