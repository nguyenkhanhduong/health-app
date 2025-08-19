import type { FC } from 'react'

interface MealCardProps {
  date: string
  mealType: string
  imageUrl: string
  onClick?: () => void
}

export const MealCard: FC<MealCardProps> = ({ date, mealType, imageUrl, onClick }) => (
  <article
    className='group relative h-[234px] cursor-pointer overflow-hidden'
    onClick={onClick}
  >
    <img
      src={imageUrl}
      className='h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
      alt={`${mealType} meal`}
    />
    <div className='font-inter bg-primary-300 absolute bottom-0 left-0 flex h-8 w-30 items-center pl-2 text-[15px] text-white'>
      {date}.{mealType}
    </div>
  </article>
)
