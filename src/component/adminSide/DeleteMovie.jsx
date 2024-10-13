function DeleteMovie({ state, setState, axios, callMovies, toast, ToastUpdate, useRef }) {
    const toastNow = useRef(null)

    function deleteMovies() {
        toastNow.current = toast.loading("Chờ một chút...")
        const configuration = {
            method: "post",
            url: "http://localhost:3000/api/v1/deleteMovies",
            data: {
                title: state.deleteMovieId
            }
        }
        axios(configuration).then((res) => {
            ToastUpdate({ type: 1, message: res.data.message, refCur: toastNow.current })
            setState({ modalState: false, modalStateOptions: null, deleteMovieTitle: null })
            callMovies()
        }).catch((err) => {
            ToastUpdate({ type: 2, message: err.response.data.message, refCur: toastNow.current })
        })
    }
    return (
        <div className="deleteFilmProps">
            <h3>Bạn chắc chắn chứ?</h3>
            <span>
                <button onClick={() => deleteMovies()} type="button">Có</button>
                <button onClick={() => setState({ modalState: false, modalStateOptions: null, deleteMovieTitle: null })} type="button">Không</button>
            </span>
        </div>
    )
}
export default DeleteMovie