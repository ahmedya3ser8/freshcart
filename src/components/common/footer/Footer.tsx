import payImg from '@assets/images/pay.webp';
import googlePlayImg from '@assets/images/googlePlay.webp'
import appStoreImg from '@assets/images/appStore.webp'
import Image from 'next/image';

export const Footer = () => {
  return (
    <footer className="py-5 bg-gray-100 dark:bg-[#121212]">
      <div className="container">
        <h2 className="text-2xl mb-2">Welcome <span className="text-green-500">(user)</span> Get the FreshCart app</h2>
        <p className="text-gray-400 mb-4">we will send you a link , open it on your phone to download the app</p>
        <div className="flex gap-3">
          <input type="text" className="w-full p-2 outline-none border border-green-500 rounded-md" />
          <button className="w-[130px] p-2 bg-green-500 text-white rounded-md">Share App</button>
        </div>
        <div className="footer_bottom flex justify-between items-center">
          <div className="flex gap-2">
            <h3 className="text-gray-400 text-lg">Payment Partners</h3>
            <Image src={payImg} alt='payImg' width={100} height={100} />
          </div>
          <div className="flex items-center gap-3">
            <h4 className='text-gray-400'>Get deliveries with FreshCart</h4>
            <Image src={googlePlayImg} alt='payImg' width={100} height={100} className='w-[100px]' />
            <Image src={appStoreImg} alt='payImg' width={100} height={100} className='w-[100px]' />
          </div>
        </div>
        <p className="mt-4 text-center">Copyright © All Right Reserved <span className="text-green-500">Ahmed Yasser</span></p>
      </div>
    </footer>
  )
}
