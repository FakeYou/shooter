import React, { PureComponent, Fragment } from 'react'

import Vector3 from './Vector3';

export default class Root extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			inspect: null,
		};
	}

	update(delta, elapsed) {
		this.setState({ delta, elapsed });
	}

	inspect(object) {
		this.setState({ inspect: object });
	}

	render() {
		const { game } = this.props;
		const { inspect } = this.state;
		const player = game.player;

		return (
			<div className="m-2">
				<h6>Player</h6>
				<Vector3 label="Position" type="position" vector3={player.position} />
				<Vector3 label="Rotation" type="rotation" vector3={player.rotation} />
				<Vector3 label="Scale" type="scale" vector3={player.scale} />

				<div className="divider" />

				<h6>Skeleton</h6>
				{!!inspect &&
					<Fragment>
						<Vector3 label="Position" type="position" vector3={inspect.position} />
						<Vector3 label="Rotation" type="rotation" vector3={inspect.rotation} />
						<Vector3 label="Scale" type="scale" vector3={inspect.scale} />
					</Fragment>
				}
			</div>
		)
	}
}
