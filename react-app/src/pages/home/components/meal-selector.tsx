import clsx from 'clsx'
import type { FC, ReactNode } from 'react'

import type { IconName } from '@/components/icon'
import { Icon } from '@/components/icon'
import type { MealType } from '@/types'
interface HexagonProps {
  width?: number
  height?: number
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export const Hexagon: FC<HexagonProps> = ({
  width = 136,
  height = 136,
  children,
  className = '',
  onClick,
}) => (
  <div
    className={`hexagon px-2.5 py-[1px] ${className}`}
    style={{
      width: `${width}px`,
      height: `${height}px`,
    }}
    onClick={onClick}
  >
    <div className='hexagon-inner'>
      <div className='hexagon-content'>{children}</div>
    </div>
  </div>
)
const mealItems: { icon: IconName; type: MealType }[] = [
  {
    icon: 'knife',
    type: 'Morning',
  },
  {
    icon: 'knife',
    type: 'Lunch',
  },
  {
    icon: 'knife',
    type: 'Dinner',
  },
  {
    icon: 'knife',
    type: 'Snack',
  },
]
type Props = {
  type?: MealType
  onChange: (t?: MealType) => void
}
export const MealSelector: FC<Props> = ({ type, onChange }) => (
  <div className='app-container flex items-center gap-16 py-6'>
    {mealItems.map(i => (
      <Hexagon
        key={i.type}
        onClick={() => onChange(type && i.type === type ? undefined : i.type)}
        className='flex flex-col justify-center'
      >
        <Icon
          size={56}
          name={i.icon}
          color={i.type === type ? '#EA6C00' : '#ffffff'}
        />
        <span className={clsx('font-inter text-xl', { ['text-primary-500']: i.type === type })}>
          {i.type}
        </span>
      </Hexagon>
    ))}
  </div>
)
