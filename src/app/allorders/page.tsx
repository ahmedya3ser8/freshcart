import { Metadata } from "next";
import AllOrders from "./AllOrders";
import ProtectedRoute from "@components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: 'All Orders'
}

const AllOrdersPage = () => {
  return (
    <ProtectedRoute>
      <AllOrders />
    </ProtectedRoute>
  )
}

export default AllOrdersPage;
