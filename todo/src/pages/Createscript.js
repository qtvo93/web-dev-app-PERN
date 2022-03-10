let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
//document.getElementById("create").addEventListener("click", 
const CreateHere = function () {
	fetch("/user", {
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
			console.log("Success");
		} else {
			console.log("Failure");
		}
	})
};

export default Create;