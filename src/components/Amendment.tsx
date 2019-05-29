import * as React from "react";
import { Modal } from "antd";
import { EnhancedOrderForm } from "./OrderForm";
export interface AmendmentModalProps {
  visible: boolean;
  onCancel: () => void;
  onOK: () => void;
  order: any;
}

let data = {
  columnDefs: [
    {
      headerName: "Key",
      field: "key"
    },
    { headerName: "Value", field: "value" }
  ],
  rowData: [
    {
      key: "Symbol",
      value: "600001"
    },
    {
      key: "Side",
      value: "Buy"
    },
    {
      key: "Price",
      value: "10"
    },
    {
      key: "Qty",
      value: 100
    },
    { key: "Client", value: "ABC" },
    { key: "Destination", value: "SSE" }
  ]
};

const AmendmentComponent = (props: AmendmentModalProps) => {
  const { order } = props;

  data.rowData = [
    { key: "Symbol", value: order.symbol },
    { key: "Side", value: order.operation },
    { key: "Price", value: order.price },
    { key: "Qty", value: order.lots },
    { key: "Client", value: order.client },
    { key: "Destination", value: order.market }
  ];

  console.log("props.order = ", props.order, Object.entries(props.order));

  return (
    <Modal
      title={
        JSON.stringify(props.order) !== "{}" ? "Amendment" : "Place a new order"
      }
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={props.onOK}
    >
      <div>
        <EnhancedOrderForm
          symbol={order.symbol}
          side={order.operation}
          client={order.client}
          destination={order.market}
          price={order.price}
          qty={order.lots}
        />
      </div>
    </Modal>
  );
};

export const Amendment = AmendmentComponent;
