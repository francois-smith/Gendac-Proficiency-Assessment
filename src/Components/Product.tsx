import React from 'react';

export default class DataItem extends React.Component<{item: Object}, {itemState: Map<String, any>}> {
    constructor(props: any) {
        super(props);
        this.state = {
            itemState: new Map(Object.entries(this.props.item)),
        };
    }

    render(): React.ReactNode {
        return (
            <tr>
                {/*Render the data*/}
                {Array.from(this.state.itemState).map((item: any, i) => {
                    return <td key={i}>{item[1]}</td>
                })}
            </tr>
        );
    }

}