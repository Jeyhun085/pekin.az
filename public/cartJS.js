
console.log(Cookies.get());

function calc_total() {
    var sum = 0;
    $(".total").each(function () {
        sum += parseFloat($(this).text());
    });
    $('#sum').text(sum);
}



$(".inputQTY").on('change', function () {
    var parent = $(this).closest('tr');
    var price = parseFloat($('.price', parent).text());
    var inputQTY = parseFloat($('.inputQTY', parent).val());
    var article = $('.article', parent).text().trim();
    Cookies.set(article, inputQTY,{ expires: 7 })

    $('.total', parent).text(inputQTY * price);

    calc_total();
});




$(".total").each(function () {
    var parent = $(this).closest('tr');
    var price = parseFloat($('.price', parent).text());
    var inputQTY = parseFloat($('.inputQTY', parent).val());

    $('.total', parent).text(inputQTY * price);

    calc_total();
});


$(".delete").on('click', function () {
    var parent = $(this).closest('tr');
    var article = $('.article', parent).text().trim();
    console.log(article);
    Cookies.remove(article)
    location.reload();
});



(function () {
    'use strict'
  
    window.addEventListener('load', function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    }, false)
  }())