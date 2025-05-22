import { IProduct } from "@interfaces/iproduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@store/hooks";

type TResponse = {
  count: number,
  data: IProduct[]
}

const getLoggedUserWishlist = async () => {
  try {
    const res = await axios.get(`/api/v1/wishlist`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

const removeProductFromWishlist = async (productId: string) => {
  try {
    const res = await axios.delete(`/api/v1/wishlist/${productId}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

const addProductToWishlist = async (productId: string) => {
  try {
    const res = await axios.post(`/api/v1/wishlist`, { productId });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

export default function useWishlist() {
  const queryClient = useQueryClient();
  const { token } = useAppSelector(state => state.auth);
  const [removingId, setRemovingId] = useState<string | null>('');
  const [addingId, setAddingId] = useState<string | null>('');
  const { data, isLoading } = useQuery<TResponse>({
    queryKey: ['wishlist'],
    queryFn: getLoggedUserWishlist,
    enabled: !!token,
    staleTime: 5 * 60 * 1000
  })
  const { mutate: mutateRemoveProductFromWishlsit } = useMutation({
    mutationKey: ['removeProductFromWishlist'],
    mutationFn: removeProductFromWishlist,
    onMutate: (productId) => {
      setRemovingId(productId);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(res.message)
    },
    onSettled: () => setRemovingId(null),
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const { mutate: mutateAddProductToWishlsit } = useMutation({
    mutationKey: ['addProductToWishlist'],
    mutationFn: addProductToWishlist,
    onMutate: (productId) => {
      setAddingId(productId);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(res.message);
    },
    onSettled: () => setAddingId(null),
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const isInWishlist = (productId: string) => {
    return data?.data?.some((item) => item.id === productId);
  };
  return {removingId, data, isLoading, mutateRemoveProductFromWishlsit, mutateAddProductToWishlsit, isInWishlist, addingId}
}
