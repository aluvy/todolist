/* javascript */

window.onload  = function() {

    var input = document.querySelector(".enter_area input"); // input
    var submit = document.querySelector(".enter_area button"); // button
    var addcnt = 10;
    //document.querySelector('.warning').style.display = "none";


    submit.onclick = function(e){ // 버튼을 클릭 하면
        e.preventDefault();
        
        var inputValue = input.value; // 인풋의 벨류

        if (input.value !== ""){ // value가 비어있지 않으면

            document.querySelector("form").style.borderColor = "";
            document.querySelector('.warning').innerText = "";
            document.querySelector('.warning').style.display = "none";
            addText();
            input.value = ""; // 실제 value 비움

        } else { // 비어있으면
            document.querySelector("form").style.borderColor = "rgba(255,0,0,.6)";
            document.querySelector('.warning').style.display = "block";
            document.querySelector('.warning').innerText = "내용을 입력하세요";
        }
        input.focus(); // input에 포커스
    };

    


    function addText(){ // 리스트 추가하기
        addcnt++;
        //console.log(addcnt);
        var newtext = input.value; // value의 값 저장

        var newlist = document.createElement("dd");
        newlist.innerHTML = "<span class='chk'><input type='checkbox' id='cb-"+ addcnt +"'><label for='cb-"+ addcnt +"'></label></span>";
        newlist.innerHTML += "<span class='cont'>" + newtext + "</span>";
        newlist.innerHTML += "<span class='fuct'></button><button class='btn_del' type='button'>삭제</button></span>";

        document.querySelector(".list_area dl").append(newlist);; // dl에 넣어준다

        addChk();
        addDel();
    };



    // checkbox
    function addChk(){
        var checkbox = document.querySelectorAll('.chk input');

        for(var i=0; i<checkbox.length; i++){
            checkbox[i].onclick = function(){ // checkbox 클릭 시
                if(this.checked){ // checked 되면
                    this.parentElement.parentElement.className = 'chked'; // dd에 클래스 추가
                } else {
                    this.parentElement.parentElement.classList.remove('chked'); // dd에 클래스 삭제
                }
            };
        }
    };
    addChk();



    // delete
    function addDel(){
        var del = document.querySelectorAll('.btn_del');
        var del_chk = document.querySelector('.delchk');
        var del_chk_box = document.querySelector('.delchk_bg');

        for(var i=0; i<del.length; i++){
            del[i].onclick = function(){
                
                var this_dd = this.parentElement.parentElement;

                del_chk.style.display="block";
                del_chk_box.style.display="block";

                del_chk.querySelector('button').onclick = function(){
                    this_dd.remove();
                    del_chk.style.display="none";
                    del_chk_box.style.display="none";
                }

                // 아니오 클릭 시
                del_chk.querySelector('a').onclick = function(e){
                    e.preventDefault();
                    
                    del_chk.style.display="none";
                    del_chk_box.style.display="none";
                }
            };
        }

    }
    addDel();


    // modify
    // function addModify(){
    //     var modify = document.querySelectorAll('.btn_modify');
    //     //var modify_chk = document.querySelector();

    // }
    // addModify();


};