import React from 'react';
import { BiFirstPage, BiLastPage, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

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
            <div className='d-flex align-items-center'>
                <BiFirstPage className='fs-4 cursor-pointer'onClick={() => this.changePage(1)}/>
                <BiChevronLeft className='fs-4 cursor-pointer' onClick={() => this.changePage(this.props.page - 1)}/>
                <PaginationButton changePage={this.changePage} page={1} active={true}/>
                
                <BiChevronRight className='fs-4 cursor-pointer' onClick={() => this.changePage(this.props.page + 1)}/>
                <BiLastPage className='fs-4 cursor-pointer' onClick={() => this.changePage(this.props.pages)}/>
            </div>
        );
    }
}

interface BProps{
    page: number,
    changePage: Function,
    active: boolean
}

class PaginationButton extends React.Component<BProps, {}> {
    render() {
        return (
            <button className={`pagination-item rounded border-0 cursor-pointer ${this.props.active ? "active-page" : ""}`} onClick={() => this.props.changePage(this.props.page)}>
                {this.props.page}
            </button>
        );
    }
}

/*
    <Pagination.First onClick={() => this.changePage(1)}/>
                <Pagination.Prev />
                <Pagination.Ellipsis />

                {this.props.page > 2 && <Pagination.Item onClick={() => this.changePage(this.props.page - 1)}>{this.props.page - 1}</Pagination.Item>}
                <Pagination.Item active>{this.props.page}</Pagination.Item>
                {this.props.page < this.props.pages - 1 && <Pagination.Item onClick={() => this.changePage(this.props.page + 1)}>{this.props.page + 1}</Pagination.Item>}

                <Pagination.Ellipsis />
                <Pagination.Next />
                <Pagination.Last />
*/