import multer from 'multer';

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage: storage }).single('file');
export const multiUpload = multer({ storage: storage }).fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);