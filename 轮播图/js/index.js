window.addEventListener('load', function() {
    //1.鼠标经过focus两边的按钮显示   离开就不显示
    //获取元素
    var arrow_l = document.querySelector('.arrow_l')
    var arrow_R = document.querySelector('.arrow_R')
    var focus = document.querySelector('.focus')
    var focusWidth = focus.offsetWidth

    //鼠标经过
    focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block'
            arrow_R.style.display = 'block'
            clearInterval(timer)
            timer = null
        })
        //鼠标离开
    focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none'
            arrow_R.style.display = 'none'
            timer = setInterval(function() {
                arrow_R.click()
            }, 2000)
        })
        // 2.动态生成小圆圈   有几个图片  就有一个小圆圈
        //获取变量
    var ul = focus.querySelector('ul')
        //创建要添加的元素节点
    var ol = focus.querySelector('.circle')
        // ul.children.length  就是li的多少
        //3.for循环输出ol里面li的数量
    for (i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = document.createElement('li')
            //记录当前li的索引号  通过自定义属性来完成
        li.setAttribute('index', i)
            //添加节点
        ol.appendChild(li)
            //4.小圆圈的排他思想   在绑定事件是同时就直接绑定点击事件
        li.addEventListener('click', function() {
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            this.className = 'current'
                //5.点击第几个li就切换到第几个图片  首先要获取li的索引号
                //ul 移动的距离就是  li的索引号乘以focus的宽度
                //获取当前li的索引号
            var index = this.getAttribute('index')
                //当我们点击了某一个li就把这个li的索引号给num
            num = index
                //当我们点击了某一个li就把这个li的索引号给circle
            circle = index
            animate(ul, -index * focusWidth)
        })
    }
    //把小圆圈里面的其中一个li类名变换为current
    ol.children[0].className = 'current'
        //6.克隆第一张图片，将第一个图片放到最后
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)
        //7.鼠标点击右侧按钮  图片滚动一次
    var num = 0;
    //circle控制小圆圈的变化
    var circle = 0
        //创建节流阀
    var flag = true
    arrow_R.addEventListener('click', function() {
            //如果图片走都最后一张图片   此时 我们就要将ul迅速复原   left等于0
            if (flag) {
                flag = false
                if (num == ul.children.length - 1) {
                    ul.style.left = 0
                    num = 0
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                        flag = true
                    })
                    //点击右侧按钮  小圆圈会一起变化  可以在声明一个小圆圈的变量
                circle++;
                //如果小圆圈走到克隆的图片   我们就复原
                if (circle == ol.children.length) {
                    ul.style.left = 0
                    circle = 0
                }
                circleChange()
            }

        })
        //左侧按钮

    arrow_l.addEventListener('click', function() {
        //如果图片走都最后一张图片   此时 我们就要将ul迅速复原   left等于0
        if (flag) {
            flag = false
            if (num == 0) {
                num = ul.children.length - 1
                ul.style.left = -num * focusWidth + 'px'

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                    flag = true
                })
                //点击右侧按钮  小圆圈会一起变化  可以在声明一个小圆圈的变量
            circle--;
            //如果小圆圈走到克隆的图片   我们就复原
            if (circle < 0) {
                circle = ol.children.length - 1
            }
            circleChange()
        }
    })

    function circleChange() {
        //先消除所有的变量
        for (i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        //留下当前小圆圈的current名
        ol.children[circle].className = 'current'

    }
    //自动播放轮播图
    var timer = setInterval(function() {
        arrow_R.click()
    }, 2000)
})