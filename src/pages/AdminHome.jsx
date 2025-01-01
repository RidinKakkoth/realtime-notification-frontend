import React, { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductTable from "../components/ProductTable";
import { fetchProduct } from "../api/adminEndpoints";
import { useDispatch } from "react-redux";
import { setAllProducts } from "../slices/productSlice";

const AdminHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchProduct();
      if (response.success) {
        setProducts(response.products);
        dispatch(setAllProducts(response.products));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit=(product)=>{
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col justify-center items-end">
      <div className="p-4 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
        <AddProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </div>
      
      <ProductTable  onEdit={handleEdit}/>
    
    </div>
  );
};

export default AdminHome;
