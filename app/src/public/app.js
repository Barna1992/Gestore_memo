$(function () {



  $('#visualizzaMemo').on('click', function () {
    $.ajax({
      url: '/memorie',
      success: function(memorie) {
        var tbody = $('tbody');
        tbody.html('');
        memorie.forEach(function(memoria){
        tbody.append(`
          <tr>
          <td class="numero">${memoria.numero}</td>
          <td>
          <input type="text" class="testo" value="${memoria.testo}"/>
          </td>
          <td>
            <button class="bottone-modifica">Modifica</button>
            <button class="bottone-elimina">Elimina</button>
          </td>
          </tr>
          `);
        })
      }

    })

  })


  $('#nascondiMemo').on('click', function () {
    $.ajax({
      url: '/memorie',
      success: function(memorie) {
        var tbody = $('tbody');
        tbody.html('');
      }
      })
  })

  $('#form').on('submit', function (e) {
    e.preventDefault();
    var newMemo = $('#newMemo');

    $.ajax({
      url:'/memorie',
      method:'POST',
      data: {
        testo : newMemo.val()
      },
      success: function(response) {
        $('#visualizzaMemo').click();

      }

    })
  });

  $('table').on('click', '.bottone-modifica', function () {
      let riga = $(this).closest('tr');
      let numero = riga.find('.numero').text();
      let testo = riga.find('.testo').val();

      $.ajax({
        url: '/memorie/'+ numero,
        method : 'PUT',

        data : {
          testo : testo
        },
  //      success: function (response) {
    //        console.log(response);
          success: function(response) {
          console.log(response);}
        })
      });


  $('table').on('click', '.bottone-elimina', function () {
    let riga = $(this).closest('tr');
    let numero = riga.find('.numero').text();

    $.ajax({
      url : '/memorie/'+ numero,
      method: 'DELETE',
      success: function(response){
        console.log(response);
      }

    })
    $('#visualizzaMemo').click();
  })

})
