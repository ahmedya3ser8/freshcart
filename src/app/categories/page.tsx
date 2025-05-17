import { Metadata } from "next"
import Categories from "./categories";

export const metadata: Metadata = {
  title: 'Categories'
}

function CategoriesPage() {
  return (
    <Categories />
  )
}

export default CategoriesPage;

