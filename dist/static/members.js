(function($){
    $.fn.MyValidation = function(opt){
        new MyValidation(this, opt);
        return this;
    }    

    function MyValidation(el, opt){
        this.init(el);
        this.bindingEvent(opt);
    }
    
    MyValidation.prototype.init = function(el){
        this.submit = $(el).find("input[type=submit]");
    }
    
    MyValidation.prototype.bindingEvent = function(opt){
        this.submit.on("click", function(e){
            if(opt.isTxt){
                for(var i = 0; i < opt.isTxt.length; i++){
                    if(!this.isTxt(opt.isTxt[i])) e.preventDefault(); 
                }
            }
            
            if(opt.isCheck){
                for(var i = 0; i < opt.isCheck.length; i++){
                    if (!this.isCheck(opt.isCheck[i])) e.preventDefault(); // hobby
                }
            }

            if(opt.isSelect){
                for(var i = 0; i < opt.isSelect.length; i++){
                    if (!this.isSelect(opt.isSelect[i])) e.preventDefault();
                }
            }
    
            if(opt.isPwd){
                if( !this.isPwd(opt.isPwd[0], opt.isPwd[1]) ) e.preventDefault();  
            }
    
        }.bind(this));
    }
    
    //텍스트 인증 함수 정의
    MyValidation.prototype.isTxt = function(name){
        var len = 2;
        var txt = $("[name=" + name + "]").val();
        var msg = $("[name=" + name + "]").attr("placeholder");
    
        if (txt == ""){
            $("[name=" + name + "]").addClass("error");
            $("input[name=" + name + "]").parent().find("p").show();
            return false;
    
        } else{
            if (txt.length < len){
                alert("최소 " + len + "글자 이상 입력하세요!");

                $("[name=" + name + "]").addClass("error");
                $("input[name=" + name + "]").parent().find("p").show();
                return false;
    
            } else{
                $("[name=" + name + "]").removeClass("error");
                $("input[name=" + name + "]").parent().find("p").hide();
                return true;
            }
        }
    }
    
    //비밀번호 인증 함수 정의
    MyValidation.prototype.isPwd = function(name1, name2){
        var $pwd1 = $("input[name=" + name1 + "]");
        var $pwd2 = $("input[name=" + name2 + "]");
        var pwd1 = $pwd1.val();
        var pwd2 = $pwd2.val();
        
        var isConfirm = false;
        var i = 0;
    
        var num = /[0-9]/;
        var eng = /[a-zA-Z]/;
        var spc = /[~!@#$%^&*()_+\]\[-]/;
    
        if (pwd1 === pwd2) {
    
            //비번이 len의 갯수보다 큰지 확인
            if (pwd1.length >= 5) {
                i++;
                $("input[name=" + name1 + "]").parent().find(".password_len_error").hide();
            } else {
                $("input[name=" + name1 + "]").parent().find(".password_len_error").show();
            }
    
            //비번에 숫자가 포함되어 있는지 확인
            if (num.test(pwd1)) {
                i++;
                $("input[name=" + name1 + "]").parent().find(".password_num_error").hide();
            } else {
                $("input[name=" + name1 + "]").parent().find(".password_num_error").show();
            }
    
            //문자가 포함되어 있는지 확인
            if (eng.test(pwd1)) {
                i++;
                $("input[name=" + name1 + "]").parent().find(".password_txt_error").hide();
            } else {
                $("input[name=" + name1 + "]").parent().find(".password_txt_error").show();
            }
    
            //특수문자가 포함되어 있는지 확인
            if (spc.test(pwd1)) {
                i++;
                $("input[name=" + name1 + "]").parent().find(".password_sc_error").hide();
            } else {
                $("input[name=" + name1 + "]").parent().find(".password_sc_error").show();
            }
    
            if (i === 4) {
                $pwd1.removeClass("error");
                $pwd2.removeClass("error");
                isConfirm = true;
                return isConfirm;
            } else {
                $pwd1.addClass("error");
                $pwd2.addClass("error");
                return isConfirm;
            }
    
        } else {
            alert("두 개의 비밀번호를 동일하게 입력하세요.")
            $pwd1.addClass("error");
            $pwd2.addClass("error");
            return isConfirm;
        }
    }
    
    //check 인증 함수 정의
    MyValidation.prototype.isCheck = function(name){
        var isCheck = $("input[name=" + name + "]").is(':checked');
    
        if (isCheck){
            $("input[name=" + name + "]").parent().find("p").hide();
            return true;
    
        } else{
            $("input[name=" + name + "]").parent().find("p").show();
            return false;
        }
    }
    
    //select 인증 함수 정의
    MyValidation.prototype.isSelect = function(name){
        var sel = $("select[name=" + name + "]").children("option:selected").val();
        var msg = $("select[name=" + name + "]").children("option").eq(0).text();
    
        if (sel == ""){
            $("select[name=" + name + "]").addClass("error");
            $("select[name=" + name + "]").parent().find("p").show();
            return false;
    
        } else{
            $("select[name=" + name + "]").removeClass("error");
            $("select[name=" + name + "]").parent().find("p").hide();
            return true;
        }
    }

})(jQuery);