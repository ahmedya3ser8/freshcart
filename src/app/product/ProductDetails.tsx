"use client"
import useProducts from "@hooks/useProducts";
import { IProduct } from "@interfaces/iproduct";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";

type TResponse = {
  data: IProduct
}

const getSpecificProduct = async (productId: string) => {
  try {
    const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message || error.message;
    } else {
      return 'an unexpected error'
    }
  }
}

const ProductDetails = ({ productId }: {productId: string}) => {
  const { mutate, isPending } = useProducts(1, productId)
  const { data: product, isLoading } = useQuery<TResponse>({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSpecificProduct(productId),
    staleTime: 5 * 60 * 1000
  })
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  }
  return (
    <section className="py-6">
      <div className="product flex items-center gap-5">
        <div className="product_image">
          <Image src={product?.data.imageCover as string} alt="product-details" width={300} height={300} className="w-full h-[350px]" />
        </div>
        <div className="product_body flex-1">
          <h3 className="text-[21px] mb-2">{product?.data.title}</h3>
          <p className="text-gray-400 mb-2">{product?.data.description}</p>
          <h4 className="font-semibold">{product?.data.category?.name}</h4>
          <div className="product_body_price flex justify-between items-center my-3">
            <span>{product?.data.price} EGP</span>
            <div className="product_body_price_rate flex items-center gap-1 bg-[#fafafa] p-1 rounded-full">
              <FaStar className="text-yellow-400" />
              <span>{product?.data.ratingsAverage}</span>
            </div>
          </div>
          <button onClick={() => mutate()} className="w-full p-2 bg-green-500 text-white rounded-md">
            {isPending ? <FiLoader className="animate-spin mx-auto size-6" /> : 'add to cart'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;
