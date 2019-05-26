import * as React from "react";
import {LimitOrderBookBlotterWindow} from "./LimitOrderBookBlotterWindow";
import StockMarket from "../common/StockMarket";

export interface BlotterDetailProps {
    match: {
        params: any;
    };
}

export interface BlotterDetailState {
    blotterDetail: any,
    loading: boolean
}

export class BlotterDetail extends React.Component<BlotterDetailProps, BlotterDetailState> {
    private refreshBlotter = true;

    constructor(props: BlotterDetailProps) {
        super(props)

        this.state = {
            blotterDetail: require('../cache/blotter-detail.json'),
            loading: true
        }

        this.refreshBlotter = true
    }

    async componentDidMount(): Promise<void> {
        const {
            match: {
                params: {symbol}
            }
        } = this.props;

        await this.updateBlotter(symbol);
    }

    async componentWillUnmount() {
        console.log('unmounting...')
        this.refreshBlotter = false;
    }

    private async updateBlotter(symbol: string) {
        try {
            this.setState({loading: true})

            const blotter = await (await fetch('https://bitqbit.herokuapp.com/blotter/' + symbol)).json();
            console.log('blotter = ', blotter)

            this.setState({blotterDetail: blotter})
        } catch (ex) {
            console.error(ex)
        } finally {
            this.setState({loading: false})
            if (StockMarket.isTransactionTime() && this.refreshBlotter) {
                await this.updateBlotter(symbol)
            }
        }
    }

    render() {
        const {
            match: {
                params: {symbol}
            }
        } = this.props;

        const {blotterDetail, loading} = this.state;

        return (
            <div>
                <h2>Blotter Detail of {symbol} {blotterDetail.name}</h2>
                <p>Last updated at: {blotterDetail.date} {blotterDetail.time}</p>
                <p>open: {blotterDetail.open} pre close:{blotterDetail.pre_close}</p>
                <LimitOrderBookBlotterWindow blotter={blotterDetail} loading={loading}/>
            </div>
        );
    }
}
