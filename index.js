const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const { storage } = require('./util/cloudinary');

require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const upload = multer({storage});

app.get('/',async (req,res,next) => {
	res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',upload.single("image"),async (req,res,next) => {
	res.status(200).json({file:req.file});
});

app.listen(3000,()=> {
	console.log('app listening on port 3000');
})