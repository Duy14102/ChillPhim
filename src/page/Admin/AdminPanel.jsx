import Cookies from "universal-cookie"
import "./AdminPanel.css"

function AdminPanel() {
    const token = new Cookies().get("TOKEN")
    if (!token) {
        window.location.href = "/404"
    }
    return (
        <></>
    )
}
export default AdminPanel