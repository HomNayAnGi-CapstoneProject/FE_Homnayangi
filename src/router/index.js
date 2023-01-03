import { lazy } from 'react';
import { HomeLayout } from '../share/layouts';
const Home = lazy(() => import('../pages/Home/Home'));
const About = lazy(() => import('../pages/About/About'));
const MissingRoute = lazy(() => import('../share/components/MissingRoute'));
const RecipeList = lazy(() => import('../pages/Recipe/RecipeList'));

// ** public routes (no need authen)
const publicRoutes = [
  { path: '/', component: Home, title: 'Hôm nay ăn gì', layout: HomeLayout },
  { path: '/about', component: About, title: 'Giới thiệu' },
  { path: '/recipe', component: RecipeList, title: 'Giới thiệu' },
  { path: '*', component: MissingRoute },
  { path: '/login', component: Home, title: 'Đăng nhập', layout: null },
];

// ** private routes (need authen + authorization)
const privateRoutes = [];

export { publicRoutes, privateRoutes };
