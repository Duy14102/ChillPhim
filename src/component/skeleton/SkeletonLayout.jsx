import Skeleton from "react-loading-skeleton"

function SkeletonLayout({ children, count, state }) {
    return (
        state ? (
            children
        ) : (
            <Skeleton count={count} />
        )
    )
}
export default SkeletonLayout