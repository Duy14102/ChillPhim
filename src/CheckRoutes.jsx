import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cookies from "universal-cookie"
const Layout = lazy(() => import('./Layout.jsx'))
const Home = lazy(() => import('./page/Home/App.jsx'))
const Information = lazy(() => import('./page/Information/Information.jsx'))
const Streaming = lazy(() => import('./page/Streaming/Streaming.jsx'))
const Administrator = lazy(() => import('./page/Admin/Administrator.jsx'))
const AdminPanel = lazy(() => import('./page/Admin/AdminPanel.jsx'))
const NotFound = lazy(() => import('./page/NotFound/NotFound.jsx'))
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckRoutes() {
    const cookies = new Cookies().get("TOKEN")
    return (
        <BrowserRouter>
            <Routes>
                {cookies ? (
                    <Route index element={<AdminPanel />} />
                ) : (
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='/Information/:Name' element={<Information />} />
                        <Route path='/Streaming/:Name/:Ep' element={<Streaming />} />
                    </Route>
                )}
                <Route path='/Administrator' element={<Administrator />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    )
}
export default CheckRoutes