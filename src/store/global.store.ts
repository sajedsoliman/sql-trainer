import create from "zustand";

import { Table } from "@/types/types";
type StateProps = {
	workspace: Table[];
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
				},
			],
			schema: [
				{
					attribute: "CID",
					datatype: "number",
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
			],
		},
	],
}));

export default State;
