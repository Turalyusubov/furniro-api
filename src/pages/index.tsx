import { lazy } from "react";

const AuthPage = lazy(() => import("./Authentification/AuthPage"))
import Login from "./Authentification/Login";
import Signup from "./Authentification/Signup";
const BlogPage = lazy(() => import("./BlogPage"))
const CartPage = lazy(() => import("./CartPage"))
const CheckoutPage = lazy(() => import("./CheckoutPage"))
const ContactPage = lazy(() => import("./ContactPage"))
const HomePage = lazy(() => import("./HomePage"))
const NotFound = lazy(() => import("./NotFound"))
const ProductPage = lazy(() => import("./ProductPage"))
const WishlistPage = lazy(() => import("./WishlistPage"))
const ShopPage = lazy(() => import("./ShopPage"))
const LoadingPage = lazy(() => import("./LoadingPage"))
const SearchPage = lazy(() => import("./SearchPage"))
const ProfileDetailsPage = lazy(() => import("./ProfileDetailsPage"))

export {
    AuthPage,
    Login,
    Signup,
    BlogPage,
    CartPage,
    CheckoutPage,
    ContactPage,
    HomePage,
    NotFound,
    ProductPage,
    WishlistPage,
    ShopPage,
    LoadingPage,
    SearchPage,
    ProfileDetailsPage
}