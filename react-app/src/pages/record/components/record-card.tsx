import clsx from 'clsx'
import type { FC, PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  title: string
  date: string
  className?: string
}
export const RecordCard: FC<Props> = ({ title, date, children, className }) => (
  <div className={clsx('bg-dark-600 flex h-full w-full flex-col pt-4 pl-6', className)}>
    <div className='font-inter flex text-white'>
      <span className='w-24 text-[15px] leading-[18px] tracking-[0.15px]'>{title}</span>
      <span className='h-fit text-[22px] leading-[27px] tracking-[0.11px]'>{date}</span>
    </div>
    {children}
  </div>
)
