import React from 'react';
import Table from './Table';
import CreateProduct from '../views/CreateProductModal';
import { ToastContainer } from 'react-toastify';
import { FiMoreHorizontal } from 'react-icons/fi';

interface IState {
    page: Number,
    pageSize: Number,
    orderBy: String,
    ascending: Boolean, 
    filter: String, 
    viewAll: Boolean,
    modal: boolean
}

interface IProps {
}

export default class Dashboard extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 10,
            orderBy: "Id",
            ascending: false,
            filter: "",
            viewAll: false,
            modal: false
        };
    }

    /**
     * @brief Bind create button to open the modal.
     */
    showModal = (): void =>{
        this.setState({modal: true});
    }

    /**
     * @brief Passed into modal, bounded to the close button.
     */
    hideModal = (): void =>{
        this.setState({modal: false});
    }

    render(): React.ReactNode {
        return (
            <div className='p-5 mx-5 '>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className='text-primary mb-3'>Products</h1>
                    <button className='active btn btn-primary text-light p-2 px-4' onClick={this.showModal}>Add Product</button>
                </div>
                <div className='row d-flex align-items-center'>
                    <div className='col-8'>
                        <input type='text' className='form-control shadow-none p-2' placeholder='Search'/>
                    </div>
                    <div className='col-4 text-end'>
                        <button className='btn btn-none shadow-none'>
                            <span className="me-1">More</span> 
                            <FiMoreHorizontal className='fs-4'/>
                        </button>
                    </div>
                </div>
                <Table page={this.state.page} pageSize={this.state.pageSize} orderBy={this.state.orderBy} ascending={this.state.ascending} filter={this.state.filter} viewAll={this.state.viewAll}/>
                <CreateProduct show={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <div id='toast-container'></div>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
            </div>
        );
    }
}

