$(document).ready(function () {
    $('#btn_buscar').click(()=>{
        var search = $('#search').val();

        console.log(search);
        $.ajax({
            url: `https://api.github.com/users/${search}`,
            beforeSend: function (){
                $('#info').css({
                    "display": "block"
                })
            }
        })
        .done((dados)=>{
            $('#info').css({
                "display": "none"
            });
            $('#msgErro').css({
                "display": "none"
            });
            $('#img_avatar').attr('src', dados['avatar_url']);

            var dataCriacao = new Date(dados['created_at']);
            var dataCriacaoFormatada = ("0" + dataCriacao.getDate()).substr(-2) + "/" 
                + ("0" + (dataCriacao.getMonth() + 1)).substr(-2) + "/" + dataCriacao.getFullYear();

            var dataUpdate = new Date(dados['updated_at']);
            var dataUpdateFormatada = ("0" + dataUpdate.getDate()).substr(-2) + "/" 
            + ("0" + (dataUpdate.getMonth() + 1)).substr(-2) + "/" + dataUpdate.getFullYear();

            $('#name').text(dados['name']);
            $('#login').text(dados['login']);
            $('#url').attr('href', dados['url']);
            $('#url').text(dados['url']);            
            $('#location').text(dados['location']);
            $('#public_repos').text(dados['public_repos']);
            $('#created_at').text(dataCriacaoFormatada);
            $('#updated_at').text(dataUpdateFormatada);

        })
        .fail(function (jqXHR, textStatus, msg){
            var msgErrorAux = $('#msgErro').text();
            var msgError = msgErrorAux+` ${jqXHR['status']}`;
            $('#info').css({
                "display": "none"
            });
            $('#msgErro').css({
                "display": "block"
            });
            $('#msgErro').text(msgError);
        });
    });
});