import { ICategory } from "@interfaces/icategory";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

type TResponse = {
  data: ICategory[]
}

const getAllCategories = async () => {
  try {
    const res = await axios.get<TResponse>(`https://ecommerce.routemisr.com/api/v1/categories`)
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message || error.message;
    } else {
      return 'an unexpected error'
    }
  }
}


const useCategories = () => {
  return useQuery<TResponse>({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime:  5 * 60 * 1000
  })
}

export default useCategories;
