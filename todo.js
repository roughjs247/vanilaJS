const todoForm  = document.querySelector('.js-todoForm'),
      todoInput = todoForm.querySelector('input'),
      todoList  = document.querySelector('.js-todoList');

const TODOS_LS = "toDos";

// Todo 리스트 저장객체 (Array) LocalStorage 사용.
const todos = [];

// 할일 목록 리스트를 localStorage에 저장
function saveTodos(){
    // JSON(javaScript Object Notation) 데이터를 전달시, 자바스크립트가 그것을 다룰 수 있도록 Object로 바꿔주는 기능
    // localStorage에는 자바스크립트 객체가 [Object, Object] 형태로 저장되므로 string 형태로 변경하여 저장 하여야 한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));  // localStorage {Key : value}
    
}

function filterFn(todo){
    console.log(todo);
    return todo.id === 1
}

// Todo Delete Func
function deleteTodo(event){
    // 리스트 구조
    /* <li>                       <-- Target.parentNode
            <span>...</span>
            <button>...</button>  <-- Target
       </li>
    */        
    const btn = event.target;   // 이벤트 타겟 버튼 객체를 가져온다. <button>X</button>
    const li  = btn.parentNode; // 버튼을 가지고 있는 부모 노드를 가져온다
    toDoList.removeChild(li);   //
    const cleanTodos = toDos.filter(filterFn);
}

// todo 리스트를 그려주는 func
function paintTodo(text){
    // document.createElement("컴포넌트명") 컴포넌트를 생성한다.
    const li           = document.createElement("li");        
    const delBtn       = document.createElement("button");
    const span         = document.createElement('span');
    const newId        = todos.length + 1;
    span.innerText     = text;
    delBtn.innerText   = "❌";
    delBtn.addEventListener('click', deleteTodo);

    // li 컴포넌트 자식요소에 span과 delBtn을 추가한다.
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;     // 삭제 sequence를 위해 각 li에 고유 아이디 부여 
    // todoList 컴포넌트 자식요소에 li 컴포넌트를 추가한다.
    todoList.appendChild(li);

    // 할일 목록 객체
    const  todoObj = {
        text : text,
        id : newId   // 고유 id (배열길이 + 1)
    };
    todos.push(todoObj);    
    saveTodos(todos);
}

// todo 등록 func
function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function something(todo) {
    console.log(todo);
}

// load func
function loadToDos(){
    const loadedTodos = localStorage.getItem(TODOS_LS);
    // localStorage에 저장된 값이 있을 경우 객체를 뿌려준다.
    if(loadedTodos !== null){
        // localStorage에서 가져온 값은 String 형태이므로 JSON 타입으로 전환이 필요하다.
        const parsedToDos = JSON.parse(loadedTodos); //JSON.parse("String객체") :  String type -> JSON type으로 전환.
        
        parsedToDos.forEach(function(todo){
            paintTodo(todo.text);   // localStorage에 저장된 Todo 객체를 화면에 뿌려준다.
        });
        
    }
}

// init func
function init() {
    loadToDos();
    todoForm.addEventListener('submit', handleSubmit);  
}      
init();