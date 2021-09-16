import create from "zustand";

import { Table } from "@/types/types";
type StateProps = {
	workspace: Table[];
	table: Table | null;
	setTable: (table: Table | null) => void;
	handleInsertInto: (tableName: string, instance: any) => void;
	handleCreateTable: (table: Table) => void;
	handleDeleteTable: (tableName: string) => void;
};

const State = create<StateProps>((set) => ({
	workspace: [
		{
			name: "Parent",
			data: [
				{
					PID: 0,
					PName: "Reyad",
				},
			],
			schema: [
				{
					attribute: "PID",
					datatype: "number",
				},
				{
					attribute: "PName",
					datatype: "string",
				},
			],
		},
		{
			name: "Child",
			data: [
				{
					CID: 0,
					CName: "Zain",
					BirthDate: "30/10",
					age: 10,
					PID: 0,
				},
			],
			schema: [
				{
					attribute: "CID",
					datatype: "number",
					constraint: 10,
				},
				{
					attribute: "CName",
					datatype: "string",
				},
				{
					attribute: "BirthDate",
					datatype: "string",
				},
				{
					attribute: "age",
					datatype: "number",
				},
				{
					attribute: "PID",
					datatype: "number",
				},
			],
		},
	],
	table: null,
	handleInsertInto: (tableName, instance) =>
		set((prev) => ({
			workspace: prev.workspace.map((table) =>
				table.name === tableName
					? { ...table, data: [...table.data, instance] }
					: table
			),
		})),
	setTable: (table) =>
		set({
			table,
		}),
	handleCreateTable: (table) =>
		set((prev) => ({
			workspace: [...prev.workspace, table],
		})),
	handleDeleteTable: (tableName) =>
		set((prev) => ({
			workspace: prev.workspace.filter((table) => table.name !== tableName),
		})),
}));

export default State;
