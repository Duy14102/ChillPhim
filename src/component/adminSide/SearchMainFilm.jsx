function SearchMainFilm({ state, setState, callMovies, useEffect }) {
    useEffect(() => {
        if (state.searchMain !== "") {
            const debounceResult = setTimeout(() => {
                callMovies(state.searchMain)
            }, 1000);
            return () => clearTimeout(debounceResult)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        } else {
            setTimeout(() => {
                callMovies("")
            }, 1000);
        }
    }, [state.searchMain])
    return (
        <input value={state.searchMain} onChange={(e) => setState({ searchMain: e.target.value })} type="text" placeholder="Tìm kiếm phim..." />
    )
}
export default SearchMainFilm