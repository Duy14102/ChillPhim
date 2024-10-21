import { Pie } from "react-chartjs-2"

function DoughnutChart({ data }) {
    return (
        <Pie height={"100%"} width={"100%"}
            data={{
                labels: data?.cateLabel,
                datasets: [{
                    data: data?.cateData,
                }]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: "#999",
                            font: {
                                family: "Roboto",
                                size: 15
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: "Số lượng phim theo danh mục",
                        font: {
                            family: "Roboto",
                            weight: 400,
                            size: 18
                        },
                        color: "#fff"
                    },
                    colors: {
                        forceOverride: true
                    }
                }
            }}
        />
    )
}
export default DoughnutChart