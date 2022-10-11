//Component Imports
import React from 'react';
import Table from './Table';
import TablePagination from './TablePagination';

// Views import
import CreateProduct from '../views/CreateProductModal';

// Services and Utils import
import Toast from '../utils/Toasts'; 
import Requests from '../services/api-requests';

// Icon imports
import { ToastContainer } from 'react-toastify';
import { MdDeleteSweep } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';

interface IState {
    page: number,
    pageSize: number,
    orderBy: String,
    ascending: Boolean, 
    filter: String, 
    viewAll: Boolean,
    modal: boolean,
    selected: Array<Object>,
    data: Array<Object>,
    pages: number,
}

export default class Dashboard extends React.Component<{}, IState> {
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
            selected: [],
            data: [],
            pages: 0
        };
    }

    /**
     * Wait for the component to mount and then fetch the data
     */
    componentDidMount = (): void =>{
        this.getProducts();
        this.getPageNumbers();
    }

    /**
     * @brief Fetches the data from the API and sets the state. This new data gets passed to the table.
     */
    getProducts = async (): Promise<void> => {
        //If the user wants all the products
        if(this.state.viewAll) {
            Requests.getAll()
            .then((response) => {
                this.setState({data: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
        } 
        else {
            let params = new Map<String, any>();
            params.set('page', this.state.page);
            params.set('pageSize', this.state.pageSize);
            params.set('orderBy', this.state.orderBy);
            params.set('ascending', this.state.ascending);
            params.set('filter', this.state.filter);

            Requests.customSearch(params)
            .then((response) => {
                this.setState({data: response.data.Results});
            })
            .catch((error) => {
                console.log(error);
            });
        }
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
        this.setState({modal: false}, () => { this.getProducts(); });
    }
    
    /**
     * @brief Handles when checkboxes are checked and manages array of selected items. Passed to table.
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
            Requests.remove(item)
            .catch((error) => {
                console.log(error);
            });
        }

        //Update the table and show a toast that the items were deleted
        Toast.showSuccessToast("Products deleted successfully!");
        this.setState({selected: []}, () => { this.getProducts(); });
    }

    /**
     * Function to caclulate the number of pages based on the page size and total number of items
     * @returns The table with the data
     */
    getPageNumbers = () => {
        Requests.getAll()
        .then((response) => {
            this.setState({pages: Math.ceil(response.data.length / this.state.pageSize)}, () => { console.log(this.state.pages) });
        })
        .catch((error) => {
            console.log(error);
        });
    }
     
    handlePageChange = (page: number) => {
        this.setState({page: page}, () => { console.log(this.state.page) });
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
                            <FiMoreHorizontal className='fs-3 cursor-pointer'/>
                        </div>
                    </div>
                </div>
                <div className='table-container'>
                    <Table data={this.state.data} handleCheck={this.handleCheck}/>
                    <TablePagination page={this.state.page} pages={this.state.pages} handlePageChange={this.handlePageChange.bind(this)}/>
                </div>
                <CreateProduct show={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
            </div>
        );
    }
}

