import * as React from "react";
import {Link} from "react-router-dom";

export default class Market extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    交易时间
                </h1>
                <p>早上 9：30 - 11：30</p>
                <p>下午 13：00 - 15：00</p>
            </div>
        );
    }
}
