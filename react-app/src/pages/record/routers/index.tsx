import type { RouteObject } from 'react-router'

import { ErrorPage } from '@/components/error-page'
import { RecordPage } from '@/pages/record/components'
import { ROUTER_CONFIG } from '@/router/router-config'

export const recordRouters: RouteObject[] = [
  {
    path: ROUTER_CONFIG.RECORD,
    errorElement: <ErrorPage />,
    element: <RecordPage />,
  },
]
