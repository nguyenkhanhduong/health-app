import type { FC } from 'react'

import { HeroSection } from '@/pages/home/components/hero-section'
import { MealGallery } from '@/pages/home/components/meal-gallery'

export const HomePage: FC = () => (
  <div className='flex flex-col'>
    <HeroSection />
    <MealGallery />
  </div>
)
