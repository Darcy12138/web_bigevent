$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
        console.log(111);
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {

        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        axios({
            method: 'POST',
            url: '/api/reguser',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: `username=${$('#form_reg [name=username]').val()}&password=${$('#form_reg [name=password]').val()}`
        }).then(function(res) {
            console.log(res);
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }

            layer.msg('注册成功,请登录')
                //模拟人的行为
            $('#link_login').click()
        })
    })

    //登录表单的提交
    $('#form_login').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()
        axios({
            method: 'POST',
            url: '/api/login',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: `${$(this).serialize()}`
        }).then(function(res) {
            console.log(res);
            if (res.data.status !== 0) {
                return layer.msg('登录失败')
            }
            layer.msg('登陆成功')
                //将登陆得到的 token 字符串, 保存到localStorage中
            localStorage.setItem('token', res.data.token)
                //跳转到后台主页
            location.href = '/index.html'
        })
    })
})