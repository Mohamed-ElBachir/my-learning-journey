import express from "express";
import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllusers,
    getCurrentUserProfile,
    updateCurrentUserProfile
 }from "../controllers/userController.js";


     
import {authorizeAdmin,authenticate} from '../middelwares/authMiddelware.js'

const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllusers);
router.post('/auth',loginUser)
router.post('/logout',logoutCurrentUser)
router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile)



export default router;
