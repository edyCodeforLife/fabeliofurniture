import React, { memo } from 'react';
import { Select, Row, Col } from 'antd';
import { map } from 'lodash';

interface IHeaderProps {
	onSearchChanged(e:any):void;
	furnitureStyleList: string[];
	handleChangeFurniture(value: string): void;
	deliveryTimeList: string[];
	handleChangeDeliveryTime(value:number): void
}

function _Header(props: IHeaderProps) {
	const { onSearchChanged, furnitureStyleList, handleChangeFurniture, deliveryTimeList, handleChangeDeliveryTime } = props;
	const { Option } = Select;
	const onSearch = (e) => {
		e.persist();
		onSearchChanged(e.target.value);
	}

	const renderOptionsFurniture = () => {
		return map(furnitureStyleList, (item: string, idx: number) => (
			<Option value={item} key={idx}>
				{item}
			</Option>
		))
	}

	const renderOptionsDeliveryTime = () => {
		return map(deliveryTimeList, (item, idx) => (
			<Option value={item.value} key={idx}>
				{item.deliveryTime}
			</Option>
		))
	}


    return(
		<div className="headerContainer">
			<Row style={{width: '100%', marginBottom: 10 }} >
				<Col md={12} xs={24} style={{textAlign: 'left'}}>
					<div className="containerInputSearch">
						<input
							onChange={(e) => onSearch(e)}
							placeholder="Search Furniture"
							className="inputSearch"
							type="text"
						/>
					</div>
				</Col>
			</Row>

			<Row style={{width: '100%'}} >
				<Col md={12} xs={12} style={{textAlign: 'left'}}>
					<div className="containerInputSearch">
						<Select
							mode="multiple"
							allowClear
							style={{ width: '100%' }}
							placeholder="Furniture Style"
							onChange={handleChangeFurniture}
						>
							{renderOptionsFurniture()}
						</Select>
					</div>
				</Col>

				<Col md={12} xs={12} style={{textAlign: 'left'}}>
					<div className="containerDeliveryTime">
						<Select
							mode="multiple"
							allowClear
							style={{ width: '100%' }}
							placeholder="Delivery Time"
							onChange={handleChangeDeliveryTime}
						>
							{renderOptionsDeliveryTime()}
						</Select>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default memo(_Header);
export const HeaderComponent = memo(_Header);
