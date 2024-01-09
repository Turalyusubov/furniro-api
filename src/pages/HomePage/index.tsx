import {
    Hero,
    HomeGrid,
    HomeSlider,
    OurProducts,
    BrowseTheRange
} from "@/components";

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <BrowseTheRange />
            <OurProducts />
            <HomeSlider />
            <HomeGrid />
        </>
    )
}

export default HomePage
