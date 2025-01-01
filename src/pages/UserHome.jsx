import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../api/adminEndpoints'
import { setAllProducts } from '../slices/productSlice'

const UserHome = () => {

  const dispatch=useDispatch()
  const products=useSelector((state)=>state.products.products)
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchProduct();
      if (response.success) {
        // setProducts(response.products);
        dispatch(setAllProducts(response.products));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  return (
    <div className='p-4 grid    sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-4'>
      {
        products.map((item,index)=>(
          <ProductCard key={index} item={item}/>
        ))
      }
    </div>
  )
}

export default UserHome
