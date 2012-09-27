$(function () {
    "use strict";
    var queryform = $('#queryform'),
    	query = $('input[name=query]'),
    	queryType = $('select[name=type]'),
    	queryServer = $('input[name=server]'),
        output = $('#queryoutput'),
        status = $('#status'),
        lookuptime = $('#lookuptime'),
        help = $('#help'),
        inputelement = $('.inputelement');
        
    $(document).ready(function () {
      	help.fadeOut(2500);
    });

   	$(inputelement).hover(
    	function () {
	    	var helptext = $(this).attr('name');
    		help.fadeOut(200, function () {	
	    		if (helptext === 'server' || helptext === 'type') {
	    			help.text('Input ' + helptext + ' here').fadeIn(300);	
	    		} else {
	    			help.text('Input ' + helptext + ' here (required)').fadeIn(300);
	    		}
    		});
       	},
    	function () {
    		help.fadeOut(200);
    	}
    );

	queryform.submit(function (e) {
		e.preventDefault();
		output.fadeOut(500).html('').fadeIn(100);
		status.fadeOut(200, function() {
			$(this).text('Resolving!').fadeIn(200, function() {
				if (query.val()) {
				    $.post('/', {query: query.val(), type: queryType.val() || 'A', server: queryServer.val() || '8.8.8.8'}, function(data) {
				    	var obj = JSON.parse(data),
				    	i;
				    	status.fadeOut(200, function () {
				    		$(this).text('Answer:');
				    		$(this).fadeIn(200, function() {
						    	if (obj.answer.length === 0) {
						    		output.append('<p>No record found!</p>').hide().fadeIn(500);
						    	} else {
						    		for (i =  0; i < obj.answer.length; i += 1) {
						    			output.append('<div class="resultbox" id="result' + i + '">');
						    			var resultBox = $('#result' + i).hide().fadeIn(300);
								    	$.each(obj.answer[i], function(key, element) {
								    		var filterResult = key.toString();
								    		if (!(filterResult === 'type' || filterResult === 'class')) {
								    			resultBox.append('<p>' + key + ': ' + element + '</p>');
								    		}
						    			});
						    		};
						    	}
							    lookuptime.fadeOut(200, function () {
							    	$(this).text('Lookup time: ' + obj.time + 'ms').fadeIn(200);
							    });
				    		});
				    	});
				    });
				} else { 
					status.fadeOut(300, function () {
						$(this).text('Enter a query first!').fadeIn(300);
						return false;
					});
				}
			});
		});
	});
});
