import classes from "../styles/Analysis.module.css";
import Question from "./Question";
export const Analysis = ({ answers }) => {
	console.log(answers);
	return (
		<div className={classes.analysis}>
			<h1>Question Analysis</h1>
			<h4>You answerd 5 out of 10 questions correctly</h4>
			<Question answers={answers} />
		</div>
	);
};
