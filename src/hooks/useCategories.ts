import { ICategory } from "@interfaces/icategory";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

type TResponse = {
  data: ICategory[]
}

const getAllCategories = async () => {
  try {
    const res = await axios.get<TResponse>(`/api/v1/categories`)
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
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
