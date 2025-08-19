import type { FC } from 'react'

import { Logo } from '@/components/layouts/main/logo'
import { Menu } from '@/components/layouts/main/menu'
import { NavBar } from '@/components/layouts/main/navbar'
import { Notification } from '@/components/layouts/main/notification'

export const Header: FC = () => (
  <header className='bg-dark-500 shadow-header sticky top-0 z-50 h-16'>
    <div className='app-container flex h-full items-center justify-between font-light'>
      <Logo />
      <div className='flex'>
        <NavBar />
        <Notification />
        <Menu />
      </div>
    </div>
  </header>
)
