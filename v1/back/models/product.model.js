const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productModelSchema = new Schema ({
    productName: {
        type: String,
        required: "productName is required!!!"
    },
    productVolume: {
        type:Number
    },
    productMaterial: {
        type: String
    },
    productImage: {
        type:String
    },
    cloudinaryPublicId: {
        type:String
    } 
})

mongoose.model('Product', productModelSchema)
