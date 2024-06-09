import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { FaTemperatureHigh } from "react-icons/fa6";
import revenueData from "../data/revenueData.json";
import sourceData from "../data/sourceData.json";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import React from "react";
import { Switch } from "antd";
import { PiFanFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";
import Swal from "sweetalert2";
import DataSenior from "../data/dataSenior.json";

const DashBoard = () => {
  const [temp, setTemp] = useState("");
  const [active, setActive] = useState(false);
  const [light, setLight] = useState(false);
  const [humid, setHumid] = useState("");
  const [data, setData] = useState(null);
  const [bri, setBri] = useState("");
  useEffect(() => {
    setData(DataSenior);
    if (data) {
      const interval = setInterval(() => {
        setTemp(data[Math.floor(Math.random() * data.length)].temp);
        setHumid(data[Math.floor(Math.random() * data.length)].humid);
        setBri(data[Math.floor(Math.random() * data.length)].light);
      }, 3000);
      return () => clearInterval(interval);
    }
  });
  console.log();
  const onclick = () => {
    setActive((prevActive) => !prevActive);
  };
  const handleLamp = () => {
    setLight((prevLight) => !prevLight);
  };
  const getGradientColor = (value, minValue, maxValue, color1, color2) => {
    const percent = (value - minValue) / (maxValue - minValue);
    const red = Math.round(color1[0] + percent * (color2[0] - color1[0]));
    const green = Math.round(color1[1] + percent * (color2[1] - color1[1]));
    const blue = Math.round(color1[2] + percent * (color2[2] - color1[2]));
    return `rgb(${red},${green},${blue})`;
  };
  useEffect(() => {
    if (data) {
      const temperatureGradientColor = getGradientColor(
        temp,
        0,
        40,
        [33, 150, 243],
        [255, 87, 34]
      );

      const humidityGradientColor = getGradientColor(
        humid,
        0,
        100,
        [100, 255, 100],
        [255, 0, 0] //
      );

      const lightIntensityGradientColor = getGradientColor(
        bri,
        0,
        100,
        [255, 255, 100],
        [255, 255, 255]
      );

      document.getElementById("temperatureBox").style.background =
        temperatureGradientColor;
      document.getElementById("humidityBox").style.background =
        humidityGradientColor;
      document.getElementById("lightIntensityBox").style.background =
        lightIntensityGradientColor;
    }
  }, [temp, humid, bri]);

  return (
    <div>
      {data && (
        <div className="App h-[92vh]">
          <div
            className="dataCard degree bg-degree center-item"
            id="temperatureBox"
          >
            <div className="font-size center-item ">
              {temp}°C <FaTemperatureHigh />
            </div>
          </div>
          <div id="humidityBox" className="dataCard humid center-item bg-humid">
            <div className="center-item font-size">
              {humid} <WiHumidity />
            </div>
          </div>
          <div
            className="dataCard light center-item bg-light"
            id="lightIntensityBox"
          >
            <div className="center-item font-size">
              {bri}% <CiLight />
            </div>
          </div>
          <div className="dataCard chart ">
            <Line
              height="38"
              width="100"
              data={{
                labels: revenueData.map((data) => data.label),
                datasets: [
                  {
                    label: "Humidity",
                    data: revenueData.map((data) => data.revenue),
                    backgroundColor: "#064FF0",
                    borderColor: "#064FF0",
                  },
                  {
                    label: "Temperature",
                    data: revenueData.map((data) => data.cost),
                    backgroundColor: "#FF3030",
                    borderColor: "#FF3030",
                  },
                  {
                    label: "Light",
                    data: revenueData.map((data) => data.price),
                    backgroundColor: "#fcfc03",
                    borderColor: "#fcfc03",
                  },
                ],
              }}
              options={{
                elements: {
                  line: {
                    tension: 0.5,
                  },
                },
                plugins: {
                  title: {
                    text: "Monthly Revenue & Cost",
                  },
                },
              }}
            />
          </div>
          <div className="dataCard fan font-size-fan center-item ">
            <div className="center-item font-size-fan color-fan gap ">
              <PiFanFill className={active ? "active " : ""} />
              <Switch onClick={onclick} />
            </div>
          </div>
          <div className="dataCard lamp font-size-fan center-item ">
            <div className="center-item font-size-fan color-fan gap ">
              <FaLightbulb className={light ? "light " : ""} />
              <Switch onClick={handleLamp} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
