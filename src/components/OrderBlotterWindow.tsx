import * as React from "react";

import { AgGridReact } from "ag-grid-react";
import { Amendment } from "./Amendment";
import { CellClickedEvent } from "ag-grid-community/src/ts/events";
export interface OrderBlotterWindowProps {
  history: any;
}

const data = {
  columnDefs: [
    {
      headerName: "Symbol",
      field: "symbol",
      resizeable: true
    },
    {
      headerName: "Side",
      field: "side"
    },
    {
      headerName: "Price",
      field: "price"
    },
    { headerName: "Qty", field: "quantity" },
    { headerName: "Client", field: "client" },
    { headerName: "% Fill", field: "fill" },
    { headerName: "Destination", field: "destination", resizeable: true },
    { headerName: "Status", field: "status", resizeable: true }
  ],
  rowData: [
    {
      symbol: "600001",
      side: "Buy",
      price: 10,
      quantity: 100,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "New"
    },
    {
      symbol: "600001",
      side: "Sell",
      price: 11.1,
      quantity: 101,
      client: "BCD",
      fill: 10,
      destination: "SSE",
      status: "Fill"
    },
    {
      symbol: "600002",
      side: "Buy",
      price: 10,
      quantity: 1000,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "Rejected by Exchange"
    },
    {
      symbol: "600001",
      side: "Buy",
      price: 12,
      quantity: 100,
      client: "Bridgewater",
      fill: 100,
      destination: "SSE",
      status: "Cancelled"
    },
    {
      symbol: "600001",
      side: "Buy",
      price: 10,
      quantity: 100,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "New"
    },
    {
      symbol: "600001",
      side: "Buy",
      price: 10,
      quantity: 100,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "New"
    },
    {
      symbol: "600001",
      side: "Buy",
      price: 10,
      quantity: 100,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "New"
    },
    {
      symbol: "600001",
      side: "Buy",
      price: 10,
      quantity: 100,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "New"
    },
    {
      symbol: "600001",
      side: "Buy",
      price: 10,
      quantity: 100,
      client: "ABC",
      fill: 0,
      destination: "SSE",
      status: "New"
    }
  ]
};

export class OrderBlotterWindow extends React.Component<
  OrderBlotterWindowProps
> {
  state = { showAmendmentWindow: false };

  onGridReady = (params: { api: any }) => {
    params.api.sizeColumnsToFit();
  };

  amend = () => {
    this.setState({
      showAmendmentWindow: true
    });
  };
  gotoLimitBlotter = (event: CellClickedEvent) => {
    if (event.column.getColId() === "symbol") {
      this.props.history.push(
        process.env.ASSET_PATH + "en/blotter/" + event.data.symbol
      );
      return false;
    }

    this.amend();
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{ height: "400px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={data.columnDefs}
          rowData={data.rowData}
          defaultColDef={{ resizable: true }}
          onGridReady={this.onGridReady}
          onCellClicked={this.gotoLimitBlotter.bind(this)}
        />
        <Amendment
          visible={this.state.showAmendmentWindow}
          onOK={() => this.setState({ showAmendmentWindow: false })}
          onCancel={() => this.setState({ showAmendmentWindow: false })}
        />
      </div>
    );
  }
}
