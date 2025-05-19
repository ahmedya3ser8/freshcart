"use client"
import useProducts from "@hooks/useProducts";
import useWishlist from "@hooks/useWishlist";
import { IProduct } from "@interfaces/iproduct";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";

const ProductItem = ({ id, imageCover, title, price, category, ratingsAverage } : IProduct) => {
  const router = useRouter();
  const { isPending, mutate: addToCart } = useProducts(1, id);
  const { mutateAddProductToWishlsit, mutateRemoveProductFromWishlsit, isInWishlist, addingId, removingId } = useWishlist();
  return (
    <div className="product p-3 border border-green-500 rounded-md">
      <div className="product_image relative">
        <Image onClick={() => router.push(`/product/${id}`)} src={imageCover} alt="product-img" width={200} height={150} className="w-full h-[150px] object-contain cursor-pointer" />
        <span className="absolute top-0 right-0 cursor-pointer">
          { isInWishlist(id) ? ( removingId == id ? <FiLoader className="animate-spin" /> : <FaHeart onClick={() => mutateRemoveProductFromWishlsit(id)} className="size-5 text-red-500" />) : (addingId == id ? <FiLoader className="animate-spin" /> : <FaHeart onClick={() => mutateAddProductToWishlsit(id)} className="size-5" />) }
        </span>
      </div>
      <div className="product_body mt-2">
        <h3 className="text-green-500 font-semibold">{category.name}</h3>
        <h4 className="text-sm">{title.split(' ', 2).join(' ')}</h4>
        <div className="product_price flex justify-between items-center my-2">
          <span>{price} EGP</span>
          <div className="flex items-center gap-[2px]"><FaStar className="text-yellow-400" /> {ratingsAverage}</div>
        </div>
        <button onClick={() => addToCart(id)} className="w-full p-2 bg-green-500 text-white rounded-md">
          {isPending ? <FiLoader  className="animate-spin mx-auto size-6" /> : 'add to cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductItem;
