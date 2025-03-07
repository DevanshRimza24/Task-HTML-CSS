import { Request, Router } from "express"
// import multer from "multer"
const multer = require('multer')
import path from "path"
// import { signUpUserProfile, updateUserProfile, getAllUsers } from "../controller/userController";
// import { validateUser, validateUserId, validateUpdateUser } from "../middleware/validators";


const router: Router = Router();


const storage = multer.diskStorage({
    destination: function (req : any, file : any, cb : any) {
      cb(null, './uploads')
    },
    filename: function (req : any, file : any, cb : any) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()} - ${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

// const upload = multer({ dest: "uploads/" })

interface RequestExtended extends Request {
    file?: any
}

router.post("/upload", upload.single("imageUrl"), (req: RequestExtended, res) => {
    console.log(req.body)
    console.log(req.file)

res.send("Done")
});

router.get('/get-images', () => { });



export default router;