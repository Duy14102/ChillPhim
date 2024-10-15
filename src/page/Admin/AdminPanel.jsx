import "./AdminPanel.css"
import Cookies from "universal-cookie"
import axios from "axios"
import { lazy, useReducer, useRef, useEffect } from "react"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import ToastUpdate from "../../component/Toastify/ToastUpdate"
const ModalProps = lazy(() => import('../../component/modal/ModalProps'))
const ChangePassword = lazy(() => import('../../component/adminSide/ChangePassword'))
const AdminControl = lazy(() => import('../../component/adminSide/AdminControl'))
const CategoriesControl = lazy(() => import('../../component/adminSide/CategoriesControl'))
import AddFilm from '../../component/adminSide/AddFilm'
import AddEps from '../../component/adminSide/AddEps'
import UpdateEps from '../../component/adminSide/UpdateEps'
import FilmControl from "../../component/adminSide/FilmControl"
import DeleteMovie from "../../component/adminSide/DeleteMovie"
import UpdateFilm from "../../component/adminSide/UpdateFilm"
import SearchMainFilm from "../../component/adminSide/SearchMainFilm"

function AdminPanel() {
    const cookies = new Cookies()
    const decode = jwtDecode(cookies.get("TOKEN"))
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        optionsCollapse: false, searchMain: "", searchCateMain: "", searchAccMain: "",
        modalState: false,
        modalStateOptions: null,
        // Change password state
        showOldpass: false, showNewpass: false, oldPassword: "", newPassword: "",
        // Admin control state
        wantAddNewAdmin: false, newAdminUsername: "", newAdminPassword: "", newAdminShowPass: false, listAccounts: [],
        // Categories control state
        wantAddNewCate: false, newCateTitle: "", newCateContent: "", listCategories: [],
        // Add film state
        wantAddFilm: false, searchFilm: "", listAutoComplete: [], listCrew: null, movieData: null, newEps: [], epsTitle: "", epsUrl: "", epsIndex: null, movieTrailer: "", movieNote: "", movieAge: "", listCateMovie: [], servers: [], listAllCate: [], chooseTypeMovies: 1,
        // Film control state
        listMovies: null, viewMoreCate: false, indexMovie: null, deleteMovieId: null, movieKeysUpdate: null, wantUpdatePrevEps: false, wantUpdateOldEps: false, totalEps: null, movieSeason: "",
        // Paginate
        pageCount1: 6, pageCount2: 6, pageCount3: 6, pageCount4: 6
    })
    const limit = 10
    const currentPage1 = useRef(1)
    const currentPage2 = useRef(1)
    const currentPage3 = useRef(1)
    const currentPage4 = useRef(1)
    const dateNow = new Date().getHours('vi-VN')
    const welcomeTime = dateNow >= 4 && dateNow < 11 ? "☀️ Chào buổi sáng" : dateNow >= 11 && dateNow < 13 ? "🌤️ Chào buổi trưa" : dateNow >= 13 && dateNow < 18 ? "🌅 Chào buổi chiều" : dateNow >= 18 && dateNow < 22 ? "🌙 Chào buổi tối" : "💤 Chào buổi đêm"

    function callCategories(s) {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/v1/getCategories",
            params: {
                search: s,
                page: currentPage2.current,
                limit: limit,
            }
        }
        axios(configuration).then((res) => {
            setState({ listCategories: res.data.results.result, pageCount2: res.data.results.pageCount })
        })
    }

    function callMovies(s) {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/v1/getMovies",
            params: {
                search: s,
                page: currentPage1.current,
                limit: limit,
            }
        }
        axios(configuration).then((res) => {
            setState({ listMovies: res.data.results.result, pageCount1: res.data.results.pageCount })
        })
    }

    function logout() {
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/";
    }
    return (
        <div className="adminPanel">
            <header>
                <h1>{welcomeTime} <span style={{ color: "#94b1f2" }}>{decode.username}</span></h1>
                <div className="options">
                    <button onClick={() => setState({ optionsCollapse: state.optionsCollapse ? false : true })} style={{ rotate: state.optionsCollapse ? "90deg" : null }} type="button" className="expandOptions">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                    </button>
                    <div className={state.optionsCollapse ? "collapseOptions collapseOptionsActive" : "collapseOptions"}>
                        {decode.role === 1 ? (
                            <button onClick={() => setState({ modalState: true, modalStateOptions: 1 })} type="button" className="collapseOptionsChild">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304l91.4 0c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7l0 .9c0 9.2 2.7 18.5 7.9 26.3L29.7 512C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8l0 30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8l0-30.5c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9l0-30.5zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z" /></svg>
                                <p>Quản lý admin</p>
                            </button>
                        ) : null}
                        <button onClick={() => setState({ modalState: true, modalStateOptions: 2 })} type="button" className="collapseOptionsChild">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                            <p>Đổi mật khẩu</p>
                        </button>
                        <button onClick={() => logout()} type="button" className="collapseOptionsChild">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>
                            <p>Đăng xuất</p>
                        </button>
                    </div>
                </div>
            </header>
            <div className="bodyPanel">
                <div className="upperBody">
                    <SearchMainFilm type={1} search={state.searchMain} setState={setState} callBacks={callMovies} useEffect={useEffect} />
                    <div className="insideUpperBody">
                        {state.wantAddFilm ? (
                            <>
                                <button onClick={() => setState({ wantAddFilm: true })} type="submit" form="formMovieExists">✔</button>
                                <button onClick={() => setState({ wantAddFilm: false })} type="button">X</button>
                            </>
                        ) : (
                            <button onClick={() => setState({ wantAddFilm: true })} type="button">Thêm phim</button>
                        )}
                        <button onClick={() => setState({ modalState: true, modalStateOptions: 3 })} type="button">Quản lý danh mục</button>
                    </div>
                </div>
                {state.wantAddFilm ? (
                    <div className="midBody">
                        <AddFilm currentPage4={currentPage4} useEffect={useEffect} state={state} setState={setState} axios={axios} callMovies={callMovies} toast={toast} ToastUpdate={ToastUpdate} useRef={useRef} />
                    </div>
                ) : null}
                <FilmControl currentPage1={currentPage1} useEffect={useEffect} state={state} setState={setState} callMovies={callMovies} />
            </div>
            <ModalProps state={state} setState={setState}>
                {state?.modalStateOptions === 1 ? (
                    <AdminControl SearchMainFilm={SearchMainFilm} currentPage3={currentPage3} state={state} setState={setState} axios={axios} toast={toast} ToastUpdate={ToastUpdate} useRef={useRef} useEffect={useEffect} />
                ) : state?.modalStateOptions === 2 ? (
                    <ChangePassword state={state} setState={setState} decode={decode} axios={axios} toast={toast} ToastUpdate={ToastUpdate} useRef={useRef} />
                ) : state?.modalStateOptions === 3 ? (
                    <CategoriesControl currentPage2={currentPage2} SearchMainFilm={SearchMainFilm} state={state} setState={setState} toast={toast} axios={axios} ToastUpdate={ToastUpdate} useRef={useRef} callCategories={callCategories} useEffect={useEffect} />
                ) : state?.modalStateOptions === 4 ? (
                    <AddEps state={state} setState={setState} />
                ) : state?.modalStateOptions === 5 ? (
                    <UpdateEps state={state} setState={setState} />
                ) : state?.modalStateOptions === 6 ? (
                    <DeleteMovie state={state} setState={setState} axios={axios} callMovies={callMovies} toast={toast} ToastUpdate={ToastUpdate} useRef={useRef} />
                ) : (
                    <UpdateFilm useEffect={useEffect} state={state} setState={setState} callMovies={callMovies} AddEps={AddEps} UpdateEps={UpdateEps} axios={axios} toast={toast} ToastUpdate={ToastUpdate} useRef={useRef} />
                )}
            </ModalProps>
        </div>
    )
}
export default AdminPanel