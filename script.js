// declaring variables
var cmpList = document.getElementById('completedList');
var pndgList = document.getElementById('pendingList');
var addTask = document.getElementById('task');
var submitTask = document.getElementById('submitButton');

// Setting focus to textfield
addTask.focus();

// constructor for task
function Task(taskName, taskStatus) {
    this.name = taskName;
    this.taskStatus = taskStatus;
}

// Event listener on Add button to add task to list if not provided empty value 
submitTask.addEventListener('click', function () {
    if (addTask.value !== '') {
		if(document.getElementById('donecheck').checked)
		{
			createTask(addTask.value, false);
		}
		else
		{
			createTask(addTask.value, true);
		}
    } else {
        alert('The Task Name can not be empty');
    }
});



// List prototype to display
Task.prototype.displayList = function () {
    // creating div element and adding class to it
    var newDiv = document.createElement('div');
    newDiv.classList.add('item');

    // creating check box and adding it's class and adding if it is checked or not
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.classList = 'checkbox';
    cb.checked = (this.taskStatus === true) ? true : false;

    // adding paragraph element and adding content to it 
    var taskName = document.createElement('p');
    taskName.classList.add('pItem');
    taskName.textContent = this.name;
    
    // adding delete button to delete tasks
    var buttonDelete = document.createElement('button');
    buttonDelete.textContent = 'Delete';
    buttonDelete.classList.add('delete');
    // adding all elemnts to main div
    newDiv.appendChild(cb);
    newDiv.appendChild(taskName);
    newDiv.appendChild(buttonDelete);

    // setting if the task is completed or not
    if (this.taskStatus === true) {
        newDiv.getElementsByClassName('pItem')[0].style.textDecoration = 'line-through';
        newDiv.style.backgroundColor = 'red';
        pndgList.append(newDiv);
    } else {
        newDiv.style.backgroundColor = 'green';
        cmpList.prepend(newDiv);
    }
};

createTask('Task1', true);
createTask('Task2', false);
createTask('Task3', false);


// Add task to list
function createTask(taskName, taskStatus) {
    if (taskName && taskName !== '') {
        var item = new Task(taskName, taskStatus);
        item.displayList();
        playSound('added');
    }
}

// List click events
cmpList.onclick = function (event) {
    // if delete button is clicked then delete the element
    if (event.target && event.target.nodeName === 'BUTTON' && event.target.className === 'delete') {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }

    if (event.target && event.target.nodeName === 'INPUT' && event.target.className === 'checkbox') {
            event.target.parentNode.getElementsByClassName('pItem')[0].style.textDecoration = 'line-through';
            event.target.parentNode.style.backgroundColor = 'red';
            pndgList.append(event.target.parentNode);
            playSound('done');
        
    }
};

pndgList.onclick = function (event) {
    // if delete button is clicked then delete the element
    if (event.target && event.target.nodeName === 'BUTTON' && event.target.className === 'delete') {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }

    if (event.target && event.target.nodeName === 'INPUT' && event.target.className === 'checkbox') {
        event.target.parentNode.getElementsByClassName('pItem')[0].style.textDecoration = 'None';
            event.target.parentNode.style.backgroundColor = 'lightgreen';
            cmpList.append(event.target.parentNode);
            playSound('done');
    }
};

// function to get audios and play accordingly
function playSound(soundEvent) {
    let audioFile;
    if (soundEvent) {
        switch (soundEvent) {
            case 'added' :
                audioFile = 'Added.wav';
                break;
            case 'done' :
                audioFile = 'Done.wav';
                break;
        }
        let sound = new Audio(audioFile);
        var playPromise = sound.play();

        if (playPromise !== undefined) {
            playPromise.then(play => {
            })
                    .catch(error => {
                    });
        }
    }
}