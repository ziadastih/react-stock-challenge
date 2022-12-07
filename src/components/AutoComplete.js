import { useState, useEffect } from "react";
import finnhub from "../api/finnhub";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });

        return setResults(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    search.length > 0 ? fetchData() : setResults([]);
  }, [search]);

  const resultsMap = results.map((result) => {
    return (
      <li className="dropdown-item" key={result.symbol}>
        {result.description} ({result.symbol})
      </li>
    );
  });

  const searchFunc = (e) => {
    return setSearch(e.target.value);
  };

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145,158,171,0.04" }}
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={searchFunc}
        />
        <label htmlFor="search">Search</label>
        {results.length > 0 && (
          <ul
            style={{
              height: "500px",
              overflowY: "scroll",
              overflowX: "hidden",
              cursor: "pointer",
            }}
            className="dropdown-menu show"
          >
            {resultsMap}
          </ul>
        )}
      </div>
    </div>
  );
};
