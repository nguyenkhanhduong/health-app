import type { FC } from 'react'

import MyRecord1 from '@/assets/images/MyRecommend-1.jpg'
import MyRecord2 from '@/assets/images/MyRecommend-2.jpg'
import MyRecord3 from '@/assets/images/MyRecommend-3.jpg'

const categories = [
  {
    title: 'BODY RECORD',
    subtitle: '自分のカラダの記録',
    image: MyRecord1,
  },
  {
    title: 'MY EXERCISE',
    subtitle: '自分の運動の記録',
    image: MyRecord2,
  },
  {
    title: 'MY DIARY',
    subtitle: '自分の日記',
    image: MyRecord3,
  },
]

export const RecordCategories: FC = () => (
  <section className='app-container grid grid-cols-1 justify-items-center gap-12 pt-14 md:grid-cols-3'>
    {categories.map(category => (
      <div
        key={category.title}
        className='border-primary-300 relative h-72 w-72 cursor-pointer overflow-hidden border-24'
      >
        <img
          src={category.image}
          alt={category.title}
          className='absolute inset-0 h-full w-full object-cover grayscale'
          style={{
            objectPosition:
              category.title === 'BODY RECORD'
                ? '2% 0%'
                : category.title === 'MY EXERCISE'
                  ? '30% 0%'
                  : '50% 50%',
          }}
        />

        <div
          className='absolute inset-0 z-5 bg-black'
          style={{
            opacity: 0.6,
            mixBlendMode: 'multiply',
          }}
        />

        <div className='absolute z-10 flex h-full w-full flex-col items-center justify-center gap-[11px] px-6 text-center'>
          <h3 className='text-primary-300 font-inter text-[25px] tracking-[0.13px]'>
            {category.title}
          </h3>
          <div className='bg-primary-400 h-5 w-40 px-4 text-sm font-light tracking-[0px] text-white'>
            {category.subtitle}
          </div>
        </div>
      </div>
    ))}
  </section>
)
