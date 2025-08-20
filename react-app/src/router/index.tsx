import { createBrowserRouter } from 'react-router'

import { ErrorPage } from '@/components/error-page'
import { MainLayout } from '@/components/layouts/main'
import { columnRouters } from '@/pages/column/routers'
import { homeRouters } from '@/pages/home/routers'
import { recordRouters } from '@/pages/record/routers'
import { ROUTER_CONFIG } from '@/router/router-config'

export const router = createBrowserRouter([
  {
    path: ROUTER_CONFIG.ROOT,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [...homeRouters,
       ...recordRouters, ...columnRouters
      ],
  },
])
