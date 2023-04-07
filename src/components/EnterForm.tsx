import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import lottery from "../lottery";
import web3 from "../web3";

const schema = z.object({
	amount: z
		.number({ invalid_type_error: "Enter a valid number. Eg. 1.2" })
		.gt(0.01, { message: "Amount must be greater than 0.01 ether." }),
});

type FormData = z.infer<typeof schema>;

const EnterForm = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const [isSubmitting, setSubmitting] = useState(false);
	const [isSubmitSuccessful, setSubmitSuccessful] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	const onSubmitHandler: SubmitHandler<FormData> = async ({ amount }) => {
		setSubmitting(true);
		try {
			const accounts = await web3.eth.getAccounts();
			await lottery.methods.enter().send({
				from: accounts[0],
				gas: 1_000_000,
				value: web3.utils.toWei(amount.toString(), "ether"),
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
			<Typography margin={3} variant="h4" gutterBottom>
				Want to try your luck?
			</Typography>
			{isSubmitSuccessful && (
				<Alert
					onClose={() => {
						setSubmitSuccessful(false);
					}}
					severity="success">
					You have successfully entered the lottery!
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
			<Box
				marginY={2}
				component="form"
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit(onSubmitHandler)}>
				<TextField
					{...register("amount", { valueAsNumber: true })}
					fullWidth
					id="amount"
					label="Amount of ether to enter"
					name="amount"
					helperText={errors.amount ? errors.amount.message : null}
					error={Boolean(errors.amount)}
					type="number"
				/>
				<LoadingButton
					variant="contained"
					fullWidth
					type="submit"
					loading={isSubmitting}
					sx={{ py: "0.8rem", mt: "1rem" }}>
					ENTER
				</LoadingButton>
			</Box>
		</Box>
	);
};

export default EnterForm;
