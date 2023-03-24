let todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));


const createTodo = function (storageData) {

    let todoContents = todoInput.value;
    if(storageData) {
        todoContents = storageData.contents;
    }

    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    newBtn.addEventListener('click', () => {
        newLi.classList.toggle('complete');
        saveItemsFn();
    })

    newLi.addEventListener('dblclick', () => {
        if(window.confirm('삭제하시겠습니까?')) {
            newLi.remove();
            saveItemsFn();
        }
        
    })

    if(storageData?.complete) { // storageData && storageData.complete
        newLi.classList.add('complete');
    }

    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    
    todoInput.value = '';
    todoInput.focus();
   
    saveItemsFn()
}

const keyCodeCheck = function() {
    if(window.event.keyCode === 13 && todoInput.value !== '') { 
        createTodo();
    }
}

const deleteAll = function() {
    const liList = document.querySelectorAll('li');
    for(let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
    saveItemsFn();
}

const saveItemsFn = function() {
    const saveItems = [];
    for(let i = 0; i < todoList.children.length; i++) {
        const todoObj = {
            contents: todoList.children[i].querySelector('span').textContent,
            complete: todoList.children[i].classList.contains('complete'),
        };
        saveItems.push(todoObj);
    }
    // console.log(JSON.stringify( saveItems));

    saveItems.length === 0 ? 
        localStorage.removeItem('saved-items') :
        localStorage.setItem('saved-items', JSON.stringify( saveItems))
        

}


if(savedTodoList) {
    for(let i = 0; i < savedTodoList.length; i++) {
        createTodo(savedTodoList[i]);
    }
}

const weatherSearch = function(position) {
    // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
    fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${position.latitude}&lon=${position.longitude}&appid=a7d07f47d605b2276ecc30b1d36d743e`
        );
};

const accessToGeo = function(position) {
    console.log(position);
    const positionObj = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    }
    weatherSearch(positionObj)
}

const askForLocation = function() {
    navigator.geolocation.getCurrentPosition(accessToGeo, (err)=> {
        console.log(err);
    })
};

askForLocation();



// GET : 서버의 데이터를 조회하는 메소드
// POST : 서버의 데이터를 등록하는 메소드
// PUT : 서버 내 데이터를 수정하는 메소드
// PATCH : 데이터를 일부 수정하는 메소드
// DELETE : 서버의 데이터를 삭제하는 메소드
// OPTIONS: 서버가 허용하는 메소드를 확인하기 위한 메소드