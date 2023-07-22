import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Answers } from "../components/Answer";
import { ProgressBar } from "../components/ProgressBar";
import { useAuth } from "../contexts/AuthContext";
import useQuestions from "../hooks/useQuestions";

const initialState = null;

const reducer = (state, action) => {
	switch (action.type) {
		case "questions":
			action.value.forEach((question) => {
				question.options.forEach((option) => {
					option.checked = false;
				});
			});
			return action.value;
		case "answer":
			const questions = _.cloneDeep(state);
			questions[action.questionID].options[action.optionIndex].checked =
				action.value;
			return questions;
		default:
			return state;
	}
};
function Quiz() {
	const { id } = useParams();
	// console.log(id);
	const { loading, error, questions } = useQuestions(id);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	// console.log(questions);

	const [qna, dispatch] = useReducer(reducer, initialState);
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({
			type: "questions",
			value: questions,
		});
	}, [questions]);

	function handleAnswerChange(e, index) {
		dispatch({
			type: "answer",
			questionID: currentQuestion,
			optionIndex: index,
			value: e.target.checked,
		});
	}
	function nextQuestion() {
		if (currentQuestion + 1 < questions.length) {
			setCurrentQuestion((prevCurrent) => prevCurrent + 1);
		}
	}

	function prevQuestion() {
		if (currentQuestion >= 1 && currentQuestion <= questions.length) {
			setCurrentQuestion((prevCurrent) => prevCurrent - 1);
		}
	}

	async function submit() {
		const { uid } = currentUser;

		const db = getDatabase();
		const resultRef = ref(db, `result/${uid}`);

		await set(resultRef, {
			[id]: qna,
		});

		const options = {
			state: {
				qna,
			},
		};
		navigate(`/result/${id}`, options);
	}
	const percentage =
		questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

	return (
		<>
			{loading && <div>Loading ...</div>}
			{error && <div>There was an error!</div>}
			{!loading && !error && qna && qna.length > 0 && (
				<>
					<h2>{qna[currentQuestion].title}</h2>
					<h4>Question can have One answers</h4>
					<Answers
						input
						options={qna[currentQuestion].options}
						handleChange={handleAnswerChange}
					/>
					<ProgressBar
						next={nextQuestion}
						prev={prevQuestion}
						progress={percentage}
						submit={submit}
					/>
				</>
			)}
		</>
	);
}

export default Quiz;
