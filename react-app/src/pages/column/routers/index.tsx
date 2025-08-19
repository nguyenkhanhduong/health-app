import type { RouteObject } from 'react-router'

import { ErrorPage } from '@/components/error-page'
import { PostPage } from '@/pages/column/components'
import { ROUTER_CONFIG } from '@/router/router-config'

export const columnRouters: RouteObject[] = [
  {
    path: ROUTER_CONFIG.COLUMN,
    errorElement: <ErrorPage />,
    element: <PostPage />,
  },
]
