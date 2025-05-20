import { Metadata } from "next";
import Cart from "./cart";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'Cart'
}

const CartPage = () => {
  return (
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  );
};

export default CartPage;
