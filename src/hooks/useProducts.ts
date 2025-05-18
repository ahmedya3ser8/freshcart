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
    const res = await axios.get<TResponse>(`/api/v1/products`, {
      params: { limit: 10, page }
    });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
    }
  }
}

const addProductToCart = async (productId: string) => {
  try {
    const res = await axios.post<TAddProductToCart>(`/api/v1/cart`, { productId });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
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
