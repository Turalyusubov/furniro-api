import { useRef } from 'react'
import Slider1 from '../../../assets/img/home-slider/slider1.png'
import Slider2 from '../../../assets/img/home-slider/slider2.png'
import Slider3 from '../../../assets/img/home-slider/slider3.png'
import SliderArrow from '../../../assets/icons/slider/slider-arrow.svg'
import Slider from "react-slick";
import { SlideItemType } from '../../../interfaces'
import '../../../slick/slick.css'
import '../../../slick/slick-theme.css'


const HomeSlider: React.FC = () => {

    const slides: SlideItemType[] = [
        {
            id: 1,
            category: 'Inner Peace',
            title: 'Bed Room',
            image: Slider1,
            link: '#'
        },
        {
            id: 2,
            category: 'Inner Peace',
            title: 'Bed Room',
            image: Slider2,
            link: '#'
        },
        {
            id: 3,
            category: 'Inner Peace',
            title: 'Bed Room',
            image: Slider3,
            link: '#'
        },
        {
            id: 4,
            category: 'Inner Peace',
            title: 'Bed Room',
            image: Slider1,
            link: '#'
        },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        appendDots: (dots: React.ReactNode) => (
            <div>
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: (_: number) => (
            <div className="dot-border">
                <div className='slider-dot'>
                </div>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
        ]

    };

    const slider = useRef(null);

    return (
        <div className="bg-[#FCF8F3] min-h-[95vh] px-8 lg:px-20 lg:pr-0 py-10 lg:grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 pb-10 lg:pb-0">
                <div className="flex w-full h-full flex-col justify-center">
                    <h3 className="pb-1 text-[#3A3A3A] font-bold text-3xl lg:text-[40px]">50+ Beautiful rooms
                        inspiration</h3>
                    <p className="w-11/12 pb-6 text-[#616161] font-medium">Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
                    <button className="text-white w-fit bg-ochre border border-ochre hover:text-ochre hover:bg-transparent duration-300 font-semibold py-3 px-10">Explore More</button>
                </div>
            </div>
            <div className="lg:col-span-2 relative">
                <Slider ref={slider} {...settings}>
                    {slides.map(slide => (
                        <div key={slide.id} className="relative">
                            <img loading="lazy" className={`transition-transform object-cover duration-300 ease-in-out`} src={slide.image} alt="slide" />
                            <div className={`slide-about absolute flex bottom-20 items-end left-6`}>
                                <div className="bg-[#FFFFFFB8] z-10 gap-2 p-4 flex flex-col backdrop-blur-sm">
                                    <span className='text-[#616161] font-medium'>{slide.id} - {slide.title}</span>
                                    <span className='text-[#3A3A3A] font-semibold text-3xl'>{slide.category}</span>
                                </div>
                                <button className='-translate-x-28 z-0 bg-ochre text-white text-2xl p-3'>
                                    →
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="flex absolute lg:-left-5 top-1/2 justify-between w-full text-ochre text-sm">
                    <button onClick={() => (slider?.current as any)?.slickPrev()} className={` bg-white rounded-full h-10 w-10 flex justify-center items-center shadow-lg hover:bg-neutral-100 duration-300`}>
                        <img className='rotate-180' src={SliderArrow} alt="arrow" />
                    </button>
                    <button onClick={() => (slider?.current as any)?.slickNext()} className={`bg-white rounded-full h-10 w-10 flex justify-center items-center shadow-lg hover:bg-neutral-100 duration-300`}>
                        <img src={SliderArrow} alt="arrow" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default HomeSlider
