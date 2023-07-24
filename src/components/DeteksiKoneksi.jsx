// DeteksiKoneksi.js
import axios from "axios";
import { useEffect, useState } from "react";

const DeteksiKoneksi = () => {
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

	useEffect(() => {
		const checkInternetConnection = async () => {
			try {
				await axios.get("https://www.google.com", { timeout: 5000 });
				setIsOnline(true);
			} catch (error) {
				setIsOnline(false);
			}
		};

		checkInternetConnection();
	}, []);

	return (
		<div>
			{isOnline ? (
				<p>Koneksi internet tersedia.</p>
			) : (
				<p>Tidak ada koneksi internet. Silakan periksa koneksi Anda.</p>
			)}
		</div>
	);
};

export default DeteksiKoneksi;
