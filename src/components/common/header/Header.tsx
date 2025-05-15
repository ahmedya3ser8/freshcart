import Image from "next/image"
import Link from "next/link"
import logoImg from '@assets/images/freshcart-logo.svg'
import { FaFacebook, FaGithub, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export const Header = () => {
  return (
    <header className="py-4 bg-gray-100 fixed w-full z-[999]">
      <div className="container">
        <div className="flex items-center">
          <Link href="/" className="logo">
            <Image src={logoImg} alt="logo" width={200} height={40} />
          </Link>
          <nav className="flex justify-between items-center grow ml-5">
            <ul className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-400 p-2 text-lg font-semibold">Home</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 p-2 text-lg font-semibold">Products</Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 p-2 text-lg font-semibold">Categories</Link>
              </li>
              <li>
                <Link href="/brands" className="text-gray-400 p-2 text-lg font-semibold">Brands</Link>
              </li>
            </ul>
            <ul className="flex items-center space-x-1">
              <a href="https://github.com/ahmedya3ser8" target="_blank" className="text-gray-400 p-2 text-lg font-semibold">
                <FaGithub className="size-5" />
              </a>
              <a href="https://www.facebook.com/ahmedya3ser8" target="_blank" className="text-gray-400 p-2 text-lg font-semibold">
                <FaFacebook className="size-5" />
              </a>
              <a href="https://x.com/ahmed_ya3ser_8" target="_blank" className="text-gray-400 p-2 text-lg font-semibold">
                <FaXTwitter className="size-5" />
              </a>
              <a href="https://www.linkedin.com/in/ahmed-yasser-21382a267" target="_blank" className="text-gray-400 p-2 text-lg font-semibold">
                <FaLinkedin className="size-5" />
              </a>
              <li>
                <Link href="/auth/register" className="text-gray-400 p-2 text-lg font-semibold">Register</Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-400 p-2 text-lg font-semibold">Login</Link>
              </li>
              <li>
                <span className="text-gray-400 p-2 text-lg font-semibold">logout</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
