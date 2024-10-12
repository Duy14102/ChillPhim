import { useEffect, useState } from "react";
import './Header.css'

function Header() {
    const [state, setState] = useState()
    useEffect(() => {
        const header = document.querySelector("header");
        window.addEventListener('scroll', e => {
            header.style.background = window.scrollY > 150 ? '#25272C' : '#202124';
            header.style.position = window.scrollY > 150 ? 'fixed' : "absolute";
        });
        fetch("http://localhost:3000/api/v1/getAllCategories").then((resa) => resa.json().then((res) => {
            setState(res)
        })).catch(() => console.log("Categories empty!"))
    }, [])
    return (
        <header>
            <div className="coverHeader">
                <a className="headerBrand" href="/">
                    <div className="headerBrandName">ChillPhim</div>
                    <div className="headerBrandSlogan"><span>Chill & Phim</span></div>
                </a>
                <div className="headerSearch">
                    <button className="headerButtonSearch">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                    </button>
                    <input type="text" placeholder="Tìm kiếm..." />
                </div>
            </div>
            <div className="headerGate">
                <a href="/" className="headerGateChild aloneGate">Trang chủ</a>
                <div className="headerGateChild genresGate">Thể loại ▼
                    <div className="genresGateChild" style={{ left: 0 }}>
                        {state?.filter((item) => item.title !== "Anime" && item.title !== "TV Show").map((i) => {
                            return (
                                <a key={i.title} href={`/List/Genres/${i.title}/${i.title}/NF`}>{i.title}</a>
                            )
                        })}
                    </div>
                </div>
                <div className="headerGateChild nationGate">Quốc gia ▼
                    <div className="nationGateChild">
                        <a href="/List/National/VN/Việt Nam/NF">Việt Nam</a>
                        <a href="/List/National/US UK/Âu - Mỹ/NF">Âu - Mỹ</a>
                        <a href="/List/National/TH/Thái Lan/NF">Thái Lan</a>
                        <a href="/List/National/CN/Trung Quốc/NF">Trung Quốc</a>
                        <a href="/List/National/KR/Hàn Quốc/NF">Hàn Quốc</a>
                        <a href="/List/National/JP/Nhật Bản/NF">Nhật Bản</a>
                        <a href="/List/National/IN/Ấn Độ/NF">Ấn Độ</a>
                        <a href="/List/National/FR/Pháp/NF">Pháp</a>
                        <a href="/List/National/All/Khác/NF">Khác</a>
                    </div>
                </div>
                <a href="/List/Type/Series/Phim Bộ/NF" className="headerGateChild aloneGate">Phim bộ</a>
                <a href="/List/Type/Single/Phim lẻ/NF" className="headerGateChild aloneGate">Phim lẻ</a>
                <a href="/List/Genres/Anime/Anime/NF" className="headerGateChild aloneGate">Anime</a>
            </div>
        </header>
    )
}
export default Header