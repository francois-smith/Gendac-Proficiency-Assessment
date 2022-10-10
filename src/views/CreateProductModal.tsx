import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Validate from '../utils/ProductValidation';
import Toasts from '../utils/Toasts';
import Requests from '../services/api-requests';

interface IState {
    name: string,
    category: number,
    price: number
}

interface IProps {
    show: boolean,
    hideModal: Function
}

export default class CreateProduct extends React.Component<IProps, IState> {
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
    handleModalClose = (): void => {
        this.props.hideModal();
    }

    /**
     * @brief Handles when the create button is clicked and creates a new product.
     */
    validateEvent = (): void => {
        try {
            //Test the inputs to validate the product
            Validate.productName(this.state.name);
            Validate.productCategory(this.state.category);
            Validate.productPrice(this.state.price);
            
            //Send the request to the API to add to the API
            Requests.create(this.state.name, this.state.category, this.state.price)
            .then((response) => {
                this.setState({
                    name: "",
                    category: 0,
                    price: 0
                });

                Toasts.showSuccessToast("Product created successfully");
                this.handleModalClose();
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
        catch (error: unknown) {   
            if (error instanceof Error) {
                Toasts.showErrorToast(error.message);
            }   
        }
    }

    render = (): React.ReactNode => {
        return (
            <div>
                <Modal show={this.props.show} centered onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Product</Modal.Title>
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
                                        <option value="-1">Select Category</option>
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
                        <Button variant="primary" className='w-100 p-2 text-white' onClick={this.validateEvent}>
                            Create Product
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}