import { useEffect } from "react"

function CategoriesControl({ state, setState, axios, toast, ToastUpdate, useRef,callCategories }) {
    const toastNow = useRef(null)

    useEffect(() => {
        callCategories()
    }, [])

    function addCategories(e) {
        e.preventDefault()
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/addCategories",
            data: {
                title: state.newCateTitle,
                content: state.newCateContent
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            setState({ newCateTitle: "", newCateContent: "", wantAddNewCate: false })
            callCategories()
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }

    function deleteCategories(title) {
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/deleteCategories",
            data: {
                title: title
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            callCategories()
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }
    return (
        <div className="categoriesControl">
            <div className="toolCate">
                <input type="text" placeholder="Tìm kiếm danh mục..." />
                {state.wantAddNewCate ? (
                    <>
                        <button type="submit" form="addNewCateDiv">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                        </button>
                        <button onClick={() => setState({ wantAddNewCate: false })} type="button" className="addNewButton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                        </button>
                    </>
                ) : (
                    <button onClick={() => setState({ wantAddNewCate: true })} type="button">Tạo mới</button>
                )}
            </div>
            {state.wantAddNewCate ? (
                <form onSubmit={(e) => addCategories(e)} id="addNewCateDiv" className="addNewCateDiv">
                    <div className="addNewCateDivChild">
                        <div className="coverInputAddNew">
                            <label htmlFor="title">Tiêu đề</label>
                            <input id="title" type="text" value={state.newCateTitle} onChange={(e) => setState({ newCateTitle: e.target.value })} required />
                        </div>
                        <div className="coverInputAddNew">
                            <label htmlFor="content">Mô tả</label>
                            <input id="content" type="text" value={state.newCateContent} onChange={(e) => setState({ newCateContent: e.target.value })} required />
                        </div>
                    </div>
                </form>
            ) : null}
            <table>
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        {state.listCategories.length > 0 ? (
                            <th></th>
                        ) : null}
                    </tr>
                </thead>
                <tbody>
                    {state.listCategories.length < 1 ? (
                        <tr>
                            <td colSpan={3}>Hiện chưa có danh mục nào !</td>
                        </tr>
                    ) : (
                        state.listCategories.map((i) => {
                            return (
                                <tr key={i._id}>
                                    <td>{i.title}</td>
                                    <td>{i.content}</td>
                                    <td>
                                        <button onClick={() => deleteCategories(i.title)} type="button" className="deleteAdminButton">
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
export default CategoriesControl