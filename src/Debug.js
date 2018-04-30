import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { hot } from 'react-hot-loader'

import Game from './Game';
import state from './State';

@hot(module)
@observer
export default class Debug extends Component {
	render() {
		const { isPlaying, frame, delta, elapsed } = state;
		const { game } = this.props;

		if (!game) {
			return null;
		}

		return (
			<div>
				<div>
					<pre className="code"><code>
						frame:   {frame}{"\n"}
						delta:   {delta.toFixed(4)}{"\n"}
						elapsed: {elapsed.toFixed(2)}{"\n"}
					</code></pre>
				</div>

				<div className="form-group">
  				<label className="form-label">Controls</label>
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
				</div>

				<div className="form-group horizontal">
					<label className="form-label">Pixel scale</label>
					<input
						className="form-input"
						placeholder="1"
						min={1}
						max={10}
						value={game.pixelScale}
						type="number"
						onChange={(e) => game.pixelScale = e.target.value}
					/>
				</div>

				<div className="form-group horizontal">
  				<label className="form-label">Level</label>
					<select
						className="form-select"
						selected={game.level}
						onChange={(e) => game.level = e.target.value}
					>
						<option value="Playground">Playground</option>
						<optgroup label="Debug">
							<option value="BoxBox">BoxBox</option>
							<option value="BoxPoint">BoxPoint</option>
							<option value="BoxSegment">BoxSegment</option>
							<option value="SweptBox">SweptBox</option>
						</optgroup>
					</select>
				</div>

				<div>
					<pre className="code"><code>
						{state.messages.reverse().join('\n')}
					</code></pre>
				</div>
			</div>
	)
	}
}