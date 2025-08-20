import { Icon } from '@/components/icon'
import { Badge } from '@/shadcn/components/ui/badge'

export const Notification = () => (
  <button className='flex cursor-pointer items-center gap-2 pr-4 pl-2 text-white'>
    <div className='relative'>
      <Icon
        size={32}
        color='#FF963C'
        name='info'
      />
      <Badge className='bg-orange-680 absolute top-0 -right-2 h-4 w-4 rounded-full border-none text-[10px]'>
        1
      </Badge>
    </div>

    <span className='w-24 text-left text-base'>お知らせ</span>
  </button>
)
