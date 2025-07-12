import React, { Component } from 'react';
import {connect} from 'react-redux';

import {compose} from '../hoc';
import { withBelgoService } from '../hoc';
import Rating from 'react-rating';

import star from './star.svg';
import styles from './custom-rating.m.less';

class CustomRating extends Component {
  state = {
    value: this.props.initialRating,
    authData: this.props.authenDataPosted
  };

  handleChange = (value) => {
    if (this.state.authData == null) {
		this.props.navigate('/auth', {state: {previousLocation: this.props.location}});
        this.setState((state) => {
            return {value: state.value};
        });
	} else {
        const data = {'idOffer': this.props.id, 'rating': value};
        this.props.postRating(data)
            .then((data) => {
                this.setState({ value: data?.rating });
            })
            .catch(err => {
                this.setState((state) => {
                    return {value: state.value};
                });
                // console.log('errRating: ', err);
            })
    }   
  };

  componentDidUpdate(prevProps) {
    if (this.props.authenDataPosted !== prevProps.authenDataPosted) {
        this.setState({ authData: this.props.authenDataPosted });
    }
  }

  renderStar = (filled) => (
    <svg    width="28" height="28"
            className={styles.star}
            style={{
                fill: filled ? 'rgba(247, 148, 60, 0.6)' : '#e4e5e9',
                transition: 'fill 0.2s'
            }}
        >
        <use href={`${star}#star`} />
    </svg>
  );

  render() {
    const { value } = this.state;

    return (
      <div>
        <Rating
          initialRating={value}
          onChange={this.handleChange}
          emptySymbol={this.renderStar(false)}
          fullSymbol={this.renderStar(true)}
        />
      </div>
    );
  }
}

const mapMethodsToProps = (belgoService) => ({
	postRating: belgoService.postRating
});

const mapStateToProps = ({authenDataPosted}) => ({
	authenDataPosted,
});

export default compose(
	withBelgoService(mapMethodsToProps),
	connect(mapStateToProps)
)(CustomRating);