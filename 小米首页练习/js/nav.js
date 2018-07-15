$(function() {
	$(".nav li").mouseover(function() {
		var index = $(this).index();
		$(".child .child-item").hide().eq(index).show();
	}).mouseout(function() {
		$(".child .child-item").hide();
	});

	$(".child .child-item").mouseover(
		function() {
			$(this).show();
		}
	).mouseout(
		function() {
			$(this).hide();
		}
	);

});