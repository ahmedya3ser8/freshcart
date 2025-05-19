"use client"
import logoImg from '@assets/images/freshcart-logo.svg';
import useCart from "@hooks/useCart";
import useWishlist from "@hooks/useWishlist";
import { logout, setToken } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useTheme } from 'next-themes';
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaCartShopping, FaFacebook, FaGithub, FaHeart, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { LuMoon, LuSun } from "react-icons/lu";
import { MdLogout } from "react-icons/md";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  const { cartProducts } = useCart();
  const { data: wishlistProducts } = useWishlist();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const handleLogout = () => {
    router.push('/auth/login');
    dispatch(logout());
  }
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch])
  return (
    <header className="py-4 bg-gray-100 dark:bg-[#121212] fixed w-full z-[999]">
      <div className="container">
        <div className="flex items-center">
          <Link href="/" className="logo">
            <Image src={logoImg} alt="logo" width={200} height={40} />
          </Link>
          <nav className={`flex ${token !== null ? 'justify-between' : 'justify-end'} items-center grow ml-5`}>
            {
              token && <>
                <ul className="flex items-center space-x-2">
                  <li>
                    <Link href="/" className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/' ? 'text-[#374151]' : ''}`}>Home</Link>
                  </li>
                  <li>
                    <Link href="/products" className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/products' ? 'text-[#374151]' : ''}`}>Products</Link>
                  </li>
                  <li>
                    <Link href="/categories" className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/categories' ? 'text-[#374151]' : ''}`}>Categories</Link>
                  </li>
                  <li>
                    <Link href="/allorders" className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/allorders' ? 'text-[#374151]' : ''}`}>All Orders</Link>
                  </li>
                </ul>
              </>
            }
            <ul className="flex items-center">
              <a href="https://github.com/ahmedya3ser8" target="_blank" className="text-gray-400 dark:text-white p-2 text-lg font-semibold">
                <FaGithub className="size-5" />
              </a>
              <a href="https://www.facebook.com/ahmedya3ser8" target="_blank" className="text-gray-400 dark:text-white p-2 text-lg font-semibold">
                <FaFacebook className="size-5" />
              </a>
              <a href="https://x.com/ahmed_ya3ser_8" target="_blank" className="text-gray-400 dark:text-white p-2 text-lg font-semibold">
                <FaXTwitter className="size-5" />
              </a>
              <a href="https://www.linkedin.com/in/ahmed-yasser-21382a267" target="_blank" className="text-gray-400 dark:text-white p-2 text-lg font-semibold">
                <FaLinkedin className="size-5" />
              </a>
              {
                token !== null ? <>
                  <Link href='/cart' className={`text-gray-400 dark:text-white p-2 text-lg font-semibold relative ${pathName === '/cart' ? 'text-[#374151]' : ''}`}>
                    <FaCartShopping className="size-5" />
                    <span className="absolute -top-[3px] size-5 rounded-full text-center leading-[20px] border border-white text-[15px] bg-green-500 text-white right-0">{cartProducts?.numOfCartItems}</span>
                  </Link>
                  <Link href='/wishlist' className={`text-gray-400 dark:text-white p-2 text-lg font-semibold relative ${pathName === '/wishlist' ? 'text-[#374151]' : ''}`}>
                    <FaHeart className="size-5" />
                    <span className="absolute -top-[3px] size-5 rounded-full text-center leading-[20px] border border-white text-[15px] bg-green-500 text-white right-0">{wishlistProducts?.count}</span>
                  </Link>
                  <li onClick={() => handleLogout()} className="text-gray-400 dark:text-white p-2 text-lg font-semibold cursor-pointer">
                    <MdLogout className="size-6" /> 
                  </li>
                </> : <>
                  <li>
                    <Link href="/auth/register" className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/auth/register' ? 'text-[#374151]' : ''}`}>Register</Link>
                  </li>
                  <li>
                    <Link href="/auth/login" className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/auth/login' ? 'text-[#374151]' : ''}`}>Login</Link>
                  </li>
                </>
              }
            </ul>
          </nav>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            { theme === 'dark' ? <LuSun className="size-6" /> : <LuMoon className="size-6" /> }
          </button>
        </div>
      </div>
    </header>
  )
}
