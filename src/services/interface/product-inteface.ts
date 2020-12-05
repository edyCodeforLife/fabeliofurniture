export interface productList {
	furniture_styles: string[];
	products: product[]
}

export interface product {
	name: string;
	description: string;
	furniture_style: string[];
	delivery_time: string;
	price: number
}

export interface IResponseError {
	ServiceError: () => void;
}

export interface IResponseSuccess {
	Success?: <T>(res: T) => void;
}