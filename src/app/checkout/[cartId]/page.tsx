import React from "react";
import Checkout from "../checkout";
import { Metadata } from "next";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'Checkout'
}

const CheckoutPage = ({params}: {params: Promise<{cartId: string}>}) => {
  const { cartId } = React.use(params);  
  return (
    <ProtectedRoute>
      <Checkout cartId={cartId} />
    </ProtectedRoute>
  )
}

export default CheckoutPage;
