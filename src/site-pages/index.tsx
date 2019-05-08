require("../common/service-worker");
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Layout } from "antd";
const { Header, Content } = Layout;
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../less/layout.less";
import { Nav } from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import Market from "../components/Market";
import Orders from "../components/Orders";

class Index extends React.Component {
  componentDidMount(): void {
    console.log("did mount");
    location.href = process.env.ASSET_PATH + "/en/";
  }

  render() {
    return <div>Index Again</div>;
  }
}

ReactDOM.render(
  <div>
    <BrowserRouter basename={process.env.ASSET_PATH}>
      <Layout>
        <Header>
          <div className="logo">
            <img src={require("../static/images/logo.jpg")} />
          </div>
          <Nav />
        </Header>
        <Content style={{ padding: "24px 50px" }}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/en/" component={Market} />
            <Route exact path="/en/orders" component={Orders} />
          </Switch>
        </Content>
        <SiteFooter />
      </Layout>
    </BrowserRouter>
  </div>,
  document.getElementById("main")
);
