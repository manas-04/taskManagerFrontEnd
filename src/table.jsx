import { React, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "./utils";

function CustomTable(props) {
	return (
		//This function contains only the columns
		<div style={{ padding: "2vw 6vw 4vh 6vw" }}>
			<p style={{ padding: "1vw" }}>All your tasks.</p>
			<TableContainer component={Paper}>
				<Table
					style={{
						width: "88vw",
					}}
					size='small'>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell align='left'>Description</TableCell>
							<TableCell align='left'>Start Date</TableCell>
							<TableCell align='left'>End Date</TableCell>
							<TableCell align='left'>Priority</TableCell>
							<TableCell align='left'>Status</TableCell>
							<TableCell align='left'>Edit</TableCell>
							<TableCell align='left'>Remove</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.data.map((row) => (
							//Rows are generated automatically from the array using the map function
							<CustomtableRow row={row} deleteRecord={props.deleteRecord} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

function CustomtableRow(props) {
	//In this function there is state that is unique for each row and maintains the Coompletion feature of the Tasks
	//On clicking a checkbox an update query is send depending upon what the status of the task is changed to
	const navigate = useNavigate();
	const [checkBox, setcheckBox] = useState(false);

	useEffect(() => {
		//Depending upon the status that we recieve, checkBox value is decided
		props.row.status === "Incomplete" ? setcheckBox(false) : setcheckBox(true);
	}, []);

	return (
		<TableRow key={props.row._id}>
			<TableCell component='th' scope='row'>
				{props.row.title}
			</TableCell>
			<TableCell align='left'>{props.row.description}</TableCell>
			<TableCell align='left'>
				{props.row.startDateTime.substring(0, 10)}
			</TableCell>
			<TableCell align='left'>
				{props.row.endDateTime.substring(0, 10)}
			</TableCell>
			<TableCell align='left'>{props.row.priority}</TableCell>
			<TableCell align='left'>
				<Checkbox
					checked={checkBox}
					onChange={async (event) => {
						//Query to update the status on the Backend everytime the user changes the state of checkBox
						setcheckBox(!checkBox);
						if (event.target.checked) {
							await axios
								.post(URL + "updateTask", {
									id: props.row._id,
									data: { status: "Completed" },
								})
								.then(async (res) => {
									toast.success("Status Updated Successfully", {
										position: "top-center",
										autoClose: 500,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
									});
								})
								.catch((err) => {
									toast.error("Something went wrong. Please try again later.", {
										position: "top-center",
										autoClose: 2000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
									});
								});
						} else {
							await axios
								.post(URL + "updateTask", {
									id: props.row._id,
									data: { status: "Incomplete" },
								})
								.then(async (res) => {
									toast.success("Status Updated Successfully", {
										position: "top-center",
										autoClose: 500,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
									});
								})
								.catch((err) => {
									toast.error("Something went wrong. Please try again later.", {
										position: "top-center",
										autoClose: 2000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										progress: undefined,
									});
								});
						}
					}}
				/>
			</TableCell>
			<TableCell align='left'>
				<IconButton
					aria-label='upload picture'
					component='label'
					onClick={() => {
						//Edit Button which takes to the edit screen, where all the value is retreived of that particular Task
						console.log("id at page", props.row._id);
						navigate("/editTask", { state: { id: props.row._id } });
					}}>
					<EditIcon />
				</IconButton>
			</TableCell>
			<TableCell align='left'>
				<IconButton
					aria-label='Delete Task'
					component='label'
					onClick={() => {
						//Passing the delete method that we recieved from the MainDiv
						props.deleteRecord(props.row._id);
					}}>
					<DeleteIcon />
				</IconButton>
			</TableCell>
			<ToastContainer
				position='top-center'
				autoClose={500}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</TableRow>
	);
}

export default CustomTable;
