$(function() {
    //当我们鼠标点击li的时候  不需要触发滑动 此时需要用到节流阀
    var flag = true;
    //屏幕经过显示旁边的
    var toolTop = $(".recom").offset().top;
    //加载页面的时候就调用这个函数
    ToggleTool()
        //封装一个函数 调用这个函数
    function ToggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();

        }
    }
    $(window).scroll(function() {
        //当鼠标滑动时调用函数
        ToggleTool()
            //当鼠标滑动到某个位置让某个位置的颜色变换
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass()
                }
            })
        }

    })

    //鼠标点击事件
    $('.fixedtool li').click(function() {
        flag = false
            //先获取他的索引号
            // console.log($(this).index());
            //当鼠标点击哪个索引号就显示哪个
        var current = $('.floor .w').eq($(this).index()).offset().top;
        //页面滚动效果
        $('body,html').stop().animate({
                scrollTop: current
            }, function() {
                flag = true

            })
            //当鼠标点击某个模块变换背景色
        $(this).addClass('current').siblings().removeClass()
    })
})