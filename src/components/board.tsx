import React, { useState } from 'react';

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

	const [items, setItems] = useState(generateBoardElements(cols, rows));
	const [time, setTime] = useState(0);
	const squares = items.map(i => {
	return <span key={`${i.c}-${i.r}`} className='box'>
		<span className={`${i.status} ${i.clicked && 'clicked' || ''}`} onClick={()=>onElementClick(i)}>
			{i.order > 0 ? i.order : ''}
		</span>
		</span>
	});

	const onElementClick = (i: figure) => {
		if (i.status === 'active') {
			const index = items.findIndex((e) => e.c === i.c && e.r === i.r);
			const order = items[index].order;
			if (order == 1) setTime(Date.now());
			items[index].order = -2;
			items[index].status = 'empty';
			items[index].clicked = true;

			const prev = items.findIndex((e) => e.order === -2);
			items[prev].clicked = false;

			const nextActiveIndex = items.findIndex((e) => e.order === order+1);
			items[nextActiveIndex].status = 'active';
			let nextSuggestionIndex = Math.floor(Math.random() * rows*cols);
			if (nextSuggestionIndex === nextActiveIndex) {
				nextSuggestionIndex = nextSuggestionIndex + 2 < cols*rows ? nextSuggestionIndex + 2 : nextSuggestionIndex -2;
			}
			console.log(items);
			console.log(nextSuggestionIndex);
			console.log(items[nextSuggestionIndex]);
			items[nextSuggestionIndex].order = order + 2;
			items[nextSuggestionIndex].status = 'next';
			setItems([...items]);
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

function generateBoardElements(cols: number, rows: number) {
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

	const startIndex = Math.floor(Math.random() * rows*cols);
	elements[startIndex].status = 'active';
	elements[startIndex].order = 1;
	let nextIndex = Math.floor(Math.random() * rows*cols);
	if (nextIndex === startIndex) {
		nextIndex = (nextIndex + 2) < cols*rows ? nextIndex + 2 : nextIndex -2;
	}

	elements[nextIndex].status = 'next';
	elements[nextIndex].order = 2;

	return elements;
}



export default Board;
