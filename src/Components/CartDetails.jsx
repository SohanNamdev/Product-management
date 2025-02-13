import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPayment = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Cart Details</h1>
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        {cart.length === 0 ? (
          <p className="text-gray-600">No items in cart</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <img src={item.thumbnail} alt={item.title} className="w-12 h-12 rounded" />
              <div className="flex-1 ml-2">
                <p className="text-sm text-zinc-900 font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 text-sm">Remove</button>
            </div>
          ))
        )}
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total Payment: ₹{totalPayment}</h2>
        </div>
      </div>
      <button onClick={() => navigate("/dashboard")} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Back to Dashboard</button>
    </div>
  );
};

export default CartDetails;