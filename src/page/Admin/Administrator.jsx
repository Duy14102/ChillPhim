import { useReducer, useRef } from "react"
import "./Administrator.css"
import axios from "axios"
import Cookies from "universal-cookie"
import ToastUpdate from "../../component/Toastify/ToastUpdate"
import { toast } from "react-toastify"

function Administrator() {
    const cookies = new Cookies();
    const toastNow = useRef(null)
    const [state, setState] = useReducer((prev, next) => ({
        ...prev, ...next
    }), {
        username: "",
        password: "",
    })
    function login(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/adminLogin",
            data: {
                username: state.username,
                password: state.password
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            cookies.set("TOKEN", res.data.token, {
                path: "/",
            });
            window.location.href = "/AdminPanel"
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }
    return (
        <div className="administrator">
            <form onSubmit={(e) => login(e)}>
                <div className="loginTitle"><span>Đăng nhập</span></div>
                <div className="rowForm" style={{ marginTop: 20 }}>
                    <label htmlFor="username">Tài khoản</label>
                    <input id="username" type="text" name="username" placeholder="" onChange={(e) => setState({ username: e.target.value })} required />
                </div>
                <div className="rowForm">
                    <label htmlFor="password">Mật khẩu</label>
                    <input id="password" type="password" name="password" placeholder="" onChange={(e) => setState({ password: e.target.value })} required />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    )
}

export default Administrator