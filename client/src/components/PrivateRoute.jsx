import React from 'react'
import {useSelector} from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom'

const PrivateRoute = () => {
    const user=useSelector((state)=>state.user)
    const{currentUser}=user
    // console.log(user)

    return currentUser!==null? <Outlet/> : <Navigate to='/signin'/>
  
}

export default PrivateRoute
