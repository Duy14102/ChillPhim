import "./LoadingSkeleton.css"

function LoadingSkeleton({ type }) {
    return (
        <div style={type === 1 ? { width: "100vw", height: "100vh" } : { width: "100%", height: "100%" }} className="loadingSkeleton">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
export default LoadingSkeleton