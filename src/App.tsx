import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import ContractInfo from "./components/ContractInfo";
import EnterForm from "./components/EnterForm";
import Loader from "./components/Loader/Loader";
import PickWinner from "./components/PickWinner";
import lottery from "./lottery";
import web3 from "./web3";

export interface Contract {
	manager: string;
	players: string[];
	balance: string;
}

const App = () => {
	const [loading, setLoading] = useState(true);
	const [isManager, setIsManager] = useState<boolean>();
	const [contract, setContract] = useState<Contract>();

	useEffect(() => {
		async function getContractInfo() {
			const manager = await lottery.methods.manager().call();
			const players = await lottery.methods.getPlayers().call();
			const balanceInWei = await web3.eth.getBalance(lottery.options.address);
			const balance = parseFloat(
				web3.utils.fromWei(balanceInWei, "ether"),
			).toFixed(3);

			setContract({ manager, players, balance });

			const accounts = await web3.eth.getAccounts();
			setIsManager(manager === accounts[0]);

			setLoading(false);
		}
		getContractInfo();
	}, []);

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<Box
				display="grid"
				justifyContent="center"
				alignItems="center"
				textAlign="center"
				marginY="10vh">
				{loading ? (
					<Loader />
				) : (
					<>
						<ContractInfo contract={contract} />
						<EnterForm />
						{isManager && <PickWinner />}
					</>
				)}
			</Box>
		</Container>
	);
};

export default App;
