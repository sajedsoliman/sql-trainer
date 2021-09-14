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

// styles
const Wrapper = styled.div`
	padding-top: 50px;
`;

function App() {
	const [queryType, setQueryType] = useState<QueryType>(QueryType.Select);

	const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedQuery = e.target.value as
			| "Select"
			| "Delete"
			| "Update"
			| "Insert";
		setQueryType(QueryType[selectedQuery]);
	};

	return (
		<Container>
			<Wrapper>
				<TextField
					fullWidth
					value={queryTypes[queryType]}
					select
					label="Choose a Query Type"
					onChange={handleChangeQuery}
				>
					{queryTypes.map((type) => (
						<MenuItem key={type} value={type}>
							{toCapitalize(type)}
						</MenuItem>
					))}
				</TextField>

				<Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
					{queryType === QueryType.Select && <SelectQueryOpts />}
					{queryType === QueryType.Insert && <SelectQueryOpts />}
					{queryType === QueryType.Update && <SelectQueryOpts />}
					{queryType === QueryType.Delete && <SelectQueryOpts />}
				</Paper>
			</Wrapper>
		</Container>
	);
}

export default App;
