import React,{useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getStorage, uploadBytesResumable,ref,getDownloadURL} from 'firebase/storage'
import { app } from '../firebase'
import {useDispatch} from 'react-redux'
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserSuccess } from '../redux/user/userSlice'
import {Link} from 'react-router-dom'


const Profile = () => {
  const user=useSelector((state)=>state.user)
  console.log(user)
  const{error}=user
  const fileRef=useRef(null)
  const [image,setImage]=useState(undefined)
  const[imagePercent,setImagePercent]=useState(0)
  const[imageError,setImageError]=useState(false)
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const[updateSuccess,setUpdateSuccess]=useState(false)
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);




  
  

  useEffect(()=>{
    if(image){
      handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload=async (image)=>{
    const storage=getStorage()
    const fileName=new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + '% done') 
        setImagePercent(Math.round(progress))
      },
      (error)=>{
        setImageError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setFormData({...formData,profilePicture:downloadUrl})
        });
      }
    )
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  // console.log(formData)

  const handleSubmit=async (e)=>{
      e.preventDefault()
      try{
        dispatch(updateUserStart())
          const res = await fetch(
            `/api/user/update/${user.currentUser._id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
          const data=await res.json();
          if(data.success===false){
            dispatch(updateUserFailure(data.message))
          }
          dispatch(updateUserSuccess(data))
          setUpdateSuccess(true)

      }
      catch(err){
        dispatch(updateUserFailure(err))

      }
  };

  const handleDelete=async()=>{
    try {
      dispatch(deleteUserStart())
      const res=await fetch(`/api/user/delete/${user.currentUser._id}`,{
        method:"DELETE",
      });
      const data=res.json()
      if(data.success===false){
        dispatch(deleteUserFailure(data))
        return;
      }

     dispatch(deleteUserSuccess()) 
    } 
    catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut=async()=>{
    try{
      await fetch('/api/auth/signout')
      dispatch(signOutUserSuccess())
    }
    catch(err){
      console.log(err)
    }
  }

  const handleShowListings=async ()=>{
     try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${user.currentUser._id}`);
      const data = await res.json();

      setUserListings(data);

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
    } 
    catch (error) {
      setShowListingsError(true);
    }
  }
  console.log(userListings);


  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listings/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
// deleting from useState where we stored the user listings data
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={formData.profilePicture || user.currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />

        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-500">
              Error Uploading Image(File size must be less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading :${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image Uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={user.currentUser.username}
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />

        <input
          defaultValue={user.currentUser.email}
          type="text"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3"
        />

        <input
          type="text"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
        />

        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={user.loading}
        >
          {user.loading ? "Loading..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">
        {user.error && "Something went Wrong"}
      </p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User updated successfully"}
      </p>
      <button className="text-green-700 w-full" onClick={handleShowListings}>
        Show Listings
      </button>

      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile

       // Firebase Storage rules
      //  allow read;
      //     allow write:if
      //     request.resource.size < 2 * 1024 * 1024 && 
      //     request.resource.contentType.matches('image/.*')