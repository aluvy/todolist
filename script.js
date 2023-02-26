window.addEventListener("load", function(){
    setTimeout(() => { window.scrollTo(0,0) }, 1);

    $todo.init();

    const submit = document.querySelector("#submit");
    submit.addEventListener('click', function(e){
        e.preventDefault();
        $todo.submit()
    });

});

const $todo = {
    todos: [],
    init: function(){
        let localTodos = localStorage.getItem("todos");
        if( localTodos == null ) return;
        this.todos = JSON.parse(localStorage.getItem("todos"));
        this.setHTML();
    },
    submit: function(){
        const input = document.querySelector("#inputtxt");
        const value = input.value;
        const chk = this.chkValue(value);
        if ( !chk ) return;

        this.pushTodo(value);
        input.value = "";
        input.focus();
    },
    pushTodo: function(value){
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, 0);
        let day = String(date.getDate()).padStart(2, 0);
        let time = String(date.getHours()).padStart(2, 0);
        let min = String(date.getMinutes()).padStart(2, 0);
        let sec = String(date.getSeconds()).padStart(2, 0);
        let msec = date.getMilliseconds();
        let key = `${year}${month}${day}_${time}${min}${sec}${msec}`;
        
        this.todos.push({ "id": key, "content" : value });
        this.setTodo();
    },
    setTodo: function(){
        localStorage.setItem("todos", JSON.stringify(this.todos));
        this.setHTML();
    },
    setHTML: function(){
        let value = this.todos;
        if( value == undefined || value == null || value.length < 0 ) return;

        const todolist = document.querySelector("#todolist");
        todolist.innerHTML = "";
        this.todos.forEach((e, i)=>{
            const dd = document.createElement("dd");
            const key = e.id;
            const value = e.content;
            dd.setAttribute("id", `item-${key}`);
            dd.innerHTML = `
                <span class="chk">
                    <input type="checkbox" id="cb-${key}">
                    <label for="cb-${key}"></label>
                </span>
                <span class="cont">${value}</span>
                <span class="fuct">
                    <button type="button" class="btn_modify" id="modify-${key}">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button type="button" class="btn_del" id="delete-${key}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </span>
            `;
            todolist.prepend(dd);

            document.querySelector(`#delete-${key}`).addEventListener("click", function(){ $todo.delete(key) } );
            document.querySelector(`#modify-${key}`).addEventListener("click", function(){ $todo.openModify(key, value) } );
            document.querySelector(`#cb-${key}`).addEventListener("change", function(){ $todo.check(key) });
        })
    },
    chkValue: function(value){
        const warning = document.querySelector(".warning");
        if( value == '' ){
            const form = document.querySelector("#form");
            form.classList.add("error");
            warning.innerText = '내용을 입력하세요';
            return false;
        } else {
            form.classList.remove("error");
            warning.innerText = '';
            return true;
        }
    },
    delete: function(key){
        let result = confirm("해당 리스트를 삭제하시겠습니까?");
        if( !result ) return;

        $todo.todos.forEach((e, i)=>{ if( e.id == key ) $todo.todos.splice(i, 1) })
        $todo.setTodo();
    },
    openModify: function(key, value){
        const elem = document.querySelector(`#item-${key}`);
        if( elem.classList.value.includes("chked") ) return;

        const cont = elem.querySelector(".cont");
        const input = document.createElement("input");
        cont.innerText = '';
        input.setAttribute("type", "text");
        input.setAttribute("id", `modiInput-${key}`);
        input.setAttribute("value", value);
        const buttonOk = document.createElement("button");
        buttonOk.setAttribute("type", "button");
        buttonOk.setAttribute("id", `modiok-${key}`);
        buttonOk.innerText = "ok";
        cont.append(input);
        cont.append(buttonOk);
        elem.classList.add("modify");
        input.select();

        input.addEventListener("input", function(){
            value = document.querySelector(`#modiInput-${key}`).value;
        });
        input.addEventListener("keyup", function(e){
            if( e.keyCode == 13 ) buttonOk.click()
        })
        buttonOk.addEventListener("click", function(){ $todo.modifyOk(key, value) })
    },
    modifyOk: function(key, value){
        console.log(key, value);
        const elem = document.querySelector(`#item-${key}`);
        const cont = elem.querySelector(".cont");
        cont.innerText = value;
        
        $todo.todos.forEach((e, i)=>{ if( e.id == key ) e.content = value })
        $todo.setTodo();
    },
    check: function(key){
        const dd = document.querySelector(`#item-${key}`);
        const checkbox = document.querySelector(`#cb-${key}`);
        ( checkbox.checked ) ? dd.classList.add("chked") : dd.classList.remove("chked");
    }
}