var that;
class Tab {

    constructor(id) {
        //获取元素
        that = this
        this.main = document.querySelector(id)

        this.add = this.main.querySelector('.tabadd')
            //li的父亲
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
            //获取section父元素
        this.fsection = this.main.querySelector('.tabscon')
            //调用函数
        this.init()
    }
    init() {
            // init初始化函数让相关的元素绑定函数
            //创建一个
            this.updateNode();
            //添加功能
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i
                    //点击之后调用函数
                this.lis[i].onclick = this.toggleTab;
                //点击关闭按钮触发函数
                this.remove[i].onclick = this.removeTab;
                //双击触发li
                this.spans[i].ondblclick = this.editTab;
                //双击触发section
                this.sections[i].ondblclick = this.editTab;
            }
        }
        //因为是动态生成的所以要放到函数里面
    updateNode() {
            this.lis = this.main.querySelectorAll('li')
            this.sections = this.main.querySelectorAll('section')
            this.remove = this.main.querySelectorAll('.icon-guanbi')
            this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
        }
        // 1.切换功能
    toggleTab() {
            //引用清除缓存函数
            that.clearClass()
                //点击之后切换为点击的
            this.className = 'liactive'
                //不能用this是因为this指向的是li
            that.sections[this.index].className = 'conactive'
        }
        //清除缓存
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                that.sections[i].className = '';
            }
        }
        //2.添加功能
    addTab() {
        //想清除
        that.clearClass()
            //生成一个随机数
        var random = Math.random();
        //新建一个li
        var li = '<li class="liactive"><span>新的选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        //创建一个section
        var section = '<section class="conactive">测试' + random + '</section>'
            //将这个li添加到ul里面insertAdjacentHTML是添加
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend', section)
            //初始化
        that.init()
    }

    //3.删除功能
    removeTab(e) {
            e.stopPropagation() //阻止冒泡
                //获取span父亲li的索引号
            var index = this.parentNode.index;
            //当鼠标点击哪个就删除哪个
            that.lis[index].remove()
            that.sections[index].remove()
            that.init()
            if (document.querySelector('.liactive')) return
                //当我们删除了选中了的li的时候就让他前面的li出去选中状态
            index--;
            that.lis[index] && that.lis[index].click()

        }
        //4.修改功能
    editTab() {
        var str = this.innerHTML
            //禁止双击选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        //让里面的变成文本框
        this.innerHTML = '<input type="text"></input>'
        var input = this.children[0]
        input.value = str;
        input.select() //文本框里面的内容输入选中状态
            //当我们离开文本框的时候就让里面的内容赋值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value

        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                //手动调用表单失去焦点事件    不需要鼠标离开
                this.blur();
            }
        }
    }
}
new Tab('#tab')