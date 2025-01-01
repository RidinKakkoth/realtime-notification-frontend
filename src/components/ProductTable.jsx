import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleListingProduct } from '../api/adminEndpoints'
import { toggleListed } from '../slices/productSlice'

const ProductTable = ({onEdit}) => {

    const products=useSelector((state)=>state.products.products)
    const dispatch=useDispatch()


    const handleToggle=async(id)=>{
        try {
            const result=await toggleListingProduct(id)
            if(result.success){
                dispatch(toggleListed(id))
                console.log(result);
                
            }
            
        } catch (error) {
            console.error(error)
        }
    }
    

  return (
   
    <div className="max-w-[720px] mx-auto">
    
        <div className="w-full flex justify-between items-center mb-3  pl-3">
            <div>
                <h3 className="text-lg font-semibold text-slate-800">Products</h3>
            </div>
            <div className="mx-3 ">
                <div className="w-full max-w-sm min-w-[200px] relative">
                <div className="relative">
                    <input
                    className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Search for product..."
                    />
                    <button
                    className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                    type="button"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
        </div>
        
        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
            <thead>
            <tr className="border-b border-slate-300 bg-slate-50">
                <th className="p-4 text-sm font-normal leading-none text-slate-500">Product</th>
                <th className="p-4 text-sm font-normal leading-none text-slate-500">Name</th>
                <th className="p-4 text-sm font-normal leading-none text-slate-500">Description</th>
                <th className="p-4 text-sm font-normal leading-none text-slate-500">Quantity</th>
                {/* <th className="p-4 text-sm font-normal leading-none text-slate-500">Price per Item</th>
                <th className="p-4 text-sm font-normal leading-none text-slate-500">Total Price</th> */}
                <th className="p-4 text-sm font-normal leading-none text-slate-500">List</th>
                <th className="p-4 text-sm font-normal leading-none text-slate-500">Action</th>
            </tr>
            </thead>
            <tbody>
            {products.map((item,index)=>(

            <tr key={index} className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200 py-5">
                <img src={item.imageUrl} alt="Product" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="block font-semibold text-sm text-slate-800">{item.name}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="block font-semibold text-sm text-slate-800">{item.description}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">{item.price}</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <input type="checkbox" checked={item.listed} onChange={()=>handleToggle(item._id)} />
                </td>
                {/* <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">$500</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">$1,000</p>
                </td> */}
                <td className="p-4 border-b border-slate-200 py-5">
                <button onClick={()=>onEdit(item)} type="button" className="text-slate-500 hover:text-slate-700">
                    edit
                </button>
                </td>
            </tr>
            ))}
            {/* <tr className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200 py-5">
                <img src="https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/spacejoy-NpF_OYE301E-unsplash.jpg" alt="Product 2" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="block font-semibold text-sm text-slate-800">Little Sofa</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">1</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">$750</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">$750</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <button type="button" className="text-slate-500 hover:text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </td>
            </tr>
            <tr className="hover:bg-slate-50">
                <td className="p-4 border-b border-slate-200 py-5">
                <img src="https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/michael-oxendine-GHCVUtBECuY-unsplash.jpg" alt="Product 3" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="block font-semibold text-sm text-slate-800">Brown Coach</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">3</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">$3,000</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <p className="text-sm text-slate-500">$9,000</p>
                </td>
                <td className="p-4 border-b border-slate-200 py-5">
                <button type="button" className="text-slate-500 hover:text-slate-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </td>
            </tr> */}
            </tbody>
        </table>
        </div>
    
    
    
    </div>
  )
}

export default ProductTable
