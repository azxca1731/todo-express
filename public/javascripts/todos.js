$(function() {
	$('[data-toggle="check"]').tooltip();
	$('[data-toggle="edit"]').tooltip();
	$('[data-toggle="trash"]').tooltip();
	$('[data-toggle="double"]').tooltip();
	$('[data-toggle="up"]').tooltip();
	$('[data-toggle="down"]').tooltip();
});

$('[data-toggle="edit"]').click(e => {
	console.log($(e.target).data("id"));
});
