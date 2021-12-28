
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const storage:multer.StorageEngine = multer.diskStorage({
    destination: (req:Request, file:any, cb:any) => {
        cb(null, 'public/')
    },
    filename: (req:Request, file:any, cb:any) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
})
export { upload };
