"use client"
import useProducts from "@hooks/useProducts";
import useWishlist from "@hooks/useWishlist";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaTrash } from "react-icons/fa6";
import { FiLoader, FiShoppingCart } from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";

const Wishlist = () => {
  const { mutate: addToCart, productId } = useProducts(1);
  const {removingId, data, isLoading, mutateRemoveProductFromWishlsit} = useWishlist();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LuLoaderCircle className="animate-spin size-10" />
      </div>
    );
  }
  if (!isLoading && data?.count === 0) {
    return (
      <div className="flex items-center flex-col justify-center min-h-[50vh] text-gray-500 dark:text-white">
        <p>Your wishlist is empty.</p>
        <Link href='/products' className="text-green-500 underline">Go to Products</Link>
      </div>
    );
  }
  return (
    <section className="py-6">
      <h2 className="text-green-500 text-3xl font-medium">
        Wishlist 
        <span className="text-gray-700 dark:text-white text-lg ms-1"> {data?.count} items </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {data?.data.map((product) => (
          <div key={product.id} className="product flex items-center gap-4 bg-[#f9f9f9] dark:bg-[#121212] rounded-md p-4">
            <div className="product_image">
              <Image src={product.imageCover} alt="product-image" width={128} height={180} />
            </div>
            <div className="cart_product_body flex items-center flex-1 justify-between">
              <div className="cart_product_content">
                <h3 className="text-gray-500 dark:text-gray-200 text-sm mb-1">{product.category.name}</h3>
                <h4 className="text-green-500 text-lg font-semibold">{product.title.split(' ', 2).join(' ')}</h4>
                <div className="product_content_rate flex items-center gap-1 bg-[#fafafa] dark:bg-[#121212] w-fit p-1">
                  <span>{product.ratingsAverage}</span>
                  <FaStar className="text-yellow-400" />
                </div>
              </div>
              <div className="cart_product_quantity">
                <span className="text-lg mb-3 block text-right"> {product.price} EGP </span>
                <div className="flex gap-2">
                  <button onClick={() => mutateRemoveProductFromWishlsit(product.id)} className="cart_product_btn py-2 px-3 border border-green-500 text-green-500 rounded-md">
                    { removingId === product.id ? <FiLoader className="animate-spin" /> : <FaTrash />  }
                  </button>
                  <button onClick={() => addToCart(product.id)} className="flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-md w-[140px]">
                    { productId === product.id ? <FiLoader className="animate-spin size-6" /> : <> <FiShoppingCart /> add to cart </> }
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Wishlist;
