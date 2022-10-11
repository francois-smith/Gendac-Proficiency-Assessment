import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface IState {
    pageSize: number,
    orderBy: string,
    ascending: Boolean,
    filter: string
}

interface IProps {
    show: boolean,
    hideSettings: Function,
    applySettings: Function,
    pageSize: number,
    orderBy: string, 
    ascending: Boolean, 
    filter: string
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
            filter: this.props.filter
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
        this.props.applySettings(this.state.pageSize, this.state.orderBy, this.state.ascending, this.state.filter);
    }
    
    //popup menu to alter table settings
    render = (): React.ReactNode => {
        return (
            <div className={`setting-menu p-3 rounded border position-absolute bg-white shadow-sm text-muted ${this.props.show ? "d-block" : "d-none"}`}>
                <p>Table Settings</p>


                <div className="d-flex flex-row justify-content-between">
                    <p>Order By</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {this.state.orderBy}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setState({orderBy: "name"})}>Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({orderBy: "category"})}>Category</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({orderBy: "price"})}>Price</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <p>Ascending</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {this.state.ascending ? "True" : "False"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setState({ascending: true})}>True</Dropdown.Item>

                            <Dropdown.Item onClick={() => this.setState({ascending: false})}>False</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="d-flex flex-row justify-content-between">
                    <p>Filter</p>
                    <input type="text" className="form-control" value={this.state.filter} onChange={(e) => this.setState({filter: e.target.value})}/>
                </div>

                <hr />
                <div className='settings-footer d-flex'>
                    <div className='d-flex align-items-center'>
                        <label htmlFor='rows-input' className='me-2'>Rows on page: </label>
                        <input type='number' id="rows-input" value={this.state.pageSize} className='form-control p-1 w-25 text-end'/>
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