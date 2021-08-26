//Select Elements

const list = document.getElementById("list");
const input = document.getElementById("input");
const itemCount = document.getElementById("count");

//set variables
let listArray, id;

 //local storage; get and add
 let data = localStorage.getItem("TODO");
 let completedData = localStorage.getItem("TODO");

 //check for data, and send it to listArray
 if(data){
     listArray = JSON.parse(data);
     id = listArray.length;
     loadList(listArray);
     updateCount();
 }
 else{
     listArray = []
     id = 0;
     document.getElementById("noList").innerHTML = '<center>You have no items in your todo list. Create an item to begin tracking your list.</center>';
 }
 console.log(listArray);



 
//load entire list
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done);
    });
}

//load list of only completed items
function loadCompleted(array){
    array.forEach(function(item){
        if(item.done){
            addToDo(item.name, item.id, item.done);
        }
    });
}

//load list of only active/not completed items
function loadActive(array){
    array.forEach(function(item){
        if(!item.done){
            addToDo(item.name, item.id, item.done);
        }
    });
}

//Add a to do

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


//complete function

function completeToDo(element){
    element.classList.toggle("check");
    element.classList.toggle("circle");
    element.parentNode.querySelector(".checkMark").classList.toggle("hidden");
    element.parentNode.querySelector(".text").classList.toggle("line-through");
    console.log(element.id);
    console.log(listArray[element.id].done);
    listArray[element.id].done = listArray[element.id].done ? false : true;
    
    updateLocalStorage();
    console.log(listArray);
    
}

//remove to do function

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


//Clear list from local storage
function clearCompleted(){

    listArray.forEach(function(item){

        if(item.done)
        {
            var index = listArray.findIndex(function(o){
                return o.id === item.id;
            })
            if(index !== -1){
                listArray.splice(index, 1);
            };
        }
        return false;
    }
    )
    updateLocalStorage();
    location.reload();   
}
    

function updateLocalStorage(){
    localStorage.setItem("TODO", JSON.stringify(listArray));
    updateCount();
}

//Functions to have filtered lists
function completedToDoList(){
    document.getElementById("list").innerHTML = "";
    loadCompleted(listArray);
}


function activeToDoList() {
    document.getElementById("list").innerHTML = "";
    loadActive(listArray);
}

function showAllList() {
    document.getElementById("list").innerHTML = "";
    loadList(listArray);
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
//Event Listeners 
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
        console.log(element.id);
        completeToDo(element);
    }
    else if (elementJob === "delete" ){
        removeToDo(element);
    }
   
});
