// https://www.instagram.com/design.ecodesign/?__a=1

var jsonData;
var instagramData = [];

class ImageCarousel extends React.Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		var images = [];
		var indicators = [];

		// const regex = /file[/]d[/](.+)[/]/;
		const carouselID = `${this.props.itemName.toLowerCase().replaceAll(" ", "-")}-carousel`;

		for (const [i, url] of this.props.itemImages.entries()) {
			// const fileID = url.match(regex)[1];

			images.push(
				<div className={`carousel-item ${i == 0 ? "active" : ""}`}>
					<img src={url}/>
				</div>
			);

			indicators.push(
				<li data-target={carouselID}
					data-slide-to={`${i}`}
					className={`${i == 0 ? "active" : ""}`}>
				</li>
			);
		}

		const carouselContents = React.createElement("div", {className: "carousel-inner"}, ...images);
		const carouselIndicators = React.createElement("ul", {className: "carousel-indicators"}, ...indicators);

		return (
			<div id={carouselID} className="carousel slide" data-ride="carousel">
				{carouselIndicators}
				{carouselContents}
				<a className="carousel-control-prev" href={`#${carouselID}`} data-slide="prev">
					<span className="carousel-control-prev-icon"></span>
				</a>
				<a className="carousel-control-next" href={`#${carouselID}`} data-slide="next">
					<span className="carousel-control-next-icon"></span>
				</a>
			</div>
		);
	}
}

(function () {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			jsonData = JSON.parse(this.responseText);
			// console.log(
			// 	jsonData.graphql
			// 			.user.edge_owner_to_timeline_media
			// 			.edges[0].node
			// 			.display_url
			// );

			jsonData.graphql.user.edge_owner_to_timeline_media.edges.forEach(element => {
				instagramData.push(element.node.display_url);
			});
		}
	}

	xmlhttp.open("GET", "https://www.instagram.com/design.ecodesign/?__a=1", true);
	xmlhttp.send();

	console.log(instagramData);
})();
