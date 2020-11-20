$.getJSON('resume.json', function (data) {
	/* The parameter (data) will refer to the resume.json whenever called later on in the document */
	/* loadHeader(data);
	loadInfo(data.info);
	/* loadExperience(data.work, "work"); */
	loadExperience(data.volunteer, "volunteer");
	/* loadExperience(data.education, "education"); */
	loadExtra(data.sports, "sports");
	loadExtra(data.clubs, "clubs");
	loadExtra(data.others, "others");
	/* loadSkills(data.skills, "skill"); */
	loadList(data.awards, "awards");
	loadList(data.interests, "interests");
});

/* Name, Title */
function loadHeader(data) {
	document.getElementById("name").textContent = data.name;
	document.getElementById("title").textContent = data.title;
}

/* Phone, Email, Website, Github */
function loadInfo(data) {
	var ul = document.createElement('ul');
	document.getElementById('hRight').appendChild(ul);
	for (var i = 0; i < data.length; i++) {
		var li = document.createElement('li');
		ul.appendChild(li);
		li.textContent += data[i].data;
	}
};

/* Work, Volunteer, Education */
function loadExperience(data, type) {
	var section = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		var current = data[i];
		var s = createNode('section', "blocks");
		s.appendChild(createNode('div', "decorator"));
		var details = createNode('div', "details");
		details.appendChildren(
			createNode('span', "job", current.job),
			createNode('span', "date", current.date),
			document.createElement('br'),
			createNode('span', "place", current.place),
			createNode('span', "location", current.location),
			extraInfo(current, type),
			createNode('span', "description", current.description));
		s.appendChild(details);
		section.appendChild(s);
	}
};

/* Graduation, GPA */
function extraInfo(data, type) {
	if (type == "education") {
		if (data.graduation != null && data.gpa != null) {
			var grad = createNode('span', "grad", data.graduation);
			var gpa = createNode('span', "gpa", data.gpa);
			var div = document.createElement('div');
			div.appendChild(grad);
			div.appendChild(gpa);
			div.appendChild(document.createElement('br'))
			return div;
		}
	}
	return document.createElement('br');
}

/* Skills */
function loadSkills(data, type) {
	var container = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		container.appendChild(createNode("li", 'none', data[i]));
	}
}

/* Awards & Honors,*/
function loadList(data, type) {
	console.log(data, type);
	var container = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		container.appendChild(createNode("li", 'none', data[i]));
	}
}

/* Extracurriculars */
function loadExtra(data, type) {
	var section = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		var current = data[i];
		var s = createNode('section', "blocks");
		s.appendChild(createNode('div', "decorator"));
		var details = createNode('div', "details");
		details.appendChildren(
			createNode('span', "name", current.name),
			createNode('span', "date", current.date),
			document.createElement('br'),
			createNode('span', "description", current.details)
		);
		s.appendChild(details);
		section.appendChild(s);
	}
};

/*
function extraDate(data, type) {
	if (type == "sports") {
		if (data.date != null || data.date) {
			var date = createNode('span', "date", data.date);
			var result = document.createElement('span');
			result.appendChild(date);
			return result;
		}
	}
	return document.createElement("br");
}
*/

HTMLElement.prototype.appendChildren = function () {
	for (var i = 0; i < arguments.length; i++)
		this.appendChild(arguments[i]);
};

/* Loads all into the HTML */
function createNode(type, className, inner) {
	var result = document.createElement(type);
	result.className = className;
	result.textContent = inner;
	console.log(result);
	return result;
}