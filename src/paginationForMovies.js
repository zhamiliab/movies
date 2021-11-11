import React from "react"
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
class PageComponent extends React.Component {
    render() {
        return (
            <Pagination>

                <PaginationItem>
                    <PaginationLink onClick={() => this.props.changePage(1)} href="#">
                        1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => this.props.changePage(2)} href="#">
                        2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => this.props.changePage(3)} href="#">
                        3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => this.props.changePage(4)} href="#">
                        4
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={() => this.props.changePage(5)} href="#">
                        {this.props.currentpage <= 5 ? 5 : this.props.currentpage}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        pagination={false}
                        // disabled={true}
                        next
                        onClick={() => this.props.progressForward(this.props.currentpage < 10 ? this.props.currentpage + 1 : 10)}
                    />
                </PaginationItem>


            </Pagination>
        )
    }
}

export default PageComponent;