const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const { storage } = require('./util/cloudinary');
const {cloudinary}  = require('./util/cloudinary');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const upload = multer({storage,
	limits:{fileSize:1000000}
});

app.get('/',async (req,res,next) => {
	res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/',upload.single("image"),async (req,res,next) => {
	res.status(200).json({file:req.file});
});

app.delete('/:cloudinaryId',async (req,res,next)=> {
	try {
		const result = await cloudinary.uploader.destroy(process.env.CLOUDINARY_FOLDER_NAME+'/'+req.params.cloudinaryId);
		res.status(200).json({message:'DELETED'});

  } catch(err) {
		console.log(err);
	}
	
});

app.use((err,req,res,next)=> {
		res.json({
			error : {
				name: err.name,
				message:err.message,
			}
		})
	console.log(err);
})

app.listen(4000,()=> {
	console.log('app listening on port 4000');
});
