// utility functions

function arrayAverage(inputArray) {
	let result = 0
	for (let i = 0; i < inputArray.length; i++) {
		result += inputArray[i]
	}
	return result/inputArray.length
}

// utility functions modifying the page
function newMenuBarButton(buttonNumber, buttonText, kaschusoHelperPageName) {
	// known bug: if one of the buttons created this way or the grades button is selected, all of the mentioned get underlined.
	// also, we can't set the icon yet
	let button = document.getElementById("nav-main-menu").children[1].cloneNode(true) // the "grades" button. we use this one instead of start as it is not underlined
	
	button.id = "kaschusoHelperButton" + buttonNumber // change the button id
	button.children[1].id = "kaschusoHelperButtonTitle" + buttonNumber // change the id of the text element
	
	button.children[1].innerText = buttonText

	button.href += "&kaschusoHelperPage=" + kaschusoHelperPageName // internal pages are specified through the url parameters
	
	document.getElementById("nav-main-menu").appendChild(button)
}

function clearMainArea() {
	document.getElementsByClassName("mdl-layout__content")[0].innerHTML = ""
}

// page modifications
	// additional tabs

if (document.getElementById("nav-main-menu") != null) {// if logged in
	newMenuBarButton(1, "Moodle", "moodle")
	newMenuBarButton(2, "Gisy", "gisy")
	newMenuBarButton(3, "Cloud", "cloud")
}

switch (new URLSearchParams(window.location.search).get("kaschusoHelperPage")) {
	case "moodle":
		clearMainArea()
		document.getElementsByClassName("mdl-layout__content")[0].innerHTML = '<iframe src="https://moodle.ksso.ch" style="height:100%; width:100%"></iframe>'
		break
	case "gisy": 
		clearMainArea()
		window.open('https://gisy.ksso.ch', '_blank', 'https://gisy.ksso.ch')
		break
	case "cloud": 
		clearMainArea()
		window.open('https://cloud.ksso.ch', '_blank', 'https://cloud.ksso.ch')
		break
}
//target="popup" onclick="window.open(\'https://gisy.ksso.ch\',\'yes\',\'width=1920,height=1080\')"
//if (new URLSearchParams(window.location.search).get("kaschusoHelperPage") == "moodle") {
//	clearMainArea()
//	document.getElementsByClassName("mdl-layout__content")[0].innerHTML = '<iframe src="https://moodle.ksso.ch" style="height:100%; width:100%"></iframe>'
//}

	// grades page modifications
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
