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
import { useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
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
        <div className="flex items-center justify-between">
          <Link href="/" className="logo">
            <Image src={logoImg} alt="logo" width={200} height={40} />
          </Link>
          <div className="flex gap-2 flex-1 justify-end dark:bg-[#121212]">
            <button onClick={() => setIsOpen(!isOpen)} className="block lg:hidden dark:text-gray-100">
              <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
            </button>
            <nav className={`lg:flex flex-col lg:flex-row ${token !== null ? 'justify-between' : 'justify-end'} ${isOpen ? 'block' : 'hidden'} fixed lg:static top-[70px] bg-gray-100 left-0 right-0 gap-4 items-start lg:items-center p-4 lg:p-0 lg:grow lg:ml-5`}>
              {
                token && <>
                  <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-2">
                    <li>
                      <Link href="/" onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/' ? 'text-[#374151]' : ''}`}>Home</Link>
                    </li>
                    <li>
                      <Link href="/products" onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/products' ? 'text-[#374151]' : ''}`}>Products</Link>
                    </li>
                    <li>
                      <Link href="/categories" onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/categories' ? 'text-[#374151]' : ''}`}>Categories</Link>
                    </li>
                    <li>
                      <Link href="/allorders" onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/allorders' ? 'text-[#374151]' : ''}`}>All Orders</Link>
                    </li>
                  </ul>
                </>
              }
              <ul className="flex items-center mb-3 lg:mb-0">
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
                    <Link href='/cart' onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold relative ${pathName === '/cart' ? 'text-[#374151]' : ''}`}>
                      <FaCartShopping className="size-5" />
                      <span className="absolute -top-[3px] size-5 rounded-full text-center leading-[20px] border border-white text-[15px] bg-green-500 text-white right-0">{cartProducts?.numOfCartItems || 0}</span>
                    </Link>
                    <Link href='/wishlist' onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold relative ${pathName === '/wishlist' ? 'text-[#374151]' : ''}`}>
                      <FaHeart className="size-5" />
                      <span className="absolute -top-[3px] size-5 rounded-full text-center leading-[20px] border border-white text-[15px] bg-green-500 text-white right-0">{wishlistProducts?.count || 0}</span>
                    </Link>
                    <li onClick={() => handleLogout()} className="text-gray-400 dark:text-white p-2 text-lg font-semibold cursor-pointer">
                      <MdLogout className="size-6" /> 
                    </li>
                  </> : <>
                    <li>
                      <Link href="/auth/register" onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/auth/register' ? 'text-[#374151]' : ''}`}>Register</Link>
                    </li>
                    <li>
                      <Link href="/auth/login" onClick={() => setIsOpen(!isOpen)} className={`text-gray-400 dark:text-white p-2 text-lg font-semibold ${pathName === '/auth/login' ? 'text-[#374151]' : ''}`}>Login</Link>
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
      </div>
    </header>
  )
}
