import React from 'react';
import Product from './Product';

interface IState {
}

interface IProps {
    handleCheck: Function,
    showModal: Function,
    data: Array<Object>,
}

/**
 * This component is used to render the table body and headings.
 */
export default class Table extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    /**
     * @brief This function renders the table with input data.
     * 
     * @param data - The data to render
     * @returns - The table
    */
    private renderTable = (data: any): React.ReactNode =>{
        return (
            <table className='table table-striped'>
                <thead id="table-head">
                    <tr>
                        <th key='spacer'></th>
                        <th key='name'>Name</th>
                        <th key='category'>Category</th>
                        <th key='price'>Price</th>
                        <th key='actions' className='text-end'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product: any) => {
                        return (<Product showModal={this.props.showModal} key={product.Id} item={product} handleCheck={this.props.handleCheck} />);
                    })}  
                </tbody>
            </table>
        );
    }
    
    render = (): React.ReactNode => {
        // Contents are bound to the props being passed in
        // If no data has been fed a loading animation is shown
        let contents = this.props.data.length == 0 ? 
        <div className='loader d-flex flex-column align-items-center justify-content-center'>
            <img src="Media/Loader.svg"/>
            <p className='pt-3'><em>Loading Products</em></p>
        </div> : 
        this.renderTable(this.props.data);

        return (
            <div className="table-container">
                { contents }
            </div>
        );
    }
}