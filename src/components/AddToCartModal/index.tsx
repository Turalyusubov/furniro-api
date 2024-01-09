import { useEffect } from "react";
import { useData } from "../../context/AppContext.tsx"
import { ProductFeaturesComponent } from "../index.tsx";

const AddToCartModal: React.FC = () => {
    const {
        toggleCartModal,
        setToggleCartModal,
        productForModal
    } = useData()

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;

        if (target.classList.contains('parent-div')) {
            setToggleCartModal(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setToggleCartModal(false)
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (toggleCartModal) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [toggleCartModal])

    return (
        <div onClick={(event) => handleBackgroundClick(event)} className={`${toggleCartModal ? '' : 'hidden'} parent-div fixed flex flex-col items-center justify-center inset-0 bg-black bg-opacity-60`}>
            <div className="bg-white flex flex-col gap-4 rounded-lg p-10 relative">
                <button onClick={() => setToggleCartModal(false)} className="absolute top-2 right-2 bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center">✖</button>
                <p className="text-center font-semibold text-xl">{productForModal?.title}</p>
                <ProductFeaturesComponent id={productForModal?.id} productColors={productForModal?.colors} productSizes={productForModal?.sizes} isPage={false} />
            </div>
        </div>
    )
}

export default AddToCartModal
