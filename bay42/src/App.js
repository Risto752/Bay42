import axios from "axios";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

import { Animacija } from "./Animacija";

import styled from "styled-components";

function App() {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [dummy, setDummy] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rowData, setRowData] = useState([
    {
      symbol: "",
      priceChange: "",
      priceChangePercent: "",
      weightedAvgPrice: "",
      prevClosePrice: "",
      lastPrice: 1,
      lastQty: 0.1,
      bidPrice: "",
      bidQty: "",
      askPrice: "",
      askQty: "",
      openPrice: "",
      highPrice: "",
      lowPrice: "",
      volume: "",
      quoteVolume: "",
      openTime: "",
      closeTime: "",
      firstId: 1,
      lastId: 1,
      count: 1,
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "symbol", sortable: true },
    { field: "priceChange", sortable: true },
    { field: "priceChangePercent", sortable: true },
    { field: "weightedAvgPrice", sortable: true },
    { field: "prevClosePrice", sortable: true },
    { field: "lastPrice", sortable: true },
    { field: "lastQty", sortable: true },
    { field: "bidPrice", sortable: true },
    { field: "bidQty", sortable: true },
    { field: "askPrice", sortable: true },
    { field: "askQty", sortable: true },
    { field: "openPrice", sortable: true },
    { field: "highPrice", sortable: true },
    { field: "lowPrice", sortable: true },
    { field: "volume", sortable: true },
    { field: "quoteVolume", sortable: true },
    { field: "openTime", sortable: true },
    { field: "closeTime", sortable: true },
    { field: "firstId", sortable: true },
    { field: "lastId", sortable: true },
    { field: "count", sortable: true },
  ]);

  useEffect(() => {
    getData(currentPage, postsPerPage);
  }, [dummy]);

  function getData(currentPage, postsPerPage) {
    setLoading(true);
    axios
      .get("https://data.binance.com/api/v3/ticker/24hr")
      .then((response) => {
        setAllData(response.data);

        const lastPostIndex = currentPage * postsPerPage;
        const firstPostIndex = lastPostIndex - postsPerPage;

        let arr = response.data.slice(firstPostIndex, lastPostIndex);

        var helpArr = [];

        for (let i = 0; i < postsPerPage; i++) {
          if (arr[i] === undefined) continue;

          let symbol = arr[i].symbol;
          let priceChange = arr[i].priceChange;
          let priceChangePercent = arr[i].priceChangePercent;
          let weightedAvgPrice = arr[i].weightedAvgPrice;
          let prevClosePrice = arr[i].prevClosePrice;
          let lastPrice = arr[i].lastPrice;
          let lastQty = arr[i].lastQty;
          let bidPrice = arr[i].bidPrice;
          let bidQty = arr[i].bidQty;
          let askPrice = arr[i].askPrice;
          let askQty = arr[i].askQty;
          let openPrice = arr[i].openPrice;
          let highPrice = arr[i].highPrice;
          let lowPrice = arr[i].lowPrice;
          let volume = arr[i].volume;
          let quoteVolume = arr[i].quoteVolume;
          let openTime = arr[i].openTime;
          let closeTime = arr[i].closeTime;
          let firstId = arr[i].firstId;
          let lastId = arr[i].lastId;
          let count = arr[i].count;

          let dateOpenObj = new Date(openTime).toDateString();

          let parts = dateOpenObj.split(" ");

          let day = parts[2];
          let month = parts[1];
          let year = parts[3];

          openTime = day + "/" + month + "/" + year;

          let dateCloseObj = new Date(closeTime).toDateString();

          let parts1 = dateCloseObj.split(" ");

          let day1 = parts1[2];
          let month1 = parts1[1];
          let year1 = parts1[3];

          closeTime = day1 + "/" + month1 + "/" + year1;

          const obj = {
            symbol,
            priceChange,
            priceChangePercent,
            weightedAvgPrice,
            prevClosePrice,
            lastPrice,
            lastQty,
            bidPrice,
            bidQty,
            askPrice,
            askQty,
            openPrice,
            highPrice,
            lowPrice,
            volume,
            quoteVolume,
            openTime,
            closeTime,
            firstId,
            lastId,
            count,
          };

          helpArr.push(obj);
        }

        setRowData(helpArr);
        setLoading(false);
      });
  }

  return (
    <>
      <div
        className="ag-theme-alpine"
        style={{ height: 900, display: loading ? "none" : "" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
        />
      </div>
      <div style={{ display: loading ? "" : "none" }}>
        <Animacija />
      </div>
      <div style={{ display: loading ? "none" : "" }}>
        <Pagination
          totalPosts={allData.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setDummy={setDummy}
          dummy={dummy}
        />
      </div>
    </>
  );
}

export default App;
