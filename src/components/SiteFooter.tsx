import * as React from "react";
import { Col, Layout, Row } from "antd";
const { Footer } = Layout;

export default class SiteFooter extends React.Component {
  render() {
    return (
      <Footer>
        <Row gutter={16}>
          <Col span={6}>
            <h3>Related Resources</h3>
            <p>
              <a
                href="http://tushare.org/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Tushare.org
              </a>
            </p>
          </Col>
          <Col span={6}>
            <h3>Community</h3>
            <p>To Do</p>
          </Col>
          <Col span={6}>
            <h3>Help</h3>
            <p>TODO</p>
          </Col>
          <Col span={6}>
            <h3>More</h3>
            <p>TODO</p>
          </Col>
        </Row>
      </Footer>
    );
  }
}
