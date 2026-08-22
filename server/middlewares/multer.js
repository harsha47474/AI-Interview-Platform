import multer from 'multer'

const storage = multer.diskStorage({ // check later while deployement
    destination: function(req, file, cb){
        cb(null, "public");
    },
    filename: function(req, file, cb){
        const filename = Date.now() + "-"+file.originalname;
        cb(null, filename);
    }
});

export const upload = multer({
    storage,
    limits: {fileSize: 5* 1024 * 1024} // 5MB limit
});