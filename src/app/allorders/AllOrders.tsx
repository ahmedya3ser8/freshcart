"use client"
import useOrders from "@hooks/useOrders";
import Image from "next/image";
import { LuLoaderCircle } from "react-icons/lu";

const AllOrders = () => {
  const { orders, isLoading } = useOrders('');
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  }
  return (
    <section className="py-6">
      <h2 className="text-xl lg:text-3xl mb-4">Orders Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {orders?.map((order) => (
          <div key={order.id} className="bg-white dark:bg-[#121212] rounded-md p-5">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-green-500 text-xl lg:text-2xl">Order ID: {order.id} </h4>
              <div className="flex gap-2">
                {order.isPaid ? <>
                  <span className="text-[#f97316] bg-[#fff7ed] p-2 rounded-md text-sm">Unpaid</span>
                </> : <>
                  <span className="text-[#22c55e] bg-[#f0fdf4] p-2 rounded-md text-sm">Paid</span>
                </>}
                <span className="text-[#0ea5e9] bg-[#f0f9ff] p-2 rounded-md text-sm">On Delivery</span>
              </div>
            </div>
            <div className="h-[250px] overflow-y-auto border border-[#D1D1D8]">
              {order.cartItems.map((product) => (
                <div key={product._id} className="product p-2 flex gap-2 border-b border-gray-300 last:border-b-0 py-4">
                  <div className="image w-[100px] h-[100px]">
                    <Image src={product.product.imageCover} alt="product-image" className="w-full h-full rounded-md object-cover" width={500} height={500} />
                  </div>
                  <div className="content flex flex-1 justify-between items-center">
                    <div className="">
                      <h3 className="text-xl text-green-500 mb-1">{product.product.title.split(' ', 2).join(' ')}</h3>
                      <span className="text-gray-300">DeFacto</span>
                    </div>
                    <div className="">
                      <span className="block text-xl text-green-500 mb-1"> {product.price} EGP</span>
                      <span className="text-gray-300">Qyt: {product.count} </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[60%_minmax(0,1fr)] gap-5 py-5">
              <ul className="bg-[#F9F9F9] dark:bg-[#121212] rounded-md p-4">
                <li className="mb-2 text-text font-medium">Mobile: <span className="text-gray-300"> {order.shippingAddress.phone} </span></li>
                <li className="mb-2 text-text font-medium">Address: <span className="text-gray-300">{order.shippingAddress.city}</span></li>
                <li className="mb-2 text-text font-medium">City: <span className="text-gray-300">{order.shippingAddress.city}</span></li>
                <li className="mb-2 text-text font-medium">Country: <span className="text-gray-300">Egypt</span></li>
                <li className="mb-2 text-text font-medium">Payment Method: <span className="text-gray-300">{order.paymentMethodType}</span></li>
              </ul>
              <ul className="bg-[#F9F9F9] dark:bg-[#121212] rounded-md p-4">
                <li className="flex justify-between items-center mb-3">
                  <span className="text-text">Subtotal</span>
                  <span className="text-gray-300"> {order.totalOrderPrice} EGP</span>
                </li>
                <li className="flex justify-between items-center mb-3">
                  <span className="text-text">Shipping</span>
                  <span className="text-gray-300"> {order.shippingPrice} EGP</span>
                </li>
                <li className="border-b border-[#D1D1D8] flex justify-between items-center mb-3 pb-4">
                  <span className="text-text">Tax</span>
                  <span className="text-gray-300"> {order.taxPrice} EGP</span>
                </li>
                <li className="flex justify-between items-center pb-4 text-text font-medium">
                  <span>Total</span>
                  <span>{order.totalOrderPrice} EGP</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AllOrders;
