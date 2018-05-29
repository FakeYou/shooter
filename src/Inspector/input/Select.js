import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Select extends PureComponent {
	static propTypes = {
		name: PropTypes.string.isRequired,
		selected: PropTypes.string,
		options: PropTypes.arrayOf(PropTypes.string).isRequired,
		onChange: PropTypes.func,
	}

	static defaultProps = {
		value: 1,
		onChange: null,
	}
	
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			value: prevState.isFocused ? prevState.value : nextProps.value,
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			value: props.value,
			isFocused: false,
		};
	}

	handleChange = (e) => {
		const value = e.target.value;

		this.setState({ value });

		this.props.onChange && this.props.onChange(e, value);
	}

	handleFocus = (e) => {
		this.setState({ isFocused: true });
	}

	handleBlur = (e) => {
		this.setState({ isFocused: false });
	}

	render() {
		const { name, options, addon } = this.props;
		const { value } = this.state;

		return (
			<div className="columns col-gapless my-1 vector3">
				<div className="column col-3">
					<label className="form-label label-sm">{name}</label>
				</div>

				<div className="column col-9">
					<select
						className="form-select select-sm"
						name={name}
						value={value}
						onChange={this.handleChange}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
					>
						{options.map(option => <option value={option}>{option}</option>)}
					</select>
				</div>
			</div>
		)
	}
}