import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
	return (
		<Router>
			<AuthProvider>
				<Layout>
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
