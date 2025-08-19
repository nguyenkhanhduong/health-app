import type { FC } from 'react'

import { HeroSection } from '@/pages/home/components/hero-section'
import { MealGallery } from '@/pages/home/components/meal-gallery'
import { MealSelector } from '@/pages/home/components/meal-selector'

export const HomePage: FC = () => (
  <div className='flex flex-col'>
    <HeroSection />
    <MealSelector />
    <MealGallery />
  </div>
)
