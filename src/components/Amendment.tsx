import * as React from "react";
import { Menu, Modal } from "antd";
import { AgGridReact } from "ag-grid-react";
export interface AmendmentModalProps {
  visible: boolean;
  onCancel: () => void;
  onOK: () => void;
}

const data = {
  columnDefs: [
    {
      headerName: "Key",
      field: "key"
    },
    { headerName: "Value", field: "value" }
  ],
  rowData: [
    {
      key: "Symbol",
      value: "600001"
    },
    {
      key: "Side",
      value: "Buy"
    },
    {
      key: "Price",
      value: "10"
    },
    {
      key: "Qty",
      value: 100
    },
    { key: "Client", value: "ABC" },
    { key: "Destination", value: "SSE" }
  ]
};

export const Amendment = (props: AmendmentModalProps) => (
  <Modal
    title="Amendment"
    visible={props.visible}
    onCancel={props.onCancel}
    onOk={props.onOK}
  >
    <div className="ag-theme-balham" style={{ height: "230px", width: "100%" }}>
      <AgGridReact
        columnDefs={data.columnDefs}
        rowData={data.rowData}
        defaultColDef={{ resizable: true }}
        onGridReady={({ api }) => api.sizeColumnsToFit()}
      />
    </div>
  </Modal>
);
