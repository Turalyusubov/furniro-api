import Filtering from '../../../assets/icons/filter/filtering.svg'
import GridRound from '../../../assets/icons/filter/grid-round.svg'
import ViewList from '../../../assets/icons/filter/view-list.svg'
import { useEffect, useState } from 'react';
import { useShopContext } from '@/context/ShopContext';
import Select from 'react-select';
import { FilterBarProps, OptionType, TagsSizesColorsType } from '@/interfaces';



const FilterBar: React.FC<FilterBarProps> = ({ productType, setProductType }) => {
    const {
        totalProductCount,
        productsToShow,
        setProductsToShow,
        orderByToShow,
        setOrderByToShow,
        request,
        dataCategories,
        dataTags,
        dataSizes,
        loadingSizes,
        loadingTags,
        loadingCategories,
        setCategoryNamesToShow,
        categoryNamesToShow,
        productTagsToShow,
        setProductTagsToShow,
        productSizesToShow,
        setProductSizesToShow,
        productColorsToShow,
        setProductColorsToShow,
        loadingColors,
        dataColors,
        isNewToShow,
        setIsNewToShow,
        maxPriceToShow,
        setMaxPriceToShow,
        minPriceToShow,
        setMinPriceToShow
    } = useShopContext()

    const [isFilterShown, setIsFilterShown] = useState<boolean>(false)

    const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderByToShow(event.target.value === 'default' ? '' : event.target.value)
    }

    const handleCategoriesChange = (option: readonly OptionType[]) => {
        const multioptions = [...option];
        setCategoryNamesToShow(multioptions)
    }

    const handleTagsChange = (option: readonly OptionType[]) => {
        const multioptions = [...option];
        setProductTagsToShow(multioptions)
    }

    const handleSizesChange = (option: readonly OptionType[]) => {
        const multioptions = [...option];
        setProductSizesToShow(multioptions)
    }

    const handleColorsChange = (option: readonly OptionType[]) => {
        const multioptions = [...option];
        setProductColorsToShow(multioptions)
    }

    useEffect(() => {
        request()
    }, [
        orderByToShow,
        categoryNamesToShow,
        productTagsToShow,
        productSizesToShow,
        productColorsToShow,
        isNewToShow,
        minPriceToShow,
        maxPriceToShow
    ])

    const createOptions = (options: TagsSizesColorsType[]) => {
        if (options)
            return options.map((option: any) => ({
                value: option.tagName || option.categoryName || option.sizeName || option.colorHexCode,
                label: option.tagName || option.categoryName || option.sizeName || <span className='flex items-center gap-1'><span className='rounded-full w-5 h-5 inline-block' style={{ background: option.colorHexCode }}></span> {option.colorHexCode}</span>
            }));
    };

    if (loadingSizes && loadingTags && loadingCategories && loadingColors) return <p>Loading...</p>
    if (!dataSizes && !dataTags && !dataCategories && !dataColors) return <p>Data is null</p>

    return (
        <div className="bg-[#F9F1E7] p-8 lg:px-20 lg:py-10">
            <div className=" flex flex-col sm:flex-row w-full justify-between">
                <div className="flex flex-row mb-6 sm:mb-0 flex-wrap items-center gap-4">
                    <div className="flex flex-wrap items-center gap-5 pr-4 md:pr-8 border-r-2 border-[#9F9F9F]">
                        <button onClick={() => setIsFilterShown(prev => !prev)} className='flex items-center gap-2'>
                            <img loading="lazy" src={Filtering} alt="filtering" />
                            Filter
                        </button>
                        <button className={`${productType === 'grid' ? '' : 'opacity-50'} hidden sm:block duration-300`} onClick={() => setProductType('grid')}>
                            <img loading="lazy" src={GridRound} alt="grid-round" />
                        </button>
                        <button className={`${productType === 'list' ? '' : 'opacity-50'} hidden sm:block duration-300`} onClick={() => setProductType('list')}>
                            <img loading="lazy" src={ViewList} alt="view-list" />
                        </button>
                    </div>
                    <div className="md:pl-4">
                        <span>Showing {productsToShow < totalProductCount ? productsToShow : totalProductCount} of {totalProductCount} results</span>
                    </div>
                </div>
                <div className="flex gap-2 md:gap-0 flex-col md:flex-row">
                    <div className="flex items-center flex-row justify-between sm:justify-start">
                        <label htmlFor='show' className='mr-4'>Show</label>
                        <select onChange={(e) => setProductsToShow(e.target.value)} value={productsToShow} className='w-12 h-12 text-center sm:mr-6 focus:outline-none' name="show" id="show">
                            <option value="4">4</option>
                            <option value="8">8</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div className="flex flex-row items-center justify-between sm:justify-start">
                        <label htmlFor='shortby' className='mr-4'>Sort by</label>
                        <select onChange={(event) => handleSortBy(event)} id='shortby' className='p-3 w-44 focus:outline-none appearance-none' defaultValue='default'>
                            <option value="default">No Filter</option>
                            <option value="nameasc">A to Z</option>
                            <option value="namedesc">Z to A</option>
                            <option value="priceasc">Ascending Price </option>
                            <option value="pricedesc">Descending Price</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={`${isFilterShown ? 'h-50 sm:h-40 mt-6' : 'h-0 overflow-hidden'} grid sm:grid-cols-2 lg:grid-cols-4 gap-4 duration-300`}>
                <div className="">
                    <span>Categories</span>
                    <Select
                        isMulti={true}
                        onChange={handleCategoriesChange}
                        options={createOptions(dataCategories)}
                    />
                </div>
                <div className="">
                    <span>Tags</span>
                    <Select
                        isMulti={true}
                        onChange={handleTagsChange}
                        options={createOptions(dataTags)}
                    />
                </div>
                <div className="">
                    <span>Sizes</span>
                    <Select
                        isMulti={true}
                        onChange={handleSizesChange}
                        options={createOptions(dataSizes)}
                    />
                </div>
                <div className="">
                    <span>Colors</span>
                    <Select
                        isMulti={true}
                        onChange={handleColorsChange}
                        options={createOptions(dataColors)}
                    />
                </div>
                <div className="col-span-4 grid grid-cols-2 gap-4">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="isNewProducts">Only new products</label>
                        <input onChange={() => setIsNewToShow((prev: boolean) => !prev)} checked={isNewToShow} type="checkbox" name="isNewProducts" id="isNewProducts" />
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="minPrice">Min Price</label>
                            <input onChange={e => setMinPriceToShow(e.target.value)} step={100} min={0} max={Number(maxPriceToShow) - 100} className='w-16 h-12 pl-2' type="number" />
                        </div>
                        <div className="flex gap-4 items-center">
                            <label htmlFor="maxPrice">Max Price</label>
                            <input onChange={e => setMaxPriceToShow(e.target.value)} step={100} min={Number(minPriceToShow) + 100} max={2000} className='w-16 h-12 pl-2' type="number" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
