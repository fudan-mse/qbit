import * as React from "react";
import { OrderBlotterWindow } from "./OrderBlotterWindow";

export default class Orders extends React.Component {
  render() {
    return (
      <div>
        <h1>Order Blotter</h1>
        <OrderBlotterWindow />
      </div>
    );
  }
}
