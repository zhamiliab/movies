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
                        5
                    </PaginationLink>
                </PaginationItem>

            </Pagination>
        )
    }
}

export default PageComponent;