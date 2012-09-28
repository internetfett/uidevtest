$(document).ready(function() {
    /*
    * Parse GET querystring
    */
    var storyId = '';
    var querystring = window.location.search.replace('?', '');
    var pairs = querystring.split('&');
    $.each(pairs, function(key, item) {
        var pair = item.split('=');
        if(pair[0]=='story' && pair[1]) storyId = pair[1];
    });
    
    // Import data
    $.getJSON('../js/uidevtest-data.js', function(data) {
        if(storyId) {
            // Render story view
        } else {
            // Render story list view
            var html = '';
            $.each(data.objects, function(key, item) {
                console.log(item);
                item.pub_date = new Date(item.pub_date).format("h:MM t dddd, mmm. d, yyyy");
                item.updated = new Date(item.updated).format("h:MM t dddd, mmm. d, yyyy");
                var template = $('#storyListItem').html();
                html += Mustache.to_html(template, item);
            });
            $('#content').html(html);
        }
    });
});
