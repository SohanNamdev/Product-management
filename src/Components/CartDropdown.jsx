import { useState } from "react";
import { FiTrash } from "react-icons/fi";

const CartDropdown = ({ cartItems, removeFromCart }) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-md p-4 border">
      <h2 className="font-bold  mb-2">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <img src={item.image} alt={item.name} className="w-10 text-zinc-600 h-10 rounded" />
            <div className="flex-1 ml-2">
              <p className="text-sm text-zinc-900 font-semibold">{item.name}</p>
              <p className="text-xs text-gray-900">{item.price}</p>
            </div>
            <button onClick={() => removeFromCart(index)} className="text-red-500 hover:text-red-700">
              <FiTrash />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartDropdown;