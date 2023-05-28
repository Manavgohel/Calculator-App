import React from 'react';

import './KeyPad.css';

const KeyPad = (props) => {

	const keys = [
		{
			label: "7",
		},
		{
			label: "8",
		},
		{
			label: "9",
		},
		{
			label: "4",
		},
		{
			label: "5",
		},
		{
			label: "6",
		},
		{
			label: "1",
		},
		{
			label: "2",
		},
		{
			label: "3",
		},
		{
			label: "0",
		},
		{
			label: ".",
		},
		{
			label: "=",
		},
	];
	

	const symbols = [
		{
			label: "⌫",
			value: "backspace",
		},
		{
			label: "÷",
			value: "/",
		},
		{
			label: "×",
			value: "*",
		},
		{
			label: "﹣",
			value: "-",
		},
		{
			label: "+",
			value: "+",
		  }
	
	];

	return (
		<div className='keypad'>
			<div className="keypad_keys">
				{
					keys.map( (item, ind) => <p onClick={()=>props.handleKeypress(item.label)} key={ind}> {item.label} </p> )
				}
			</div>
			<div className="keypad_symbols">
				{
					symbols.map( (item, ind) => <p onClick={()=>props.handleKeypress(item.value)} key={ind}> {item.label} </p> )
				}
			</div>
		</div>
	);
}

export default KeyPad;
