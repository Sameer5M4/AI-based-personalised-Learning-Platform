import React, { useState } from "react";
import axios from "axios";
import { FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";

const ProfileCard = ({ userId, name, image }) => {
  const [profileimage,setProfileImage] = useState(image);
  const [image1, setImage1] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage1(file);
      uploadImage(file);
    }
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("image", file);

    axios.post(`http://localhost:5550/api/user/${userId}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(response => {
        setProfileImage(response.data.imageUrl);
        alert('Uploaded the Image Successfully!')
      })
      .catch(error => console.error("Error uploading image:", error));
  };
  console.log(profileimage)
  return (
    <div className="w-full mx-auto bg-white/70 rounded-lg shadow overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="w-full h-40 bg-gray-200">
        <img
          src="/profilebg.png"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="relative flex items-center px-6 py-4">
        {/* Profile Picture */}
        <div className="absolute -top-15 left-10">
          <img
            // src="/profileimg.png"
            src= {profileimage ? `http://localhost:5550${profileimage}`: `http://localhost:5550${image}`}
            alt="Profile"
            className="w-30 h-30 rounded-full border-4 border-white"
          />
          <label htmlFor="imageUpload" className="absolute bg-gray-300 border-2 border-white w-fit -mt-10 rounded-full px-1.5 py-1.5 cursor-pointer transition-transform duration-300 hover:scale-110">
            <FaCamera className="text-gray-600 " size={"15px"} />
          </label>
          <input
              type="file"
              id="imageUpload"  // Corrected from userId="imageUpload"
              accept="image/*"
              className="hidden"  // Corrected from huserIdden
              onChange={handleImageChange}
            />
        </div>

        {/* Name */}
        <div className="ml-40 py-2">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <div className="text-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Online
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ml-auto flex space-x-3">
          <button className="cursor-pointer flex gap-2  items-center px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100">
            <FaEnvelope className="text-gray-500" /> Message
          </button>
          <button className="cursor-pointer flex gap-2 items-center px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100">
            <FaPhone className="rotate-90 text-gray-500" /> Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
