import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DeteksiKoneksi from "./components/DeteksiKoneksi";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import { Result } from "./pages/Result";
import Signup from "./pages/Signup";
import "./styles/App.css";

function App() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);
	return (
		<Router>
			<AuthProvider>
				<Layout>
					{isOnline ? (
						<DeteksiKoneksi />
					) : (
						<p>Tidak ada koneksi internet. Silakan periksa koneksi Anda.</p>
					)}
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route
							exact
							path="/signup"
							element={
								<PublicRoute>
									<Signup />
								</PublicRoute>
							}
						/>
						<Route
							exact
							path="/login"
							element={
								<PublicRoute>
									<Login />
								</PublicRoute>
							}
						/>
						<Route
							exact
							path="/quiz/:id"
							element={
								<PrivateRoute>
									<Quiz />
								</PrivateRoute>
							}
						/>
						<Route
							exact
							path="/result/:id"
							element={
								<PrivateRoute>
									<Result />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default App;
