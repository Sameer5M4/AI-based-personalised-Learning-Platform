import { useState, useEffect } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";

export default function Profile({ userId }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [image,setImage] = useState('');
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5550/api/user/${userId}`)
        .then((res) => {
          const data = res.data;
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            bio: data.bio || "",
          });
          setImage(data.image || "")
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:5550/api/user/${userId}`, profile);
      } catch (err) {
        console.error("Error updating profile:", err);
      }
    }
    setIsEditing(!isEditing);
  };

  

  return (
    <div
      className={`relative flex flex-col flex-1 m-3 ml-70 bg-white/50 rounded-xl shadow-lg p-7 px-16 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <ProfileCard userId={userId} name={profile.name} image={image} />

      <div className="flex justify-between">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-bold text-gray-700">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-base text-gray-500">Update your personal details.</p>
        </div>
        <button
          onClick={toggleEdit}
          className="flex items-center px-4 py-2 h-10 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <PencilSquareIcon className="w-5 h-5 mr-1" /> {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y-2 divide-gray-100">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key} className="px-4 py-4 flex w-full sm:gap-4 sm:px-0">
              <dt className="text-base w-1/3 font-bold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
              <dd className="mt-1 text-base w-2/3 text-gray-700 sm:col-span-2 sm:mt-0">
                {isEditing ? (
                  <input
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
