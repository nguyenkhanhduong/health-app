import { createBrowserRouter } from 'react-router'

import { ErrorPage } from '@/components/error-page'
// import { MainLayout } from '@/components/layouts/main'
// import { columnRouters } from '@/pages/column/routers'
// import { homeRouters } from '@/pages/home/routers'
// import { recordRouters } from '@/pages/record/routers'
import { ROUTER_CONFIG } from '@/router/router-config'
import { TextEffect } from '@/pages/text-effect'

export const router = createBrowserRouter([
  {
    path: ROUTER_CONFIG.ROOT,
    element: <TextEffect />,
    errorElement: <ErrorPage />,
    // children: [...homeRouters, ...recordRouters, ...columnRouters],
  },
  {
    path: ROUTER_CONFIG.TEXT_EFFECT,
    element: <TextEffect />,
    errorElement: <ErrorPage />,
  },
])
