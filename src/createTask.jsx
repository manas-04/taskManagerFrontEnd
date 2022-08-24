import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "./utils";

function CreateTask() {
	const [form, setForm] = useState({
		title: "",
		startDateTime: "",
		endDateTime: "",
		description: "",
		priority: "",
	});

	//Maintaining the state of all errors for the form
	const [titleError, setTitleError] = useState({
		error: false,
		helperText: "",
	});
	const [priorityError, setPriorityError] = useState({
		error: false,
		helperText: "",
	});
	const [startDateTimeError, setStartDateTimeError] = useState({
		error: false,
		helperText: "",
	});
	const [endDateTimeError, setEndDateTimeError] = useState({
		error: false,
		helperText: "",
	});

	//The Form
	return (
		<div style={{ padding: "2vh 3vw" }}>
			<p>Create New Task</p>
			<form>
				{
					//Title Field
				}
				<TextField
					required
					id='standard-required'
					label='Title'
					value={form.title}
					variant='standard'
					placeholder={"Title of the task"}
					onChange={(event) => {
						setForm({ ...form, title: event.target.value });
					}}
					error={titleError.error}
					helperText={titleError.helperText}
				/>
				<div
					style={{
						width: "60vw",
						paddingTop: "2vh",
					}}>
					{
						//Description Field
					}
					<TextField
						id='standard'
						label='Description'
						value={form.description}
						variant='standard'
						placeholder={"Description of the task"}
						multiline
						rows={3}
						sx={{
							width: "50vw",
						}}
						onChange={(event) => {
							setForm({ ...form, description: event.target.value });
						}}
					/>
				</div>
				<div
					style={{
						width: "30vw",
						paddingTop: "4vh",
					}}>
					<FormControl required sx={{ minWidth: 205 }}>
						<InputLabel id='demo-simple-select-required-label'>
							Priority
						</InputLabel>
						{
							//Priority DropDown Field
						}
						<Select
							labelId='demo-simple-select-required-label'
							id='demo-simple-select-required'
							value={form.priority}
							label='Priority *'
							helperText={priorityError.helperText}
							error={priorityError.error}
							onChange={(event) => {
								setForm({ ...form, priority: event.target.value });
							}}>
							{
								//All the Drop Down Items
							}
							<MenuItem value={"High"}>High</MenuItem>
							<MenuItem value={"Medium"}>Medium</MenuItem>
							<MenuItem value={"Low"}>Low</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div
					style={{
						display: "flex",
						width: "35vw",
						justifyContent: "space-between",
						paddingTop: "4vh",
					}}>
					{
						//Start DateTime Field
					}
					<TextField
						id='datetime-local'
						label='Start DateTime'
						type='datetime-local'
						value={form.startDateTime}
						sx={{ width: 250 }}
						InputLabelProps={{
							shrink: true,
						}}
						error={startDateTimeError.error}
						helperText={startDateTimeError.helperText}
						onChange={(event) => {
							setForm({ ...form, startDateTime: event.target.value });
						}}
					/>
					{
						//End DateTime Field
					}
					<TextField
						id='datetime-local'
						label='End DateTime'
						type='datetime-local'
						value={form.endDateTime}
						sx={{ width: 250 }}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(event) => {
							setForm({ ...form, endDateTime: event.target.value });
						}}
						error={endDateTimeError.error}
						helperText={endDateTimeError.helperText}
					/>
				</div>
			</form>
			<Button
				style={{ marginTop: "4vh" }}
				variant='contained'
				onClick={async () => {
					//Checking if any required field is empty or not
					if (form.title === "") {
						setTitleError({ error: true, helperText: "Title is required" });
					} else {
						setTitleError({ error: false, helperText: "" });
					}
					if (form.priority === "") {
						setPriorityError({
							error: true,
							helperText: "Priority is required",
						});
					} else {
						setPriorityError({ error: false, helperText: "" });
					}
					if (form.startDateTime === "") {
						setStartDateTimeError({
							error: true,
							helperText: "Start Date Time is required",
						});
					} else {
						setStartDateTimeError({ error: false, helperText: "" });
					}
					if (form.endDateTime === "") {
						setEndDateTimeError({
							error: true,
							helperText: "End Date Time is required",
						});
					} else {
						setEndDateTimeError({ error: false, helperText: "" });
					}
					//If everything is valid the only sending the request
					if (
						form.title != "" &&
						form.priority != "" &&
						form.startDateTime != "" &&
						form.endDateTime != ""
					) {
						await axios
							.post(URL + "createTask", { ...form, status: "Incomplete" })
							.then(async (res) => {
								//After creating the Task Successfully showing a toast message
								toast.success("Task Created Successfully", {
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
						//Setting form to its initial state
						setForm({
							title: "",
							startDateTime: "",
							endDateTime: "",
							description: "",
							priority: "",
						});
					}
				}}>
				Submit
			</Button>
			{
				//Container for the toast messages
			}
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

export default CreateTask;
