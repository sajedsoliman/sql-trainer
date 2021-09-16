// zustand
import State from "@/store/global.store";

// UI
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

// types
import { Table } from "@/types/types";

const DeleteQueryOpts = ({ table }: { table: Table }) => {
	// store
	const { handleDeleteTable } = State((state) => state);

	const handleDelete = () => {
		handleDeleteTable(table.name);
	};

	return (
		<Box sx={{ mt: 2 }}>
			<Typography color="GrayText">
				Click <strong>DELETE</strong> if you really want to delete this table
			</Typography>
			<Button
				variant="contained"
				color="error"
				onClick={handleDelete}
				sx={{ mt: 1 }}
			>
				Delete
			</Button>
		</Box>
	);
};

export default DeleteQueryOpts;
