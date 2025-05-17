import React from "react";

const CheckoutPage = ({params}: {params: Promise<{cartId: string}>}) => {
  const { cartId } = React.use(params);
  return (
    <div>Checkout / {cartId}</div>
  )
}

export default CheckoutPage;
