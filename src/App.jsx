import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTask from "./createTask";
import EditTask from "./editTask";

import MainDiv from "./mainDiv";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route path='/' exact element={<MainDiv />} />
					<Route path='/createTask' element={<CreateTask />} />
					<Route path='/editTask' element={<EditTask />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
