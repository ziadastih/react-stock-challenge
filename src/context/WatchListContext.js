import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList((prevWatchList) => {
        return [...prevWatchList, stock];
      });
    }
  };

  const deleteStock = (stock) => {
    const newWatchList = watchList.filter((el) => el !== stock);
    setWatchList(newWatchList);
  };

  return (
    <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
