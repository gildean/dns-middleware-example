$(function () {
    "use strict";
    var queryform = $('#queryform'),
    	query = $('input[name=query]'),
    	queryType = $('select[name=type]'),
    	queryServer = $('input[name=server]'),
        output = $('#queryoutput'),
        lookuptime = $('#lookuptime'),
        header = $('#header'),
        help = $('#help'),
        helper = $('#helper'),
        title = $('#pagetitle'),
        tooltip = $('#tooltip'),
        inputelement = $('.inputelement');
        
    helper.fadeOut(2500, function () {
	    $(this).text('');
    });

   	inputelement.hover(
    	function () {
    		var helptext = $(this).attr('name');
	    	if (helptext === 'server' || helptext === 'type') {
	    		helper.fadeOut(200, function () {
	    			$(this).text('Input ' + helptext + ' here').fadeIn(200);	
	    		});
	    	} else {
	    		helper.fadeOut(200, function () {
	    			$(this).text('Input ' + helptext + ' here (required)').fadeIn(200);
	    		});
	    	}
       	},
       	function () {
			helper.fadeOut(500, function () {
	    			$(this).text('').fadeIn(200);
       		});
		}
    );

	queryform.submit(function (e) {
		e.preventDefault();
		output.fadeOut(500).html('').fadeIn(100);
		helper.fadeOut(200, function() {
			$(this).text('Resolving!').fadeIn(200, function() {
				if (query.val()) {
				    $.post('/', {query: query.val(), type: queryType.val() || 'A', server: queryServer.val() || '8.8.8.8'}, function(data) {
				    	var obj = JSON.parse(data),
				    	i;
				    	console.log(obj);
				    	helper.fadeOut(200, function () {
				    		$(this).text('Answer:');
				    		$(this).fadeIn(200, function() {
						    	if (obj.answer.length === 0) {
						    		output.append('<p>No record found!</p>').hide().fadeIn(500);
						    	} else {
						    		for (i =  0; i < obj.answer.length; i += 1) {
						    			output.append('<div class="resultbox" id="result' + i + '">');
						    			var resultBox = $('#result' + i).hide().fadeIn(300);
								    	$.each(obj.answer[i], function(key, value) {
								    		var filterResult = key.toString();
								    		if (!(filterResult === 'type' || filterResult === 'class')) {
								    			resultBox.append('<p><span class="key">' + key + ':</span><span class="value"> ' + value + '</p>');
								    		}
						    			});
						    		};
						    	}
							    lookuptime.fadeOut(200, function () {
							    	$(this).text('Latency: ' + obj.time + 'ms').fadeIn(200);
							    });
				    		});
				    	});
				    });
				} else { 
					helper.fadeOut(300, function () {
						$(this).text('Enter a query first!').fadeIn(300);
						return false;
					});
				}
			});
		});
	});
});
