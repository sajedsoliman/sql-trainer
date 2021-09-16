import React, { useEffect, useState } from "react";

// zustand
import State from "@/store/global.store";

// UI
import { TextField } from "@mui/material";

const TableNameInput = () => {
	const { table, setTable, workspace } = State((state) => state);

	// state vars
	const [tableName, setTableName] = useState("");

	// handle change table name input
	const handleChangeTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
		const tblName: string = e.target.value;

		setTableName(tblName);
	};

	// listen for table name input change to show additional controls if the provided table name is existed
	useEffect(() => {
		const selectedTable = workspace.find((table) => table.name === tableName);

		if (selectedTable) {
			setTable(selectedTable);
		} else {
			setTable(null);
		}
	}, [tableName, workspace]);

	return (
		<div>
			{/* table name */}
			<TextField
				label="Table Name"
				size="small"
				value={tableName}
				onChange={handleChangeTableName}
				helperText={!table && tableName !== "" && "Table does not exist"}
				error={!table && tableName !== ""}
			/>
		</div>
	);
};

export default TableNameInput;
