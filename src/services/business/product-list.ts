import { IResponseSuccess, productList } from '../interface/product-inteface';
import { IGetProductList, ProductList } from '../services/product-list'

export interface IGetProductListData {
	getProductList(handler:IResponseSuccess): void;
}

export class GetProductList implements IGetProductListData {
	private _service: IGetProductList;

	constructor() {
		this._service = new ProductList();
	}

	async getProductList(handler: IResponseSuccess) {
		try {
			const response = await this._service.getProductList();
			return await handler.Success<productList>(response.data);
		}
		catch (e) {
			return console.log(e);
		}
	}
}