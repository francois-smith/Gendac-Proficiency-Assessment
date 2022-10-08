import React from 'react';
import Header from './Header';
import Table from './Table';

export default class Dashboard extends React.Component<{}, {page?: Number, pageSize?: Number, orderBy?: String, ascending?: Boolean, filter?: String, viewAll?: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 20,
            orderBy: "Name",
            ascending: false,
            filter: "",
            viewAll: false
        };
    }

    render(): React.ReactNode {
        return (
            <div>
                <Header/>
                <Table page={this.state.page} pageSize={this.state.pageSize} orderBy={this.state.orderBy} ascending={this.state.ascending} filter={this.state.filter} viewAll={this.state.viewAll} />
            </div>
        );
    }
}

