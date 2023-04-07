import { useEffect, useState } from "react";
import "./App.css";
import lottery from "./lottery";

const App = () => {
	const [manager, setManager] = useState();

	useEffect(() => {
		async function getManager() {
			const manager = await lottery.methods.manager().call();
			setManager(manager);
		}
		getManager();
	}, []);

	return (
		<div className="div">
			<h2>Lottery Contract</h2>
			<p>This contract is managed by: {manager}</p>
		</div>
	);
};

export default App;
