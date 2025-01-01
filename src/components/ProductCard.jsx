import React, { useState } from 'react'
import { subscribeProduct, unsubscribeProduct } from '../api/adminEndpoints';
import { subscribingProduct, unsubscribingProduct } from '../slices/productSlice';

const ProductCard = ({item}) => {
    const [isSubscribed, setIsSubscribed] = useState(item.isSubscribed);
    const [loading, setLoading] = useState(false);

    const handleSubscriptionToggle = async () => {
        setLoading(true);
        
        
        try {
            const productId = item._id; 
            
            if (isSubscribed) {
                const result= await  unsubscribeProduct( productId );
                
                if(result.success){
                    setIsSubscribed(false);
                    unsubscribingProduct(productId)
                  
                    
                }
            } else {
                const result= await subscribeProduct( productId );
                
                if(result.success){
            setIsSubscribed(true); 
            subscribingProduct(productId)
            }
          }
        } catch (error) {
          console.error('Error subscribing/unsubscribing', error);
        } finally {
          setLoading(false);
        }
      };

  return (

            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl ">
                    <img
                        src={item.imageUrl}
                        alt="card-image" className="object-cover mx-auto h-56" />
                </div>
                <div className="p-6 ">
                    <div className="flex items-center justify-between mb-2">
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            {item.name}
                        </p>
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                            ${item.price}
                        </p>
                    </div>
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                        {item.description}
                    </p>
                </div>
                <div className="p-6 flex justify-between gap-2 pt-0">
                    <button
                        className="align-middle bg-gray-100 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        type="button">
                        Add to Cart
                    </button>
                    <button
                        className="align-middle bg-gray-100 select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        type="button"
                        onClick={handleSubscriptionToggle}
          disabled={loading}>
                       {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button>
                </div>
            </div>
        
    
  )
}

export default ProductCard
