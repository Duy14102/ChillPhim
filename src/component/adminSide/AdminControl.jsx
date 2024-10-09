function AdminControl({ state, setState, axios, toast, ToastUpdate, useRef, useEffect }) {
    const eyeSlashPath = "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
    const eyeNormalPath = "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
    const toastNow = useRef(null)

    function callAccount() {
        const configuration = {
            method: "get",
            url: "http://localhost:3000/api/v1/getAccounts"
        }
        axios(configuration).then((res) => {
            setState({ listAccounts: res.data })
        })
    }

    useEffect(() => {
        callAccount()
    }, [])

    function addAccount(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/addAccount",
            data: {
                username: state.newAdminUsername,
                password: state.newAdminPassword
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            setState({ newAdminUsername: "", newAdminPassword: "", wantAddNewAdmin: false })
            callAccount()
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }

    function deleteAccount(username) {
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/deleteAccount",
            data: {
                username: username
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            callAccount()
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }

    return (
        <div className="adminControl">
            <div className="upperControl">
                <input type="text" placeholder="Tìm kiếm tên..." />
                {state.wantAddNewAdmin ? (
                    <>
                        <button type="submit" className="addNewButton" form="addNewDiv">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                        </button>
                        <button onClick={() => setState({ wantAddNewAdmin: false })} type="button" className="addNewButton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </button>
                    </>
                ) : (
                    <button onClick={() => setState({ wantAddNewAdmin: true })} type="button" className="addNewButton">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" /></svg>
                    </button>
                )}
            </div>
            {state.wantAddNewAdmin ? (
                <form onSubmit={(e) => addAccount(e)} id="addNewDiv" className="addNewDiv">
                    <div className="addNewDivChild">
                        <div className="coverInputAddNew">
                            <label htmlFor="usernameNew">Tài khoản</label>
                            <input id="usernameNew" type="text" value={state.newAdminUsername} onChange={(e) => setState({ newAdminUsername: e.target.value })} required />
                        </div>
                        <div className="coverInputAddNew">
                            <label htmlFor="passwordNew">Mật khẩu</label>
                            <div className="addNewPasswordCover">
                                <input id="passwordNew" type={state.newAdminShowPass ? "text" : "password"} value={state.newAdminPassword} onChange={(e) => setState({ newAdminPassword: e.target.value })} required />
                                <button onClick={() => setState({ newAdminShowPass: state.newAdminShowPass ? false : true })} type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox={state.newAdminShowPass ? "0 0 640 512" : "0 0 576 512"}><path d={state.newAdminShowPass ? eyeSlashPath : eyeNormalPath} /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : null}
            <table>
                <thead>
                    <tr>
                        <th>Tài khoản</th>
                        <th>Ngày tạo</th>
                        {state.listAccounts.length > 0 ? (
                            <th></th>
                        ) : null}
                    </tr>
                </thead>
                <tbody>
                    {state.listAccounts.length < 1 ? (
                        <tr>
                            <td colSpan={3}>Hiện chưa có tài khoản admin nào !</td>
                        </tr>
                    ) : (
                        state.listAccounts.map((i) => {
                            return (
                                <tr key={i._id}>
                                    <td>{i.username}</td>
                                    <td>{new Date(i.createdAt).toLocaleString('vi-VN')}</td>
                                    <td>
                                        <button onClick={() => deleteAccount(i.username)} type="button" className="deleteAdminButton">
                                            <svg className="deleteSvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default AdminControl