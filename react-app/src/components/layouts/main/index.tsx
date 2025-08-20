import type { FC } from 'react'
import { Outlet } from 'react-router'

import { Footer } from '@/components/layouts/main/footer'
import { Header } from '@/components/layouts/main/header'
import { ScrollTopButton } from '@/components/layouts/main/sroll-top-button'

export const MainLayout: FC = () => (
  <div className='flex min-h-screen flex-col bg-white'>
    <Header />
    <main
      role='main'
      className='flex-1'
    >
      <Outlet />
    </main>
    <Footer />
    <ScrollTopButton />
  </div>
)
