import React from 'react';
import Product from './Product';

interface IState {
    data: Array<Object>,
    loading: Boolean,
    selected: Array<Object>
}

interface IProps {
    page?: Number,
    pageSize?: Number,
    orderBy?: String,
    ascending?: Boolean,
    filter?: String,
    viewAll?: Boolean
}

export default class Table extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            selected: []
        };
    }

    /**
     * Wait for the component to mount and then fetch the data
     */
    componentDidMount = (): void =>{
        this.getData();
    }

    /**
     * @brief Handles when checkboxes are checked and manages array of selected items.
     * @param checked - Whether the checkbox is checked or not
     * @param productId - The id of the item
     */
    handleCheck = (checked: Boolean, productId: Number) => {
        if(checked){
            this.setState({selected: [...this.state.selected, productId]});
        } 
        else{
            this.setState({selected: this.state.selected.filter((item) => item !== productId)});
        }
    }

    /**
     * @brief Handles when the delete button is clicked and deletes the selected items.
     */
    deleteSelectedProducts = async (): Promise<void> =>{
        for(let item of this.state.selected){
            console.log(item);
            await fetch(`https://gendacproficiencytest.azurewebsites.net/api/ProductsAPI/${item}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        this.setState({selected: []});
        this.getData();
    }


    /**
     * @brief This function renders the table with input data.
     * 
     * @param data - The data to render
     * @returns - The table
     */
    private renderTable = (data: any): React.ReactNode =>{
        let rows = data.map((product: any) => {
            return (
                <Product 
                    key={product.id} 
                    item={product} 
                    handleCheck={this.handleCheck}
                />
            );
        });

        return (
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th key='checkbox'><input type='checkbox'/></th>
                        <th key='name'>Name</th>
                        <th key='category'>Category</th>
                        <th key='price'>Price</th>
                        <th key='actions'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

        // return (
        //     <div className='table-responsive'>
        //         <table className='table'>
        //             <thead>
        //                 <tr>
        //                     <th scope='col'><input type="checkbox"/></th>
        //                     {/*Render the headings*/}
        //                     {keys.map((key: any, i) => {
        //                         return <th scope="col" key={i}>{key}</th>
        //                     })}
        //                     <th scope='col'></th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {/*Render the products*/}
        //                 {data.map((product: any) => {
        //                     return <Product handleCheck={this.handleCheck.bind(this)} item={product} key={product.Id}/>
        //                 })}
        //             </tbody>
        //         </table>
        //     </div>
        // );
    
    render = (): React.ReactNode => {
        // Contents are bound to the state
        // Can either be a loading message or the rendered table
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderTable(this.state.data);

        return (
            <div>
                <button className='active btn btn-danger text-light p-2' onClick={this.deleteSelectedProducts}>Delete Selected</button>
                {contents}
            </div>
        );
    }

    /**
     * @brief Fetches the data from the API and sets the state.
     */
    getData = async (): Promise<void> => {
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

            const response = await fetch(url);
            const returnData = await response.json();
            this.setState({ data: returnData.Results, loading: false });
        }
    }
}