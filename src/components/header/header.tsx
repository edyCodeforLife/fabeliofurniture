import React, { memo } from 'react';
import { Card, Row, Col } from 'antd';

interface IHeaderProps {
	onSearchChanged(e:any):void;
}

function _Header(props: IHeaderProps) {
	const { onSearchChanged } = props
	const onSearch = (e) => {
		e.persist();
		onSearchChanged(e.target.value);
	}

    return(
		<div className="headerContainer">
			<Row style={{width: '100%'}} >
				<Col md={12} style={{textAlign: 'left'}}>
					<div className="containerInputSearch">
						<input onChange={(e) => onSearch(e)} placeholder="Search Furniture" className="inputSearch" type="text"/>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default memo(_Header);
export const HeaderComponent = memo(_Header);
