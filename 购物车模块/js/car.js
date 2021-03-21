$(function() {
    //当点击全选按钮的时候下面的三个按钮和全选按钮选中
    $('.checkall').change(function() {
            // console.log($(this).prop('checked'));
            //当checked选中时true不选中时flase
            $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'))
                //当全选按钮选中的时候让下面的背景色变颜色
            if ($(this).prop('checked')) {
                //就让下面的所有加上背景色
                $('.cart-item').addClass('check-cart-item')
            } else {
                //反之就删除背景色
                $('.cart-item').removeClass('check-cart-item')

            }
        })
        // 当里面的选中数量发生改变的话 外面的全选按钮也发生改变
        // 当点击里面的按钮的时候
    $(".j-checkbox").change(function() {
            // if(全部被选中的话){
            //     就勾选全部前面的按钮
            // }else{
            //     就不勾选全部前面的按钮
            // }
            // j-checkbox:checked表示里面按钮变化的个数
            // 获取j-checkbox的长度为length
            //console.log($(".j-checkbox:checked").length);
            if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
                $('.checkall').prop('checked', true)
            } else {
                $('.checkall').prop('checked', false)

            }
            //如果点击了某一个选项 
            if ($(this).prop('checked')) {
                //就让当前加上背景色
                $(this).parents('.cart-item').addClass('check-cart-item')
            } else {
                //反之就删除背景色
                $(this).parents('.cart-item').removeClass('check-cart-item')

            }

        })
        //增减商品模块  首先声明一个变量 当点击+号的时候就让值++  然后赋值给变量
    $('.increment').click(function() {
            var n = $(this).siblings('.itxt').val()
                // console.log(n);
            n++;
            $(this).siblings('.itxt').val(n)
                //点击+号计算后面的小计
                //var p = $(this).parent().parent().siblings('.p-price').html()
                //可以将代码改成parents()
            var p = $(this).parents().siblings('.p-price').html()

            // console.log(p);
            //截取字符

            p = p.substr(1)
                //后面保存两位数
            var price = (p * n).toFixed(2)

            $(this).parents().siblings('.p-sum').html('￥' + price)
            getSum()
        })
        //当点击减号    就让值--  然后赋值给变量  最小等于1
    $('.decrement').click(function() {
            var n = $(this).siblings('.itxt').val()
                // console.log(n);
            if (n == 1) {
                return false
            }
            n--;
            $(this).siblings('.itxt').val(n)
                //点击-号计算后面的小计
            var p = $(this).parents().siblings('.p-price').html()
                // console.log(p);
                //截取字符
            p = p.substr(1)
            $(this).parents().siblings('.p-sum').html('￥' + (p * n).toFixed(2))
            getSum()
        })
        //当用户修改表单里面的数量时
        //当里面的数发生改变的时候就重新获取元素
    $('.itxt').change(function() {
            //先得到表单里面的值
            var n = $(this).val()
                //再得到商品的单价
            var p = $(this).parents().siblings('.p-price').html()
            p = p.substr(1)
            $(this).parents().siblings('.p-sum').html('￥' + (p * n).toFixed(2))
            getSum()
        })
        //计算总计和总额
        //先调用一次函数 让件数显示
    getSum()

    function getSum() {
        var count = 0 //计算总件数
        var money = 0 //计算总价钱
            //先得到件数
        $('.itxt').each(function(i, dom) {
                count += parseInt($(dom).val())
            })
            //然后将count的数值赋值给总件数
        $('.amount-sun em').text(count)

        //计算总价钱
        //先得到钱数
        $('.p-sum').each(function(i, dom) {
            money += parseFloat($(dom).text().substr(1))
        })
        $('.price-sun em').text('￥' + money.toFixed(2))
    }
    //删除商品模块
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove()
        getSum()
    })

    //删除选中商品模块
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove()
        getSum()
    })

    //清空购物车
    $('.clear-all').click(function() {
        $('.cart-item-list').remove()
        getSum()
    })

})