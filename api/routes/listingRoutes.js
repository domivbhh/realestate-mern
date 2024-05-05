import express from 'express'
import { createListing ,deleteListing,updatelisting,getListing,getListings} from '../controllers/listingController.js'
import { verifyToken } from '../utils/verifyUser.js'

const router=express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updatelisting)
router.get('/get/:id',verifyToken,getListing)
router.get('/get',getListings)




export default router