import axios, { AxiosPromise } from 'axios';
import { productList } from '../interface/product-inteface';
import { urlProductList } from '../url/url';

export interface IGetProductList {
	getProductList():AxiosPromise<productList>
}

const headers = {
	'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}

export class ProductList implements IGetProductList {
	getProductList(): AxiosPromise<productList> {
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers.post['Content-Type'] = 'application/json'
		return axios.get<productList>(urlProductList,{headers});
	}
}