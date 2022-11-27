
$(function () {
  $(".page-alert").hide();
  //Show alert
  $('button[data-toggle="page-alert"]').click(function (e) {
    e.preventDefault();
    var id = $(this).attr("data-toggle-id");
    var alert = $("#alert-" + id);
    var timeOut;
    alert.appendTo(".page-alerts");
    alert.slideDown();

    //Is autoclosing alert
    var delay = $(this).attr("data-delay");
    if (delay != undefined) {
      delay = parseInt(delay);
      clearTimeout(timeOut);
      timeOut = window.setTimeout(function () {
        alert.slideUp();
      }, delay);
    }
  });

  //Close alert
  $(".page-alert .close").click(function (e) {
    e.preventDefault();
    $(this).closest(".page-alert").slideUp();
  });

  //Clear all
  $(".clear-page-alerts").click(function (e) {
    e.preventDefault();
    $(".page-alert").slideUp();
  });
});

// suceesss end






// Dynamically add-on fields

$(function() {
    // Remove button click
    $(document).on(
        'click',
        '[data-role="appendRow"] > .form-inline [data-role="remove"]',
        function(e) {
            e.preventDefault();
            $(this).closest('.form-row').remove();
        }
    );
    // Add button click
    $(document).on(
        'click',
        '[data-role="appendRow"] > .form-row [data-role="add"]',
        function(e) {
            e.preventDefault();
            var container = $(this).closest('[data-role="appendRow"]');
            new_field_group = container.children().filter('.form-row:first-child').clone();
          new_field_group.find('label').html('Upload Document'); new_field_group.find('input').each(function(){
                $(this).val('');
            });
            container.append(new_field_group);
        }
    );
});


// file upload

$(document).on('change', '.file-upload', function(){
  var i = $(this).prev('label').clone();
  var file = this.files[0].name;
  $(this).prev('label').text(file);
});
