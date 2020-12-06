import React, { useEffect, useState, useRef } from "react";
import update from 'immutability-helper';
import { ScreenHomePage } from './screen';
import { filter, intersection, clone } from 'lodash';
import { product } from '../services/interface/product-inteface';
import { GetProductList, IGetProductListData  } from '../services/business/product-list';

function _HomePage(props) {
	const _service: IGetProductListData = new GetProductList();
	const [ dataProducts, setDataProducts ] = useState<any>({});
	const [ masterDataProducts, setMasterDataProducts ] = useState<any>({});
	const [ furnitureStyleList, setFurnitureStyleList ] = useState([]);
	const [ valueFurniture, setValueFurniture ] = useState([]);
	const [ deliveryTimeData, setDeliveryTime ] = useState([]);
	const userHandleChange = useRef<boolean>(false);
	const [ querySearch, setQuerySearch ] = useState("");

	const getData = () => {
		_service.getProductList({
			Success: (data:any) => {
				setMasterDataProducts(data);
				setDataProducts(data);
				setFurnitureStyleList(data.furniture_styles);
			}
		})
	}

	useEffect(() => {
		getData()
	}, []);

	const deliveryTimeList = [
		{
			deliveryTime:"1 Week",
			value: 7
		}, {
			deliveryTime:"2 Weeks",
			value: 14
		},
		{
			deliveryTime:"1 month",
			value: 28
		}, {
			deliveryTime:"more",
			value: 31
		}
	]

	const onSearchChanged = (( value:any ) => {
		userHandleChange.current = true;
		setQuerySearch(value);
	});

	const handleChangeFurniture = (value) => {
		userHandleChange.current = true;
		setValueFurniture(value)
	}

	const handleChangeDeliveryTime = (value) => {
		userHandleChange.current = true;
		setDeliveryTime(value)
	}

	const filteredData = () => {
		const maximumDeliveryTimeSelected = Math.max(...deliveryTimeData);
		if (masterDataProducts && masterDataProducts.products && masterDataProducts.products.length > 0) {
			let selectedFurnitureStyles = filter(clone(masterDataProducts.products), (item:product) => {
				const deliveryNumber = parseInt(item.delivery_time);
				const intersect =  intersection(item.furniture_style, valueFurniture);
				let furnitureStyles =  item.furniture_style.length && valueFurniture.length ?
					intersect.length > 0 : true;
				let deliveryTime = !isNaN(parseInt(item.delivery_time)) && deliveryTimeData.length ?
					deliveryNumber <= maximumDeliveryTimeSelected : true;
				let searchQuery = item.name && querySearch !== ""?
					item.name.toLowerCase().includes(querySearch.toLowerCase()) : true;
				return searchQuery && furnitureStyles && deliveryTime;
			});

			let query: any = {};
			query["products"] = {
				$set: selectedFurnitureStyles || []
			}

			const newDataProducts = update(dataProducts,query);
			setDataProducts(newDataProducts);
		}
	}

	useEffect(() => {
		userHandleChange.current && filteredData();
	}, [ querySearch, valueFurniture, deliveryTimeData])

	return (
		<ScreenHomePage
			dataProducts={dataProducts}
			onSearchChanged={onSearchChanged}
			furnitureStyleList={furnitureStyleList}
			handleChangeFurniture={handleChangeFurniture}
			deliveryTimeList={deliveryTimeList}
			handleChangeDeliveryTime={handleChangeDeliveryTime}
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
