"use client"
import CategorySlider from "@components/freshCart/category-slider/CategorySlider";
import MainSlider from "@components/freshCart/main-slider/MainSlider";
import ProductItem from "@components/freshCart/product-item/ProductItem";
import useProducts from "@hooks/useProducts";
import { LuLoaderCircle } from "react-icons/lu";

export default function Home() {
  const {products, isLoading} = useProducts(1);
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  }
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <section className="py-6">
        <h2 className="text-green-600 mb-4 font-bold text-3xl">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products?.data.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  );
}
