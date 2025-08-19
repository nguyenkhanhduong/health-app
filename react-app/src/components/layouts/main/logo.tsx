import type { FC } from 'react'
import { Link } from 'react-router'

import logo from '@/assets/images/logo.png'

import { ROUTER_CONFIG } from '@/router/router-config'

export const Logo: FC = () => (
  <Link
    className='px-4'
    to={ROUTER_CONFIG.ROOT}
  >
    <img
      alt='Logo'
      className='h-10 w-[109px]'
      src={logo}
    />
  </Link>
)
