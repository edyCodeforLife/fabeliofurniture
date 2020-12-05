import React, { memo } from 'react';
import { Card, Row, Col } from 'antd';

export interface ICardProps {
	name: string;
	description: string;
	price: number;
	furniture_style: string[];
	delivery_time: string;
}

function _CardComponent(props:ICardProps) {
	const { name, description, price, furniture_style, delivery_time } = props;
	const { Grid } = Card;
    return(
		<Card style={{ width: 'auto', margin: 20 }} bordered>
			<Grid hoverable={true} style={{width: '100%'}}>
				<Row style={{width: '100%', justifyContent: 'space-between'}} >
					<Col md={12} style={{textAlign: 'left'}}>
						<div className="nameStyle">
							{name}
						</div>
					</Col>

					<Col md={12} style={{textAlign: 'right'}}>
						<div className="priceStyle">
							{`IDR ${price}`}
						</div>
					</Col>
				</Row>

				<Row style={{width: '100%'}} >
					<Col md={24} style={{textAlign: 'left'}}>
						<div className="descriptionStyle">
							{`${description.substring(0,114)}...`}
						</div>
					</Col>
				</Row>

				<Row style={{width: '100%'}} >
					<Col md={24} style={{textAlign: 'left'}}>
						<div className="furnitureStyle">
							{furniture_style.join(", ")}
						</div>
					</Col>
				</Row>

				<Row style={{width: '100%'}} >
					<Col md={24} style={{textAlign: 'right'}}>
						<div className="deliveryTimeStyle">
							{`${delivery_time} days`}
						</div>
					</Col>
				</Row>

			</Grid>


		</Card>
	)
}

export default memo(_CardComponent);
export const CardComponent = memo(_CardComponent);
