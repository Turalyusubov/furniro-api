import { PageHeading, ProductCard } from "@/components"
import { useAxios } from "@/hooks/useAxios";
import { ProductTypeApi } from "@/interfaces";
import { useEffect, useState } from "react";

const SearchPage: React.FC = () => {
  const [searchPrompt, setSearchPrompt] = useState('')
  const [loading, data, error, request] = useAxios<any>({ method: 'GET', url: `http://immutable858-001-site1.atempurl.com/api/UserProduct/Products?Prompt=${searchPrompt}` }, false, ['/search']);

  useEffect(() => {
    request()
  }, [searchPrompt])

  return (
    <div>
      <PageHeading searchPrompt={searchPrompt} setSearchPrompt={setSearchPrompt} mainhead="Search" />
      <div className="min-h-[30vh] p-8 lg:p-20">
        {searchPrompt.length === 0 && <p className="text-center text-2xl opacity-60">Search for some products</p>}
        <div className="">
          {data && data[0].totalProductCount === 0 &&
            <p className="text-center text-2xl opacity-60">There is no products</p>}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {
              data && searchPrompt.length > 0 &&
              data[0].products?.map((product: ProductTypeApi) => (<ProductCard key={product?.id} product={product} />))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default SearchPage