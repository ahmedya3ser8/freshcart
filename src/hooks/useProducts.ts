import { IProduct } from "@interfaces/iproduct"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios, { isAxiosError } from "axios"

type TResponse = {
  data: IProduct[],
  results: number,
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }
}

const getAllProducts = async (page: number) => {
  try {
    const res = await axios.get<TResponse>(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: { limit: 10, page }
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message || error.message;
    } else {
      return 'an unexpected error'
    }
  }
}

const useProducts = (page: number) => {
  return useQuery<TResponse>({
    queryKey: ['products', page],
    queryFn: () => getAllProducts(page),
    placeholderData: keepPreviousData,
    staleTime:  5 * 60 * 1000
  })
}

export default useProducts;
