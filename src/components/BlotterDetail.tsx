import * as React from "react";
import { LimitOrderBookBlotterWindow } from "./LimitOrderBookBlotterWindow";

export class BlotterDetail extends React.Component {
  render() {
    return (
      <div>
        <h2>Blotter Detail</h2>
        <LimitOrderBookBlotterWindow />
      </div>
    );
  }
}
