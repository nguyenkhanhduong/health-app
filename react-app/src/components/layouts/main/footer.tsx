import type { FC } from 'react'
import { Link } from 'react-router'

const navItems = [
  {
    label: '会員登録',
    pathName: '',
  },
  {
    label: '運営会社',
    pathName: '',
  },
  {
    label: '利用規約',
    pathName: '',
  },
  {
    label: '個人情報の取扱について',
    pathName: '',
  },
  {
    label: '特定商取引法に基づく表記',
    pathName: '',
  },
  {
    label: 'お問い合わせ',
    pathName: '',
  },
]

export const Footer: FC = () => (
  <footer className='bg-dark-500 fixed bottom-0 z-40 w-full'>
    <nav className='app-container flex h-32 items-center gap-[45px] text-[11px] font-light text-white'>
      {navItems.map(i => (
        <Link
          key={i.label}
          to={i.pathName}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  </footer>
)
