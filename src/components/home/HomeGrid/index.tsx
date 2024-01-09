import { useEffect, useState } from 'react'
import { GridItemType } from '@/interfaces'

const HomeGrid: React.FC = () => {
    const [data, setData] = useState<GridItemType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://immutable858-001-site1.atempurl.com/api/Home');
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error : new Error('An error occurred'));
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='py-8 lg:py-20'>
            <p className='font-semibold text-[#616161] text-center lg:text-xl'>Share your setup with</p>
            <h2 className='font-bold text-[#3A3A3A] text-2xl lg:text-4xl text-center'>#FuniroFurniture</h2>
            <div className="overflow-hidden flex flex-col items-center">
                <div className="homegrid h-[90vh] gap-2 lg:gap-4 min-w-[150vh]">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {data && data.map(img => (
                        <img key={img.id} loading="lazy" className='h-full w-full object-cover' src={img.imageUrls[0]} alt="grid-img" />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default HomeGrid
