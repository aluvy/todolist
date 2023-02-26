window.addEventListener("load", function(){
    setTimeout(() => { window.scrollTo(0,0) }, 1);

    

    var formArea = document.querySelector(".enter_area");
    var input = formArea.querySelector("input[type='text']"); // input
    var submit = formArea.querySelector("button[type='submit'"); // button
    
    var todolist = document.querySelector(".list_area dl"); // list
    var template = document.querySelector("template");  // template

    var del_chk = document.querySelector('.delchk');
    var del_chk_box = document.querySelector('.delchk_bg');
    
    var addcnt = 0;



    submit.addEventListener('click', submit_function); // 버튼 클릭

    function submit_function(e){
        e.preventDefault();

        var newvalue = input.value; // value값을 저장

        if (input.value !== ""){ // value가 비어있지 않으면
            document.querySelector("form").style.borderColor = "";
            document.querySelector('.warning').innerText = "";
            document.querySelector('.warning').style.display = "none";
            addText(newvalue);
            input.value = ""; // 실제 value 비움

        } else { // 비어있으면 경고
            document.querySelector("form").style.borderColor = "rgba(255,0,0,.6)";
            document.querySelector('.warning').style.display = "block";
            document.querySelector('.warning').innerText = "내용을 입력하세요";
        }
        input.focus(); // input에 포커스
    };

    

    function addText(newvalue){ // 리스트 추가하기

        var newlist = document.createElement("dd");

        var cloneNode = document.importNode(template.content, true);
        var chkbox = cloneNode.querySelector(".chk");
        var chkboxLabel = chkbox.querySelector("label");
        var chkboxInput = chkbox.querySelector("input");

        // checkbox 속성 변경
        chkboxLabel.attributes.for.value = 'cb-' + addcnt;
        chkboxInput.id = 'cb-' + addcnt;

        // content 텍스트 변경
        var spans = cloneNode.querySelector(".cont");
        spans.innerHTML = newvalue;

        // append
        todolist.append(newlist);
        newlist.append(cloneNode);


        // 버튼 이벤트
        var chkBtn = newlist.querySelector(".chk input");
        var delBtn = newlist.querySelector(".btn_del");
        var modifyBtn = newlist.querySelector(".btn_modify");
        
        chkBtn.addEventListener("click", check_function);
        delBtn.addEventListener("click", del_function);
        modifyBtn.addEventListener("click", modify_function);

        addcnt++;
    };




    // checkbox
    function check_function(e){
        var mydd = this.parentElement.parentElement; // dd 선택

        if(this.checked){
            this.checked = true;
            mydd.classList = ' chked';
        } else {
            this.checked = false;
            mydd.classList.remove('chked');
        }
    }

    

    function del_function(e){
        
        var btn_del = this;

        del_chk.style.display = "block";
        del_chk_box.style.display = "block";

        del_chk.querySelector('button').onclick = function(){
            btn_del.parentElement.parentElement.remove();
            del_chk.style.display="none";
            del_chk_box.style.display="none";
        }

        // 아니오 클릭 시
        del_chk.querySelector('a').onclick = function(e){
            e.preventDefault();
            
            del_chk.style.display="none";
            del_chk_box.style.display="none";
        }
    }


    //수정하기
    function modify_function(){

        var modi_value = this.parentElement.parentElement.querySelector('.cont');

            
        // modify class 없으면 실행
        if(modi_value.parentElement.classList == !' modify'){
            
            //console.log('hi2');
            modi_value.parentElement.classList += ' modify'; //클래스 추가
        
            var modify_input = "<input type='text' value='"+ modi_value.innerText +"'><button type='button'>ok</button>";

            modi_value.innerHTML = modify_input;
            
            
            modi_value.querySelector('button').onclick = function() {
                
                var mody_input = modi_value.querySelector('input').value;
                modi_value.parentElement.classList.remove('modify'); // 클래스 삭제
                modi_value.innerText = mody_input;

            }


        }
    }

});