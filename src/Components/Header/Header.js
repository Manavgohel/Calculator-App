import React, { useEffect, useRef } from 'react';

import './Header.css';

const Header = ({expression, result, history}) => {

	const resultRef = useRef();
	const expRef = useRef();

	useEffect( ()=> {
		resultRef.current.scrollIntoView({behavior: "smooth"});
	}, [history]);

	useEffect( ()=> {
		expRef.current.scrollLeft = expRef.current.scrollWidth;
	}, [expression]);
	
	return (
		<div className="header custom_scroll">
			<div className="header_history">
				{
					// if there is history then only show
					history &&
					history.map( (item) => <p key={item + Math.random() * 100}> {item} </p> )
				}
			</div>
			<br />
			<div ref={expRef} className="header_expression custom_scroll">
				<p> {expression} </p>
			
			</div>
			<p ref={resultRef} className="header_result"> {result} </p>
		</div>
	);
}

export default Header;
