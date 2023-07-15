import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;