import * as React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export interface NavProps {}

export const Nav = (props: NavProps) => (
  <Menu
    mode="horizontal"
    theme="dark"
    style={{ lineHeight: "64px" }}
    defaultSelectedKeys={[
      location.pathname.replace(process.env.ASSET_PATH, "/").replace(/\/$/, "")
    ]}
  >
    <Menu.Item key="/en">
      <Link to={"/en"}>Market</Link>
    </Menu.Item>
    <Menu.Item key="/en/orders">
      <Link to={"/en/orders"}>Orders</Link>
    </Menu.Item>
    <Menu.Item key="/source">
      <a
        href="https://github.com/fudan-mse/qbit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
    </Menu.Item>
    <Menu.Item key="/login">
      <a
        href={
          "https://uniheart.herokuapp.com/passport/citi?redirect_uri=" +
          encodeURIComponent(location.href)
        }
        target="_self"
      >
        Sign In
      </a>
    </Menu.Item>
  </Menu>
);
