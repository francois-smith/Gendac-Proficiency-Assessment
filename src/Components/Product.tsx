import React from 'react';
import { RiEdit2Line } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import { ModalType } from '../utils/CustomTypes';

interface IState {
    itemState: Map<String, any>,
    checked: boolean
}

interface IProps {
    item: Object,
    handleCheck: Function,
    showModal: Function,
}

/**
 * This component is used to render a single row in the table.
 */
export default class Product extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            // Map of the item's state excluding Id
            itemState: new Map(Object.entries(this.props.item)),
            checked: false
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    /**
     * @brief This function is called when the checkbox is clicked. It updates the state of the checkbox and calls the handleCheck function from the parent component.
     * @param event - The event that triggered this function
     */
    handleCheckboxChange(event: any): void {
        this.setState({checked: event.target.checked});
        this.props.handleCheck(event.target.checked, this.state.itemState.get("Id"));
    }

    render(): React.ReactNode {
        return (
            <tr>
                <td key="checkbox">
                    <input className='cursor-pointer' type="checkbox" checked={this.state.checked} onChange={this.handleCheckboxChange.bind(this)}/>
                </td>
                {/*Render the data*/}
                {Array.from(this.state.itemState).map((item: any, i) => {
                    //get if from state
                    if(item[0] !== "Id") return <td className='pe-none' key={i}>{item[1]}</td>
                })}
                {/* Adds trigger icon to show more settings */}
                <td key="action" className='text-end'>
                    <Button variant="none" size="sm" className='me-2' onClick={() => this.props.showModal(ModalType.Edit, this.state.itemState)}>
                        <RiEdit2Line className='cursor-pointer fs-5 hover'/>
                    </Button>
                </td>
            </tr>
        );
    }
}