import * as React from "react";
import { Form, Input, Modal } from "antd";
import { AgGridReact } from "ag-grid-react";
export interface AmendmentModalProps {
  visible: boolean;
  onCancel: () => void;
  onOK: () => void;
  order: any;
  form: any;
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

  const { getFieldDecorator } = props.form;

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
        <Form
          labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 16 }
          }}
          onSubmit={() => {}}
        >
          <Form.Item label={"Symbol"}>
            {getFieldDecorator("Symbol", {
              rules: [
                { type: "text", message: "for example, 600848" },
                { required: true, message: "Please input symbol!" }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label={"Side"}>
            {getFieldDecorator("Side", {
              rules: [
                { type: "text", message: "" },
                { required: true, message: "" }
              ]
            })(<Input />)}
          </Form.Item>
        </Form>
      </div>
      <div
        className="ag-theme-balham"
        style={{ height: "230px", width: "100%" }}
      >
        <AgGridReact
          columnDefs={data.columnDefs}
          rowData={data.rowData}
          defaultColDef={{ resizable: true }}
          onGridReady={({ api }) => api.sizeColumnsToFit()}
        />
      </div>
    </Modal>
  );
};

export const Amendment = Form.create({ name: "amendment" })(AmendmentComponent);
