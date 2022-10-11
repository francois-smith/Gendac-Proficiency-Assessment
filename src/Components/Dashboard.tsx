import React from 'react';
import Table from './Table';
import CreateProduct from '../views/CreateProductModal';
import { ToastContainer } from 'react-toastify';
import { MdDeleteSweep } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import Requests from '../services/api-requests';
import Toast from '../utils/Toasts'; 

interface IState {
    page: Number,
    pageSize: Number,
    orderBy: String,
    ascending: Boolean, 
    filter: String, 
    viewAll: Boolean,
    modal: boolean,
    selected: Array<Object>
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
            modal: false,
            selected: []
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
    
    /**
     * @brief Handles when checkboxes are checked and manages array of selected items.
     * @param checked - Whether the checkbox is checked or not
     * @param productId - The id of the item
     */
    handleCheck = (checked: Boolean, productId: Number) => {
        if(checked){
            this.setState({selected: [...this.state.selected, productId]}, () => console.log(this.state.selected));
        } 
        else{
            this.setState({selected: this.state.selected.filter((item) => item !== productId)}, () => console.log(this.state.selected));
        }
    }

    /**
     * @brief Handles when the delete button is clicked and deletes the selected items.
     */
    deleteSelectedProducts = async (): Promise<void> =>{
        for(let item of this.state.selected){
            Requests.remove(item)
            .catch((error) => {
                console.log(error);
            });
        }
        Toast.showSuccessToast("Products deleted successfully!");
        this.setState({selected: []});
    }

    render(): React.ReactNode {
        return (
            <div className='p-5 mx-5 '>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className='d-flex align-items-center'>
                        <img src="/media/GendacLogo.png" className='main-logo me-2'/>
                        <span className='text-primary mb-1 fs-1'>Products</span>
                    </div>
                    <div className='d-flex'>
                        <button className='active btn btn-primary text-light p-2 px-4 me-2' onClick={this.showModal}>Add Product</button>
                        {this.state.selected.length > 0 ?
                            <button className='active btn btn-danger text-light p-2 me-2' onClick={this.deleteSelectedProducts}>
                                <MdDeleteSweep  className='fs-4'/>
                            </button> : null
                        }
                        <div className='d-flex align-items-center justify-content-center'>
                            <FiMoreHorizontal className='fs-2 cursor-pointer'/>
                        </div>
                    </div>
                </div>
                <Table page={this.state.page} pageSize={this.state.pageSize} orderBy={this.state.orderBy} ascending={this.state.ascending} filter={this.state.filter} viewAll={this.state.viewAll} handleCheck={this.handleCheck}/>
                <CreateProduct show={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
            </div>
        );
    }
}

