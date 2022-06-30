function arrayAverage(inputArray) {
	let result = 0
	for (let i = 0; i < inputArray.length; i++) {
		result += inputArray[i]
	}
	return result/inputArray.length
}

function newMenuBarButton(buttonNumber, buttonText, kaschusoHelperPageName) {
	let button = document.getElementById("nav-main-menu").children[1].cloneNode(true) // the "grades" button. we use this one instead of start as it is not underlined
	
	button.id = "kaschusoHelperButton" + buttonNumber // change the button id
	button.children[1].id = "kaschusoHelperButtonTitle" + buttonNumber // change the id of the text element
	
	button.children[1].innerText = buttonText

	button.href += "&kaschusoHelperPage=" + kaschusoHelperPageName // internal pages are specified through the url parameters
	
	document.getElementById("nav-main-menu").appendChild(button)
}

if (document.getElementById("nav-main-menu") != null) {// if logged in
	newMenuBarButton(1, "Moodle", "moodle")
}

if (document.getElementsByClassName("div_noten_outer").length != 0) { // if on grades page
	let gradeTable = document.getElementsByClassName("div_noten_outer")[0].firstChild.children[2].children[0].children[0].children
	
	let grades = []

	for (let i = 0; i < gradeTable.length; i++) { // transfer valid gradeTable values to the grades array
		if (gradeTable[i].attributes.length != 0) {
			continue
		}
		
		let grade = gradeTable[i].textContent.split("\n")[3]
		if (!grade.includes(".")) { // every valid grade has a decimal point
			continue
		}

		grades.push(Number(grade))
	}

	grades.sort()

	let points
	
	if (grades.length >= 5) {
		points = Math.round(grades.slice(0,5).reduce((accumulator, curr) => accumulator + curr)) // reduce calculates sum
	}
	
	else {
		points = "Nicht verfügbar"
	}

	let average = Math.round(arrayAverage(grades)*1000)/1000 // *1000/1000 for rounding to three decimal places. also - i have checked - the average is calculated with the unrounded grades

	let result = "<p>Summe der fünf tiefsten Noten: " + points + "</p><p>Notendurchschnitt: " + average + "</p>" // points and average are guaranteed to have the type int or be a string consisting of only letters, so there is no need for sanitisation
	
	document.getElementsByClassName("div_noten_outer")[0].innerHTML = result + document.getElementsByClassName("div_noten_outer")[0].innerHTML
}
