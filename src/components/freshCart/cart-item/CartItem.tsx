"use client"
import useCart from "@hooks/useCart";
import { ICartProduct } from "@interfaces/icart";
import Image from "next/image";
import { FaStar, FaTrash } from "react-icons/fa6";
import { FiLoader, FiMinus, FiPlus } from "react-icons/fi";

const CartItem = ({ product, count, price }: ICartProduct) => {
  const { deletingId, updating, mutateRemoveItem, mutateUpdateQuantity } = useCart()
  return (
    <div key={product._id} className="cart_product flex items-center gap-4 border-b border-gray-300 py-5 first:pt-0 last:border-b-0" >
      <div className="product_image">
        <Image src={product.imageCover} alt="product-product" width={128} height={180} />
      </div>
      <div className="cart_product_body flex flex-1 justify-between">
        <div className="cart_product_caption">
          <h3 className="text-gray-500 dark:text-gray-200 text-sm mb-1"> {product.category.name} </h3>
          <h4 className="text-green-500 text-lg font-semibold"> {product.title.split(" ", 2).join(" ")} </h4>
          <div className="cart_product_rate flex items-center gap-1 bg-[#fafafa] dark:bg-[#121212] w-fit p-1">
            <span>{product.ratingsAverage}</span>
            <FaStar className="text-yellow-400" />
          </div>
        </div>
        <div className="cart_product_quantity">
          <span className="text-lg mb-3 block text-right"> {price} EGP </span>
          <div className="flex gap-2">
            <button onClick={() => mutateRemoveItem(product.id)} className="cart_product_btn py-2 px-3 border border-green-500 text-green-500 rounded-md">
              {deletingId === product.id ? (
                <FiLoader className="animate-spin" />
              ) : (
                <FaTrash />
              )}
            </button>
            <div className="cart_product_btns border border-green-500 p-2 w-[120px] rounded-md flex items-center justify-between">
              <span onClick={() =>  count > 1 && mutateUpdateQuantity({productId: product.id, count: count - 1})} className="cursor-pointer">
                {updating?.productId === product.id && updating.action === "minus" ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiMinus />
                )}
              </span>
              <span>{count}</span>
              <span onClick={() => mutateUpdateQuantity({productId: product.id, count: count + 1})} className="cursor-pointer">
                {updating?.productId === product.id && updating.action === "plus" ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <FiPlus />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem;
