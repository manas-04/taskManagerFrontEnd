import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { URL } from "./utils";

function EditTask(props) {
	const { state } = useLocation();
	const [form, setForm] = useState({
		title: "",
		startDateTime: "",
		endDateTime: "",
		description: "",
		priority: "",
	});
	async function getData() {
		await axios
			.post(URL + "getSingleTask", { id: state.id })
			.then((res) => {
				setForm({
					title: res.data.title,
					startDateTime: res.data.startDateTime.substring(0, 16),
					endDateTime: res.data.endDateTime.substring(0, 16),
					description: res.data.description,
					priority: res.data.priority,
					status: res.data.status,
				});
			})
			.catch((err) => {
				toast.error("Something went wrong", {
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

	useEffect(() => {
		getData();
	}, []);

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

	return (
		<div style={{ padding: "2vh 3vw" }}>
			<p>Edit Task</p>
			<form>
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
						<Select
							labelId='demo-simple-select-required-label'
							id='demo-simple-select-required'
							value={form.priority}
							label='Priority *'
							// helperText={priorityError.helperText}
							error={priorityError.error}
							onChange={(event) => {
								setForm({ ...form, priority: event.target.value });
							}}>
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
					if (
						form.title != "" &&
						form.priority != "" &&
						form.startDateTime != "" &&
						form.endDateTime != ""
					) {
						await axios
							.post(URL + "updateTask", { id: state.id, data: { ...form } })
							.then(async (res) => {
								toast.success("Task Updated Successfully", {
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
				}}>
				Submit
			</Button>
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

export default EditTask;
