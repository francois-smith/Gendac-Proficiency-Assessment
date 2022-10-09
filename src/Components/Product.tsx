import React from 'react';
import { MdOutlineMoreVert } from 'react-icons/md';
import { RiEdit2Line } from 'react-icons/ri';
import { IoMdTrash } from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

interface IState {
    itemState: Map<String, any>,
    checked: boolean
}

interface IProps {
    item: Object,
    handleCheck: Function
}

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
                    <Button variant="none" size="sm" className='me-2'>
                        <RiEdit2Line className='cursor-pointer fs-5 hover'/>
                    </Button>
                </td>
            </tr>
        );
    }
}