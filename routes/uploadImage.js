const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드된 이미지를 저장
try {
    fs.readdirSync('files');
} catch (error) {
    console.log(error);
    fs.mkdirSync('files');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'files/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const filename = path.basename(file.originalname, ext) + Date.now() + ext;
            req.filename = filename;
            done(null, filename);
        },
    }),
    limits: { fileSize : 1024 * 1024 * 100 }
})

module.exports = upload;