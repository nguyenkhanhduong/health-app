import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router'

import { Icon } from '@/components/icon'
import { ROUTER_CONFIG } from '@/router/router-config'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/components/ui/popover'

const menuItems = [
  { id: 1, label: '自分の記録', href: ROUTER_CONFIG.RECORD },
  { id: 2, label: '体重グラフ', href: '/' },
  { id: 3, label: '目標', href: '/' },
  { id: 4, label: '選択中のコース', href: '/' },
  { id: 5, label: 'コラム一覧', href: ROUTER_CONFIG.COLUMN },
  { id: 6, label: '設定', href: '/settings' },
]
export const Menu = () => {
  const [open, setOpen] = useState(false)
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <button className='pl-4'>
          <Icon
            size={32}
            name='menu'
            color='#FF963C'
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className='mt-8 w-80 rounded-none border-gray-500 bg-gray-400 p-0'
        align='end'
        sideOffset={8}
      >
        <div className='relative'>
          <button
            className='hover:bg-dark-500/90 bg-dark-500 absolute -top-8 -right-[0.5px] flex h-8 w-8 items-center justify-center rounded-none shadow-none hover:bg-none'
            onClick={() => setOpen(false)}
          >
            <Icon
              size={32}
              name='close'
              color='#FF963C'
            />
          </button>

          <div className='flex flex-col'>
            {menuItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => setOpen(false)}
                className={clsx('px-8 py-[23px] text-[18px] leading-[26px] font-light text-white', {
                  ['border-b-dark-600/25 border-b']: index !== menuItems.length - 1,
                  ['border-t border-t-white/15']: index !== 0,
                })}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
