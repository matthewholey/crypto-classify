$(document).ready(function() {
	$(".delete-link").click(function(e){
		e.preventDefault();
		$.ajax({
			method: "DELETE",
			url: $(this).attr("href")
		}).done(function(response){
			console.log("promise reached");
			window.location.href = "/boards";
		});
	});
});