import { ICart } from "@interfaces/icart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@store/hooks";

type TResponse = {
  numOfCartItems: number;
  cartId: string;
  data: ICart;
};

type TUpdatingState = { productId: string; action: "plus" | "minus" } | null;

const getLoggedUserCart = async () => {
  try {
    const res = await axios.get<TResponse>(`/api/v1/cart`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
    }
  }
};

const removeSpecificCartItem = async (productId: string) => {
  try {
    const res = await axios.delete(`/api/v1/cart/${productId}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
    }
  }
};

const updateCartProductQuantity = async (productId: string, count: number) => {
  try {
    const res = await axios.put(`/api/v1/cart/${productId}`, { count });
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
    }
  }
}

const clearUserCart = async () => {
  try {
    const res = await axios.delete(`/api/v1/cart`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error("an unexpected error");
    }
  }
}

export default function useCart() {
  const queryClient = useQueryClient();
  const { token } = useAppSelector(state => state.auth);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<TUpdatingState>(null);
  const { data: cartProducts, isLoading } = useQuery<TResponse>({
    queryKey: ["cart"],
    queryFn: getLoggedUserCart,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
  const { mutate: mutateRemoveItem } = useMutation({
    mutationKey: ["removeSpecificCartItem"],
    mutationFn: (productId: string) => removeSpecificCartItem(productId),
    onMutate: (productId) => {
      setDeletingId(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Refresh cart data
      toast.success("product deleted successfully");
    },
    onSettled: () => {
      setDeletingId(null);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  const { mutate: mutateUpdateQuantity } = useMutation({
    mutationKey: ['updateCartProductQuantity'],
    mutationFn: ({ productId, count }: {productId: string, count: number}) => updateCartProductQuantity(productId, count),
    onMutate: ({ productId, count }) => {
      setUpdating({productId, action: count > (cartProducts?.data.products.find(p => p.product.id === productId)?.count || 0) ? "plus" : 'minus'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("product quantity updated successfully");
    },
    onSettled: () => setUpdating(null),
    onError: (err: Error) => {
      toast.error(err.message);
    },
  })
  const { mutate: mutateClearCart, isPending } = useMutation({
    mutationKey: ['clearUserCart'],
    mutationFn: clearUserCart,
    onSuccess: () => {
      toast.success("All items removed");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => toast.error(err.message),
  })
  return { deletingId, updating, isLoading, mutateRemoveItem, mutateUpdateQuantity, mutateClearCart, isPending, cartProducts }
}
