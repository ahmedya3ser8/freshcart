import { Metadata } from "next";
import Products from "./products";

export const metadata: Metadata = {
  title: 'Products'
}

const ProductsPage = () => {
  return (
    <Products />
  )
}

export default ProductsPage;
