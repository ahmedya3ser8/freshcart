import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutSchema, TCheckout } from "@validations/checkoutSchema";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IOrder } from "@interfaces/iorder";
import { useAppSelector } from "@store/hooks";
import { useQuery } from "@tanstack/react-query";

type TFormData = {
  formData: {
    details: string,
    phone: string,
    city: string
  },
  cartId: string
}

const cashOrder = async ({cartId, formData}: TFormData) => {
  try {
    const res = await axios.post(`/api/v1/orders/${cartId}`, {shippingAddress: formData});
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error');
    }
  }
}

const onlineOrder = async ({cartId, formData}: TFormData) => {
  try {
    const res = await axios.post(`/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {shippingAddress: formData});
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error');
    }
  }
}

const getUserOrders = async (userId: string) => {
  try {
    const res = await axios.get(`/api/v1/orders/user/${userId}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

export default function useOrders(cartId: string) {
  const queryClient = useQueryClient();
  const { user } = useAppSelector(state => state.auth);
  const [payment, setPayment] = useState('cash');
  const router = useRouter();
  const { mutate: mutateCashOrder, isPending: isPendingCashOrder } = useMutation({
    mutationKey: ['checkout/cash'],
    mutationFn: cashOrder,
    onSuccess: (res) => {
      if (res.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['allorders'] }); // This refetches orders
        router.push('/allorders');
        toast.success('Thank you! Your order was successful.');
      }
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const { mutate: mutateOnlineOrder, isPending: isPendingOnlineOrder } = useMutation({
    mutationKey: ['checkout/online'],
    mutationFn: onlineOrder,
    onSuccess: (res) => {
      location.href = res.session.url;
      toast.success('Redirecting you to our secure payment provider... Please wait.')
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const { register, handleSubmit, formState: {errors} } = useForm<TCheckout>({
    mode: 'onTouched',
    resolver: zodResolver(checkoutSchema)
  })
  const { data: orders, isLoading } = useQuery<IOrder[]>({
    queryKey: ['allorders', user?.id],
    queryFn: () => getUserOrders(user?.id as string),
    enabled: !!user?.id
  })
  const submitForm: SubmitHandler<TCheckout> = (data) => {
    if (payment === 'cash') {
      mutateCashOrder({cartId, formData: data});
    } else if (payment === 'online') {
      mutateOnlineOrder({cartId, formData: data})
    }
  }
  return {setPayment, payment, isPendingCashOrder, isPendingOnlineOrder, register, handleSubmit, errors, submitForm, orders, isLoading}
}
