import React, { useEffect, useState, useRef, useCallback } from "react";
import update from 'immutability-helper';
import { ScreenHomePage } from './screen';
import { flatten, clone, filter } from 'lodash';
import { GetProductList, IGetProductListData  } from '../services/business/product-list';

function _HomePage(props) {
	const _service: IGetProductListData = new GetProductList();
	const [ dataProducts, setDataProducts ] = useState<any>({});
	const [ masterDataProducts, setMasterDataProducts ] = useState<any>({});
	const userInteraction = useRef<boolean>(false);
	const [ querySearch, setQuerySearch ] = useState("");

	const getData = () => {
		_service.getProductList({
			Success: (data:any) => {
				console.log(data);
				setMasterDataProducts(data)
				setDataProducts(data)
			}
		})
	}

	useEffect(() => {
		getData()
	}, []);

	const filterSearchQuery = (inputValue: string) => {
		const searchValue = inputValue.toLowerCase()
		const newValue = searchValue ? searchValue.replace(/\s+$/, '') : null;

		if (masterDataProducts && masterDataProducts.products && masterDataProducts.products.length > 0) {
			const result = filter(masterDataProducts.products, item => {
				return item.name.toLowerCase().includes(newValue);
			});

			console.log(result)

			let query: any = {};
			query["products"] = {
				$set: result
			}

			const newDataProducts = update(dataProducts,query);
			setDataProducts(newDataProducts);
		}
	}

	const onSearchChanged = (( value:any ) => {
		userInteraction.current = true;
		setQuerySearch(value);
	});

	useEffect(() => {
		if (querySearch === "") {
			getData();
		} else {
			userInteraction.current && filterSearchQuery(querySearch);
		}
    }, [querySearch]);

	return (
		<ScreenHomePage
			dataProducts={dataProducts}
			onSearchChanged={onSearchChanged}
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
