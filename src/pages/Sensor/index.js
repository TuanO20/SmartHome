import { Chart as ChartJS, CategoryScale, LineElement, PointElement, LinearScale, Title, defaults } from "chart.js";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { Line } from "react-chartjs-2";
import { useState } from "react";




function Sensor() {
    // defaults.responsive = true;
    // defaults.plugins.title.display = true;
    // defaults.plugins.title.align = "center";
    // defaults.plugins.title.font.size = "15px";
    // defaults.plugins.title.color = "black";

    ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title);

    var tempChart = document.getElementsByTagName("canvas")[0];
    var humidChart = document.getElementsByTagName("canvas")[1];
    //console.log(chart);

    onValue(ref(db, '/sensor/sensor-1'), (snapshot) => {
        // Convert Object into array
        var temp = Object.values(snapshot.val());
        var newValue = temp[temp.length - 1];

        var timeStamp = newValue.timeStamp;
        var tempValue = newValue.tempValue;
        var humidValue = newValue.humidValue;
        
        // tempChart.data.datasets.push(tempValue);
        // tempChart.update();
        console.log(tempChart);
        
    });

    return (
        <>
            <h3>Temperature & Humidity</h3>
            <div className="container-sensors" style={{display: "flex", justifyContent: "space-around", marginTop: "80px", marginLeft: "30px"}}>
                
                <div className="tempChart" style={{width: "40%"}}>
                    <Line
                        data={{
                            labels: ["10:20", "10:21", "10:22", "10:23", "10:24", "10:25"],
                            datasets: [
                                {
                                    label: "Temperature",
                                    data: [20, 25, 30, 27, 23, 50],
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    pointStyle: "circle",
                                    pointRadius: 5,
                                    pointHoverRadius: 8
                                }
                            ]
                        }}
                        options={{
                            plugins: {
                                title: {
                                    font: {
                                        size: 15
                                    },
                                    
                                    display: true,
                                    align: "center",
                                    text: "Temperature"
                                }
                            },
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Time',
                                        color: "darkblue"
                                    }
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: 'Temperature (℃)',
                                        color: "darkblue"
                                    },
                                    suggestedMin: 0,
                                    suggestedMax: 60
                                }
                            }
                        }}
                    ></Line>
                </div>

                <div className="humidChart" style={{width: "40%"}}>
                    <Line
                            data={{
                                labels: ["10:20", "10:21", "10:22", "10:23", "10:24", "10:25"],
                                datasets: [
                                    {
                                        label: "Temperature",
                                        data: [40, 75, 73, 80, 77, 75],
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        pointStyle: "circle",
                                        pointRadius: 5,
                                        pointHoverRadius: 8
                                    }
                                ]
                            }}
                            options={{
                                plugins: {
                                    title: {
                                        font: {
                                            size: 15
                                        },
                                        align: 'center',
                                        display: true,
                                        text: "Humidity"
                                    }
                                },
                                scales: {
                                    x : {
                                        title: {
                                            display: true,
                                            text: 'Time',
                                            color: "darkblue"
                                        }
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Humidity',
                                            color: "darkblue"
                                        },
                                        suggestedMin: 0,
                                        suggestedMax: 100
                                    }
                                }
                            }}
                        ></Line>
                </div>
            </div>
        </>
    );
}

export default Sensor;
