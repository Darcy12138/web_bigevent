$(function() {
    axios({
        method: 'GET',
        url: '/my/userinfo',
        headers: { Authorization: localStorage.getItem('token') || '' },
    }).then(function(res) {
        console.log(res);
    })
})