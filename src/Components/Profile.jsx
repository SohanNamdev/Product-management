import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!localStorage.getItem("loggedIn")) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setNewName(storedUser?.username || "");
      setProfileImage(storedUser?.profileImage || "");
      setDescription(storedUser?.description || "");
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, username: newName, profileImage, description };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/dashboard"); // Redirect to dashboard after saving
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-4">
          {profileImage && <img src={profileImage} alt="Profile" className="w-40 h-40 rounded-full mb-4" />}
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Image URL</label>
          <input
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button onClick={handleSaveProfile} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Logout</button>
      </div>
    </div>
  );
};

export default Profile;