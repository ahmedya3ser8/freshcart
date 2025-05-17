"use client"
import CategoryItem from "@components/freshCart/category-item/CategoryItem";
import useCategories from "@hooks/useCategories";
import { LuLoaderCircle } from "react-icons/lu";

const Categories = () => {
  const {data: categories, isLoading} = useCategories();
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  }
  return (
    <section className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories?.data.map((item) => (
          <CategoryItem key={item._id} img={item.image} name={item.name} />
        ))}
      </div>
    </section>
  )
}

export default Categories;
