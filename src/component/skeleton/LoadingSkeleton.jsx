import loadingGif from "../../assets/loading.gif"
function LoadingSkeleton({ type }) {
    return (
        <div style={type === 1 ? { width: "100vw", height: "100vh" } : { width: "100%", height: "100%" }} className="loadingSkeleton">
            <img alt="loading..." src={loadingGif} />
        </div>
    )
}
export default LoadingSkeleton