window.onload = function() {
    var inp = document.querySelector('.inp') //手机号
    var inp4 = document.querySelector('.inp4') //qq
    var nc = document.querySelector('.nc') //昵称
    var inp1 = document.querySelector('.inp1') //短信验证码
    var psw = document.querySelector('.inp2') //密码
    var surepsw = document.querySelector('.inp3') //确认密码
    var regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    var qq = /[1-9][0-9]{4,}/
    var regnc = /^[\u4e00-\u9fa5]{2,6}$/
    var msg = /\d{6}/
    var regpsw = /[a-z0-9A-Z-_]{6,12}/
        //提取手机号的函数
    refexp(inp, regtel)
        //提取qq的函数
    refexp(inp4, qq)
        //提取昵称的函数
    refexp(nc, regnc)
        //提取短信验证码的函数
    refexp(inp1, msg)
        //提取密码的函数
    refexp(psw, regpsw)
        //封装一个函数
    function refexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                //如果输入正确就让input下面的兄弟更改元素
                this.nextElementSibling.className = 'success'
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 格式正确'
            } else {
                this.nextElementSibling.className = 'error'
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入'

            }
        }
    }
    surepsw.onblur = function() {
        if (this.value == psw.value) {
            this.nextElementSibling.className = 'success'
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 两次密码正确'

        } else {
            this.nextElementSibling.className = 'error'
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次不一样'

        }
    }


}