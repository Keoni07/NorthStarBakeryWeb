const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const requestSelect = document.getElementById("request_type");

const requestTypes = [
	{ value: "pre_order", label: "Pre-Order" },
	{ value: "general_question", label: "General Question" }
];

function fillDropdown() {
	for (let i = 0; i < requestTypes.length; i++) {
		const option = document.createElement("option");
		option.value = requestTypes[i].value;
		option.textContent = requestTypes[i].label;
		requestSelect.appendChild(option);
	}
}

function clearErrors() {
	document.getElementById("nameError").textContent = "";
	document.getElementById("emailError").textContent = "";
	document.getElementById("requestTypeError").textContent = "";
	document.getElementById("pickupDateError").textContent = "";
	document.getElementById("itemDetailsError").textContent = "";
}

function validateForm() {
	let isValid = true;
	clearErrors();
	
	const name = document.getElementById("name").value.trim();
	const email = document.getElementById("email").value.trim();
	const requestType = requestSelect.value;
	const pickupDate = document.getElementById("pickup_date").value;
	const details = document.getElementById("item_details").value.trim();

	if (name.length < 2) {
		document.getElementById("nameError").textContent = "Please enter your full name.";
		isValid = false;
	}
	
	if (email.includes("@") === false || email.includes(".") === false) {
		document.getElementById("emailError").textContent = "Please enter a valid email, like name@example.com.";
		isValid = false;
	}

	if (requestType === "") {
		document.getElementById("requestTypeError").textContent = "Please choose a request type.";
		isValid = false;
	}

	if (details.length < 10) {
		document.getElementById("itemDetailsError").textContent = "Please give at least 10 characters of detail.";
		isValid = false;
	}

	return isValid;
}

function saveVisitor(visitor) {
	localStorage.setItem("visitorName", visitor.name);
	localStorage.setItem("visitorEmail", visitor.email);
}

function loadVisitor() {
	const savedName = localStorage.getItem("visitorName");
	const savedEmail = localStorage.getItem("visitorEmail");

	if (savedName !== null) {
		document.getElementById("name").value = savedName;
		document.getElementById("email").value = savedEmail;
		formMessage.textContent = "Welcome back to North Star Bakery, " + savedName + "!";
	}
}

function handleSubmit(event) {
	event.preventDefault();

	if (validateForm() === false) {
		formMessage.textContent = "";
		return;
	}
	
	const visitor = {
		name: document.getElementById("name").value.trim(),
		email: document.getElementById("email").value.trim(),
		requestType: requestSelect.value
	};

	saveVisitor(visitor);

	if (visitor.requestType === "pre_order") {
		formMessage.textContent = "Thanks, " + visitor.name + "! We received your pre-order and will confirm by email at " + visitor.email + ".";
	} else {
		formMessage.textContent = "Thanks, " + visitor.name + "! We will answer your question at " + visitor.email + ".";
	}

	requestSelect.value = "";
	document.getElementById("pickup_date").value = "";
	document.getElementById("item_details").value = "";
	document.getElementById("allergy_notes").value = "";
}

form.addEventListener("submit", handleSubmit);
fillDropdown();
loadVisitor();