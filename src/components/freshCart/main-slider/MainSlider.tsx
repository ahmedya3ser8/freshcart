"use client"
import Image from "next/image";
import sliderImg1 from '@assets/images/slider1.avif';
import sliderImg2 from '@assets/images/slider2.avif';
import sliderImg3 from '@assets/images/slider3.avif';
import sliderImg4 from '@assets/images/slider4.avif';
import sliderImg5 from '@assets/images/slider5.avif';
import sliderImg6 from '@assets/images/grocery-banner-2.jpeg';
import sliderImg7 from '@assets/images/grocery-banner.png';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-fade';

const imagesList = [sliderImg1, sliderImg2, sliderImg3, sliderImg4, sliderImg5]

const MainSlider = () => {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[70%_minmax(0,1fr)] rounded-2xl overflow-hidden">
        <Swiper className="w-full" 
          spaceBetween={50} loop={true}
          modules={[Autoplay, EffectFade]} 
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
        >
          {imagesList.map((item, index) => (
            <SwiperSlide key={index}>
              <Image src={item} alt="grocery-banner" height={400} className="w-full h-[400px]" priority={index === 0} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="grid grid-cols-2 md:block">
          <Image src={sliderImg7} alt="grocery-banner" height={200} className="w-full h-[200px]" />
          <Image src={sliderImg6} alt="grocery-banner" height={200} className="w-full h-[200px]" />
        </div>
      </div>
    </section>
  )
}

export default MainSlider