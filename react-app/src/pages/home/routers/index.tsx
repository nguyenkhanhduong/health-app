import type { RouteObject } from 'react-router'

import { ErrorPage } from '@/components/error-page'
import { HomePage } from '@/pages/home/components'
import { ROUTER_CONFIG } from '@/router/router-config'

export const homeRouters: RouteObject[] = [
  {
    path: ROUTER_CONFIG.ROOT,
    errorElement: <ErrorPage />,
    element: <HomePage />,
  },
]
