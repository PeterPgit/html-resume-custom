$.getJSON('resume.json', function (data) {
	/* The parameter (data) will refer to the resume.json whenever called later on in the document */
	loadHeader(data);
	loadInfo(data.info);
	loadExperience(data.work, "work");
	loadExperience(data.volunteer, "volunteer");
	loadExperience(data.education, "education");
	loadExtracurriculars(data.extra, "extra");
	loadSkills(data.skills, "skill");
	loadList(data.awards, "awards");
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

/* Extracurriculars */
function loadExtracurriculars(data, type) {
	var container = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		container.appendChild(createNode("li", 'none', data[i]));
	}
}

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
		container.appendChild(createNode("li", 'none',data[i]));
	}
}

/* Awards & Honors, Extracurriculars */
function loadList(data, type) {
	console.log(data, type);
	var container = document.getElementById(type);
	for (var i = 0; i < data.length; i++) {
		container.appendChild(createNode("li", 'none', data[i]));
	}
}

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