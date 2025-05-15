import { IProduct } from "@interfaces/iproduct";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const ProductItem = ({ imageCover, title, price, category, ratingsAverage } : IProduct) => {
  return (
    <div className="product p-3 border border-green-500 rounded-md">
      <div className="product_image">
        <Image src={imageCover} alt="product-img" width={200} height={150} className="w-full h-[150px] object-contain" priority />
      </div>
      <div className="product_body mt-2">
        <h3 className="text-green-500 font-semibold">{category.name}</h3>
        <h4 className="text-sm">{title.split(' ', 2).join(' ')}</h4>
        <div className="product_price flex justify-between items-center my-2">
          <span>{price} EGP</span>
          <div className="flex items-center gap-[2px]"><FaStar className="text-yellow-400" /> {ratingsAverage}</div>
        </div>
        <button className="w-full p-2 bg-green-500 text-white rounded-md">add to cart</button>
      </div>
    </div>
  )
}

export default ProductItem;
