import React from 'react';
import Product from './Product';

export default class Table extends React.Component<{page?: Number, pageSize?: Number, orderBy?: String, ascending?: Boolean, filter?: String, viewAll?: boolean}, {data: Array<Object>, loading: Boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getData();
    }

    /**
     * @brief This function renders the table with input data, it dynamically creates headings for the table.
     * This allows any input data to be displayed in the table without needing to manually change the headings to accomodate. 
     * 
     * @param products - The products to render
     * @returns - The table
     */
    private renderTable(data: any): React.ReactNode {
        // Get keys to use as headings
        let keys = Object.keys(data[0]);

        return (
            <div>
                <table>
                    <thead>
                        <tr >
                            {/*Render the headings*/}
                            {keys.map((key: any, i) => {
                                return <th key={i}>{key}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/*Render the products*/}
                        {data.map((product: any) => {
                            return <Product item={product} key={product.Id}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    
    render(): React.ReactNode {
        // Contents are bound to the state
        // Can either be a loading message or the rendered table
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderTable(this.state.data);

        return (
            <div>
                {contents}
            </div>
        );
    }

    // Fetch data from the API
    async getData(): Promise<void> {
        if(this.props.viewAll) {
            const response = await fetch('https://gendacproficiencytest.azurewebsites.net/api/ProductsAPI');
            const data = await response.json();
            this.setState({data: data, loading: false});
        } 
        else {
            let url: string = "https://gendacproficiencytest.azurewebsites.net/api/ProductsAPI?";

            // Checks to add parameters to the url
            if (this.props.page !== undefined) url += "page=" + this.props.page + "&";
            if (this.props.pageSize !== undefined) url += "pageSize=" + this.props.pageSize + "&";
            if (this.props.orderBy !== undefined) url += "orderBy=" + this.props.orderBy + "&";
            if (this.props.ascending !== undefined) url += "ascending=" + this.props.ascending + "&";
            if (this.props.filter !== undefined) url += "filter=" + this.props.filter + "&";
            url = url.slice(0, -1);

            console.log(url);
            const response = await fetch(url);
            const returnData = await response.json();
            this.setState({ data: returnData.Results, loading: false });
        }
    }
}