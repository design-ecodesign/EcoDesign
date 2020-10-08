// https://www.instagram.com/design.ecodesign/?__a=1

var jsonData;
var instagramData = [];

	(function () {
	// document.cookie = "SameSite=None; Secure";

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			jsonData = JSON.parse(this.responseText);
			console.log(
				jsonData.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url
			);
		}
	}

	xmlhttp.open("GET", "https://www.instagram.com/design.ecodesign/?__a=1", true);
	xmlhttp.send();


	// for (const node in jsonData.graphql.user.edge_owner_to_timeline_media.edges)
})();
