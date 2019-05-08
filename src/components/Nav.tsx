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
      location.pathname.replace(process.env.ASSET_PATH, "/")
    ]}
  >
    <Menu.Item key="/en">
      <Link to={process.env.ASSET_PATH + "en"}>Market</Link>
    </Menu.Item>
    <Menu.Item key="/en/orders">
      <Link to={process.env.ASSET_PATH + "en/orders"}>Orders</Link>
    </Menu.Item>
    <Menu.Item key="/source">
      <a
        href="https://github.com/Jeff-Tian/wechat-oauth-redirect"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
    </Menu.Item>
  </Menu>
);
