import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Validate from '../utils/ProductValidation';
import Toasts from '../utils/Toasts';
import Requests from '../services/api-requests';
import { ModalType} from '../utils/CustomTypes';

interface IState {
    name: string,
    category: number,
    price: number
}

interface IProps {
    show: boolean,
    hideModal: Function,
    name?: string,
    type: ModalType,
    product?: any,
}

/**
 * @description This class is used to display the modal for creating and updating products.
 */
export default class ProductModal extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            category: 0,
            price: 0
        };
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    /**
     * @brief Closes the modal but keeps the state of the modal.
     */
    handleModalClose = (refresh: boolean): void => {
        this.props.hideModal(refresh);
    }

    /**
     * @brief Checks if the current modal being shown is supposed to be a create or edit modal.
     * @brief If it is a edit modal, it will fill the state with the current product's information.
     * @param prevProps - The previous props of the component.
     */
    componentDidUpdate(prevProps: any) {
        if(this.props.show !== prevProps.show) {
            if (this.props.type === ModalType.Edit) {
                this.setState({
                    name: this.props.product.name,
                    category: this.props.product.category,
                    price: this.props.product.price
                });
            }
            else{
                this.setState({
                    name: "",
                    category: 0,
                    price: 0
                });
            }
        }
    }
    
    /**
     * @brief Handles when the button is pressed, validates the input, and then sends the request to the server.
     */
    validateProduct = (): void => {
        try {
            //Test the inputs to validate the product
            Validate.productName(this.state.name);
            Validate.productCategory(this.state.category);
            Validate.productPrice(this.state.price);

            //If the modal is an create modal, send a create request
            if(this.props.type === ModalType.Create) {
                //Send the request to the API to create the product
                Requests.create(this.state.name, this.state.category, this.state.price)
                .then((response) => {
                    this.setState({
                        name: "",
                        category: 0,
                        price: 0
                    });

                    Toasts.showSuccessToast("Product created successfully");
                    this.handleModalClose(true);
                }) 
                .catch((error) => {
                    if (error.response!.status === 409) {
                        Toasts.showErrorToast("Product already exists");
                    }
                    else{
                        Toasts.showErrorToast("Error creating product");
                    }
                    
                });
            }
            //If the modal is an edit modal, update the product
            else if(this.props.type === ModalType.Edit) {
                //Check if any of the values have changed
                let changed: boolean = false;
                for (const [key, value] of Object.entries(this.state)) {
                    if (value !== this.props.product[key]) {
                        changed = true;
                    }
                }

                if (!changed) {
                    Toasts.showErrorToast("No changes made to product");
                }
                else{
                    // Send the request to the API to update the product
                    let productObj = {
                        Id: this.props.product.id,
                        Name: this.state.name,
                        Category: this.state.category,
                        Price: this.state.price
                    };

                    Requests.update(this.props.product.id, productObj)
                    .then((response) => {
                        this.setState({
                            name: "",
                            category: 0,
                            price: 0
                        });

                        Toasts.showSuccessToast("Product updated successfully");
                        this.handleModalClose(true);
                    }) 
                    .catch((error) => {
                        Toasts.showErrorToast("Error updating product");
                    });
                }
            }
        } 
        catch (error: unknown) {   
            if (error instanceof Error) {
                Toasts.showErrorToast(error.message);
            }   
        }
    }

    render = (): React.ReactNode => {
        return (
            <div>
                <Modal show={this.props.show} centered onHide={() => this.handleModalClose(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.type === ModalType.Edit ? "Edit Product" : "Create Product"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                            </div>
                            <div className="mb-3 row">
                                <div className='col-6'>
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-select" id="category" value={this.state.category} onChange={(e) => this.setState({category: Number(e.target.value)})}>
                                        <option value="-1" hidden>Select Category</option>
                                        <option value="1">Category 1</option>
                                        <option value="2">Category 2</option>
                                        <option value="3">Category 3</option>
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" placeholder="Price" value={this.state.price} onChange={(e) => this.setState({price: Number(e.target.value)})}/>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" className='w-100 p-2 text-white' onClick={this.validateProduct}>
                            {this.props.type === ModalType.Edit ? "Update Product" : "Create Product"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}