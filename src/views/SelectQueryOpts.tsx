import { ChangeEvent, useEffect, useState } from "react";

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
	Typography,
} from "@mui/material";

// utils
import ReactHtmlParser from "react-html-parser";

// types
import { Table as TableType } from "@/types/types";

// hooks
import { getArrayPartial } from "@/utils/functions";

const SelectQueryOpts = ({ table }: { table: TableType }) => {
	// const { table } = State((state) => state);

	// state vars
	const [tableAttributes, setTableAttributes] = useState<string[]>([]);

	useEffect(() => {
		if (table) setTableAttributes(table.schema.map((item) => item.attribute));
	}, [table]);

	const getCodeResult = () => {
		const isAllAttrs =
			tableAttributes.length === table.schema.length ||
			tableAttributes.length === 0;

		return `select ${
			isAllAttrs ? "*" : tableAttributes.join(", ")
		} from <strong>${table.name}</strong>`;
	};

	return (
		<div>
			{/* controls */}
			<div>
				<Typography variant="h5" my={2} fontWeight={550}>
					Controls
				</Typography>

				<div>
					{/* table attributes => multi select box */}
					<FormControl sx={{ ml: 2, minWidth: 250 }}>
						<InputLabel id="table-attributes-select">Attributes</InputLabel>
						<Select
							labelId="table-attributes-select"
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
							{table.schema.map((item) => {
								return (
									<MenuItem key={item.attribute} value={item.attribute}>
										{item.attribute}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>
			</div>

			{/* result */}
			<div>
				<Typography mt={3} variant="h5" fontWeight={550}>
					Result
				</Typography>
				<div>
					<Typography variant="h5" fontWeight={550} align="center" mb={1}>
						{table.name}
					</Typography>

					{/* visual result */}
					<TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
						<Table>
							<TableHead>
								<TableRow>
									{getArrayPartial(
										table.schema,
										"attribute",
										tableAttributes
									).map((item) => (
										<TableCell key={item.attribute}>{item.attribute}</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{table.data.map((instance) => {
									return (
										<TableRow
											key={instance[table.schema[0].attribute].toString()}
										>
											{getArrayPartial(
												table.schema,
												"attribute",
												tableAttributes
											).map((item) => (
												<TableCell
													key={`${item.attribute}-${instance[item.attribute]}`}
												>
													{instance[item.attribute]}
												</TableCell>
											))}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>

					{/* code result */}
					<code>{ReactHtmlParser(getCodeResult())}</code>
				</div>
			</div>
		</div>
	);
};

export default SelectQueryOpts;
