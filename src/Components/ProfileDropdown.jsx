import { useState } from "react";

const ProfileDropdown = ({ user, setUser, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNameChange = () => {
    setUser({ ...user, username: newUsername });
    localStorage.setItem("user", JSON.stringify({ ...user, username: newUsername }));
  };

  return (
    <div className="relative">
      <img 
        src="https://images.unsplash.com/photo-1617975251517-b90ff061b52e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Profile" 
        className="w-10 h-10 rounded-full cursor-pointer" 
        onClick={toggleDropdown} 
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-1 border rounded-md"
          />
          <button onClick={handleNameChange} className="w-full bg-blue-500 text-white mt-2 p-1 rounded-md">
            Save Name
          </button>
          <hr className="my-2" />
          <button onClick={handleLogout} className="w-full bg-red-500 text-white p-1 rounded-md">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;