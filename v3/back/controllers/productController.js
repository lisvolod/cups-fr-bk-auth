import formidable from "formidable";
import { v2 as cloudinary } from 'cloudinary'
import Product from "../models/productModel.js";
import dotenv from 'dotenv';

// Завантажуємо змінні середовища з файлу .env
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const saveDataToDB = async (productId, data, res) => {
    // Перевіряємо чи строрювати новий рекорд в БД, чи оновити наявний
    if (productId == "") {                  //Створюємо новий рекорд БД
            await Product.create(data)
                    .then( () => res.sendStatus(200))
                    .catch(error => {
                        console.error('Error creating the new product:', error);
                    });
    }
    else {                                  //Оновлюємо наявний рекорд БД
            await Product.findByIdAndUpdate(productId, data)
                    .then( () => res.sendStatus(200))
                    .catch(error => {
                        console.error('Error updating product data:', error);

                    });
    }
}

export const createAndEditProduct = async (req, res) => {
    const productForm = formidable({
        multiples: true,                    // Вказуємо, що буде прилітати форма з кількома полями
        keepExtensions: true,               // Вказуємо, що потрібно зберігати розширення файла
        allowEmptyFiles: true,              // Вказуємо, що можна приймати дані форми без файлів (на випадок editProduct, коли не змінюємо картинку)
        minFileSize: 0                      // Вказуємо, що мінімальний розмір файла може бути рівний 0 (на випадок editProduct, коли не змінюємо картинку)
    });
    try {
        productForm.parse(req, async (err, fields, files) => {
            try {
                if (err) throw err
                                
                // formidable повертає значень полів форми у вигляді масиву
                // перетворюємо їх у string
                for (const key in fields) {
                    if (Array.isArray(fields[key])) {
                        fields[key] = fields[key].join(', ');
                    }
                  }
                               
                const { productId, producCategory, productName, productVolume, productMaterial, productPrice, oldCloudinaryPublicId, oldImagePath } = fields;
                const { productImage: [{ filepath }] } = files;
                const { productImage: [{ originalFilename }] } = files;
                
                // Починаємо формувати об'єкт для запису в БД
                const productData = {
                    category: producCategory,
                    name: productName,        
                    volume: productVolume,
                    material:productMaterial,
                    price:productPrice
                };
                                  
                // Перевіряємо чи проводилася зміна картинки на фронті
                if (!originalFilename) {
                    // Якщо картинка не мінялася - додаємо в об'єкт старі поля
                    productData.image = oldImagePath;
                    productData.cloudinaryPublicId = oldCloudinaryPublicId;
                    saveDataToDB(productId, productData, res)
                }
                else {
                    // Якщо картинка мінялася - додаємо в об'єкт нові поля
                    try {
                        cloudinary.uploader.upload(filepath, (err, resultCloudinaryImage) => {
                        if (err) { console.warn(err); }
                        productData.image = resultCloudinaryImage.url;
                        productData.cloudinaryPublicId = resultCloudinaryImage.public_id;
                        saveDataToDB(productId, productData, res); 
                        //Видаляємо стару картинку в cloudinary
                        try {
                            cloudinary.uploader.destroy(oldCloudinaryPublicId);
                        } catch (error) {
                            console.error(error);
                        }
                    }) 
                    }   catch (error) {
                            console.error(error);
                        }
                }
            } catch (error) {
                console.error(error.message);
            }
            
            
            
        })
    } catch (error) {
        console.error("Error parsing formData...", error);
    }
}

export const getAllProducts = async (req, res) => {
    await Product
            .find()
            .sort({ _id: -1 })
            .populate('category')
            .exec()
            .then(result =>  res.send(result))
            .catch(err =>  console.warn('Error in retrieving product list: ', err))
    }

export const deleteProduct = async (req, res) => {
    try {
        cloudinary.uploader.destroy(req.body.cloudinaryPublicId);
    } catch (error) {
        console.error(error);
    }
    
    Product.findByIdAndDelete(req.body._id)
    .then(() => {
        res.sendStatus(200);
    })
    .catch((err) => {
      console.error('Removing product error...:', err);
    });
}
    
    
 

