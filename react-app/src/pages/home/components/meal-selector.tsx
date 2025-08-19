import type { FC, ReactNode } from 'react'

import { Icon } from '@/components/icon'

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
const mealItems = [
  {
    icon: 'knife',
    label: 'Morning',
  },
  {
    icon: 'knife',
    label: 'Lunch',
  },
  {
    icon: 'knife',
    label: 'Dinner',
  },
  {
    icon: 'knife',
    label: 'Snack',
  },
]
export const MealSelector = () => (
  <section className='app-container flex items-center gap-16 py-6'>
    {mealItems.map(i => (
      <Hexagon
        key={i.label}
        className='flex flex-col justify-center'
      >
        <Icon
          size={56}
          name={i.icon}
        />
        <span className='font-inter text-xl'>{i.label}</span>
      </Hexagon>
    ))}
  </section>
)
