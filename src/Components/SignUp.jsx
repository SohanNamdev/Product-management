import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://hellostay.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          term: 1,
          referrer: "",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful. Please login.");
        navigate("/login");
      } else {
        alert("Sign-up failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 h-[60%]">
        <img
          className="w-full h-full object-cover rounded-l-xl"
          src="https://images.unsplash.com/photo-1580983696793-3500a8a0b7f4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      <div className="p-8 bg-white h-[60%] shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 border rounded"
            required
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 border rounded"
            required
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-3 border rounded"
            required
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <button className="w-full bg-blue-500 text-white p-3 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
