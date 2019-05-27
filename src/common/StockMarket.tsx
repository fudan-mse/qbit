import * as React from "react";

export default class StockMarket {
  static isTransactionTime(): boolean {
    const now = new Date();
    const morningStart = new Date();
    morningStart.setHours(9);
    morningStart.setMinutes(30);
    morningStart.setSeconds(0);
    morningStart.setMilliseconds(0);

    const morningEnd = new Date();
    morningEnd.setHours(11);
    morningEnd.setMinutes(30);
    morningEnd.setSeconds(0);
    morningEnd.setMilliseconds(0);

    const afternoonStart = new Date();
    afternoonStart.setHours(13);
    afternoonStart.setMinutes(0);
    afternoonStart.setSeconds(0);
    afternoonStart.setMilliseconds(0);

    const afternoonEnd = new Date();
    afternoonEnd.setHours(15);
    afternoonEnd.setMinutes(0);
    afternoonEnd.setSeconds(0);
    afternoonEnd.setMilliseconds(0);

    return (
      (now >= morningStart && now <= morningEnd) ||
      (now >= afternoonStart && now <= afternoonEnd)
    );
  }

  static showPrice(stock: any, price: number) {
    if (price >= stock.pre_close) {
      return <span style={{ color: "red" }}>{price}</span>;
    }

    return <span style={{ color: "green" }}>{price}</span>;
  }
}
