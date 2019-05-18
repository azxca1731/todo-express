$(function() {
	$('[data-toggle="check"]').tooltip();
	$('[data-toggle="edit"]').tooltip();
	$('[data-toggle="trash"]').tooltip();
	$('[data-toggle="double"]').tooltip();
	$('[data-toggle="up"]').tooltip();
	$('[data-toggle="down"]').tooltip();
	$("[data-check=true]").css("color", "green");
	$("[data-type=3]").css("background-color", "#F78181");
	$("[data-type=2]").css("background-color", "#F3F781");
	$("[data-over-date=true]").css("color", "red");
});
