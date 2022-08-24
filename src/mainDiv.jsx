import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import CustomTable from "./table";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import { URL } from "./utils";

function MainDiv() {
	//Navigate is used to move from one page to another on frontend
	const navigate = useNavigate();
	const [getAllProducts, setAllProducts] = useState([]);
	const [filteredTask, setFilterTask] = useState([]);
	const [priorityFilter, setpriorityFilter] = useState("");
	const [dateFilter, setDateFilter] = useState("");

	//Getting all the data when page is loaded and showing up the content based upon it
	useEffect(() => {
		getData();
	}, []);

	//Function to fetch the data from the server
	const getData = async () => {
		await axios
			.get(URL + "getAllTask")
			.then((res) => {
				//Initialising the states
				setAllProducts(res.data.docs);
				setFilterTask(res.data.docs);
				setpriorityFilter("");
				setDateFilter("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//Function to delete a record when Delete icon in a row is pressed
	const deleteRecord = async (id) => {
		await axios
			.post(URL + "deleteTask", { id: id })
			.then(async (res) => {
				//Fetching all the updated data
				getData();

				//Showing a toast message to make UI more user-friendly
				toast.error("Record Deleted", {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//Function to conditionally render the paragraph, if there is no data.
	function showText() {
		if (priorityFilter === "" && dateFilter === "") {
			return <p>Currently there is no task.</p>;
		} else {
			return <p>No task with the required filter exists.</p>;
		}
	}

	//GetTasks renders the div or the Table based upon whether there are any Tasks or not.
	function getTasks(length) {
		if (length == 0) {
			return (
				<div style={{ padding: "4vw" }}>
					{showText()}
					<h4>
						To fetch All the task from the server, press Get All Task Button.
					</h4>
				</div>
			);
		} else {
			return <CustomTable data={filteredTask} deleteRecord={deleteRecord} />;
		}
	}

	//Working of Date Filter
	function sortByDate(data) {
		if (dateFilter == "") {
			return data;
		} else {
			return data.filter((element) => {
				return (
					//Using substring to compare just the dates
					element.startDateTime.substring(0, 10) == dateFilter ||
					element.endDateTime.substring(0, 10) == dateFilter
				);
			});
		}
	}

	return (
		<div className='App'>
			<header className='App-header'>The DriveSales™</header>
			<div className='buttonRow'>
				<Button
					variant='contained'
					onClick={() => {
						navigate("/createTask");
					}}>
					Create New Task
				</Button>
				<Button
					variant='contained'
					onClick={() => {
						getData();
					}}>
					Get All Tasks
				</Button>
			</div>
			{
				//Div that contains the Filters section, all the css is currently in the JSX components only except the cwss for App.jsx
			}
			<div style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>
				<p>Filters</p>
				<div
					style={{
						display: "inline-flex",
						justifyContent: "space-evenly",
						width: "30vw",
					}}>
					<h4>By Status : </h4>
					<FormControl required sx={{ minWidth: 150, minHeight: 50 }}>
						<InputLabel id='demo-simple-select-label'>Priority</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={priorityFilter}
							label='Priority'
							onChange={(event) => {
								setpriorityFilter(event.target.value);
							}}>
							<MenuItem value={"High"}>High</MenuItem>
							<MenuItem value={"Medium"}>Medium</MenuItem>
							<MenuItem value={"Low"}>Low</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div
					style={{
						display: "inline-flex",
						justifyContent: "space-evenly",
						width: "30vw",
					}}>
					<h4>By Date : </h4>
					<TextField
						id='date'
						label='Start DateTime'
						type='date'
						value={dateFilter}
						sx={{ width: 250 }}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(event) => {
							setDateFilter(event.target.value);
						}}
					/>
				</div>
			</div>
			<Button
				onClick={() => {
					//Working of the filters
					//First checking if there is any Priority filter or not then moving to the Date Filter
					var data;
					if (priorityFilter == "High") {
						const localData = getAllProducts.filter(
							(element) => element.priority == "High"
						);
						data = sortByDate(localData);
					} else if (priorityFilter == "Medium") {
						const localData = getAllProducts.filter(
							(element) => element.priority == "Medium"
						);
						data = sortByDate(localData);
					} else if (priorityFilter == "Low") {
						const localData = getAllProducts.filter(
							(element) => element.priority == "Low"
						);
						data = sortByDate(localData);
					} else {
						const localData = getAllProducts;
						data = sortByDate(localData);
					}
					//Finally setting up the filteredData array with the data we have filtered
					setFilterTask(data);
				}}>
				Apply Filters
			</Button>
			{getTasks(filteredTask.length)}
			<ToastContainer
				position='top-center'
				autoClose={2000}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default MainDiv;
