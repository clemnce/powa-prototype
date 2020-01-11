/* jslint browser:true, white:true */
/* global $ */
$(function () {
  $('input,textarea').not('[type=submit]').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault() // prevent default submit behaviour

      // get values from FORM
      var email = $('#form-email').val()
      var message = $('#form-message').val()
      var today = new Date()

      // Check for white space in name for Success/Fail message
      $.ajax({
        url: 'https://hooks.zapier.com/hooks/catch/6467987/ohouzew/',
        type: 'POST',
        data: JSON.stringify({
          from: email,
          message: message,
          consent: today.toISOString()
        }),
        dataType: 'json',
        cache: false,
        success: function () {
          // Success message
          $('#success').html("<div class='alert alert-success'>")
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>')
          $('#success > .alert-success')
            .append('<strong>Votre message a été envoyé !</strong>')
          $('#success > .alert-success')
            .append('</div>')

          // clear all fields
          $('#contact-form').trigger('reset')
        },
        error: function () {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>")
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>')
          $('#success > .alert-danger').append('<strong>Désolé, apparemment le serveur mail ne répond pas. Veuillez ré-essayer plus tard !')
          $('#success > .alert-danger').append('</div>')
          // clear all fields
          $('#contact-form').trigger('reset')
        }
      })
    },
    filter: function () {
      return $(this).is(':visible')
    }
  })
})
