//Select Elements

const list = document.getElementById("list");
const input = document.getElementById("input");

//set variables
let listArray, id;

 //local storage; get and add
 let data = localStorage.getItem("TODO");

 //check for data, and send it to listArray
 if(data){
     listArray = JSON.parse(data);
     id = listArray.length;
     loadList(listArray);
 }
 else{
     listArray = []
     id = 0;
     document.getElementById("noList").innerHTML = 'You have no items in your todo list. Create an item to begin tracking your list.';
 }



 
//load items from list
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Add a to do

function addToDo(toDo, id, done, trash){
    const itemStart = `
    <ul id="list"></ul>
    <div class="clear">
        <button class="clear" onclick="clearList()">Clear List</button>
    </div>
    `;
    
    if(trash){
        return;
    }
    if(!data){
        document.getElementById("noList").innerHTML = itemStart;
        location.reload();
    }


    const DONE = done? "check" : "circle";
    const LINE = done? "line-through" : "";
    const item =`
                    <li class="item">
                    <button class="${DONE}" job="complete" id="${id}"></button>
                    <p class="text" ${LINE}">${toDo}</p>
                    <button class="remove" job="delete" id="0"><img class="img" src="images/icon__close.png"/></button>
                    </li>

                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
    
}


//complete function

function completeToDo(element){
    element.classList.toggle("check");
    element.classList.toggle("circle");
    element.parentNode.querySelector(".text").classList.toggle("line-through");
    listArray[element.id].done = listArray[element.id].done ? false : true;
    
    localStorage.setItem("TODO", JSON.stringify(listArray));
}

//remove to do function

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    listArray[element.id].trash = true;

    localStorage.setItem("TODO", JSON.stringify(listArray))
}

function clearList(){
    localStorage.clear();
    location.reload();
    return false;
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
                trash: false,  
            });
            id++;
            localStorage.setItem("TODO", JSON.stringify(listArray));   
        }
        input.value="";
    }
});

//target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == "complete"){
        completeToDo(element);
    }
    else if (elementJob == "delete" ){
        removeToDo(element);
    }
   
});


// startToDo();

