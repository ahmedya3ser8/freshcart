import { Metadata } from "next";
import AllOrders from "./AllOrders";

export const metadata: Metadata = {
  title: 'All Orders'
}

const AllOrdersPage = () => {
  return (
    <AllOrders />
  )
}

export default AllOrdersPage;
