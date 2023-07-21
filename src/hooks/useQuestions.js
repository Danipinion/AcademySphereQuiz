import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoLists(videoID) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [questions, setQuestions] = useState([]);
	console.log(questions.length);
	useEffect(() => {
		async function fetchQuestions() {
			const db = getDatabase();
			const quizRef = ref(db, "quiz/" + videoID + "/questions");
			const quizQuery = query(quizRef, orderByKey());
			try {
				setError(false);
				setLoading(true);
				const snapshot = await get(quizQuery);
				setLoading(false);
				if (snapshot.exists()) {
					setQuestions((prevQuestions) => {
						return [...prevQuestions, ...Object.values(snapshot.val())];
					});
				}
			} catch (err) {
				console.log(err);
				setLoading(false);
				setError(true);
			}
		}
		fetchQuestions();
	}, [videoID]);
	return { loading, error, questions };
}
