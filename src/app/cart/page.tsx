import { Metadata } from "next";
import Cart from "./cart";

export const metadata: Metadata = {
  title: 'Cart'
}

const CartPage = () => {
  return (
    <Cart />
  );
};

export default CartPage;
