import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';
import {FaSearch} from 'react-icons/fa';

const Header = () => {
  const currentUser=useSelector((state)=>state.user)
  // const{profilePicture}=currentUser.currentUser
  // console.log(username)
  return (
    <div className="bg-slate-200 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className='text-slate-500'>VB</span>
          <span className='text-slate-500'>-Estate</span>
        </h1>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
          <FaSearch className='text-slate-500'/>
        </form>
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
