function uploadData(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/uploads', true);
    xhr.setRequestHeader('Authorization', localStorage.getItem('authToken'));

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percent = Math.floor((e.loaded / e.total) * 100);
        console.log(percent);
      }
    }

    xhr.onerror = function(e) {
      console.log('Error ' + e);
    }

    xhr.onload = function() {
      console.log(this.statusText);
    }

    xhr.send(data)
}

//Event Handlers
function toggleSections() {
    $('.selection-header').click(function(event) {
        if ($(this).next('.upload-form-wrapper').is(':visible')) {
            $(this).children('.toggle-indicator').html('&#9660;');
            $(this).next('.upload-form-wrapper').slideUp();
            $(this)
        } else {
            $('.upload-form-wrapper').slideUp();
            $(this).children('.toggle-indicator').html('&#9650;');
            $(this).next('.upload-form-wrapper').slideDown();
        }
    });
}

function formSubmit() {
    $('.upload-form').submit(function(event) {
        event.preventDefault();
        var form = $(this)[0];
        var data = new FormData(this);
        console.log(data);
        uploadData(data);
    });
}

$(function() {
    // request checks that user is logged in
    $.ajax({
            type: 'GET',
            url: '/users/me',
            dataType: 'json',
            'headers': {
                'content-type': "application/json",
                'Authorization': localStorage.getItem('authToken')
            }
        })
        .done(function(data) {
            var currentUser = data.user
            $('.loader-wrapper').hide();
        })
        .fail(function(err) {
            window.location.href = '/login';
        });

    toggleSections();
    formSubmit();
    $('.upload-form-wrapper').hide();
});
