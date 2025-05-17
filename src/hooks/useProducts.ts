import { IProduct } from "@interfaces/iproduct"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { isAxiosError } from "axios"
import toast from "react-hot-toast"

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

type TAddProductToCart = {
  message: string,
  numOfCartItems: number
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

const addProductToCart = async (productId: string) => {
  try {
    const res = await axios.post<TAddProductToCart>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
      headers: {
        token: localStorage.getItem('userToken')
      }
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

const useProducts = (page: number, id?: string) => {
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useQuery<TResponse>({
    queryKey: ['products', page],
    queryFn: () => getAllProducts(page),
    placeholderData: keepPreviousData,
    staleTime:  5 * 60 * 1000
  })
  const { mutate, isPending } = useMutation<TAddProductToCart>({
    mutationKey: ['addProductToCart', id],
    mutationFn: () => addProductToCart(id as string),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  return {products, isLoading, mutate, isPending}
}

export default useProducts;
