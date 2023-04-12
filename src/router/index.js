import { lazy } from 'react';
import { HomeLayout, AdminLayout } from '../share/layouts';
const Home = lazy(() => import('../pages/Home/HomeContainer'));
const About = lazy(() => import('../pages/About/AboutContainer'));
const MissingRoute = lazy(() => import('../share/components/MissingRoute'));
const Recipe = lazy(() => import('../pages/Recipe/RecipeContainer'));
const Login = lazy(() => import('../pages/Auth/Login/Login'));
const Register = lazy(() => import('../pages/Auth/Register/Register'));
const BlogDetail = lazy(() => import('../pages/BlogDetail/BlogDetailContainer'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const Cart = lazy(() => import('../pages/Cart/CartContainer'));
const User = lazy(() => import('../pages/User/UserDetail'))
const CartAddress = lazy(() => import('../pages/CartAddress/CartAddressContainer'))
const Shop = lazy(() => import('../pages/Shop/ShopContainer'))
const ShopItemDetail = lazy(() => import('../pages/ShopItemDetail/ShopItemDetailContainer'))
const Err = lazy(() => import('../pages/Err/Err'))

// ** public routes (no need authen)
const publicRoutes = [
  { path: '/', component: Home, title: 'Hôm nay ăn gì', layout: HomeLayout },
  { path: '/about', component: About, title: 'Giới thiệu' },
  { path: '*', component: MissingRoute },
  { path: '/login', component: Login, title: 'Đăng nhập', layout: null },
  { path: '/register', component: Register, title: 'Đăng ký', layout: null },
  { path: '/recipe', component: Recipe, title: 'Công thức' },
  { path: '/recipe/:id/:title', component: BlogDetail },
  { path: '/cart', component: Cart, title: 'Giỏ hàng' },
  { path: '/shop', component: Shop, title: 'Cửa hàng' },
  { path: '/shop/:id/:title', component: ShopItemDetail },
  { path: '/err', component: Err, layout: null },
];

// ** private routes (need authen + authorization)
const privateRoutes = [
  { path: '/cart-address', component: CartAddress, title: 'Giỏ hàng' },
  { path: '/user/*', component: User, title: 'Thông tin tài khoản' },
  { path: '/management/*', component: Admin, title: 'Homnayangi - ADMINISTRATION', layout: null },
];

export { publicRoutes, privateRoutes };
