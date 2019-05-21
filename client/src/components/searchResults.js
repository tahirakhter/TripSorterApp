import React from 'react';

class SearchResults extends React.Component {

    getDataView = (error, filteredList, currency) => {
        if (error) {
            return <tbody>
            <tr>
                <td colSpan={3}>Error: {error}</td>
            </tr>
            </tbody>;
        } else {
            return <tbody>{
                filteredList.map((item, index) => (<tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.departure}</td>
                            <td>{item.arrival}</td>
                            <td className="text-capitalize">{item.transport}</td>
                            <td>{item.duration.h}h{item.duration.m}m</td>
                            <td>{item.discount}%</td>
                            <td>
                                {item.discount !== 0 ?
                                    <strike>
                                        <small className="text-danger">{item.cost}</small>
                                    </strike> : ''
                                }
                                <big>{item.discount !== 0 ? ((item.cost) / 100) * item.discount : item.cost}{currency}</big>
                            </td>
                        </tr>
                    )
                )
            }
            </tbody>
        }
    }

    render() {
        const {error, filteredList, currency} = this.props.data;

        return (
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Transport</th>
                        <th>Duration</th>
                        <th>Discount</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    {this.getDataView(error, filteredList, currency)}
                </table>
            </div>
        )
    }
}


export default SearchResults;