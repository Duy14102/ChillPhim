import './Header.css'
import { useEffect, useReducer } from "react";
import axios from "axios";
import ModalProps from "../modal/ModalProps"

function Header() {
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        categories: [],
        search: "",
        searchResults: [],
        showBars: false,
        modalState: false
    })
    useEffect(() => {
        const header = document.querySelector("header");
        window.addEventListener('scroll', e => {
            header.style.background = window.scrollY > 200 ? '#25272C' : '#202124';
            header.style.position = window.scrollY > 200 ? 'fixed' : "absolute";
        });
        fetch(`${process.env.REACT_APP_BACKENDAPI}/api/v1/getAllCategories`).then((resa) => resa.json().then((res) => {
            setState({ categories: res })
        })).catch(() => console.log("Categories empty!"))
    }, [])

    useEffect(() => {
        if (state.search !== "") {
            const debounceResult = setTimeout(() => {
                autoCompleteSearch(state.search)
            }, 1000);
            return () => clearTimeout(debounceResult)
        } else {
            setTimeout(() => {
                setState({ searchResults: [] })
            }, 1000);
        }
    }, [state.search])

    function autoCompleteSearch(e) {
        const configuration = {
            method: "get",
            url: `${process.env.REACT_APP_BACKENDAPI}/api/v1/headerAutoComplete`,
            params: {
                search: e
            }
        }
        axios(configuration).then((res) => {
            setState({ searchResults: res.data })
        })
    }
    return (
        <header>
            <div className="coverHeader">
                <a className="headerBrand" href="/">
                    <div className="headerBrandName">ChillPhim</div>
                    <div className="headerBrandSlogan"><span>Chill & Phim</span></div>
                </a>
            </div>
            <div className="headerGate">
                <button style={{ rotate: state.showBars ? "90deg" : null }} onClick={() => setState({ showBars: state.showBars ? false : true })} type='button' className='responsiveClass headerBarsButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" /></svg>
                </button>
                <div style={window.innerWidth < 1550 && !state.showBars ? { opacity: 0, visibility: "hidden" } : window.innerWidth < 1550 && state.showBars ? { opacity: 1, visibility: "visible" } : null} className='headerGateChildCover'>
                    <div onClick={() => setState({ modalState: true })} className="headerButtonSearch headerGateChild aloneGate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                        <span>Tìm kiếm</span>
                    </div>
                    <a href="/" className="headerGateChild aloneGate">Trang chủ</a>
                    <div className="headerGateChild genresGate">Thể loại ▼
                        <div className="genresGateChild">
                            {state.categories?.filter((item) => item.title !== "Anime" && item.title !== "TV Show").map((i) => {
                                return (
                                    <a key={i.title} href={`/ChillPhim/List/Genres/${i.title}/${i.title}/NF`}>{i.title}</a>
                                )
                            })}
                        </div>
                    </div>
                    <div className="headerGateChild nationGate">Quốc gia ▼
                        <div className="nationGateChild">
                            <a href="/ChillPhim/List/National/VN/Việt Nam/NF">Việt Nam</a>
                            <a href="/ChillPhim/List/National/US UK/Âu - Mỹ/NF">Âu - Mỹ</a>
                            <a href="/ChillPhim/List/National/TH/Thái Lan/NF">Thái Lan</a>
                            <a href="/ChillPhim/List/National/CN/Trung Quốc/NF">Trung Quốc</a>
                            <a href="/ChillPhim/List/National/KR/Hàn Quốc/NF">Hàn Quốc</a>
                            <a href="/ChillPhim/List/National/JP/Nhật Bản/NF">Nhật Bản</a>
                            <a href="/ChillPhim/List/National/IN/Ấn Độ/NF">Ấn Độ</a>
                            <a href="/ChillPhim/List/National/FR/Pháp/NF">Pháp</a>
                            <a href="/ChillPhim/List/National/All/Khác/NF">Khác</a>
                        </div>
                    </div>
                    <a href="/ChillPhim/List/Type/Series/Phim Bộ/NF" className="headerGateChild aloneGate">Phim bộ</a>
                    <a href="/ChillPhim/List/Type/Single/Phim lẻ/NF" className="headerGateChild aloneGate">Phim lẻ</a>
                    <a href="/ChillPhim/List/Genres/Anime/Anime/NF" className="headerGateChild aloneGate">Anime</a>
                </div>
            </div>
            <ModalProps state={state} setState={setState}>
                <input className='headerInputSearch' type="text" placeholder="Tìm kiếm phim..." value={state.search} onChange={(e) => setState({ search: e.target.value })} />
                {state.searchResults.length > 0 ? (
                    <div className="autoCompleteHeader">
                        {state.searchResults.map((i) => {
                            return (
                                <a href={`/ChillPhim/Information/${i.subtitle}`} key={i._id} className="autoCompleteChild">
                                    <img alt={i.title} src={i.banner.vertical} />
                                    <div className="autoCompleteChildIn4">
                                        <h3>{i.title}</h3>
                                        <p>{i.subtitle}</p>
                                        <span>Năm: <span style={{ color: "#fff" }}>{i.timeProduce.slice(0, 4)}</span> - Rating: <span style={{ color: "#fff" }}>{i.imdbScore}</span>/10</span>
                                    </div>
                                </a>
                            )
                        })}
                        <a href={`/ChillPhim/List/Search/${state.search}/Tìm kiếm/NF`} className='toAllSearch'>Xem tất cả</a>
                    </div>
                ) : null}
            </ModalProps>
        </header>
    )
}
export default Header