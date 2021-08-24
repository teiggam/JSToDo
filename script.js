let list, id;
let data = localStorage.getItem("todo");
if(data){
    list = JSON.parse(data);
    loadToDo(list);
    id = list.length;
}
else{
    list = [];
    id = 0;
}

function loadToDo(array){

}


function addToDo(toDo){
    if (trash) { return;}
    const done = done ? CHECK : UNCHECK;
    const line = done ? LINE_THROUGH : "";
    const text = `<li class="item">
                    <i class="${done} complete" job="complete"></i>
                    <p class="text ${line}"> ${toDo} </p>
                    <i class="delete" job="delete" id="${id}></i>
                </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position, text);
}