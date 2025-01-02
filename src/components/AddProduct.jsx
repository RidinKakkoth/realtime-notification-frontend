import React, { useEffect, useState } from "react";
import { addProduct, updateProduct } from "../api/adminEndpoints";
import { useDispatch } from "react-redux";
import {addNewProduct, updateExistingProduct} from '../slices/productSlice'

const AddProduct = ({ isOpen, onClose,product }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null, // Store the selected file
  });
  const[loading,setLoading]=useState(false)

  useEffect(()=>{
    if(product){
        setFormData({
            name:product.name,
            description:product.description,
            price:product.price,
            image:null
        })
        console.log(product.imageUrl);
        
        setImagePreview(product.imageUrl || null);
    }
    else{
        setFormData({
            name:"",
            description:"",
            price:"",
            image:null
        })
        setImagePreview(null);
    }
  },[product])

  const [imagePreview, setImagePreview] = useState(null); // Store the preview URL
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
        const payload=new FormData()
        payload.append("name",formData.name)
        payload.append("description",formData.description)
        payload.append("price",formData.price)

        if(formData.image) payload.append("image",formData.image)

            let result;

            if(product){
                result=await updateProduct(product._id,payload)
                if (result.success) {
                    dispatch(updateExistingProduct(result.updatedProduct));
                    alert("Product Updated");
                    setLoading(false)
                  }
                }
                else{
                  result=await addProduct(payload)
                  if (result.success) {
                    dispatch(addNewProduct(result.newProduct));
                    setLoading(false)
                    alert("Product Added");
                  }
            }

                setFormData({
                    name:"",
                    description:"",
                    price:"",
                    image:"",
                })
                setImagePreview(null)
                onClose(); 
                    
    } catch (error) {
        console.error("Error occurred:", error);
        setError("Failed to submit product")
        alert("Failed to submit product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg relative w-96">
        <h2 className="text-xl font-bold mb-4">{product?"Edit Product":"Add Product"}</h2>
        <h1 className="absolute top-4 right-4 text-black cursor-pointer" onClick={onClose}>X</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4 w-full h-40 object-cover rounded"
              />
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {product?"Update Product":"Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
