import React, { Component } from 'react';
import ApiService from "../../service/ApiService";
import moment from "moment";
import Pagination from "react-js-pagination";

class RecordsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            message: null,
            currentPage: 1,
            pageSize: 10,
            totalRecords: 0,
        };

        this.reloadRecords = this.reloadRecords.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.reloadRecords();
    }

    reloadRecords() {
        const { currentPage, pageSize } = this.state;
        ApiService.fetchRecords(currentPage - 1, pageSize)
            .then((res) => {
                this.setState({
                    records: res.data.content,
                    totalRecords: res.data.totalElements,
                });
            }).catch(e => {
                console.error(e);
            this.redirectToLogin();;
        });
    }

    performCalculation() {
        this.props.history.push('/perform-calculation');
    }

    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber }, () => {
            this.reloadRecords();
        });
    }
    logout= () => {
        ApiService.logout()
            .then(() => {
                localStorage.removeItem('token');
                this.redirectToLogin();
            }).catch(error => {
                console.error(error);
            this.redirectToLogin();;
        });
    }

    deleteRecord(id) {
        ApiService.deleteRecord(id)
            .then(() => {
                alert('Record Deleted');
                this.reloadRecords()
            }).catch(e => {
            console.error(e);
            this.redirectToLogin();
        });
    }

    redirectToLogin() {
        window.location.href = "/login";
    }

    render() {
        const { records, currentPage, pageSize, totalRecords } = this.state;
        const totalPages = Math.ceil(totalRecords / pageSize);

        return (
            <div>
                <h2 className="text-center">Operation Records</h2>
                <button className="btn btn-link" style={{width:'100px'}} onClick={() => this.performCalculation()}>Perform Calculation</button>
                <button className="btn btn-primary" style={{width:'100px'}} onClick={() => this.logout()}>Logout</button>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Operation ID</th>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>User Balance</th>
                        <th>Operation Response</th>
                        <th>Created Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map(record => (
                        <tr key={record.id}>
                            <td>{record.operationId}</td>
                            <td>{record.userId}</td>
                            <td>{record.amount}</td>
                            <td>{record.userBalance}</td>
                            <td>{record.operationResponse}</td>
                            <td>{moment(new Date(record.createdDate)).format('MM/DD/YYYY')}</td>
                            <td><button className="btn btn-danger" onClick={() => this.deleteRecord(record.id)}> Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={pageSize}
                    totalItemsCount={totalRecords}
                    pageRangeDisplayed={1}
                    onChange={this.handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        );
    }
}

export default RecordsComponent;
