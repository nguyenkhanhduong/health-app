import type { FC } from 'react'

const recommends = [
  {
    type: 'COLUMN',
    value: 'オススメ',
  },
  {
    type: 'DIET',
    value: 'ダイエット',
  },
  {
    type: 'BEAUTY',
    value: '美容',
  },
  {
    type: 'HEALTH',
    value: '健康',
  },
]

export const Recommended: FC = () => (
  <section className='app-container'>
    <div className='flex gap-8'>
      {recommends.map(r => (
        <div
          key={r.type}
          className='bg-dark-600 flex h-36 w-54 flex-col items-center px-2 py-6'
        >
          <span className='text-primary-300 text-center text-[22px] leading-[27px] tracking-[0.11px]'>
            RECOMMENDED {r.type}
          </span>
          <hr className='mt-2.5 mb-2 w-14 border-t border-white' />
          <span className='text-[18px] leading-[26px] text-white'>{r.value}</span>
        </div>
      ))}
    </div>
  </section>
)
