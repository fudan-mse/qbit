import * as React from "react";

export default class StockMarket {
    static isTransactionTime(): boolean {
        return false;
    }

    static showPrice(stock: any, price: number) {
        if (price >= stock.pre_close) {
            return <span style={{color: 'red'}}>{price}</span>
        }

        return <span style={{color: 'green'}}>{price}</span>
    }
}