import { lazy } from 'react';
import { HomeLayout } from '../share/layouts';
const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const MissingRoute = lazy(() => import('../share/components/MissingRoute'));
const Recipe = lazy(() => import('../pages/Recipe/Recipe'));

// ** public routes (no need authen)
const publicRoutes = [
  { path: '/', component: Home, title: 'Hôm nay ăn gì', layout: HomeLayout },
  { path: '/about', component: About, title: 'Giới thiệu' },
  { path: '*', component: MissingRoute },
  { path: '/login', component: Home, title: 'Đăng nhập', layout: null },
  { path: '/recipe', component: Recipe, title: 'Công thức' },
];

// ** private routes (need authen + authorization)
const privateRoutes = [];

export { publicRoutes, privateRoutes };
