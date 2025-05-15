import { zodResolver } from '@hookform/resolvers/zod';
import actAuthLogin from '@store/auth/act/actAuthLogin';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginSchema, TLogin } from '@validations/loginSchema';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function useLogin() {
  const dispatch = useAppDispatch();
  const {loading, token} = useAppSelector(state => state.auth);
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}, reset} = useForm<TLogin>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
  })
  const submitForm: SubmitHandler<TLogin> = (data) => {
    dispatch(actAuthLogin(data)).unwrap().then((res) => {
      if (res.message === 'success') {
        reset();
        router.push('/')
      }
    })
  }
  useEffect(() => {
    document.title = 'Login'
  }, [])
  return {loading, register, handleSubmit, errors, submitForm, token}
}
