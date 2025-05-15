import { zodResolver } from '@hookform/resolvers/zod';
import actAuthRegister from '@store/auth/act/actAuthRegister';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { registerSchema, TRegister } from '@validations/registerSchema';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function useRegister() {
  const dispatch = useAppDispatch();
  const { loading, token } = useAppSelector(state => state.auth);
  const router = useRouter();
  const {register, handleSubmit, formState: {errors}, reset} = useForm<TRegister>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema)
  });
  const submitForm: SubmitHandler<TRegister> = (data) => {
    dispatch(actAuthRegister(data)).unwrap().then((res) => {
      if (res.message === 'success') {
        reset();
        router.push('/auth/login')
      }
    })
  }
  useEffect(() => {
    document.title = 'Register'
  }, [])
  return {loading, register, handleSubmit, errors, submitForm, token}
}
