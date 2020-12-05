import React, { useEffect, useState, useRef } from "react";
import "../components/app.scss"
import axios from "axios";
import { ScreenHomePage } from './screen';

function _HomePage(props) {


	return (
		<ScreenHomePage
			{...props}
		/>
	)
}
export const HomePage = React.memo((_HomePage));
