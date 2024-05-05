import express from 'express'
import { createListing ,deleteListing,updatelisting,getListing} from '../controllers/listingController.js'
import { verifyToken } from '../utils/verifyUser.js'

const router=express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updatelisting)
router.get('/get/:id',verifyToken,getListing)




export default router