import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    volume: {
        type:Number,
        required: true,
        trim: true
    },
    material: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    image: {
        type:String,
        required: true,

    },
    cloudinaryPublicId: {
        type:String,
        required: true
    } 
}, {
    timestamps: true //important
})

const Product = mongoose.model('Product', productSchema)

export default Product;