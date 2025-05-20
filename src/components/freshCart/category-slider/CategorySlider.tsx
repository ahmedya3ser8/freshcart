"use client"
import useCategories from "@hooks/useCategories";
import { LuLoaderCircle } from "react-icons/lu";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryItem from "../category-item/CategoryItem";
import 'swiper/css';

const CategorySlider = () => {
  const {data: categories, isLoading} = useCategories();
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <LuLoaderCircle className="animate-spin size-10" />
    </div>
  }
  return (
    <section className="py-6">
      <h2 className="text-green-600 mb-4 font-bold text-2xl md:text-3xl">Popular Categories</h2>
        <Swiper          
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          >
            {categories?.data.map((item) => (
              <SwiperSlide key={item._id}>
                <CategoryItem img={item.image} name={item.name} />
              </SwiperSlide>
            ))}
        </Swiper>
    </section>
  )
}

export default CategorySlider;
