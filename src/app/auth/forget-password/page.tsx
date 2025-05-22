import { Metadata } from "next";
import ForgetPassword from "./ForgetPassword";

export const metadata: Metadata = {
  title: 'forget password'
}

const ForgetPasswordPage = () => {
  return (
    <ForgetPassword />
  )
}

export default ForgetPasswordPage;
