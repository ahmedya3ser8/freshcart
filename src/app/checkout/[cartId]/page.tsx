
const CheckoutPage = ({params}: {params: {cartId: string}}) => {
  console.log(params.cartId);
  return (
    <div>Checkout / {params.cartId}</div>
  )
}

export default CheckoutPage;
