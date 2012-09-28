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
        var html = '';
        if(storyId) {
            // Render story view
            storyId = parseInt(storyId.replace(/\D/g,''));
            var story = data.objects[storyId-1];
            story.pub_date = new Date(story.pub_date).format("h:MM t dddd, mmm. d, yyyy");
            story.updated = new Date(story.updated).format("h:MM t dddd, mmm. d, yyyy");
            var template = $('#storyItem').html();
            html = Mustache.to_html(template, story);
        } else {
            // Render story list view
            $.each(data.objects, function(key, item) {
                item.pub_date = new Date(item.pub_date).format("h:MM t dddd, mmm. d, yyyy");
                item.updated = new Date(item.updated).format("h:MM t dddd, mmm. d, yyyy");
                var template = $('#storyListItem').html();
                html += Mustache.to_html(template, item);
            });
        }
        $('#content').html(html);
    });
});
