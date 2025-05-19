import { Metadata } from "next";
import Wishlist from "./Wishlist";

export const metadata: Metadata = {
  title: 'Wishlist'
}

const WishlistPage = () => {
  return (
    <Wishlist />
  )
}

export default WishlistPage;
