import {
    BlogCard,
    PageHeading,
    Pagination
} from '@/components'
import Search from '../../assets/icons/search.svg'
import UpperFooter from '@/layout/UpperFooter'
import { useBlogContext } from '@/context/BlogContext'
import { BlogCategoryType, BlogItemType } from '@/interfaces'
import { useEffect } from 'react'


const BlogPage: React.FC = () => {

    const {
        blogItemsApi,
        loadingBlog,
        errorBlog,
        loadingCategory,
        errorCategory,
        blogCategoriesApi,
        loadingRecent,
        recentBlogsApi,
        errorRecent,
        blogPages,
        blogPageToShow,
        setBlogPageToShow,
        requestBlog,
        blogSearchText,
        blogSearchCategory,
        setBlogSearchText,
        setBlogSearchCategory
    } = useBlogContext()

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBlogSearchText(event.target.value)
    }

    useEffect(() => {
        requestBlog()
    }, [blogSearchText, blogSearchCategory])

    if (loadingBlog && loadingCategory && loadingRecent) return <p>Loading ....</p>;

    if (!blogItemsApi && !blogCategoriesApi && !recentBlogsApi) return <p>Data is null</p>;

    if (errorBlog && errorCategory && errorRecent) return <p>{errorBlog || errorCategory || errorRecent}</p>;

    return (
        <>
            <PageHeading mainhead="Blog" />
            <div className="p-8 lg:p-20 flex flex-col lg:flex-row w-full gap-10 relative">
                <div className="w-full lg:w-9/12 flex flex-col gap-16">
                    {
                        blogItemsApi && blogItemsApi.length > 0 ?
                            blogItemsApi?.map((blog: BlogItemType) => <BlogCard blog={blog} key={blog.id} />) :
                            <p className='text-center font-semibold text-xl opacity-80'>There is no blogs</p>
                    }
                    {
                        blogPages > 1 &&
                        <Pagination pages={blogPages} pageToShow={blogPageToShow} setPageToShow={setBlogPageToShow} request={requestBlog} />
                    }
                </div>
                <div className="w-full order-first lg:order-last lg:sticky top-8 self-start lg:w-3/12">
                    <div className="relative mb-6">
                        <img className='absolute right-3 top-3 bg-white pl-3' src={Search} alt="search" />
                        <input value={blogSearchText} onChange={handleSearch} className="border border-[#9F9F9F] rounded-lg w-full focus:outline-none p-3" type="text" />
                    </div>
                    <div className="flex flex-col gap-20">
                        <div className="px-8">
                            <div className="flex w-full justify-between">
                                <p className="font-medium text-2xl mb-10">Categories</p>
                                {
                                    blogSearchCategory &&
                                    <span onClick={() => setBlogSearchCategory('')} className='bg-black text-white h-6 w-6 rounded-full flex items-center justify-center cursor-pointer'>×</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2 h-[40vh] overflow-y-auto pr-2">
                                {blogCategoriesApi?.map((category: BlogCategoryType) => (
                                    <div onClick={() => setBlogSearchCategory(category.id)} key={category.id} className={`flex relative cursor-pointer items-center rounded py-2 px-4 justify-between w-full ${category.id === blogSearchCategory ? 'bg-stone-200 text-black' : 'text-[#9F9F9F] hover:bg-stone-50 hover:text-stone-900'} duration-300`}>
                                        <span>{category.categoryName}</span>
                                        <span>{category.blogCount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-8">
                            <p className="font-medium text-2xl mb-6">Recent Posts</p>
                            <div className="flex flex-col gap-6">
                                {recentBlogsApi?.map((blog: BlogItemType) => (
                                    <div key={blog.id} className="w-48 flex gap-3 items-center">
                                        <img loading="lazy" className="min-w-[5rem] h-20 object-cover rounded-lg" src={blog.imageUrls[0]} alt="blog" />
                                        <div className="flex flex-col gap-1 w-full">
                                            <span className="text-sm truncate">{blog.header}</span>
                                            <span className="text-xs text-[#9F9F9F] truncate">{blog.createdDate}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpperFooter />
        </>
    )
}

export default BlogPage
