import * as React from "react";
import { Link } from "react-router-dom";

export default class Market extends React.Component {
  render() {
    return (
      <div>
        <h1>TODO</h1>
        <h5>
          <Link
            to="/en/orders"
            onClick={() => (location.pathname = "/en/orders")}
          >
            Go to Orders
          </Link>
        </h5>
      </div>
    );
  }
}
