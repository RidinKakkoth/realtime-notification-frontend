import axiosInstanceWithInterceptor from "../config/axios";

const axiosInstance = axiosInstanceWithInterceptor();

export const userLogin = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("api/users/login", {
      email,
      password,
    });


    
    return data;
  } catch (error) {
    
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const userSignUp = async (name, email, password) => {
  try {
    const { data } = await axiosInstance.post("api/users/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
