import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cookies from "universal-cookie"
const Layout = lazy(() => import('./Layout.jsx'))
const Home = lazy(() => import('./page/Home/App.jsx'))
const List = lazy(() => import('./page/List/List.jsx'))
const Information = lazy(() => import('./page/Information/Information.jsx'))
const Streaming = lazy(() => import('./page/Streaming/Streaming.jsx'))
const Administrator = lazy(() => import('./page/Admin/Administrator.jsx'))
const AdminPanel = lazy(() => import('./page/Admin/AdminPanel.jsx'))
const NotFound = lazy(() => import('./page/NotFound/NotFound.jsx'))
const LoadingSkeleton = lazy(() => import('./component/skeleton/LoadingSkeleton.jsx'))
import { ToastContainer } from 'react-toastify';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'

function CheckRoutes() {
    const cookies = new Cookies().get("TOKEN")
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSkeleton type={1}/>}>
                <SkeletonTheme baseColor="#2a2e37" highlightColor="#94b1f2">
                    <Routes>
                        {cookies ? (
                            <Route index path='/' element={<AdminPanel />} />
                        ) : (
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path='/List/:Order/:Type/:Calling/:Sort' element={<List />} />
                                <Route path='/Information/:Name' element={<Information />} />
                                <Route path='/Streaming/:Name/:Ep' element={<Streaming />} />
                                <Route path='/Administrator' element={<Administrator />} />
                            </Route>
                        )}
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                    <ToastContainer />
                </SkeletonTheme>
            </Suspense>
        </BrowserRouter>
    )
}
export default CheckRoutes