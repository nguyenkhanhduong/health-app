import type { FC } from 'react'
import { Outlet } from 'react-router'

import { Footer } from '@/components/layouts/main/footer'
import { Header } from '@/components/layouts/main/header'
import { ScrollTopButton } from '@/components/layouts/main/sroll-top-button'

export const MainLayout: FC = () => (
  <div className='bg-white'>
    <Header />
    <main
      role='main'
    >
      <Outlet />
    </main>
    <Footer />
    <ScrollTopButton />
  </div>
)
