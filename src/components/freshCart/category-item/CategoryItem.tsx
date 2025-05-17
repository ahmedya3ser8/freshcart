import Image from "next/image";

const CategoryItem = ({img, name}: {img: string, name: string}) => {
  return (
    <div className="border border-green-500 p-2 rounded-2xl overflow-hidden">
      <Image src={img} alt="category-slider" height={150} width={220} className="w-full h-[150px] object-contain" />
      <h3 className="text-green-600 text-xl text-center my-3 mx-2"> {name} </h3>
    </div>
  )
}

export default CategoryItem;
