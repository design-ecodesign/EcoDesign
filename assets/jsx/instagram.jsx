// https://www.instagram.com/design.ecodesign/?__a=1

var jsonData;
var instagramData = [];

(function () {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			jsonData = JSON.parse(this.responseText);
			jsonData.graphql.user.edge_owner_to_timeline_media.edges.slice(0,4).forEach(element => {
				let display_urls = element.node.edge_sidecar_to_children.edges.map(_e => _e.node.display_url);

				instagramData.push(
					<div className="instagram-island">
						{/* <ImageCarousel itemImages={display_urls} itemName={element.node.shortcode}></ImageCarousel> */}
						<img src={display_urls[0]}></img>
					</div>
					// React.createElement(
					// 	"div", {className: "instagram-island"},
					// 	React.createElement(
					// 		ImageCarousel, {
					// 			itemImages: display_urls,
					// 			itemName: element.node.shortcode
					// 		}
					// 	)
					// )
				);
			});

			let instagramViewport = React.createElement("div", {className: "instagram-viewport"}, ...instagramData);
			ReactDOM.render(instagramViewport, document.getElementById('instagram-feed'))
		}
	};

	xmlhttp.open("GET", "https://www.instagram.com/design.ecodesign/?__a=1", true);
	xmlhttp.send();
})();
