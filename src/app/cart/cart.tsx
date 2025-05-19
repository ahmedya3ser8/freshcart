"use client"
import useCart from "@hooks/useCart";
import { LuLoaderCircle } from "react-icons/lu";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import CartItem from "@components/freshCart/cart-item/CartItem";
import { formatDate } from "@utils/formatedDate";

const Cart = () => {
  const { isLoading, mutateClearCart, isPending, cartProducts } = useCart()
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LuLoaderCircle className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <section className="py-6">
      <div className="cart_header flex justify-between items-center">
        <h2 className="text-green-500 text-3xl font-medium">
          Cart
          <span className="text-gray-700 dark:text-white text-lg ms-1">
            {cartProducts?.numOfCartItems} items
          </span>
        </h2>
        <button onClick={() => mutateClearCart()} className="p-2 bg-green-500 text-white rounded-md flex items-center gap-1">
          {isPending ? <FiLoader className="animate-spin" /> : <> Remove All <FaTrash /> </>}
        </button>
      </div>
      <div className="cart_body flex gap-4 mt-4">
        <div className="w-full bg-gray-100 dark:bg-[#121212] p-4 rounded-md">
          {cartProducts?.data.products && cartProducts?.data.products.length > 0 ? cartProducts?.data.products.map((product) => (
            <CartItem key={product.product.id} {...product} />
          )) : <div className="flex justify-center items-center flex-col h-full">
            <p>Your cart is empty. Start adding some amazing products!</p>
            <Link href='/products' className="text-green-500 underline">Go to Products</Link>
          </div>}
        </div>
        <div className="w-[450px] bg-gray-100 dark:bg-[#121212] p-4 rounded-md h-fit">
          <h2 className="mb-4 text-2xl text-gray-700 dark:text-white">Order Summary</h2>
          <ul className="border-b border-gray-300">
            <li className="flex justify-between mb-4">
              <span>Price</span>
              <span>{cartProducts?.data.totalCartPrice} EGP</span>
            </li>
            <li className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </li>
            <li className="flex justify-between mb-4">
              <span>Coupon Applied</span>
              <span>0.00EGP</span>
            </li>
          </ul>
          <ul className="pt-4">
            <li className="flex justify-between mb-4">
              <span>Total</span>
              <span>{cartProducts?.data.totalCartPrice} EGP</span>
            </li>
            <li className="flex justify-between mb-4">
              <span>Estimated Delivery by</span>
              {cartProducts?.data.updatedAt && (
                <span> {formatDate(cartProducts?.data.updatedAt)} </span>
              )}
            </li>
            <li className="flex justify-between gap-2 mb-4">
              <input type="text" placeholder="Coupon Code" className="w-full p-1 outline-none border border-gray-100" />
              <button className="p-2 bg-green-500 text-white rounded-md"> Apply </button>
            </li>
            <Link href={`/checkout/${cartProducts?.cartId}`} className="block w-full p-2 bg-green-500 text-white text-center rounded-lg">
              Proceed To Checkout
            </Link>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Cart;
