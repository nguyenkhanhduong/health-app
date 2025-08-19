import dayjs from 'dayjs'

import Column1 from '@/assets/images/column-1.jpg'
import Column2 from '@/assets/images/column-2.jpg'
import Column3 from '@/assets/images/column-3.jpg'
import Column4 from '@/assets/images/column-4.jpg'
import Column5 from '@/assets/images/column-5.jpg'
import Column6 from '@/assets/images/column-6.jpg'
import Column7 from '@/assets/images/column-7.jpg'
import Column8 from '@/assets/images/column-8.jpg'

import { Button } from '@/shadcn/components/ui/button'

const data = [
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column1,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column2,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column3,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column4,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column5,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column6,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column7,
  },
  {
    title: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    tags: ['#魚料理', '#和食', '#DHA'],
    date: new Date(),
    url: Column8,
  },
]

export const Posts = () => (
  <section className='app-container mt-14 mb-16 flex flex-col'>
    <div className='flex flex-wrap gap-2'>
      {data.map((item, index) => (
        <div
          key={index}
          className='group flex h-55.5 w-[234px] flex-col'
        >
          <div className='relative h-36 w-full overflow-hidden'>
            <img
              src={item.url}
              className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
              alt={item.title}
            />
            <div className='bg-primary-300 font-inter absolute bottom-0 left-0 flex h-6 w-36 items-center px-2 text-[15px] leading-[30px] text-white'>
              {dayjs(item.date).format('YYYY.MM.DD  HH:mm')}
            </div>
          </div>
          <span className='text-dark-500 mt-[5px] font-light text-[15px] line-clamp-2 overflow-hidden leading-[22px] tracking-[0.08px] break-all text-ellipsis'>
            {item.title}
          </span>
          <div className='text-sx text-primary-400 flex gap-2 leading-[22px]'>
            {item.tags.map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
    <Button className='btn-gradient mx-auto mt-6 h-14 w-74 text-[18px] leading-[26px]'>
      コラムをもっと見る
    </Button>
  </section>
)
