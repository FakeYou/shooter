import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Number from './input/Number';

export default class Vector3 extends Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['default', 'position', 'rotation', 'scale']),
		vector3: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired,
			z: PropTypes.number.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		type: 'default',
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.type === 'rotation') {
			return {
				x: Vector3.degrees(nextProps.vector3.x),
				y: Vector3.degrees(nextProps.vector3.y),
				z: Vector3.degrees(nextProps.vector3.z),
			}
		}

		return {
			x: nextProps.vector3.x,
			y: nextProps.vector3.y,
			z: nextProps.vector3.z,
		};
	}

	static degrees(radians) {
		return radians * (180 / Math.PI);
	}

	static radians(degrees) {
		return degrees * (Math.PI / 180);
	}

	constructor(props) {
		super(props);

		this.state = Vector3.getDerivedStateFromProps(props, {});
		this.state.proportionally = props.type === 'scale';
	}

	handleChange = (e, value) => {
		if (this.props.type === 'scale' && this.state.proportionally) {
			this.props.vector3.set(value, value, value);
		}
		else if (this.props.type === 'rotation') {
			this.props.vector3[e.target.name] = Vector3.radians(value)
		}
		else {
			this.props.vector3[e.target.name] = value;
		}
	}

	handleCheckbox = (e) => {
		this.setState({
			proportionally: e.target.checked,
		});
	}

	render() {
		const { label, type } = this.props;
		const { x, y, z, proportionally } = this.state;

		const addon = type === 'rotation' ? '°' : null;

		return (
			<div className="columns col-gapless my-1 vector3">
				<div className="column col-2">
					<label className="form-label label-sm">{label}</label>
				</div>
				<div className="column col-1">

					{type === 'scale' && 
						<label className="form-checkbox input-sm text-right">
							<input type="checkbox" checked={proportionally} onChange={this.handleCheckbox} />
							<i className="form-icon" />
						</label>
					}

				</div>
				<div className="column col-3">
					<Number name="x" value={x} onChange={this.handleChange} addon={addon} />
				</div>
				<div className="column col-3">
					<Number name="y" value={y} onChange={this.handleChange} addon={addon} />
				</div>
				<div className="column col-3">
					<Number name="z" value={z} onChange={this.handleChange} addon={addon} />
				</div>
			</div>
		)
	}
}