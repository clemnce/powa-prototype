/* jslint browser:true, white:true */
/* global $ */
$(function () {
  $('#contact-form input,#contact-form textarea').not('[type=submit]').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault() // prevent default submit behaviour

      // get values from FORM
      var email = $('#contact-email').val()
      var message = $('#contact-message').val()
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
          $('#contact-success').html("<div class='alert alert-success'>")
          $('#contact-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>')
          $('#contact-success > .alert-success')
            .append('<strong>Votre message a été envoyé !</strong>')
          $('#contact-success > .alert-success')
            .append('</div>')

          // clear all fields
          $('#contact-form').trigger('reset')
        },
        error: function () {
          // Fail message
          $('#contact-success').html("<div class='alert alert-danger'>")
          $('#contact-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>')
          $('#contact-success > .alert-danger').append('<strong>Désolé, apparemment le serveur mail ne répond pas. Veuillez ré-essayer plus tard !')
          $('#contact-success > .alert-danger').append('</div>')
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
