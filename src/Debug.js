import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader'

import state from './State';

@hot(module)
@observer
export default class Debug extends Component {
	render() {
		const { isPlaying, frame, delta, elapsed } = state;

		return (
			<Fragment>
				<div>
					<pre className="code"><code>
						frame:   {frame}{"\n"}
						delta:   {delta.toFixed(4)}{"\n"}
						elapsed: {elapsed.toFixed(2)}{"\n"}
					</code></pre>
				</div>

				<div className="btn-group btn-group-block">
					<button
						className={classNames('btn', { 'btn-primary': isPlaying, 'btn-secondary': !isPlaying })}
						onClick={state.start}
					>
						<i className="icon icon-play" />
					</button>
					<button
						className={classNames('btn', { 'btn-primary': !isPlaying, 'btn-secondary': isPlaying })}
						onClick={state.stop}
					>
						<i className="icon icon-pause" />
					</button>
					<button
						className="btn btn-secondary"
						onClick={state.step}
						disabled={isPlaying}
					>
						<i className="icon icon-step-forward" />
					</button>
				</div>

				<div>
					<pre className="code"><code>
						{state.messages.reverse().join('\n')}
					</code></pre>
				</div>
			</Fragment>
	)
	}
}