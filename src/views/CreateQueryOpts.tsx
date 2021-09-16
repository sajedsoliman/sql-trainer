import React, { useState } from "react";

// zustand
import State from "@/store/global.store";

// UI
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";

// hooks
import useArray from "@/hooks/useArray";

// types
import { SchemaItem } from "@/types/types";

const CreateQueryOpts = () => {
	// zustand state
	const { workspace, handleCreateTable } = State((state) => state);

	const {
		array: schema,
		push,
		update,
	} = useArray<{ id: number } & SchemaItem>([
		{
			id: 0,
			attribute: "",
			datatype: "",
			constraint: 0,
		},
	]);

	const [name, setName] = useState("");

	const addSchemaItem = () => {
		push({ id: schema.length, attribute: "", datatype: "", constraint: 0 });
	};

	const handleChange = (
		id: number,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		update(
			schema.findIndex((item) => item.id === id),
			(value) => {
				return { ...value, [e.target.name]: e.target.value };
			}
		);
	};

	const handleSubmit = () => {
		const isTableNameExisted = workspace.find((table) => table.name === name);

		if (!isTableNameExisted) {
			// add the table
			const tableSchema = schema.map((item) => {
				const { id, ...itm } = item;
				return itm;
			});
			handleCreateTable({ name, schema: tableSchema, data: [] });
		}
	};

	return (
		<Box sx={{ mt: 3 }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				<TextField
					size="small"
					label="Table Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<Box sx={{ mt: 2 }}>
					<Button
						variant="outlined"
						size="small"
						sx={{ mb: 2 }}
						onClick={addSchemaItem}
					>
						Add Schema Item
					</Button>

					{schema.map(({ id, attribute, constraint, datatype }) => (
						<Grid key={id} container spacing={2} sx={{ mb: 1 }}>
							<Grid item sm={6} md={4}>
								<TextField
									fullWidth
									size="small"
									name="attribute"
									value={attribute}
									label="Attribute"
									onChange={(e) => handleChange(id, e)}
								/>
							</Grid>
							<Grid item sm={6} md={4}>
								<TextField
									fullWidth
									size="small"
									name="datatype"
									value={datatype}
									label="Datatype"
									onChange={(e) => handleChange(id, e)}
								/>
							</Grid>
							<Grid item sm={6} md={4}>
								<TextField
									fullWidth
									size="small"
									name="constraint"
									value={constraint}
									label="Constraint"
									onChange={(e) => handleChange(id, e)}
								/>
							</Grid>
						</Grid>
					))}
					<Button type="submit" variant="contained" color="info" sx={{ mt: 2 }}>
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default CreateQueryOpts;
