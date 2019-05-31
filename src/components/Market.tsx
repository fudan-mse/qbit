import * as React from "react";
import NotTransactionTimeAlert from "./NotTransactionTimeAlert";
import StockMarket from "../common/StockMarket";
import {AgGridReact} from "ag-grid-react";
import {RowClickedEvent} from "ag-grid-community";
import {Icon} from "antd";

export interface MarketProps {
    history: any;
}

export interface MarketState {
    showNotTransactionTimeAlert: boolean;
    market: any;
    loading: boolean;
}

export default class Market extends React.Component<MarketProps, MarketState> {
    private refreshMarket = true;

    constructor(props: MarketProps) {
        super(props);

        this.state = {
            showNotTransactionTimeAlert: !StockMarket.isTransactionTime(),
            market: require("../cache/market-all.json"),
            loading: false
        };
    }

    async componentDidMount() {
        await this.updateMarketData();
    }

    render() {
        const data = {
            columnDefs: [
                {
                    headerName: "Code",
                    field: "code"
                },
                {
                    headerName: "Name",
                    field: "name",
                    resizable: true,
                    width: 100,
                    minWidth: 100
                },
                {
                    headerName: "Change Percent",
                    field: "changepercent"
                },
                {
                    headerName: "Trade",
                    field: "trade"
                },
                {
                    headerName: "Open",
                    field: "open"
                },
                {
                    headerName: "High",
                    field: "high"
                },
                {headerName: "Low", field: "low"},
                {
                    headerName: "Settlement",
                    field: "settlement"
                },
                {
                    headerName: "Volume",
                    field: "volume"
                },
                {headerName: "Turnover Ratio", field: "turnoverratio"},
                {
                    headerName: "Amount",
                    field: "amount"
                },
                {headerName: "Per", field: "per"},
                {headerName: "PB", field: "pb"},
                {
                    headerName: "Market Cap",
                    field: "mktcap"
                },
                {headerName: "NMC", field: "nmc"}
            ]
        };
        return (
            <div>
                <h1>
                    Market Overview: {this.state.loading && <Icon type="loading"/>}
                </h1>
                <div
                    className="ag-theme-balham"
                    style={{height: "650px", width: "100%"}}
                >
                    <AgGridReact
                        columnDefs={data.columnDefs}
                        rowData={this.state.market}
                        defaultColDef={{resizable: true}}
                        onGridReady={this.onGridReady}
                        onRowClicked={this.gotoLimitBlotter.bind(this)}
                    />
                </div>
                <NotTransactionTimeAlert
                    visible={this.state.showNotTransactionTimeAlert}
                />
            </div>
        );
    }

    private onGridReady(params: { api: any }) {
        params.api.sizeColumnsToFit();
    }

    private gotoLimitBlotter(event: RowClickedEvent) {
        this.props.history.push("/en/blotter/" + event.data.code);
    }

    private async updateMarketData() {
        try {
            this.setState({loading: true});
            const market = await (await fetch(
                "https://bitqbit.herokuapp.com/market/"
            )).json();
            console.log("market = ", market);

            this.setState({market});
            if (StockMarket.isTransactionTime() && this.refreshMarket) {
                await this.updateMarketData();
            }
        } catch (ex) {
            console.error(ex);
            if (this.refreshMarket) {
                await this.updateMarketData();
            }
        } finally {
            this.setState({loading: false});
        }
    }

    async componentWillUnmount() {
        console.log("unmounting market...");
        this.refreshMarket = false;
    }
}
