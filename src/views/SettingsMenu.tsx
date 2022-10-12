import React from 'react';
import {AiOutlineCaretDown} from 'react-icons/ai';

interface IState {
    pageSize: number,
    orderBy: string,
    ascending: boolean,
    filter: string,
    viewAll: boolean,
}

interface IProps {
    show: boolean,
    hideSettings: Function,
    applySettings: Function,
    pageSize: number,
    orderBy: string, 
    ascending: boolean, 
    filter: string,
    viewAll: boolean
}

/**
 * @description This class is used to display the modal for creating and updating products.
 */
export default class SettingMenu extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            pageSize: this.props.pageSize,
            orderBy: this.props.orderBy,
            ascending: this.props.ascending,
            filter: this.props.filter,
            viewAll: this.props.viewAll,
        };
        this.handleMenuClose = this.handleMenuClose.bind(this);
    }

    /**
     * @brief Closes the modal but keeps the state of the modal.
     */
    handleMenuClose = (): void => {
        this.props.hideSettings();
    }

    applySettings = (): void => {
        this.props.applySettings(this.state.pageSize, this.state.orderBy, this.state.ascending, this.state.filter, this.state.viewAll);
        this.props.hideSettings();
    }
    
    //popup menu to alter table settings
    render = (): React.ReactNode => {
        return (
            <div className={`setting-menu p-3 rounded border position-absolute bg-white shadow-sm text-muted ${this.props.show ? "d-block" : "d-none"}`}>
                <h5 className="mb-3">Table Settings</h5>

                <div className="form-group mb-3">
                    <label htmlFor="orderBy">Order By</label>
                    <select className="form-select p-1" id="orderBy" value={this.state.orderBy} onChange={(e) => this.setState({orderBy: e.target.value})}>
                        <option value="Id">Id</option>
                        <option value="Name">Name</option>
                        <option value="Category">Category</option>
                        <option value="Price">Price</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                    <div className="form-check form-switch">
                        <label htmlFor="ascending">Ascending</label>
                        <input className="form-check-input" type="checkbox" id="ascending" checked={this.state.ascending} onChange={(e) => this.setState({ascending: e.target.checked})}/>
                    </div>
                </div>

                <hr />

                <div className='settings-footer d-flex'>
                    <div className='d-flex align-items-center'>
                        <label htmlFor='rows-input' className='me-2'>Rows on page: </label>
                        <input type='number' id="rows-input" onChange={e => this.setState({pageSize: Number(e.target.value)})} value={this.state.pageSize} className='form-control p-1 w-25 text-end'/>
                        {/* clickable text that opens a dropdown */}
                        <div className="dropdown ms-2">
                            <a className='text-muted' role="button" id="view-all-menu" data-bs-toggle="dropdown" aria-expanded="false">
                                <AiOutlineCaretDown />
                            </a>
                            <div className="dropdown-menu p-2" aria-labelledby="view-all-menu">
                                <button className="btn btn-warning w-100" onClick={() => this.setState({viewAll: true})}>View All</button>
                                <small className="form-text text-muted">This might take a while to load.</small>
                            </div>
                        </div>
                        

                    </div>
                    <div className='d-flex'>
                        <button className='btn btn-secondary me-2' onClick={this.handleMenuClose}>Cancel</button>
                        <button className='btn btn-primary' onClick={this.applySettings}>Apply</button>
                    </div> 
                </div>
            </div>
        );
    }
}