import React from 'react';
import Board from '../components/board';
const config = {
	rows: 16,
	cols: 16
}
function Game() {
	return (
	<div>
		<Board rows={config.rows} cols={config.cols}/>
	</div>)
}

export default Game;
