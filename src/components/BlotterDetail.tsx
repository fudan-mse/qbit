import * as React from "react";
import { LimitOrderBookBlotterWindow } from "./LimitOrderBookBlotterWindow";

export interface BlotterDetailProps {
  match: {
    params: any;
  };
}

export class BlotterDetail extends React.Component<BlotterDetailProps> {
  render() {
    const {
      match: {
        params: { symbol }
      }
    } = this.props;

    return (
      <div>
        <h2>Blotter Detail of {symbol}</h2>
        <LimitOrderBookBlotterWindow />
      </div>
    );
  }
}
