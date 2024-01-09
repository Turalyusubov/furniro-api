import Dining from '../../../assets/img/range/range2.png'
import Living from '../../../assets/img/range/range3.png'
import Bedroom from '../../../assets/img/range/range1.png'
import { RangeItemType } from '../../../interfaces'

const BrowseTheRange: React.FC = () => {

    const range: RangeItemType[] = [
        {
            image: Dining,
            title: 'Dining'
        },
        {
            image: Living,
            title: 'Living'
        },
        {
            image: Bedroom,
            title: 'Bedroom'
        }
    ]

    return (
        <div className="px-8 lg:px-24 py-10 text-dark-text text-center">
            <h2 className='font-bold text-2xl lg:text-3xl mb-2'>Browse The Range</h2>
            <p className='text-[#666] lg:text-lg mb-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="grid lg:grid-cols-3 gap-3">
                {range.map((item, index) => (
                    <div key={index} className="font-semibold text-xl">
                        <img loading="lazy" className='rounded-lg bg-cover object-cover object-left mb-6 h-[50vh] lg:h-[80vh] w-full' src={item.image} alt={item.title} />
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrowseTheRange
