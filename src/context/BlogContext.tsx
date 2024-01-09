import { useAxios } from '@/hooks/useAxios';
import { BlogCategoryType, BlogItemType } from '@/interfaces';
import { createContext, useState, useContext, useEffect } from 'react';

const BlogContext = createContext<any>(undefined);

export const useBlogContext = () => {
    return useContext(BlogContext);
};

export const BlogContextProvider = ({ children }: { children: any }) => {

    const [blogItemsApi, setBlogItemsApi] = useState<BlogItemType[] | undefined>()
    const [blogPages, setBlogPages] = useState<number>(0)
    const [blogPageToShow, setBlogPageToShow] = useState<number>(1)
    const [totalBlogCount, setTotalBlogCount] = useState<number>(0)
    const [blogCategoriesApi, setBlogCategoriesApi] = useState<BlogCategoryType[] | undefined>()
    const [recentBlogsApi, setRecentBlogsApi] = useState<BlogItemType[] | undefined>()
    const [blogSearchText, setBlogSearchText] = useState<string>('')
    const [blogSearchCategory, setBlogSearchCategory] = useState<string>('')

    const [loadingBlog, dataBlog, errorBlog, requestBlog] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/Blog?Page=${blogPageToShow}&ShowMore.Take=8&Prompt=${blogSearchText}&CategoryId=${blogSearchCategory}` }, false, ['/blog']);

    const [loadingCategory, dataCategory, errorCategory, requestCategory] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/Blog/blog-categories` }, false, ['/blog']);

    const [loadingRecent, dataRecent, errorRecent, requestRecent] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/Blog/recent-posts` }, false, ['/blog']);

    useEffect(() => {
        if (dataBlog && dataBlog.length > 0) {
            setBlogItemsApi(dataBlog[0].blogs)
            setTotalBlogCount(dataBlog[0].totalBlogCount)
        }
    }, [dataBlog])

    useEffect(() => {
        if (dataCategory) {
            setBlogCategoriesApi(dataCategory)
        }
    }, [dataCategory])
    useEffect(() => {
        if (dataRecent) {
            setRecentBlogsApi(dataRecent)
        }
    }, [dataRecent])

    useEffect(() => {
        totalBlogCount && setBlogPages(Math.ceil(totalBlogCount / 8))
    }, [totalBlogCount])

    const states = {
        blogItemsApi,
        loadingBlog,
        errorBlog,
        requestBlog,
        loadingCategory,
        errorCategory,
        requestCategory,
        blogCategoriesApi,
        loadingRecent,
        recentBlogsApi,
        errorRecent,
        requestRecent,
        blogPages,
        blogPageToShow,
        setBlogPageToShow,
        blogSearchText,
        blogSearchCategory,
        setBlogSearchText,
        setBlogSearchCategory
    }

    return (
        <BlogContext.Provider value={states}>
            {children}
        </BlogContext.Provider>
    );
};
