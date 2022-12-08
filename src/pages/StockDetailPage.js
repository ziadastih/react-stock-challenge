import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnhub from "../api/finnhub";
import { StockChart } from "../components/StockChart";
export const StockDetailPage = () => {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState([]);

  const formatData = (data) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  };

  useEffect(() => {
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const oneWeek = currentTime - 7 * 24 * 60 * 60;
    const oneYear = currentTime - 365 * 24 * 60 * 60;
    const oneDayAgo = currentTime - 24 * 60 * 60;
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneDayAgo,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol: symbol,
              from: oneYear,
              to: currentTime,
              resolution: 60,
            },
          }),
        ]);
        return setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
        </div>
      )}
    </div>
  );
};
