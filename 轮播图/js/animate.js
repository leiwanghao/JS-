function animate(obj, target, callback) {
    //利用定时器移动div
    //当我们一直点按钮的时候红色盒子会一直加速   因为开了太多加速器了
    //解决方案就是让我们元素只有一个定时器
    //先清除定时器  再保留这一个定时器
    clearInterval(obj.timer)

    obj.timer = setInterval(function() {
        //缓动动画的公式是（目标值-现在的位置） / 10
        //现在的step里面是小数  要给它取整
        //800返回500的时候返回的不是整值 所以要把它往小了取
        var step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
            //停止定时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
                // 回调函数写到定时器结束里面
            if (callback) {
                // 调用函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px'


    }, 15)
}