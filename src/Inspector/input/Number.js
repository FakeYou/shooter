import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Number extends PureComponent {
	static propTypes = {
		name: PropTypes.string.isRequired,
		value: PropTypes.number,
		onChange: PropTypes.func,
		addon: PropTypes.string,
	}

	static defaultProps = {
		value: 1,
		onChange: null,
		addon: null,
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

		this.props.onChange && this.props.onChange(e, parseFloat(value));
	}

	handleFocus = (e) => {
		this.setState({ isFocused: true });
	}

	handleBlur = (e) => {
		this.setState({ isFocused: false });
	}

	render() {
		const { name, addon } = this.props;
		const { value } = this.state;

		return (
			<div className="input-group">
				<input
					class="form-input input-sm"
					name={name}
					type="text"
					value={value}
					onChange={this.handleChange}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
				/>
				{!!addon && <span class="input-group-addon addon-sm">{addon}</span>}
			</div>
		)
	}
}