import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './styles.css';
import OffersFilter from '../../components/OffersFilter';
import OfferCard from '../../components/OfferCard';
import Pagination from '../../components/Pagination';

const MAX_LIMIT_NUMBER = 25;

class Offers extends Component {
	state = {
		offers: [],
		count: 0,
		search: {
			title: '',
			priceMin: '',
			priceMax: '',
			sort: 'date-desc',
			skip: 0,
			limit: MAX_LIMIT_NUMBER
		}
	};

	reloadAxios = () => {
		axios
			.get('https://leboncoin-api.herokuapp.com/api/offer/with-count', {
				params: this.state.search
			})
			.then(response => {
				this.setState({
					offers: response.data.offers,
					count: response.data.count
				});
			});
	};

	changeSearch = (newSearch, axios) => {
		this.setState(
			{
				search: {
					...this.state.search,
					...newSearch
				}
			},
			axios
		);
	};

	render() {
		const offersFound = [];
		for (let i = 0; i < this.state.offers.length; i++) {
			offersFound.push(
				<OfferCard
					key={this.state.offers[i]._id}
					id={this.state.offers[i]._id}
					title={this.state.offers[i].title}
					description={this.state.offers[i].description}
					price={this.state.offers[i].price}
					picture={this.state.offers[i].pictures}
				/>
			);
		}

		return (
			<Fragment>
				<div className="filters">
					<OffersFilter
						reloadAxios={this.reloadAxios}
						search={this.state.search}
						changeSearch={this.changeSearch}
					/>
				</div>
				<div className="container">
					<h4>{this.state.count} résultats</h4>
					<ul className="offers-list">{offersFound}</ul>
					<Pagination
						reloadAxios={this.reloadAxios}
						search={this.state.search}
						changeSearch={this.changeSearch}
						count={this.state.count}
					/>
				</div>
			</Fragment>
		);
	}
	componentDidMount() {
		axios
			.get(
				'https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=0&limit=25&sort=date-desc'
			)
			.then(response => {
				this.setState({
					count: response.data.count,
					offers: response.data.offers
				});
			});
	}
}

export default Offers;
