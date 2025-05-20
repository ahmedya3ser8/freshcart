import React from "react";
import ProductDetails from "../ProductDetails";
import { Metadata } from "next";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'Product Details'
} 

const ProductDetailsPage = ({ params }: { params: Promise<{productId: string}>}) => {
  const { productId } = React.use(params);
  return (
    <ProtectedRoute>
      <ProductDetails productId={productId} />
    </ProtectedRoute>
  )
}

export default ProductDetailsPage;
