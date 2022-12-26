import { lazy } from 'react'
const Home = lazy(() => import('../pages/Home/Home'))
const About = lazy(() => import('../pages/About/About'))
const MissingRoute = lazy(() => import('../share/components/MissingRoute'))

// ** public routes (no need authen)
const publicRoutes = [
    { path: '/', component: Home, title: 'Homnayangi' },
    { path: '/about', component: About, title: 'Giới thiệu' },
    { path: '*', component: MissingRoute, title: 'homnayangi' },
    // { path: '*', component: Home, title: 'homnayangi', layout: null},
]

// ** private routes (need authen + authorization)
const privateRoutes = [
]

export { publicRoutes, privateRoutes }
