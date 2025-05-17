"use client"
import ProductItem from "@components/freshCart/product-item/ProductItem";
import useProducts from "@hooks/useProducts";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchProducts, setSearchProducts] = useState('');
  const {data: products, isLoading} = useProducts(currentPage);
  const totalPages = products?.metadata.numberOfPages ?? 1;
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const filteredProducts = products?.data.filter((product) => product.title.toLowerCase().includes(searchProducts.toLowerCase()))
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  }
  return (
    <section className="py-6">
      <input type="search" value={searchProducts} onChange={(e) => setSearchProducts(e.target.value)} placeholder="search by title..." className="block w-[80%] mx-auto p-2 outline-none border border-gray-400 rounded-md" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
        {filteredProducts!.length > 0 ? filteredProducts?.map((product) => (
          <ProductItem key={product.id} {...product} />
        )) : <div className="col-span-5 text-center text-xl">No products found matching your filters.</div>}
      </div>
      {/* pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 border rounded ${ pageNum === currentPage ? 'bg-green-500 text-white' : '' }`} >
              {pageNum}
            </button>
          );
        })}
      </div>
      {/* pagination */}
    </section>
  )
}

export default Products;