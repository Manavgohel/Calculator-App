import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";

import Header from "./Components/Header/Header";
import KeyPad from "./Components/KeyPad/KeyPad";

import Moon from "./Assets/moon.png";
import Sun from "./Assets/sun.png";

import "./App.css";

const App = () => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operators =["-", "+", "*", "/"];

    var [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("calculator_app_mode")) || false);
    var [expression, setExpression] = useState("");
    var [result, setResult] = useState("");
    var [history, setHistory] = useState(JSON.parse(localStorage.getItem("calculator_app_history")) || []);
    var [isLoading, setIsLoading] = useState(false);

	// auto clear localStorage after 1 days
	var day = 1;
	var now = new Date().getTime();
	var setTime = localStorage.getItem("setTime");
	if(setTime == null) {
		localStorage.setItem("setTime", now);
	} else {
		if(now - setTime > day * 24 * 60 * 60 * 1000) {
			localStorage.clear();
			localStorage.setItem("setTime", now);
		}
	}
	

    const handleKeypress = (key) => {
        // console.log(key);
        // if(!key)return;  if key is not pressed
        if(numbers.includes(key)) {
            // console.log("Number");
            if(key==="0") {
                // dont allow user to press more than 1 zero in beginning
                if(expression.length===1) return;
            }
            calculateResult(expression + key);
            setExpression(expression + key);

        } else if(operators.includes(key)) {
            // console.log("Operator");
            if(!expression) return; //not expresion then return
            
            // checks if last chaar is operator or dot
            const lastChar = expression.slice(-1);
            if(operators.includes(lastChar)) return;
            if(lastChar === '.') return;

            setExpression(expression + key);

        } else if(key===".") {
            if(!expression) return; //not expresion then return
            
            // checks if last chaar is operator or dot
            const lastChar = expression.slice(-1);
            if(operators.includes(lastChar)) return;
            if(lastChar === '.') return;

            setExpression(expression + key);

        } else if(key === "backspace") {
            // console.log("Backspace");
            if(!expression) return; //not expresion then return
            calculateResult(expression.slice(0, -1));
            // removes last char
            setExpression(expression.slice(0, -1));

        } else if(key === "=") {
            // console.log("Enter");
            if(!expression) return; //not expresion then return
            calculateResult(expression);

            // checks if last chaar is operator or dot
            const lastChar = expression.slice(-1);
            
            // if last is . and therer is not operator in exp then remove last char and to history
            if(lastChar === '.' || operators.includes(lastChar)) expression=expression.slice(0, -1);


            // add item to history on pressing enter
			var tempHistory = [...history];
            // only allow to store 10 previous expressions in history
            if(history.length > 9) tempHistory.splice(0, 1);
            
			tempHistory.push(expression);
			setHistory(tempHistory);

        }
    }

    const calculateResult = (exp) => {
        if(!exp) {
			setResult("0.00");
			return;
		}

        // checks if last chaar is operator or dor then simply discard it
        const lastChar = exp.slice(-1);
        if(!numbers.includes(lastChar) || lastChar === '.') 
            exp=exp.slice(0, -1);

        // eslint-disable-next-line no-eval
        const answer = eval(exp).toFixed(2);    //abovecomment just to remove eval compile warning
        setResult(answer);
		setExpression("");

    }

	useEffect( ()=> {
		localStorage.setItem("calculator_app_mode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	useEffect( ()=> {
		localStorage.setItem("calculator_app_history", JSON.stringify(history));
	}, [history]);

    // for pre loading
    useEffect( ()=> {
        setIsLoading(true);
        setTimeout( ()=> {
            setIsLoading(false);
        }, 2500);
    }, []);



    return ( 
        <div className={` app ${ isDarkMode ? "app_active" : "" } `} data-theme={ isDarkMode ? "dark" : "" }>

            {
                isLoading ? <RingLoader color={"#0071FF"} loading={isLoading} size={130} className="spinAnim" /> : 
                (
                    <div className="app_calculator">
                        <div className="app_calculator_navbar">
                            <div className={` app_calculator_navbar_toggle ${ isDarkMode ? "app_calculator_navbar_toggle_active" : "" } `} onClick={() => setIsDarkMode(!isDarkMode)}>
                                <div
                                    className={ `app_calculator_navbar_toggle_circle ${ isDarkMode ? "app_calculator_navbar_toggle_circle_active" : "" }` }
                                ></div>
                            </div>

                            <img src={isDarkMode ? Moon : Sun} alt="mode" />
                        </div>

                        <Header expression={expression} result={result} history={history} />
                        <KeyPad handleKeypress={handleKeypress} />
                    </div>
                )
            }
            
        </div>
    );
};

export default App;
