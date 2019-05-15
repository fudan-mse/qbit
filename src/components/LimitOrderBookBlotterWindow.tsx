import * as React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Bid",
    dataIndex: "bid",
    key: "bid"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  },
  { title: "Ask", dataIndex: "ask", key: "ask" }
];

const data = [
  { key: -4, bid: "", price: 33, ask: 100 },
  { key: -3, bid: "", price: 32, ask: 250 },
  { key: -2, bid: "", price: 31, ask: 1000 },
  { key: -1, bid: "", price: 30, ask: 100 },
  { key: 0, bid: "", price: 29, ask: "" },
  { key: 1, bid: 150, price: 28, ask: "" },
  { key: 2, bid: 200, price: 27, ask: "" },
  { key: 3, bid: 150, price: 26, ask: "" },
  { key: 4, bid: 90, price: 25, ask: "" }
];

export const LimitOrderBookBlotterWindow = () => (
  <Table columns={columns} dataSource={data} pagination={false} />
);
