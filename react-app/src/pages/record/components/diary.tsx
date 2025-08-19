import dayjs from 'dayjs'

import { Button } from '@/shadcn/components/ui/button'

const data = [
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト トテキスト トテキストテキスト トテキスト',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
  {
    date: new Date(),
    title: '私の日記の記録が一部表示されます。',
    des: 'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト…',
  },
]
export const Diary = () => (
  <section className='app-container'>
    <div className='flex w-full flex-col'>
      <h3 className='font-inter text-dark-500 text-[22px] leading-[27px]'>MY DIARY</h3>
      <div className='text-dark-500 flex flex-wrap gap-3'>
        {data.map((i, index) => (
          <div
            key={index}
            className='flex h-[231px] w-[231px] flex-col gap-2 border-2 border-gray-400 p-4'
          >
            <span className='font-inter w-[147px] text-[18px] leading-[22px] tracking-[0.09px] whitespace-pre-line'>
              {dayjs(i.date).format('YYYY.MM.DD\nHH:mm')}
            </span>
            <div className='h-33 text-xs leading-[17px] tracking-[0.06px]'>
              <p>{i.title}</p>
              <p className='line-clamp-5 overflow-hidden break-all text-ellipsis'>
                {i.des.slice(0, 72)}...
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button className='btn-gradient mx-auto mt-6 h-14 w-74 text-[18px] leading-[26px]'>
        自分の日記をもっと見る
      </Button>
    </div>
  </section>
)
