import React from "react";
import ProductDetails from "../ProductDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Product Details'
} 

const ProductDetailsPage = ({ params }: { params: Promise<{productId: string}>}) => {
  const { productId } = React.use(params);
  return (
    <ProductDetails productId={productId} />
  )
}

export default ProductDetailsPage;
