import React from 'react';

interface IState {
    page: Number,
}

interface IProps {
    page: Number,
}

export default class Dashboard extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: this.props.page,
        };
    }

    render(): React.ReactNode {
        return (
            <div>
                
            </div>
        );
    }
}

