import React from 'react';
import { BiFirstPage, BiLastPage, BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface IState {
}

interface IProps {
    page: number,
    pages: number,
    total: number,
    pageSize: number,
    data: Array<Object>,
    handlePageChange: Function
}

/**
 * This component is used to render the pagination for the table.
 */
export default class TablePagination extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    /**
     * @brief Changes the page to the page number passed in. Propgates to parent to rerender the table.
     * @param page The page number to change to
     */
    changePage = (page: number) => {
        if(page > 0 && page <= this.props.pages) {
            this.props.handlePageChange(page);
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                {/* Check if products have been loaded to determine the pages */}
                
                {this.props.pages > 1 && this.props.data.length != 0 ? 
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            <BiFirstPage className='fs-4 cursor-pointer'onClick={() => this.changePage(1)}/>
                            <BiChevronLeft className='fs-4 cursor-pointer' onClick={() => this.changePage(this.props.page - 1)}/>

                            {/* This entire block of code just conditionally renders the page numbers so that there is no pop in and out */}
                            {this.props.page < 3 ?
                                <div className='d-flex'>
                                    <PaginationButton changePage={this.changePage} page={1} active={this.props.page == 1}/>
                                    <PaginationButton changePage={this.changePage} page={2} active={this.props.page == 2}/>
                                    <PaginationButton changePage={this.changePage} page={3} active={this.props.page == 3}/>
                                    <PaginationButton changePage={this.changePage} page={4} active={this.props.page == 4}/>
                                    <PaginationButton changePage={this.changePage} page={5} active={this.props.page == 5}/>
                                </div>
                                :
                                this.props.page > this.props.pages - 2?
                                <div className='d-flex'>
                                    <PaginationButton changePage={this.changePage} page={this.props.pages - 4} active={this.props.page == this.props.pages - 4}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.pages - 3} active={this.props.page == this.props.pages - 3}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.pages - 2} active={this.props.page == this.props.pages - 2}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.pages - 1} active={this.props.page == this.props.pages - 1}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.pages} active={this.props.page == this.props.pages}/>
                                </div>
                                :
                                this.props.pages > 5 ?
                                <div className='d-flex'>
                                    <PaginationButton changePage={this.changePage} page={this.props.page - 2} active={this.props.page == this.props.page - 2}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.page - 1} active={this.props.page == this.props.page - 1}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.page} active={true}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.page + 1} active={this.props.page == this.props.page + 1}/>
                                    <PaginationButton changePage={this.changePage} page={this.props.page + 2} active={this.props.page == this.props.page + 2}/>
                                </div>
                                :
                                <div className='d-flex'>
                                    {Array.from(Array(this.props.pages).keys()).map((page) => {
                                        return <PaginationButton changePage={this.changePage} page={page + 1} active={this.props.page == page + 1}/>
                                    })}
                                </div>
                            }

                            <BiChevronRight className='fs-4 cursor-pointer' onClick={() => this.changePage(this.props.page + 1)}/>
                            <BiLastPage className='fs-4 cursor-pointer' onClick={() => this.changePage(this.props.pages)}/>
                        </div>
                        <div>
                            {this.props.pageSize * (this.props.page - 1) + 1} to {this.props.pageSize * this.props.page < this.props.total ? this.props.pageSize * this.props.page : this.props.total} of {this.props.total}
                        </div>
                    </div>
                    
                    :
                    null
                }
            </div>
        );
    }
}


interface BProps{
    page: any,
    changePage: Function,
    active: boolean
}

/**
 * @brief This component is used to render the individual page buttons for the pagination.
 */
class PaginationButton extends React.Component<BProps, {}> {
    render() {
        return (
            <button className={`pagination-item rounded border-0 cursor-pointer ${this.props.active ? "active-page" : ""}`} onClick={() => { 
                if(!isNaN(Number(this.props.page))) this.props.changePage(this.props.page);
            }}>
                {this.props.page}
            </button>
        );
    }
}