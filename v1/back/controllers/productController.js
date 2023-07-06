const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
require("dotenv/config");

router.post("/", (req, res) => {
        
    //Конфігуруємо formidable  у відповідності до 
    const form = formidable({
        multiples: true,                    //Вказуємо, що буде прилітати форма з кількома полями
        // uploadDir: publicDir,               //Вказуємо каталог, куди будемо поміщати завантажені файли
        keepExtensions: true,               //Вказуємо, що потрібно зберігати розширення
        // filename: function (name, ext, part, form) {return pigart.orinalFilename} //Залишаємо старе ім'я файла
    });
    
    form.parse(req, async (err, fields, files) => {
        
        if (err) {
          console.log("Error parsing the files");
          return res.status(400).json({
            status: "Fail",
            message: "There was an error parsing the files",
            error: err,
          });
        }

        
        const { productId, productName, productVolume, productMaterial, oldCloudinaryPublicId, oldImagePath } = fields;
        const { productImage } = files;
        
        // console.log(productId, productName, productVolume, productMaterial, cloudinaryPublicId, oldImagePath);
        // console.log(productImage);

        // Починаємо формувати об'єкт для запису в БД
            const productInfo = {
                productName,                // Аналогічно до синтаксису productName: productName,
                productVolume,
                productMaterial 
            };
            
            // Перевіряємо чи проводилася зміна картинки на фронті
            if (!productImage.originalFilename) {
                // Якщо картинка не мінялася - додаємо в об'єкт старі поля
                productInfo.productImage = oldImagePath;
                productInfo.cloudinaryPublicId = oldCloudinaryPublicId;
                saveDataToDB(productId, productInfo, res);
            }
            else {
                // Якщо картинка мінялася - додаємо в об'єкт нові поля
                const getImagePath = productImage.filepath;
                cloudinary.uploader.upload(getImagePath, (err, image) => {
                    if (err) { console.warn(err); }
                                
                    productInfo.productImage = image.url;
                    productInfo.cloudinaryPublicId = image.public_id;
                    saveDataToDB(productId, productInfo, res); // console.log(productInfo);  
                    //Видаляємо стару картинку в cloudinary
                    cloudinary.uploader.destroy(oldCloudinaryPublicId);
                })
            }
    });
});

router.get("/list", (req, res) => {
    Product
    .find()
    .sort({ _id: -1 })
    .exec((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.warn('Error in retrieving product list: ', err);
        }
    })
})

const jsonParser = express.json()
router.delete("/", jsonParser, (req, res) => {
    cloudinary.uploader.destroy(req.body.cloudinaryPublicId);
    Product.findByIdAndDelete(req.body._id, (err, docs) => {
        if (err){
            console.log(err)
        }
        else{
            res.sendStatus(200);
        }
    });
})


function saveDataToDB(productId, data, res){
    // Перевіряємо чи строрювати новий рекорд в БД, чи оновити наявний
    if (productId == "") {                  //Створюємо новий рекорд БД
        Product(data).save(err => {
            if (err) console.log(err);
            res.sendStatus(200);
        })
    }
    else {                                  //Оновлюємо наявний рекорд БД
        Product.findByIdAndUpdate(productId, data, (err, data) => {
            if (err) console.log(err);
            res.sendStatus(200);
        })
    }
}

module.exports = router;