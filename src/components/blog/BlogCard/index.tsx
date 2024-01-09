import { Link } from 'react-router-dom'
import tag from '../../../assets/icons/blog/tag.svg'
import user from '../../../assets/icons/blog/user.svg'
import calendar from '../../../assets/icons/blog/calendar.svg'
import { BlogCardProps } from '@/interfaces'


const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <div>
            <img loading="lazy" className='rounded-xl w-full h-[40vh] lg:h-[70vh] object-cover' src={blog.imageUrls[0]} alt="blog" />
            <div className="flex text-sm lg:text-base justify-between lg:justify-start lg:gap-8 py-6 text-[#9F9F9F]">
                <span className='flex items-center gap-1'>
                    <img loading="lazy" src={user} alt="user" />
                    {blog.adminInfo && blog.adminInfo.roleName}
                </span>
                <span className='flex items-center gap-1'>
                    <img loading="lazy" src={calendar} alt="calendar" />
                    {blog?.createdDate}
                </span>
                <span className='flex items-center gap-1'>
                    <img loading="lazy" src={tag} alt="tag" />
                    {blog.category && blog.category.categoryName}
                </span>
            </div>
            <div className="mb-6">
                <h3 className='font-medium text-2xl lg:text-3xl mb-4'>{blog.header}</h3>
                <p className='text-[#9F9F9F]'>{blog.text}</p>
            </div>
            <Link className='relative after:absolute after:bg-black after:h-[1px] after:w-[60%] after:-bottom-3 after:left-4 hover:after:w-full hover:after:left-0 after:duration-300 hover:after:h-1 hover:font-bold duration-300' to='#'>Read more</Link>
        </div>
    )
}

export default BlogCard
