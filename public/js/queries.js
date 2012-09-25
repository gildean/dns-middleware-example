$(function () {
    "use strict";
    var queryform = $('#queryform'),
    	query = $('input[name=query]'),
    	queryType = $('select[name=type]'),
    	queryServer = $('input[name=server]'),
        output = $('#queryoutput'),
        status = $('#status'),
        lookuptime = $('#lookuptime');

	queryform.submit(function (e) {
		e.preventDefault();
		output.html('');
		status.text('Resolving!');
		if (query.val()) {

		    $.post('/', {query: query.val(), type: queryType.val() || 'A', server: queryServer.val() || '8.8.8.8'}, function(data) {
		    	var obj = JSON.parse(data),
		    	i;
		    	status.text('Answer:');
		    	if (obj.answer.length === 0) {
		    		output.append('<p>No record found!</p>');
		    	} else {
		    		for (i =  0; i < obj.answer.length; i += 1) {
		    			output.append('<div class="resultbox" id="result' + i + '">');
		    			var resultBox = $('#result' + i);
				    	$.each(obj.answer[i], function(key, element) {
				    		var filterResult = key.toString();
				    		if (!(filterResult === 'type' || filterResult === 'class')) {
				    			resultBox.append('<p>' + key + ': ' + element + '</p>');
				    		}
						});
		    		};
		    	}
			    lookuptime.text('Lookup time: ' + obj.time + 'ms');
		    });
		} else { 
			status.text('Enter a query first!');
			return false;
		}
	});

});
