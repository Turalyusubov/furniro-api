import { useData } from "@/context/AppContext";
import {
    AuthPage,
    BlogPage,
    CartPage,
    CheckoutPage,
    ContactPage,
    HomePage,
    NotFound,
    ProductPage,
    ProfileDetailsPage,
    SearchPage,
    ShopPage,
    WishlistPage
} from "@/pages";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ element }: { element: any }) => {
    const { userId } = useData()
    return userId ? element : <Navigate to="/" />;
};

const ProtectedAuth = ({ element }: { element: any }) => {
    const { userId } = useData()
    return !userId ? element : <Navigate to="/profile" />;
};

export const routes = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/shop",
        element: <ShopPage />
    },
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/products/:productId",
        element: <ProductPage />
    },
    {
        path: "/checkout",
        element: <ProtectedRoute element={<CheckoutPage />} />
    },
    {
        path: "/contact",
        element: <ContactPage />
    },
    {
        path: "/blog",
        element: <BlogPage />
    },
    {
        path: "/auth",
        element: <ProtectedAuth element={<AuthPage />} />
    },
    {
        path: "/wishlist",
        element: <WishlistPage />
    },
    {
        path: "/search",
        element: <SearchPage />
    },
    {
        path: "/profile",
        element: <ProtectedRoute element={<ProfileDetailsPage />} />
    },
    {
        path: "*",
        element: <NotFound />
    },
]