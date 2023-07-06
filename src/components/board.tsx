import React, { useEffect, useState } from 'react';

type boardProps = {
	rows: number
	cols: number
}

type figure = {
	c: number
	r: number
	status: string
	order: number
	clicked: boolean
}

function Board(props: boardProps) {
	const rows = props.rows;
	const cols = props.cols;

	const elements: figure[] = [];
	for (let c = 0; c < cols; c++) {
		for (let r = 0; r < rows; r++) {
			elements.push({
				c: c,
				r: r,
				status: 'empty',
				order: -1,
				clicked: false
			})
		}
	}

	const startIndex = Math.floor(Math.random() * rows*cols + 1);
	elements[startIndex].status = 'active';
	elements[startIndex].order = 1;
	let nextIndex = Math.floor(Math.random() * rows*cols + 1);
	if (nextIndex === startIndex) {
		nextIndex = (nextIndex + 2) < cols*rows ? nextIndex + 2 : nextIndex -2;
	}

	elements[nextIndex].status = 'next';
	elements[nextIndex].order = 2;

	const [items, setItems] = useState(elements);
	const [time, setTime] = useState(0);
	const squares = items.map(i => {
	return <span key={`${i.c}-${i.r}`} className='box'>
		<span className={`${i.status} ${i.clicked && 'clicked' || ''}`} onClick={()=>onElementClick(i)}>
			{i.order > 0 ? i.order : ''}
		</span>
		</span>
	})

	const onElementClick = (i: figure) => {
		if (i.status === 'active') {
			const sqs = items;
			const index = sqs.findIndex((e) => e.c === i.c && e.r === i.r);
			const order = sqs[index].order;
			if (order == 1) setTime(Date.now());
			sqs[index].order = -1;
			sqs[index].status = 'empty';
			sqs[index].clicked = true;

			const nextActiveIndex = sqs.findIndex((e) => e.order === order+1);
			sqs[nextActiveIndex].status = 'active';
			let nextSuggestionIndex = Math.floor(Math.random() * rows*cols + 1);
			if (nextSuggestionIndex == nextActiveIndex) {
				nextSuggestionIndex = nextSuggestionIndex + 2 < cols*rows ? nextIndex + 2 : nextIndex -2;
			}
			sqs[nextSuggestionIndex].order = order + 2;
			sqs[nextSuggestionIndex].status = 'next';
			setItems([...sqs]);
		}
	}

	const count =  Math.max(...items.map(o => o.order)) - 2;
	const timer = time > 0 ? (Date.now()-time)/1000 : 0;
	return (
	<div>
		<h4>{count}: timer: {timer}</h4>
		<div className='board'>
			{squares}
		</div>
	</div>)
}



export default Board;
