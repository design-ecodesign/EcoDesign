// https://www.instagram.com/design.ecodesign/?__a=1

var jsonData;
var instagramData = [];


// Because Bootstrap's carousel wasn't good enough
class PostCarousel extends React.Component {
	constructor(props) {
		super(props);
		// this.current = 0;
		this.state = {current: 2};
		this.switchView = this.switchView.bind(this);
	}

	switchView(direction) {
		// this.current += direction;
		this.setState({current: this.state.current+direction});

		// right now we only move one at a time (2 -> 3)
		// maybe in the future we can jump 2 -> 5 or something
		// if (direction == 0) {
		// 	return "nothing to do";
		// } else if (direction > 0) {
		// 	current--;
		// 	return true;
		// } else if (direction < 0) {
		// 	return false;
		// }
	}

	render() {
		console.log(`Rendering at position ${this.state.current}`);
		let children = [];
		children.push(
			<img className="arrow next" onClick={() => this.switchView(1)} src="assets/images/icons/arrow.png"/>
		);

		children.push(
			<img className="arrow back" onClick={() => this.switchView(-1)} src="assets/images/icons/arrow.png"/>
		);

		// console.log(this.props.content);
		for (const data of this.props.content) {
			// console.log(data);
			if (data[1]) {
				children.push(
					<video className="content" controls>
						<source src={data[0]}/>
					</video>
				);
			} else {
				let url = data[0];
				// console.log(url);
				children.push(
					<img className="content" src={url}/>
				);
			}
			// break;
		}

		return React.createElement("div", {className: "post-carousel"}, ...children);
	}
}

class InstagramPost extends React.Component {
	render() {
		return (
			<div className="instagram-post">
				<PostCarousel content={this.props.content}></PostCarousel>
				<span className="instagram-post-date">PLACEHOLDER</span>
			</div>
		);
	}
}

class InstagramViewport extends React.Component {
	render() {
		return React.createElement(
			"div",
			{className: "instagram-viewport"},
			...this.props.posts
		);
	}
}

(function () {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			jsonData = JSON.parse(this.responseText);
			jsonData.graphql.user.edge_owner_to_timeline_media.edges.slice(0,4).forEach(element => {
				let urls = element.node.edge_sidecar_to_children.edges.map(_e => {
					if (_e.node.is_video) {
						return [_e.node.video_url, true];
					} else {
						return [_e.node.display_url, false];
					}
				});
				// const postedOn = "";

				instagramData.push(
					<InstagramPost content={urls}></InstagramPost>
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
			ReactDOM.render(instagramViewport, document.getElementById('instagram-drop-point'))
		}
	};

	xmlhttp.open("GET", "https://www.instagram.com/design.ecodesign/?__a=1", true);
	xmlhttp.send();
})();
