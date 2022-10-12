//Component Imports
import React from 'react';
import Table from './Table';
import TablePagination from './TablePagination';

// Views Import
import ProductModal from '../views/ProductModal';
import SettingMenu from '../views/SettingsMenu';

// Services and Utils Imports
import Toast from '../utils/Toasts'; 
import Requests from '../services/api-requests';
import { ModalType } from '../utils/CustomTypes';

// Icon imports
import { ToastContainer } from 'react-toastify';
import { MdDeleteSweep } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';

interface IState {
    //Table State
    page: number,
    pageSize: number,
    orderBy: string,
    ascending: boolean, 
    filter: string, 
    viewAll: boolean,
    showSettings: boolean,
    //Modal Variables
    modal: boolean,
    modalType: ModalType,
    editProduct: any,
    //Data And Pagination
    selected: Array<Object>,
    data: Array<Object>,
    pages: number,
    total: number
}

export default class Dashboard extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            //Table State
            page: 1,
            pageSize: 10,
            orderBy: "Id",
            ascending: true,
            filter: "",
            viewAll: false,
            showSettings: false,
            //Modal Variables
            modal: false,
            editProduct: undefined,
            modalType: ModalType.Create,
            //Data And Pagination
            selected: [],
            data: [],
            pages: 0,
            total: 0,
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
            //If the user wants to filter the products
            let params = new Map<String, any>();
            params.set('page', this.state.page);
            params.set('pageSize', this.state.pageSize);
            params.set('orderBy', this.state.orderBy);
            params.set('ascending', this.state.ascending);
            params.set('filter', this.state.filter);

            Requests.customSearch(params)
            .then((response) => {
                //Clear old data, and repopulate with new data
                this.setState({data: []}, () => { this.setState({data: response.data.Results}); });
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    /**
     * @brief Open the modal and set the modal type based on what called the function.
     * @param type - The type of modal to show
     * @param product - The product to edit (Optional)
     */
    showModal = (type: ModalType, product?: Map<String, any>): void =>{
        if(type === ModalType.Create) {
            this.setState({modal: true, modalType: type, editProduct: undefined});
        }
        else{
            //create object from map
            if(product) {
                let productObj = {
                    id: product.get('Id'),
                    name: product.get('Name'),
                    category: product.get('Category'),
                    price: product.get('Price')
                };
                this.setState({modal: true, modalType: type, editProduct: productObj});
            }
            else{
                this.hideModal();
                Toast.showErrorToast("Error editing product");
            }
        }
    }

    /**
     * @brief Passed into modal, bounded to the close button.
     */
    hideModal = (refresh?: boolean): void =>{
        this.setState({modal: false}, () => { 
            if(refresh){
                this.getProducts();
            }
        });
    }

  
    toggleSettings = (): void =>{
        this.setState({showSettings: !this.state.showSettings});
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
        //async for loop
        for(let item of this.state.selected){
            await Requests.remove(item)
            .catch((error) => {
                Toast.showErrorToast("Error deleting product");
            });
        }

        Toast.showSuccessToast("Products successfully deleted!");
        this.setState({selected: []}, () => { this.getProducts(); });
    }

    /**
     * Function to caclulate the number of pages based on the page size and total number of items
     * @returns The table with the data
     */
    getPageNumbers = () => {
        Requests.getAll()
        .then((response) => {
            this.setState({pages: Math.ceil(response.data.length / this.state.pageSize), total: response.data.length});
        })
        .catch((error) => {
            console.log(error);
        });
    }
     
    /**
     * @brief Handles when the page is changed and updates the state.
     * @param page - The page number to go to
     */
    handlePageChange = (page: number) => {
        this.setState({page: page}, () => { this.getProducts(); });
    }

    /**
     * @brief Handles when the save button is clicked and rerenders the table with new data.
     * @param pageSize - Updated PageSize
     * @param orderBy - Updated OrderBy
     * @param ascending - Updated Ascending
     * @param filter - Updated Filter
     */
    applySettings = (pageSize: number, orderBy: string, ascending: boolean, filter: string, viewAll: boolean) => {
        this.setState({pageSize: pageSize, orderBy: orderBy, ascending: ascending, filter: filter, viewAll: viewAll}, () => {
            this.getProducts(); 
            this.getPageNumbers();
        });
    }

    render(): React.ReactNode {
        return (
            <div className='p-5 mx-5'>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className='d-flex align-items-center'>
                        <img src="/media/GendacLogo.png" className='main-logo me-2'/>
                        <span className='text-primary mb-1 fs-1'>Products</span>
                    </div>
                    <div className='d-flex'>
                        <button className='active btn btn-primary text-light p-2 px-4 me-2' onClick={() => this.showModal(ModalType.Create)}>Add Product</button>
                        {this.state.selected.length > 0 ?
                            <button className='active btn btn-danger text-light p-2 me-2' onClick={this.deleteSelectedProducts}>
                                <MdDeleteSweep  className='fs-4'/>
                            </button> : null
                        }
                        <div className='d-flex align-items-center justify-content-center position-relative'>
                            <FiMoreHorizontal className='fs-3 cursor-pointer' onClick={this.toggleSettings}/>
                            {/* Pass in all date to settings so when they get updated, changes can occur */}
                            <SettingMenu  applySettings={this.applySettings} show={this.state.showSettings} hideSettings={this.toggleSettings} viewAll={this.state.viewAll} pageSize={this.state.pageSize} filter={this.state.filter} orderBy={this.state.orderBy} ascending={this.state.ascending}/>
                        </div>
                    </div>
                </div>
                <div className='table-container'>
                    <Table showModal={this.showModal} data={this.state.data} handleCheck={this.handleCheck}/>
                    <TablePagination data={this.state.data} total={this.state.total} pageSize={this.state.pageSize} page={this.state.page} pages={this.state.pages} handlePageChange={this.handlePageChange.bind(this)}/>
                    <ProductModal type={this.state.modalType} product={this.state.editProduct} show={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                </div>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
            </div>
        );
    }
}

