"use client"
import Input from "@components/forms/Input";
import useForgetPassword from "@hooks/useForgetPassword";
import { LuLoader } from "react-icons/lu";

const ForgetPassword = () => {
  const {steps,submitForgetPassword,submitResetCode,submitResetPassword, isPendingForgetPassword,isPendingResetCode,isPendingResetPassword,registerForgetPassword,handleSubmitForgetPassword, errorForgetPassword,registerResetCode,handleSubmitResetCode,errorResetCode,registerResetPassword,handleSubmitResetPassword,errorResetPassword} = useForgetPassword();
  const renderForm = () => {
    switch(steps) {
      case 1 :
        return <>
          <form onSubmit={handleSubmitForgetPassword(submitForgetPassword)} className="w-full md:w-1/2 mx-auto border border-green-500 rounded-md p-4">
            <Input label="Email:" type="email" name="email" register={registerForgetPassword} error={errorForgetPassword.email?.message as string} />
            <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
              {isPendingForgetPassword ? <LuLoader className="animate-spin" /> : 'Send Code'}
            </button>
          </form>
        </>
      case 2 :
        return <>
          <form onSubmit={handleSubmitResetCode(submitResetCode)} className="w-full md:w-1/2 mx-auto border border-green-500 rounded-md p-4">
            <Input label="ResetCode:" name="resetCode" register={registerResetCode} error={errorResetCode.resetCode?.message as string} />
            <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
              {isPendingResetCode ? <LuLoader className="animate-spin" /> : 'Verify Code'}
            </button>
          </form>
        </>
      case 3 :
        return <>
          <form onSubmit={handleSubmitResetPassword(submitResetPassword)} className="w-full md:w-1/2 mx-auto border border-green-500 rounded-md p-4">
            <Input readOnly={true} label="Email:" type="email" name="email" register={registerResetPassword} error={errorResetPassword.email?.message as string} />
            <Input label="NewPassword:" type="password" name="newPassword" register={registerResetPassword} error={errorResetPassword.newPassword?.message as string} />
            <button type="submit" className="p-2 bg-green-500 text-white rounded-md">
              {isPendingResetPassword ? <LuLoader className="animate-spin" /> : 'Reset Password'}
            </button>
          </form>
        </>
      default:
        return 'step 1'
    }
  }
  return (
    <section className='py-6'>
      <h2 className="text-2xl font-semibold text-green-500 mb-3 text-center">Forget Password</h2>
      {renderForm()}
    </section>
  )
}

export default ForgetPassword;
