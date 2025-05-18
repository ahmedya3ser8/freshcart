import React from "react";
import Checkout from "../checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Checkout'
}

const CheckoutPage = ({params}: {params: Promise<{cartId: string}>}) => {
  const { cartId } = React.use(params);  
  return (
    <Checkout cartId={cartId} />
  )
}

export default CheckoutPage;
