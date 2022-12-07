import { useState, useEffect } from "react";
import finnhub from "../api/finnhub";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
export const StockList = () => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stock, setStock] = useState([]);

  // -==============use effect  =============================

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((company) => {
            return finnhub.get("/quote", {
              params: {
                symbol: company,
              },
            });
          })
        );
        const data = responses.map((response) => {
          return { data: response.data, symbol: response.config.params.symbol };
        });
        return setStock(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const stockMap = stock.map((stockD) => {
    const stockData = stockD.data;
    return (
      <tr className="table-row" key={stockD.symbol}>
        <th scope="row">{stockD.symbol}</th>
        <td>{stockData.c}</td>
        <td className={stockData.d > 0 ? "text-success" : "text-danger"}>
          {stockData.d}
          {stockData.d > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        </td>
        <td className={stockData.d > 0 ? "text-success" : "text-danger"}>
          {stockData.dp}
          {stockData.d > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
        </td>
        <td>{stockData.h}</td>
        <td>{stockData.l}</td>
        <td>{stockData.o}</td>
        <td>{stockData.pc}</td>
      </tr>
    );
  });
  // ===============html body  =============================

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>

        <tbody>{stockMap}</tbody>
      </table>
    </div>
  );
};
