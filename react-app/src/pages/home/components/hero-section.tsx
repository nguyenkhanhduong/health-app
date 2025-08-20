import Circle from '@/assets/images/circle-light.png'
import MainPhoto from '@/assets/images/main_photo.png'

import { YearlyLineChart } from '@/pages/home/components/yearly-line-chart'

export const HeroSection = () => (
  <section className='flex h-[312px] flex-wrap'>
    <SectionLeft />
    <YearlyLineChart />
  </section>
)

const SectionLeft = () => (
  <div className='relative'>
    <img
      src={MainPhoto}
      alt='Main photo'
      className='lg:w-135'
    />
    <div className='absolute top-0 flex h-full w-full items-center justify-center'>
      <div className='text-shadow-orange font-inter relative flex size-[181px] items-center justify-center gap-1 font-normal text-white'>
        <img
          src={Circle}
          className='absolute h-full leading-[30px] w-full'
        />
        <span className='text-[18px]'>05/21</span>
        <span className='text-[25px]'>75%</span>
      </div>
    </div>
  </div>
)
