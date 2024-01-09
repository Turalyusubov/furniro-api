import { PaginationProps } from "@/interfaces";
import { useEffect } from "react";

const Pagination: React.FC<PaginationProps> = ({ pages, pageToShow, setPageToShow, request }) => {

    useEffect(() => {
        request()
    }, [pageToShow])

    const firstPageNum = 1
    const middleLeftPageNum = pageToShow <= 4 ? 2 : '...'
    const leftPageNum = pageToShow <= 4 ? 3 : (pageToShow >= pages - 3 ? pages - 4 : pageToShow - 1)
    const centralPageNum = pageToShow <= 4 ? 4 : (pageToShow >= pages - 3 ? pages - 3 : pageToShow)
    const rightPageNum = pageToShow <= 4 ? 5 : (pageToShow >= pages - 3 ? pages - 2 : pageToShow + 1)
    const middleRightPageNum = pageToShow >= pages - 3 ? pages - 1 : '...'

    const pagesArray = Array.from({ length: pages }, (_, index) => index + 1)
    const paginationArray = [firstPageNum, middleLeftPageNum, leftPageNum, centralPageNum, rightPageNum, middleRightPageNum, pages]

    useEffect(() => {
        if (pageToShow > pages)
            setPageToShow(pages)
    }, [pages])

    return (
        <div className="w-full flex justify-center gap-3 lg:gap-7 lg:text-[20px] flex-wrap">
            {
                pageToShow > 1 &&
                <button onClick={() => setPageToShow((prev: number) => prev - 1)} className="text-black bg-[#F9F1E7] rounded-lg px-4 hidden lg:block lg:px-8 h-8 lg:h-12 hover:bg-ochre hover:text-white duration-300">Prev</button>
            }
            {pages > 9 ?
                paginationArray.map((pageNum, index) =>
                    <button
                        key={index}
                        onClick={() => pageNum !== '...' ? (typeof pageNum === 'number' && setPageToShow(pageNum)) : ''}
                        className={pageNum === '...' ? 'disabled' : (pageToShow == pageNum ? 'text-white bg-ochre rounded-lg w-8 h-8 lg:w-12 lg:h-12 duration-300' :
                            'text-black bg-[#F9F1E7] hover:bg-ochre hover:text-white rounded-lg w-8 h-8 lg:w-12 lg:h-12 duration-300')}>
                        {pageNum}</button>) :
                pagesArray.map((pageNum, index) =>
                    <button
                        key={index}
                        onClick={() => (pageNum as string | number) !== '...' ? setPageToShow(pageNum) : ''}
                        className={pageToShow == pageNum ? 'text-white bg-ochre rounded-lg w-8 h-8 lg:w-12 lg:h-12 duration-300' :
                            'rounded-lg w-8 h-8 lg:w-12 lg:h-12 duration-300 text-black bg-[#F9F1E7] hover:bg-ochre hover:text-white'}
                    >{pageNum}</button>)
            }
            {
                (pages && pageToShow < pages) &&
                <button onClick={() => setPageToShow((prev: number) => prev + 1)} className="text-black bg-[#F9F1E7] rounded-lg hidden lg:block px-4 lg:px-8 h-8 lg:h-12 hover:bg-ochre hover:text-white duration-300">Next</button>
            }
        </div>
    )
}

export default Pagination
