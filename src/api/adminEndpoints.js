import axiosInstanceWithInterceptor from "../config/axios";

const axiosInstance = axiosInstanceWithInterceptor();

export const addProduct=async(formData)=>{
    try {    
        const {data}=await axiosInstance.post('/api/products',formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        return data

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
}
export const updateProduct=async(id,formData)=>{
    try {    
        const {data}=await axiosInstance.put(`/api/products/${id}`,formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        return data

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
}
export const fetchProduct=async()=>{
    try {
        
        const {data}=await axiosInstance.get('/api/products')
        return data

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
}
export const toggleListingProduct=async(id)=>{
    try {
        
        const {data}=await axiosInstance.patch(`/api/products/${id}`)
        return data

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
}
export const subscribeProduct=async(id)=>{
    try {
        
        const {data}=await axiosInstance.patch(`/api/products/subscribe/${id}`)
        return data

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
}
export const unsubscribeProduct=async(id)=>{
    try {
        
        const {data}=await axiosInstance.patch(`/api/products/unsubscribe/${id}`)
        return data

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
}