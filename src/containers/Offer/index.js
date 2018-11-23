import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class Offer extends Component {
	state = {
		offer: {},
		actualImage: ''
	};
	render() {
		if (Object.keys(this.state.offer).length === 0) {
			return <p>Loading ...</p>;
		}

		let chief = () => {
			if (this.state.offer.creator.account.username === 'stevenpersia') {
				return (
					<span className="crown">
						{this.state.offer.creator.account.username}
						<i className="fas fa-crown" />
					</span>
				);
			} else {
				return <span>{this.state.offer.creator.account.username}</span>;
			}
		};

		let pictureURL = '';
		if (this.state.offer.pictures && this.state.offer.pictures[0]) {
			pictureURL = this.state.offer.pictures[0].secure_url;
		}

		/* GALLERY OF IMAGES */
		const gallery = [];
		for (let i = 1; i < this.state.offer.pictures.length; i++) {
			gallery.push(
				<img
					key={i}
					src={this.state.offer.pictures[i].secure_url}
					alt={this.state.offer.title + ' ' + i}
				/>
			);
		}

		return (
			<div className="container offer">
				<div className="offer-main">
					<div className="offer-img">
						<div className="big-img">
							<img src={pictureURL} alt={this.state.offer.title} />
						</div>

						<div className="gallery">{gallery}</div>
						<div className="offer-img-info">
							<h3>{this.state.offer.title}</h3>
							<span className="price">{this.state.offer.price} €</span>
						</div>
					</div>

					<div className="offer-content">
						<h4>Description </h4>
						<p>{this.state.offer.description}</p>
					</div>
				</div>
				<div className="offer-sidebar">
					<div className="avatar">
						<div className="i-avatar">
							<i className="fas fa-user fa-3x" />
						</div>

						{chief()}
					</div>

					<a href="/" className="btn tel">
						<i className="fas fa-phone" /> Voir le numéro
					</a>
				</div>
			</div>
		);
	}

	componentDidMount() {
		axios
			.get(
				'https://leboncoin-api.herokuapp.com/api/offer/' +
					this.props.match.params.id
			)
			.then(response => {
				this.setState({
					offer: response.data
				});
			});
	}
}

export default Offer;
