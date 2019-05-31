import * as React from "react";
import {Modal} from "antd";
import {EnhancedOrderForm} from "./OrderForm";
import {awaitExpression} from "@babel/types";

export interface AmendmentModalProps {
    visible: boolean;
    onCancel: () => void;
    onOK: () => void;
    order: any;
}

const amendOrder = async (order: any, newOrder: any) => {
    console.log("amend order ", order, newOrder);
    order.status = 'CANCELLED'

    await fetch("https://qbit.jiwai.win/order", {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...newOrder,
            lots: newOrder.qty,
            market: newOrder.destination,
            operation: newOrder.side,
            status: "CANNCELED",
            modifiedTime: new Date(),
            id: order.id
        })
    })

    await fetch("https://qbit.jiwai.win/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...newOrder,
            lots: newOrder.qty,
            market: newOrder.destination,
            operation: newOrder.side,
            status: "NEW",
            modifiedTime: new Date(),
            createdTime: new Date()
        })
    });
};
const placeOrder = async (order: any, newOrder: any) => {
    console.log("placing order... ", order, newOrder);
    await fetch("https://qbit.jiwai.win/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...newOrder,
            lots: newOrder.qty,
            market: newOrder.destination,
            operation: newOrder.side,
            status: "NEW",
            modifiedTime: new Date(),
            createdTime: new Date()
        })
    });
};

export const Amendment = (props: AmendmentModalProps) => {
    const {order} = props;
    const newOrder = {...order};

    return (
        <Modal
            title={
                JSON.stringify(props.order) !== "{}" ? "Amendment" : "Place a new order"
            }
            visible={props.visible}
            onCancel={props.onCancel}
            onOk={() => {
                JSON.stringify(props.order) !== "{}"
                    ? amendOrder(props.order, newOrder)
                    : placeOrder(props.order, newOrder);

                props.onOK();
            }}
        >
            <div>
                <EnhancedOrderForm
                    symbol={order.symbol}
                    side={order.operation}
                    client={order.client}
                    destination={order.market}
                    price={order.price}
                    qty={order.lots}
                    onChange={changedFields => {
                        console.log('changed ', changedFields)
                        const [[, field]] = Object.entries(changedFields);
                        newOrder[field.name] = field.value;
                    }}
                />
            </div>
        </Modal>
    );
};
