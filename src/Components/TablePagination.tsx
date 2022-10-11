import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface IState {
}

interface IProps {
    page: number,
    pages: number,
    handlePageChange: Function
}

export default class TablePagination extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: this.props.page,
        };

        this.changePage = this.changePage.bind(this);
    }

    changePage = (page: number) => {
        if(page > 0 && page <= this.props.pages) {
            this.props.handlePageChange(page);
        }
        console.log(page);
    }

    render(): React.ReactNode {
        return (
            <Pagination >
                <Pagination.First onClick={() => this.changePage(1)}/>
                <Pagination.Prev onClick={() => this.changePage(this.props.page - 1)}/>
                <Pagination.Ellipsis />

                {this.props.page > 2 && <Pagination.Item onClick={() => this.changePage(this.props.page - 1)}>{this.props.page - 1}</Pagination.Item>}
                <Pagination.Item active>{this.props.page}</Pagination.Item>
                {this.props.page < this.props.pages - 1 && <Pagination.Item onClick={() => this.changePage(this.props.page + 1)}>{this.props.page + 1}</Pagination.Item>}

                <Pagination.Ellipsis />
                <Pagination.Next onClick={() => this.changePage(this.props.page + 1)}/>
                <Pagination.Last onClick={() => this.changePage(this.props.pages)}/>
            </Pagination>
        );
    }
}

