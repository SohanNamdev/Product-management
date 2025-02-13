import React from "react";

const Card = ({ image, name, details, price, product, onDelete, onEdit, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md border-1 border-gray-400 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{details}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-500">{price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => onEdit(product)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;