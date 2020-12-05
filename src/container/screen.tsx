import React, {memo} from "react";
import "../components/app.scss";
import { map } from 'lodash';
import { productList, product } from '../services/interface/product-inteface';
import { CardComponent, ICardProps } from '../components/card/card';
import { HeaderComponent } from '../components/header/header';
import { Row, Col } from 'antd';

function _ScreenHomePage(props:
	{
		dataProducts: productList,
		onSearchChanged():void
	},
	) {
	const { dataProducts: {products, furniture_styles }, onSearchChanged } = props
	return (
		<div className="containerScreen">
			<Row style={{width: '100%' }}>
				<Col xs={24} md={24}>
					<HeaderComponent
						onSearchChanged={onSearchChanged}
						{...props}
					/>
				</Col>
			</Row>
			<Row style={{width: '100%', padding: 20 }}>
				{ products && map(products, (item:product, idx:number) => (
					<Col md={12} xs={24} key={idx}>
						<CardComponent
							name={item.name}
							price={item.price}
							description={item.description}
							furniture_style={item.furniture_style}
							delivery_time={item.delivery_time}
							{...props}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
}
export default memo(_ScreenHomePage);
export const ScreenHomePage = memo(_ScreenHomePage);
