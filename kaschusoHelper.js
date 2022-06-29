function arrayAverage(inputArray) {
	let result = 0
	for (let i = 0; i < inputArray.length; i++) {
		result += inputArray[i]
	}
	return result/inputArray.length
}

if (document.getElementsByClassName("div_noten_outer").length != 0) { // if on grades page
	let gradeTable = document.getElementsByClassName("div_noten_outer")[0].firstChild.children[2].children[0].children[0].children
	
	let grades = []

	for (let i = 0; i < gradeTable.length; i++) {
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

	let points = Math.round(grades.slice(0,5).reduce((accumulator, curr) => accumulator + curr)) // reduce calculates sum

	let average = Math.round(arrayAverage(grades)*1000)/1000 // *1000/1000 for rounding to three decimal places

	let result = "<p>Summe der fünf tiefsten Noten: " + points + "</p><p>Notendurchschnitt: " + average + "</p>" // points and average are guaranteed to have the type int, so there is no need for sanitisation
	
	document.getElementsByClassName("div_noten_outer")[0].innerHTML = result + document.getElementsByClassName("div_noten_outer")[0].innerHTML
}