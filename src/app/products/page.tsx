import { Metadata } from "next";
import Products from "./products";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'Products'
}

const ProductsPage = () => {
  return (
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  )
}

export default ProductsPage;
