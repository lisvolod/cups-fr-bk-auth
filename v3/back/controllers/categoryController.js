import Category from "../models/categoryModel.js"

export const createAndEditCategory = async (req, res) => {
    try {
        console.log(req.body);
        res.json(req.body);
        // res.send( {msg: "Hello"})
    } catch (error) {
        console.error(error);
    }
    
}