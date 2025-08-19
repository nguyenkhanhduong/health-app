import { ChevronUp } from 'lucide-react'

export const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <button
      onClick={scrollToTop}
      className='fixed right-24 bottom-60 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-white transition-all duration-200 ease-in-out hover:scale-105 hover:border-gray-600 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none active:scale-95 active:bg-gray-100'
    >
      <ChevronUp
        size={28}
        strokeWidth={1}
        className='text-gray-400'
      />
    </button>
  )
}
