export enum QueryType {
	Select,
	Insert,
	Delete,
	Create,
}

export type SchemaItem = {
	attribute: string;
	datatype: string;
	constraint?: number;
};

export type Table = {
	schema: SchemaItem[];
	data: any[];
	name: string;
};
