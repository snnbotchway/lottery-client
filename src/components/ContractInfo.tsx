import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Contract } from "../App";

interface Props {
	contract?: Contract;
}

const ContractInfo = ({ contract }: Props) => {
	if (!contract) return null;

	const playerCount = contract.players.length;

	return (
		<Box>
			<Typography variant="h2" gutterBottom>
				Lottery Contract
			</Typography>
			<Typography variant="body1" gutterBottom>
				This contract is managed by: <strong>{contract.manager}</strong>
				<br />
				There {playerCount === 1 ? "is" : "are"} currently{" "}
				<strong>{playerCount}</strong> {playerCount === 1 ? "person" : "people"}{" "}
				entered, competing to win <strong>{contract.balance} ether</strong>!
			</Typography>
		</Box>
	);
};

export default ContractInfo;
