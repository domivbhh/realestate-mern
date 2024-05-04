import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';

const Header = () => {
  const currentUser=useSelector((state)=>state.user)
  // const{profilePicture}=currentUser.currentUser
  // console.log(username)
  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser.currentUser!==null ? (
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={currentUser?.currentUser?.profilePicture}
                alt="img"
              />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header
