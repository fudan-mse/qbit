import { Form, Input } from "antd";
import * as React from "react";
import { FormComponentProps } from "antd/lib/form";

interface OrderFormProps extends FormComponentProps {
  symbol: string;
  side: string;
  price: number;
  qty: number;
  client: string;
  destination: string;
}

class OrderForm extends React.Component<OrderFormProps, any> {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { symbol, side, price, qty, client, destination } = this.props;

    return (
      <Form
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 }
        }}
        onSubmit={() => {}}
      >
        <Form.Item label={"Symbol"}>
          {getFieldDecorator("symbol", {
            initialValue: symbol,
            rules: [
              { type: "text", message: "for example, 600848" },
              { required: true, message: "Please input symbol!" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Side"}>
          {getFieldDecorator("side", {
            initialValue: side,
            rules: [
              { type: "text", message: "" },
              { required: true, message: "" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Price"}>
          {getFieldDecorator("price", {
            initialValue: price,
            rules: [
              { type: "number", message: "" },
              { required: true, message: "" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Qty"}>
          {getFieldDecorator("qty", {
            initialValue: qty,
            rules: [
              { type: "number", message: "" },
              { required: true, message: "" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Client"}>
          {getFieldDecorator("client", {
            initialValue: client,
            rules: [
              {
                type: "text",
                message: ""
              },
              {
                required: true,
                message: ""
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Destination"}>
          {getFieldDecorator("destination", {
            initialValue: destination,
            rules: [
              { type: "text", message: "" },
              { required: true, message: "" }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

export const EnhancedOrderForm = Form.create<OrderForm>({ name: "orderForm" })(
  OrderForm
);
