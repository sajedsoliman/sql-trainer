import { useState } from "react";

// UI
import { Container, MenuItem, Paper, TextField } from "@mui/material";
import styled from "styled-components";

// info & helper function & types
import { queryTypes } from "@/utils/info";
import { QueryType } from "@/types/types";
import { toCapitalize } from "@/utils/functions";

// views & components
import SelectQueryOpts from "@views/SelectQueryOpts";
import TableNameInput from "@/components/TableNameInput";
import InsertQueryOpts from "@/views/InsertQueryOpts";
import CreateQueryOpts from "@/views/CreateQueryOpts";
import DeleteQueryOpts from "@/views/DeleteQueryOpts";

// zustand
import State from "@/store/global.store";

// styles
const Wrapper = styled.div`
	padding-top: 50px;
`;

function App() {
	// zustand
	const { table } = State((state) => state);

	// state vars
	const [queryType, setQueryType] = useState<QueryType>(QueryType.Select);

	const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedQuery = e.target.value as
			| "Select"
			| "Delete"
			| "Create"
			| "Insert";
		setQueryType(QueryType[selectedQuery]);
	};

	return (
		<Container>
			<Wrapper>
				<TextField
					size="small"
					fullWidth
					select
					label="Choose a Query Type"
					value={queryTypes[queryType]}
					onChange={handleChangeQuery}
				>
					{queryTypes.map((type) => (
						<MenuItem key={type} value={type}>
							{toCapitalize(type)}
						</MenuItem>
					))}
				</TextField>

				<Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
					{queryType !== QueryType.Create && <TableNameInput />}

					{table && queryType === QueryType.Select && (
						<SelectQueryOpts table={table} />
					)}
					{table && queryType === QueryType.Insert && (
						<InsertQueryOpts table={table} />
					)}
					{table && queryType === QueryType.Delete && (
						<DeleteQueryOpts table={table} />
					)}
					{queryType === QueryType.Create && <CreateQueryOpts />}
				</Paper>
			</Wrapper>
		</Container>
	);
}

export default App;
