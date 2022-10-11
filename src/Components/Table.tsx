import React from 'react';
import Product from './Product';
import Requests from '../services/api-requests';

interface IState {
    data: Array<Object>,
    loading: Boolean
}

interface IProps {
    handleCheck: Function,
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
            loading: true
        };
    }

    /**
     * Wait for the component to mount and then fetch the data
     */
    componentDidMount = (): void =>{
        this.getData();
    }

    /**
     * @brief This function renders the table with input data.
     * 
     * @param data - The data to render
     * @returns - The table
     */
    private renderTable = (data: any): React.ReactNode =>{
        return (
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th key='checkbox'><input type='checkbox'/></th>
                        <th key='name'>Name</th>
                        <th key='category'>Category</th>
                        <th key='price'>Price</th>
                        <th key='actions' className='text-end'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product: any) => {
                        return (<Product key={product.Id} item={product} handleCheck={this.props.handleCheck} />);
                    })}  
                </tbody>
            </table>
        );
    }
    
    render = (): React.ReactNode => {
        // Contents are bound to the state
        // Can either be a loading message or the rendered table
        let contents = this.state.loading ? <p><em>Loading...</em></p> : this.renderTable(this.state.data);

        return (
            <div className="table-container">
                {contents}
            </div>
        );
    }

    /**
     * @brief Fetches the data from the API and sets the state.
     */
    getData = async (): Promise<void> => {
        if(this.props.viewAll) {
            Requests.getAll()
            .then((response) => {
                this.setState({data: response.data, loading: false});
            })
            .catch((error) => {
                console.log(error);
            });
        } 
        else {
            let params = new Map<String, any>();
            params.set('page', this.props.page);
            params.set('pageSize', this.props.pageSize);
            params.set('orderBy', this.props.orderBy);
            params.set('ascending', this.props.ascending);
            params.set('filter', this.props.filter);

            Requests.customSearch(params)
            .then((response) => {
                this.setState({data: response.data.Results, loading: false});
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}