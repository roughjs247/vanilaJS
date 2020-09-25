const form = document.querySelector('.js-form'),
      input = form.querySelector('input'),
      greeting = document.querySelector('.js-greetings');

const USER_LS = "currentUser",
      SHOWING_CN = 'showing';

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
}

function askFormName() {
    form.classList.add(SHOWING_CN);             // block을 보여준다.
    form.addEventListener('submit',handleSubmit)// 제출 func 활성화
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS); // localstorage 에 담겨진 username을 가져온다.
    console.log(`loadName ${currentUser}`);
    if(currentUser === null){
       askFormName();
    } else {
        // she is
        paintGreeting(currentUser);
    }

}

function init(){
    loadName();
}

init();