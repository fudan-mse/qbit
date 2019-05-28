import * as React from "react";

import { AgGridReact } from "ag-grid-react";
import { Amendment } from "./Amendment";
import { CellClickedEvent } from "ag-grid-community/src/ts/events";
import * as SockJs from "sockjs-client";
import { Progress, Spin } from "antd";

const Stomp = require("stompjs/lib/stomp.js").Stomp;

export interface OrderBlotterWindowProps {
  history: any;
}

export interface OrderBlotterWindowState {
  connected: boolean;
  connecting: boolean;
  showAmendmentWindow: boolean;
  orders: any[];
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
    { headerName: "% Fill", field: "fillPercentage" },
    { headerName: "Destination", field: "market", resizeable: true },
    { headerName: "Status", field: "status", resizeable: true }
  ],
  rowData: require("../cache/orders.json")
};

export class OrderBlotterWindow extends React.Component<
  OrderBlotterWindowProps,
  OrderBlotterWindowState
> {
  state = {
    showAmendmentWindow: false,
    connected: false,
    connecting: true,
    orders: data.rowData
  };

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
      this.props.history.push("/en/blotter/" + event.data.symbol);
      return false;
    }

    this.amend();
  };

  componentDidMount() {
    console.log("new socket ing...");
    const socket = new SockJs("http://moms.forexai.cn/gs-guide-websocket");
    console.log("socket = ", socket);
    const stompClient = Stomp.over(socket);
    console.log("stompClient = ", stompClient);

    stompClient.connect(
      {},
      (frame: any) => {
        console.log("Connected: " + frame);
        this.setState({ connected: true, connecting: false });

        stompClient.subscribe("/topic/order/live", (res: any) => {
          this.setState({ orders: JSON.parse(res.body) });
          for (let i = 0; i < this.state.orders.length; i++) {
            console.log(this.state.orders[i]);
          }
        });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.connecting && <Spin />}
        <div>
          {!this.state.connected &&
            !this.state.connecting && (
              <Progress
                strokeLinecap="square"
                type="dashboard"
                percent={0}
                status="exception"
              />
            )}
          {this.state.connected && (
            <Progress strokeLinecap="square" type="dashboard" percent={100} />
          )}
        </div>
        <div
          className="ag-theme-balham"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact
            columnDefs={data.columnDefs}
            rowData={this.state.orders}
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
      </div>
    );
  }
}
