import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';
import _ from "lodash";
import SearchResults from './components/searchResults';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            message: '',
            fares: [],
            resultsList: [],
            filteredList: [],
            currency: null,
            filterAction: null,
            originList: [],
            destinationList: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        //const data = new FormData(event.target);
        if (!_.isEmpty(this.refs.origin.state.value) && !_.isEmpty(this.refs.origin.state.value)) {
            this.getResultsList(this.refs.origin.state.value.value, this.refs.destination.state.value.value);
        } else {
            this.setState({
                error: '',
                message: 'All fields are required!'
            });
        }
    }

    componentDidMount() {
        const reqData = {
            method: 'GET',
            url: 'http://localhost:8080/api/results',
            data: {},
            headers: {}
        };
        axios(reqData).then((response) => {
            this.setState({
                fares: response.data,
                originList: this.getOriginList(response.data),
                destinationList: this.getDestinationList(response.data)
            });
        }).catch((error) => {

        })


    }

    componentWillMount() {

    }

    getResultsList = (origin, destination) => {
        let results = _.filter(this.state.fares.deals, {'departure': origin, 'arrival': destination});
        if (results.length > 0) {
            this.setState({
                currency: this.state.fares.currency.symbol,
                resultsList: results,
                filteredList: results,
                error: '',
                message: ''
            });
        } else {
            this.setState({
                resultsList: [],
                filteredList: [],
                error: 'No Results Found!',
                message: ''
            });
        }
    }

    getOriginList(fares) {
        let list = _.uniqBy(fares.deals, 'departure');
        let orgList = [];
        for (let i = 0; i < list.length; i++) {
            orgList.push({value: list[i].departure, label: list[i].departure});
        }
        return orgList;
    }

    getDestinationList(fares) {
        let list = _.uniqBy(fares.deals, 'arrival');
        let destList = [];
        for (let i = 0; i < list.length; i++) {
            destList.push({value: list[i].arrival, label: list[i].arrival});
        }
        return destList;
    }


    //return filtered resulted
    filterList = (filterAction) => {
        let filteredList;
        switch (filterAction) {
            case 'CHEAPEST':
                filteredList = _.orderBy(this.state.resultsList, ['cost', 'discount'], ['asc', 'desc']);
                break;
            case 'FASTEST':
                filteredList = _.orderBy(this.state.resultsList, (item) => {
                    return [parseInt(item.duration.h), parseInt(item.duration.m)]
                }, ['asc', 'asc']);
                break;
            default:
                filteredList = this.state.resultsList;
                break;
        }
        this.setState({
            filteredList: filteredList
        });
    }

    render() {
        return (
            <div className="container">
                <h3 className="p-3 text-center">Search Engine</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="row alert alert-dark border-0 pb-4">
                        <div className="col-md">
                            <label className="text-dark" htmlFor="origin">Origin<span
                                className="text-danger">*</span></label>
                            <Select ref="origin" name="origin" required options={this.state.originList}/>
                        </div>
                        <div className="col-md">
                            <label className="text-dark" htmlFor="destination">Destination<span
                                className="text-danger">*</span></label>
                            <Select ref="destination" name="destination" required options={this.state.destinationList}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="">&nbsp;</label>
                            <button name="search" type="submit" className="form-control btn btn-primary">Search
                            </button>
                            {/*<span className="text-danger">{this.state.message}</span>*/}
                        </div>
                    </div>
                </form>
                {this.state.message !== '' ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Oops!</strong> You should check in on some of those fields.
                    </div>
                    : ''}

                <div className="row">
                    {this.state.resultsList.length > 0 ?
                        <div className="col-md d-flex justify-content-center p-3">
                            <div className="btn-group btn-group-justified">
                                <button type="button" className="btn btn-primary"
                                        onClick={() => this.filterList('CHEAPEST')}>Cheapest
                                </button>
                                <button type="button" className="btn btn-primary"
                                        onClick={() => this.filterList('FASTEST')}>Fastest
                                </button>
                            </div>
                        </div>
                        : ''}
                </div>
                <div className="row">
                    <div className="col-md">
                        {this.state.resultsList.length > 0 ? <SearchResults data={this.state}/> : this.state.error}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
