import express from "express";
import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllusers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserByID
 }from "../controllers/userController.js";


     
import {authorizeAdmin,authenticate} from '../middelwares/authMiddelware.js'
import asynchandler from "../middelwares/asynchandler.js";

const router = express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllusers);

router.post('/auth',loginUser)

router.post('/logout',logoutCurrentUser)

router.route('/profile')
.get(authenticate,getCurrentUserProfile)
.put(authenticate,updateCurrentUserProfile)

// Admin routes
router.route('/:id').delete(authenticate,authorizeAdmin, deleteUserById)
.get(authenticate,authorizeAdmin,getUserById)
.put(authenticate,authorizeAdmin,updateUserByID)


export default router;
