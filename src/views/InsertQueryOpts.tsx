import React, { useState } from "react";

// UI
import { Button, Grid, GridSize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

// zustand
import State from "@/store/global.store";

// utils
import ReactHtmlParser from "react-html-parser";

// types
import { Table as TableType } from "@/types/types";

const InsertQueryOpts = ({ table }: { table: TableType }) => {
	// state store
	const { handleInsertInto } = State((state) => state);

	const [data, setData] = useState(() => {
		const instanceToInputData: {
			[key: string]: string;
		} = {};

		table.schema.forEach((item) => {
			instanceToInputData[item.attribute] = "";
		});

		return instanceToInputData;
	});

	const handleChangeDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleInsertInto(table.name, data);
	};

	const getResultCode = () => {
		const dataValues = Object.values(data);
		const isThereData = dataValues.some((value) => value.length > 0);

		return `
		insert into <strong>${table.name}</strong> values(${
			isThereData ? dataValues.join(", ") : ""
		}) 
		`;
	};

	return (
		<Box mt={2}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={1}>
					{table.schema.map((item) => (
						<Grid
							key={item.attribute}
							item
							md={(12 / table.schema.length) as GridSize}
						>
							<TextField
								key={item.attribute}
								fullWidth
								size="small"
								label={item.attribute}
								name={item.attribute}
								value={data[item.attribute]}
								onChange={handleChangeDataInput}
							/>
						</Grid>
					))}
				</Grid>

				<Button variant="contained" color="info" sx={{ mt: 1 }} type="submit">
					Insert
				</Button>
			</form>

			<Box sx={{ mt: 4 }}>
				<Typography variant="h6" fontWeight={550}>
					Code
				</Typography>
				<code>{ReactHtmlParser(getResultCode())}</code>
			</Box>
		</Box>
	);
};

export default InsertQueryOpts;
