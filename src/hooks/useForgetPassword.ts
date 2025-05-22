import axios, { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { forgetPasswordSchema, resetCodeSchema, resetPasswordSchema, TForgetPassword, TResetCode, TResetPassword } from "@validations/forgetPasswordSchema";

const forgetPasswordAPI =  async (data: {email: string}) => {
  try {
    const res = await axios.post(`/api/v1/auth/forgotPasswords`, data);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

const resetCodeAPI =  async (data: {resetCode: string}) => {
  try {
    const res = await axios.post(`/api/v1/auth/verifyResetCode`, data);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

const resetPasswordAPI =  async (data: {email: string, newPassword: string}) => {
  try {
    const res = await axios.put(`/api/v1/auth/resetPassword`, data);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message || error.message);
    } else {
      throw new Error('an unexpected error')
    }
  }
}

export default function useForgetPassword() {
  const [steps, setSteps] = useState(1);
  const router = useRouter();
  const { register: registerForgetPassword, handleSubmit: handleSubmitForgetPassword, formState: {errors: errorForgetPassword}, reset: resetForgetPassword} = useForm<TForgetPassword>({
    mode: 'onTouched',
    resolver: zodResolver(forgetPasswordSchema)
  })
  const { register: registerResetCode, handleSubmit: handleSubmitResetCode, formState: {errors: errorResetCode}, reset: resetCode} = useForm<TResetCode>({
    mode: 'onTouched',
    resolver: zodResolver(resetCodeSchema)
  })
  const { register: registerResetPassword, handleSubmit: handleSubmitResetPassword, formState: {errors: errorResetPassword}, reset: resetResetPassword, setValue} = useForm<TResetPassword>({
    mode: 'onTouched',
    resolver: zodResolver(resetPasswordSchema)
  })
  const { mutate: mutateForgetPasswordHandler, isPending: isPendingForgetPassword } = useMutation({
    mutationKey: ['forgetPassword'],
    mutationFn: forgetPasswordAPI,
    onMutate: (data) => {
      setValue('email', data.email)
    },
    onSuccess: (res) => {
      toast.success(res.message);
      setSteps(2);
      resetForgetPassword();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const { mutate: mutateResetCodeHandler, isPending: isPendingResetCode } = useMutation({
    mutationKey: ['resetCode'],
    mutationFn: resetCodeAPI,
    onSuccess: () => {
      toast.success('Verification successful');
      setSteps(3);
      resetCode();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const { mutate: mutateResetPasswordHandler, isPending: isPendingResetPassword } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      toast.success('Your password has been reset successfully')
      router.push('/auth/login');
      resetResetPassword();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    }
  })
  const submitForgetPassword: SubmitHandler<TForgetPassword> = (data) => {
    mutateForgetPasswordHandler(data);
  }
  const submitResetCode: SubmitHandler<TResetCode> = (data) => {
    mutateResetCodeHandler(data);
  }
  const submitResetPassword: SubmitHandler<TResetPassword> = (data) => {
    mutateResetPasswordHandler(data);
  }
  return {steps,submitForgetPassword,submitResetCode,submitResetPassword, isPendingForgetPassword,isPendingResetCode,isPendingResetPassword,registerForgetPassword,handleSubmitForgetPassword, errorForgetPassword,registerResetCode,handleSubmitResetCode,errorResetCode,registerResetPassword,handleSubmitResetPassword,errorResetPassword}
}
