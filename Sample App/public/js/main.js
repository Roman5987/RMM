var curTask=-1;
var curProject=-1;


function toggleTaskDiv(id){
	var doc = document.getElementById('divtask');
	if(doc !== undefined ){
		if(doc.style.display === 'none' || curProject !== id){
			doc.style.display = 'block';
			curProject = id;
		} else {
			doc.style.display = 'none';
			curTask = id;
		}
	}
}

function toggleDetailDiv(id){
	var doc = document.getElementById('divdetail');
	if(doc !== undefined ){
		if(doc.style.display === 'none'){
			doc.style.display = 'block';
			curTask = id;
			document.getElementById('mask').style.display = 'block';
		} else {
			doc.style.display = 'none';
			curTask = id;
			document.getElementById('mask').style.display = 'none';
		}
	}
}

function validateForm(){
	var taskName = document.forms["taskDetails"]["taskName"].value;
 	var assignee = document.forms["taskDetails"]["assignee"].value; 
 	var dueDate = document.forms["taskDetails"]["dueDate"].value; 
 	var description = document.forms["taskDetails"]["description"].value;
 	var textAlerts = document.forms["taskDetails"]["textAlerts"].value; 

    if (taskName == null || taskName == "") {
    	alert("Task Name must have a value");
        return false;
	}
	if (assignee == null || assignee == "") {
    	alert("assignee must have a value");
        return false;
	}
	if (dueDate == null || dueDate == "") {
    	alert("Due Date must have a value");
        return false;
	}
	if (description == null || description == "") {
    	alert("Description must have a value");
        return false;
	}

	if (textAlerts) {
		textAlerts == "false";
	}

    angular.element(document.getElementById('submit')).scope().createTask();
	return false;
}

function checkTextAlerts() {
	var textAlerts = document.getElementById('textAlertsFlag')
		if (textAlerts) {
		textAlerts == "false";
	}
}