import { useState } from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

import lottery from "../lottery";
import web3 from "../web3";

const PickWinner = () => {
	const [isSubmitting, setSubmitting] = useState(false);
	const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async () => {
		setSubmitting(true);
		try {
			const accounts = await web3.eth.getAccounts();
			await lottery.methods.pickWinner().send({
				from: accounts[0],
				gas: 1_000_000,
			});
			setSubmitSuccessful(true);
		} catch (err: any) {
			setError("Sorry, the transaction failed, please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Box>
			<Typography marginTop={3} variant="h4" gutterBottom>
				Time to pick a winner?
			</Typography>
			{isSubmitSuccessful && (
				<Alert
					onClose={() => {
						setSubmitSuccessful(false);
					}}
					severity="success">
					You have successfully picked a winner!
				</Alert>
			)}
			{error && (
				<Alert
					onClose={() => {
						setError("");
					}}
					severity="error">
					{error}
				</Alert>
			)}
			<LoadingButton
				onClick={handleSubmit}
				variant="contained"
				fullWidth
				loading={isSubmitting}
				sx={{ py: "0.8rem", mt: "1rem" }}>
				Pick Winner
			</LoadingButton>
		</Box>
	);
};

export default PickWinner;
