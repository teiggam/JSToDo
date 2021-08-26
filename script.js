//Select Elements

const list = document.getElementById("list");
const input = document.getElementById("input");
const itemCount = document.getElementById("count");

//set variables
let listArray = [], id = 0, activeList = 'all';

 //Getting local storage
 let data = localStorage.getItem("TODO");
 let completedData = localStorage.getItem("TODO");
 let lsActiveListJSON = localStorage.getItem("ACTIVELIST")



 //This will pull the active list to run while reloading page
 lsActiveList = JSON.parse(lsActiveListJSON);
 
 //check for data, and send it to listArray
 listArray = JSON.parse(data);


 if(listArray.length < 1){
     id = 0;
     listArray = []
     document.getElementById("noList").innerHTML = '<center>You have no items in your todo list. Create an item to begin tracking your list.</center>';
 }
 else{
     previousId = Math.max.apply(Math, listArray.map(function(o) {return o.id}));
     id = previousId + 1;
 }

//Check which list is active and will load the appropiate list
if(lsActiveList == 'all'){
     loadList(listArray, lsActiveList);
     updateCount();
     changeBlue('all');
    }
else if (lsActiveList == 'completed'){
    loadCompleted(listArray, lsActiveList);
    changeBlue('completed');
}
else if (lsActiveList == 'active'){
    loadActive(listArray, lsActiveList);
    changeBlue('active');
}


/*************************/
//  **** Functions ****  //
/*************************/

//load entire list
function loadList(array, listType){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done);
    });
    activeList = listType;
    updateLocalStorage();
}

//load list of only completed items
function loadCompleted(array, listType){
    array.forEach(function(item){
        if(item.done){
            addToDo(item.name, item.id, item.done);
        }
    });
    activeList = listType;
    updateLocalStorage();
}

//load list of only active/not completed items
function loadActive(array, listType){
    array.forEach(function(item){
        if(!item.done){
            addToDo(item.name, item.id, item.done);
        }
    });
    activeList = listType;
    updateLocalStorage();
}

//Add to list
function addToDo(toDo, id, done){   
    const DONE = done? "check" : "circle";
    const LINE = done? "line-through" : "";
    const CHECK = done? "" : "hidden"
    const item =`
                    <li class="item">
                    <button class="${DONE}" job="complete" id="${id}"><img class="checkmark ${CHECK}" src="images/icon__check.png"/></button>
                    <p class="text ${LINE}">${toDo}</p>
                    <button class="remove" job="delete" id="${id}"><img class="img" src="images/icon__close.png"/></button>
                    </li>
                `;
    const position = "beforeend";
    document.getElementById("noList").innerHTML = '';
    list.insertAdjacentHTML(position, item);  
}


//Complete list item
function completeToDo(element){
    element.classList.toggle("check");
    element.classList.toggle("circle");
    element.parentNode.querySelector(".checkMark").classList.toggle("hidden");
    element.parentNode.querySelector(".text").classList.toggle("line-through");
    
    for(let i = 0; i < listArray.length; i++){

        if(listArray[i].id == element.id)
        {
        listArray[i].done = listArray[i].done ? false : true;
        }
    }   
    updateLocalStorage();
    location.reload();    
}

//Remove list item
function removeToDo(element){
    var index = listArray.findIndex(function(o){
        return o.id == element.id;
    })

    if (index !== -1){
        listArray.splice(index, 1);
    } 
    updateLocalStorage();
    location.reload();
}

//Clear completed items from list
function clearCompleted(){
   newListArray = listArray.filter(function(item) {
       return item.done !== true;
   });
    listArray = newListArray;
    updateLocalStorage();
    location.reload();   
}
    
//Update local storage data
function updateLocalStorage(){
    localStorage.setItem("TODO", JSON.stringify(listArray));
    localStorage.setItem("ACTIVELIST", JSON.stringify(activeList));
    updateCount();
}

//Functions to have filtered lists and update button color
function completedToDoList(){
    changeBlue("completed");
    document.getElementById("list").innerHTML = "";
    loadCompleted(listArray, "completed");
}

function activeToDoList() {
    changeBlue("active");
    document.getElementById("list").innerHTML = "";
    loadActive(listArray, "active");
}

function showAllList() {
    changeBlue("all");
    document.getElementById("list").innerHTML = "";
    loadList(listArray, "all");
}


//Set the button for the list currently being viewed as blue
function changeBlue(elementID){
    var blElement = document.getElementById(elementID);
    blElement.classList.add("blue");
    
    if (elementID == "completed"){
        var blElement = document.getElementById("active");
        blElement.classList.remove("blue");

        var blElement = document.getElementById("all");
        blElement.classList.remove("blue");
    }
    else if (elementID == "active"){
        var blElement = document.getElementById("completed");
        blElement.classList.remove("blue");

        var blElement = document.getElementById("all");
        blElement.classList.remove("blue");
    }
    else if (elementID == "all"){
        var blElement = document.getElementById("completed");
        blElement.classList.remove("blue");

        var blElement = document.getElementById("active");
        blElement.classList.remove("blue");
    }
}

//Function to update item count
function updateCount(){
    let count = listArray.reduce((count, item) =>{
        if (!item.done) count++;
        return count;
    }, 0);

    itemCount.innerHTML = count;
}



/*************************/
// ***Event Listeners*** //
/*************************/


// add an item to the list
input.addEventListener("keyup", (event) => {
    if(event.key == "Enter"){
        const toDo = event.target.value;

        if(toDo !== ""){
            addToDo(toDo, id, false, false);
            listArray.push({
                name: toDo,
                id: id,
                done: false,
            });
            id++;
            updateLocalStorage();  
        }

        input.value="";
    }
});

//target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob === "complete"){
        completeToDo(element);
    }
    else if (elementJob === "delete" ){
        removeToDo(element);
    }
   
});
