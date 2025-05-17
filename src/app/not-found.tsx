"use client"
import notFound from '@assets/lottieFiles/notFound.json'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const Lottie = dynamic(() => import('lottie-react'), {ssr: false})

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-[500px]">
          <Lottie animationData={notFound} />
        </div>
        <Link href='/' className="text-primary underline" replace={true}>
          How about going back to safety?
        </Link>
      </div>
    </>
  )
}
