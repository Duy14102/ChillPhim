function SearchMainFilm({ search, setState, callBacks, useEffect, type }) {
    useEffect(() => {
        if (search !== "") {
            const debounceResult = setTimeout(() => {
                callBacks(search)
            }, 1000);
            return () => clearTimeout(debounceResult)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        } else {
            setTimeout(() => {
                callBacks("")
            }, 1000);
        }
    }, [search])
    return (
        <input value={search} onChange={(e) => setState(type === 1 ? { searchMain: e.target.value } : type === 2 ? { searchCateMain: e.target.value } : { searchAccMain: e.target.value })} type="text" placeholder={type === 1 ? "Tìm kiếm phim..." : type === 2 ? "Tìm kiếm danh mục..." : "Tìm kiếm tài khoản..."} />
    )
}
export default SearchMainFilm