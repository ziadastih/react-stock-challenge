import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("24h");
  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;

      case "7d":
        return week;

      case "1y":
        return year;

      default:
        return day;
    }
  };

  const options = {
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animation: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButtonSelect = (button) => {
    const selected = "btn m-1 btn-primary";
    const notSelected = "btn m-1 btn-outline-primary";
    return button === dateFormat ? selected : notSelected;
  };

  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <button
        className={renderButtonSelect("24h")}
        onClick={() => setDateFormat("24h")}
      >
        day
      </button>
      <button
        className={renderButtonSelect("7d")}
        onClick={() => setDateFormat("7d")}
      >
        week
      </button>
      <button
        className={renderButtonSelect("1y")}
        onClick={() => setDateFormat("1y")}
      >
        year
      </button>
    </div>
  );
};
