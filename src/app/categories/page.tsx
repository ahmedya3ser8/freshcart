import { Metadata } from "next";
import Categories from "./categories";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'Categories'
}

function CategoriesPage() {
  return (
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  )
}

export default CategoriesPage;

