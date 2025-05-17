"use client"
import { IProduct } from "@interfaces/iproduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import toast from 'react-hot-toast';
import { FaHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type TResponse = {
  message: string,
  numOfCartItems: number
}

const addProductToCart = async (productId: string) => {
  try {
    const res = await axios.post<TResponse>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
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

const ProductItem = ({ id, imageCover, title, price, category, ratingsAverage } : IProduct) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation<TResponse>({
    mutationKey: ['addProductToCart', id],
    mutationFn: () => addProductToCart(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success(data.message);
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  return (
    <div className="product p-3 border border-green-500 rounded-md">
      <div className="product_image relative">
        <Image onClick={() => router.push(`/product/${id}`)} src={imageCover} alt="product-img" width={200} height={150} className="w-full h-[150px] object-contain cursor-pointer" />
        <span className="absolute top-0 right-0">
          <FaHeart className="size-5" />
        </span>
      </div>
      <div className="product_body mt-2">
        <h3 className="text-green-500 font-semibold">{category.name}</h3>
        <h4 className="text-sm">{title.split(' ', 2).join(' ')}</h4>
        <div className="product_price flex justify-between items-center my-2">
          <span>{price} EGP</span>
          <div className="flex items-center gap-[2px]"><FaStar className="text-yellow-400" /> {ratingsAverage}</div>
        </div>
        <button onClick={() => mutate()} className="w-full p-2 bg-green-500 text-white rounded-md">
          {isPending ? <FiLoader  className="animate-spin mx-auto size-6" /> : 'add to cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductItem;
