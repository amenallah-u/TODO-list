/* =========================
   DOM ELEMENTS
========================= */
let input=document.getElementById('taskInput');
let btn=document.getElementById('addBtn');
let list=document.getElementById('taskList');
let counter=document.getElementById('remainingCount');
let tasks=[];
let darkModeBtn=document.getElementById('dark_mode');
/* =========================
   RENDER FUNCTION (DISPLAY TASKS)
========================= */
function render(){
    list.innerHTML='';
    for(let i=0;i<tasks.length;i++){

        let li=document.createElement('li');
        let checkbox=document.createElement('input');
        let deleteBtn=document.createElement('button');
        let span=document.createElement('span');
        let modifierBtn=document.createElement('button');
        let date = document.createElement('span');
        li.draggable = true;
        li.addEventListener('dragstart', dragStart);
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop', drop);
        li.addEventListener('dragend', dragEnd);
        checkbox.type='checkbox';
        checkbox.checked=tasks[i].completed;

        span.textContent=tasks[i].text;
        span.style.color = tasks[i].color;
        span.style.fontFamily = tasks[i].font;

        if(checkbox.checked){
            span.classList.toggle('completed');
        }

        deleteBtn.innerHTML=`<i class="fa-solid fa-trash-can"></i>`;
        deleteBtn.className='delete-btn';
        deleteBtn.onclick=function(){
            deleteTask(tasks[i].id);
        };

        checkbox.onclick=function(){
            toggleTask(tasks[i].id);
        };

        modifierBtn.innerHTML=`<i class="fa-solid fa-pen"></i>`;
        modifierBtn.className='modifier-btn';
        modifierBtn.onclick=function(){
            modifyTask(tasks[i].id,li);
        };

        let actions = document.createElement('div');
        actions.className = 'actions';
        li.appendChild(checkbox);
        li.appendChild(span);
        actions.appendChild(deleteBtn);
        actions.appendChild(modifierBtn);
        li.appendChild(actions);
        
        li.dataset.id = tasks[i].id;

        list.appendChild(li);
    }

    counter.textContent=`${tasks.filter(t=>!t.completed).length}`;
    saveTasks();
}

/* =========================
   ADD TASK
========================= */
function addTask(){
    let task={
        id: crypto.randomUUID(),
        text:input.value,
        completed:false,
        color: input.style.color || '#000000',
        font: input.style.fontFamily || 'default',
    }
    if(task.text!==''){
        tasks.push(task);
        input.value='';
        render();
    }
}

btn.addEventListener('click',addTask);

input.addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        addTask();
    }
});

/* =========================
   DELETE & TOGGLE TASK
========================= */
function deleteTask(id){
    tasks=tasks.filter(t=>t.id!==id);
    render();
}

function toggleTask(id){
    let task=tasks.find(t=>t.id===id);
    if(task){
        task.completed=!task.completed;
        tasks.sort((a,b) => a.completed - b.completed);
        render();
    }
}

/* =========================
   LOCAL STORAGE
========================= */
function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function loadTasks(){
    let savedTasks=localStorage.getItem('tasks');
    if(savedTasks){
        tasks=JSON.parse(savedTasks);
        render();
    }
}
/* =========================
   MODIFY TASK
========================= */
function modifyTask(id,input){
    let task=tasks.find(t=>t.id===id);

    if(task){
        let cont=task.text;
        let inpts=document.createElement('input');

        inpts.type='text';
        inpts.value=cont;

        input.innerHTML='';
        input.appendChild(inpts);

        inpts.focus();

        inpts.onkeypress=function(e){
            if(e.key==='Enter'){
                task.text=inpts.value;
                render();
            }
        }
    }
}

/* =========================
   SEARCH TASKS
========================= */
function searchTasks(){
    let query=document.getElementById('searchBar').value.toLowerCase();
    let items=list.getElementsByTagName('li');

    for(let i=0;i<items.length;i++){
        let text=items[i].getElementsByTagName('span')[0].textContent.toLowerCase();

        if(text.includes(query)){
            items[i].style.display='flex';
        } else {
            items[i].style.display='none';
        }
    }
    
}

let searchBtn=document.getElementById('searchBtn');

searchBtn.addEventListener('click', searchTasks);

let searchBar=document.getElementById('searchBar');

searchBar.addEventListener('keypress', function(e){
    if(e.key==='Enter'){
        searchTasks();
    }
});
/* =========================
   dark mode
========================= */
function toggleDarkMode(){
    let k=document.body.classList.toggle('dark-mode');
    darkModeBtn.innerHTML=`${document.body.classList.contains('dark-mode') ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>'}`;
    saveDarkMode()

}

darkModeBtn.addEventListener('click', toggleDarkMode);
/* =========================
   save dark mode
========================= */
function saveDarkMode(){
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
function loadDarkMode(){
    let darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
        darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

/* =========================
  color picker
========================= */
let colorPicker=document.getElementById('colorPicker');

function colored() {
    let selectedColor = this.value;
    input.style.color = selectedColor;
};
colorPicker.addEventListener('input', colored);
/* =========================
  font picker
========================= */
let fontPicker=document.getElementById('fontPicker');
function changeFont() {
    let selectedFont = this.value;
    if (selectedFont === 'default') {
        input.style.fontFamily = '';
    } else {
        input.style.fontFamily = selectedFont;
    }
}
fontPicker.addEventListener('change', changeFont);
/* =========================
   drag and drop
========================= */
let draggedTask = null;
function dragStart(){
    draggedTask = this;
    this.classList.add("dragging");
}

function dragEnd(){
    this.classList.remove("dragging");
}

function dragOver(e){
    e.preventDefault();
}

function drop(){
    if(draggedTask !== this){

        let draggedId = draggedTask.dataset.id;
        let targetId = this.dataset.id;

        let draggedIndex = tasks.findIndex(t => t.id === draggedId);
        let targetIndex = tasks.findIndex(t => t.id === targetId);

        // swap
        [tasks[draggedIndex], tasks[targetIndex]] =
        [tasks[targetIndex], tasks[draggedIndex]];

        render();
    }
}
window.onload=function(){
    loadTasks();
    loadDarkMode()
}
