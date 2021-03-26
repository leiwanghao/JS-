$(function() {
    load();
    // 按了回车
    $('#title').on('keydown', function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === '') {
                alert('请输入操作')
            } else {
                //读取本地存储的数据
                var local = getDate()
                console.log(local);
                // 2.把local数组进行更新数据,把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false })
                    //把这个数组local  存给本地存储
                saveDate(local)
                    //渲染加载数据
                load();
                $(this).val('')
            }
        }

    })

    // 3.删除数据
    $('ol,ul').on('click', 'a', function() {
        //先获取本地数据
        var data = getDate()
            //修改数据   在遍历数组添加 i
        var index = $(this).attr('id')
        console.log(index);
        //删除数据可以用splice(第几个,删几个)
        data.splice(index, 1)
            //保存本地存储
        saveDate(data)
            //重新渲染页面
        load()
    })


    //4.正在进行和已完成选项
    $('ol,ul').on('click', 'input', function() {
        //先获取本地数据
        var data = getDate()

        //修改数据
        //可以获取他兄弟a的索引号
        var index = $(this).siblings('a').attr('id')
        data[index].done = $(this).prop('checked')
        console.log(data);
        //保存到本地存储
        saveDate(data)
            //重新渲染页面
        load()
    })


    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem('todolist')
        if (data !== null) {
            //本地存储里面的值是字符串格式的,但是我们需要的是对象格式
            return JSON.parse(data);
        } else {
            return []
        }
    }

    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data))
    }

    //渲染加载数据
    function load() {
        //读取本地数据
        var data = getDate()
            //遍历数组之前要先清空ol里面的数据

        $('ol,ul').empty()
            //定义个数
        var todocount = 0;
        var donecount = 0;
        //遍历这个数据

        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p></input><a href='javascript:;' id=" + i + "></a></li>")
                donecount++
            } else {
                $('ol').prepend("<li><input type='checkbox'><p>" + n.title + "</p></input><a href='javascript:;' id=" + i + "></a></li>")
                todocount++
            }

        })
        $('#todocount').text(todocount)
        $('#donecount').text(donecount)

    }

})