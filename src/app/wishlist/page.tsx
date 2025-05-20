import { Metadata } from "next";
import Wishlist from "./Wishlist";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'Wishlist'
}

const WishlistPage = () => {
  return (
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  )
}

export default WishlistPage;
