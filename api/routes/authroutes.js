import express from'express'
const router=express.Router()
import { signIn,signUp,google,signOut } from '../controllers/authController.js'

router.post('/signup',signUp)
router.post("/signin", signIn)
router.post("/goggle",google)
router.get('/signout',signOut)





export default router