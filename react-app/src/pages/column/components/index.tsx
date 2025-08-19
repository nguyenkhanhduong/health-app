import { Posts } from '@/pages/column/components/posts'
import { Recommended } from '@/pages/column/components/recommended'

export const PostPage = () => (
  <div className='flex flex-col pt-14'>
    <Recommended />
    <Posts />
  </div>
)
