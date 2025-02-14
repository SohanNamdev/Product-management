import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../Components/Slider";
import Card from "../Components/Card";
import { FiShoppingCart } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!localStorage.getItem("loggedIn") || !storedUser) {
      navigate("/login");
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setNewName(parsedUser?.username || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    }

    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [navigate]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleCartChange = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSaveName = () => {
    setUser((prevUser) => ({ ...prevUser, username: newName }));
    localStorage.setItem("user", JSON.stringify({ ...user, username: newName }));
    setEditName(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editProductId ? { ...newProduct, id: editProductId } : product
        )
      );
      setIsEditing(false);
      setEditProductId(null);
    } else {
      const newProductWithId = { ...newProduct, id: products.length + 1 };
      setProducts([...products, newProductWithId]);
    }
    setNewProduct({ title: "", description: "", price: "", thumbnail: "" });
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="w-full fixed z-20 bg-blue-100 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl text-black font-bold">Dashboard</h1>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiShoppingCart className="text-2xl text-black cursor-pointer" onClick={() => navigate("/cart-details")} />
            {cart.length > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-1 absolute top-0 right-0">{cart.length}</span>}
          </div>
          <div className="relative flex items-center cursor-pointer" onClick={() => navigate("/profile")}>
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-black font-semibold">{user?.username?.charAt(0)}</span>
              </div>
            )}
            <span className="ml-2 text-black font-semibold">{user?.username}</span>
          </div>
        </div>
      </nav>

      <Slider />

      <div className="p-4">
        <form onSubmit={handleAddProduct} className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border p-2 mr-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2 mr-2"
            required
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={newProduct.thumbnail}
            onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
            className="border p-2 mr-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{isEditing ? "Update Product" : "Add Product"}</button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products
            .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((product) => (
              <Card
                key={product.id}
                image={product.thumbnail}
                name={product.title}
                details={product.description}
                price={`₹${product.price}`}
                product={product}
                onDelete={handleDeleteProduct}
                onEdit={handleEditProduct}
                onAddToCart={handleCartChange}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;