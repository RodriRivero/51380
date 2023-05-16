import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploader = multer({storage});

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
