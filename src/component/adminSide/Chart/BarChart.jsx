import { Bar } from "react-chartjs-2";

function BarChart({ titleLabel, data }) {
    return (
        <Bar
            data={{
                labels: data?.movieLabel,
                datasets: [
                    {
                        label: `${titleLabel}`,
                        backgroundColor: [
                            "#94b1f2"
                        ],
                        data: data?.movieData,
                        barPercentage: 0.9,
                        categoryPercentage: 1,
                    }
                ]
            }}
            options={{
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: "#fff",
                            font: {
                                family: "Roboto",
                                size: 16
                            },
                        }
                    }
                },
            }}
        />
    )
}

export default BarChart