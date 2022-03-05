let user = document.getElementById("user");
let tobe = document.getElementById("tobe");
let button = document.getElementById("createTasks");
let messageBox = document.getElementById("message");
let tablePending= document.getElementById("tasksPending");	
let tableDone= document.getElementById("tasksDone");	
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");

function removeChildren(element) {
	while (element.hasChildNodes()) {
		element.lastChild.remove();
	}
}

//document.getElementById("login").onclick =  
const clickHere = async function () {
	await fetch("/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: usernameInput.value,
			plaintextPassword: passwordInput.value,
		})
	}).then(function (response) {
		if (response.status === 200) {
			var input = document.createElement("input");
			input.type = "text";
			button.append(input);
			let buttonCreate = document.createElement("button");
			buttonCreate.textContent = "Create Task";
			buttonCreate.onclick =async function () {
			//console.log(input.value);
                await fetch("/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: usernameInput.value,
						task: input.value,
						status: 0,
					})
				})
			}
			buttonCreate.onclick = async function () {
				console.log(usernameInput.value);
				let requestURL = `/add?username=${usernameInput.value}`;
				await fetch(requestURL).then(function (response) {
					if (response.status === 200) {
						return response.json();
					} else {
						throw Error(response.status);
					}
				}).then(function (response) {
					if (!response.rows.length){
						messageBox.textContent =  "No users found";
					} else {
						let row = response.rows[0];
						let tasks = row["tasks"];
						let status = row["status"];
						
						let tableRow = document.createElement("tr");
						tableRow.onclick = async function () {
							await fetch("/update", {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									username: usernameInput.value,
									task: tasks[tasks.length -1]
								})
							})
						};
						let cell = document.createElement("td");
						cell.textContent = tasks[tasks.length -1];
						tableRow.append(cell);
						if(status[status.length - 1]) {
							tableDone.append(tableRow);
							cell.style.textDecoration = "underline";
						} else {
							tablePending.append(tableRow);;
						}
		
						messageBox.textContent = "";
					}
				}).catch(function (error) {
					console.log(error);
				});
			}
			button.append(buttonCreate);
			tobe.textContent = "";
			return response.json();
		} else {
			removeChildren(tableDone);
			removeChildren(tablePending);
			throw Error(response.status);
		}
		
	}).then(function (response) {
		if (!response.rows.length){
			messageBox.textContent =  "No users found";
		} else {
			//user.textContent = usernameInput.value;
			removeChildren(tableDone);
			removeChildren(tablePending);
			tobe.textContent = "username: " + response.rows[0]["username"];
			//console.log(response.rows);
			let row = response.rows[0];
			let tasks = row["tasks"];
			let status = row["status"];
            
			for (let i=0; i < tasks.length; i++) {
				let tableRow = document.createElement("tr");
				tableRow.onclick = async function () {
							await fetch("/update", {
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify({
									username: usernameInput.value,
									task: tasks[i]
								})
							})
						};
                let cell = document.createElement("td");
                cell.textContent = tasks[i];
				tableRow.append(cell);
				if(status[i]) {
					tableDone.append(tableRow);
					cell.style.textDecoration = "underline";
				} else {
					tablePending.append(tableRow);
				}
			}
			
			messageBox.textContent = "";
		}
	}).catch(function (error) {
		console.log(error);
	});
};


export default clickHere;