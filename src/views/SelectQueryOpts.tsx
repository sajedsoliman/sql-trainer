import React, { ChangeEvent, useEffect, useReducer, useState } from "react";

// zustand
import State from "../store/global.store";

// UI
import { Box } from "@mui/system";
import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";

// hooks
import useToggle from "@/hooks/useToggle";
import { Table as TableType } from "@/types/types";
import { getArrayPartial } from "@/utils/functions";

const SelectQueryOpts = ({}: {}) => {
	const { workspace } = State((state) => state);

	// state vars
	const [tableName, setTableName] = useState("");
	const [table, setTable] = useState<TableType | null>(null);
	const [tableAttributes, setTableAttributes] = useState<string[]>([]);

	// handle change table name input
	const handleChangeTableName = (e: ChangeEvent<HTMLInputElement>) => {
		const tblName: string = e.target.value;

		setTableName(tblName);
	};

	// listen for table name input change to show additional controls if the provided table name is existed
	useEffect(() => {
		const selectedTable = workspace.find((table) => table.name === tableName);

		if (selectedTable) {
			setTable(selectedTable);

			// show the table with its all attributes
			setTableAttributes(selectedTable.schema.map((item) => item.attribute));
		} else {
			setTable(null);
		}
	}, [tableName]);

	return (
		<div>
			{/* controls */}
			<div>
				<Typography variant="h5" mb={2} fontWeight={550}>
					Controls
				</Typography>
				<Box display="flex">
					{/* table name */}
					<TextField
						label="Table Name"
						size="small"
						value={tableName}
						onChange={handleChangeTableName}
						helperText={!table && tableName !== "" && "Table does not exist"}
						error={!table && tableName !== ""}
					/>

					{/* table attributes => multi select box */}
					{table && (
						<FormControl sx={{ ml: 2, minWidth: 250 }}>
							<InputLabel>Attributes</InputLabel>
							<Select
								size="small"
								multiple
								value={tableAttributes}
								onChange={(e) =>
									setTableAttributes(
										typeof e.target.value === "string"
											? e.target.value.split(",")
											: e.target.value
									)
								}
								input={<OutlinedInput label="Attributes" />}
							>
								{table?.schema.map((item) => {
									return (
										<MenuItem key={item.attribute} value={item.attribute}>
											{item.attribute}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					)}
				</Box>
			</div>

			{/* result */}
			<div>
				<Typography mt={3} variant="h5" mb={2} fontWeight={550}>
					Result
				</Typography>
				{table && (
					<div>
						<Typography variant="h5" fontWeight={550} align="center" mb={1}>
							{tableName}
						</Typography>
						<TableContainer component={Paper} variant="outlined">
							<Table>
								<TableHead>
									<TableRow>
										{(tableAttributes.length === 0
											? table.schema
											: getArrayPartial(
													table.schema,
													"attribute",
													tableAttributes
											  )
										).map((item) => (
											<TableCell key={item.attribute}>
												{item.attribute}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{table.data.map((instance) => (
										<TableRow key={instance[0]}>
											{(tableAttributes.length === 0
												? table.schema
												: getArrayPartial(
														table.schema,
														"attribute",
														tableAttributes
												  )
											).map((item) => (
												<TableCell key={instance[item.attribute]}>
													{instance[item.attribute]}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
				)}
			</div>
		</div>
	);
};

export default SelectQueryOpts;
