// https://www.instagram.com/design.ecodesign/?__a=1

var jsonData;
var instagramData = [];


// Because Bootstrap's carousel wasn't good enough
class InstagramPostCarousel extends React.Component {
	render() {
		let children = [];
		// children.push();
		// children.push();

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
	constructor(props) {
		super(props);
		this.state = {current: 0};
		this.content = this.props.content;
		this.switchView = this.switchView.bind(this);
	}

	switchView(direction) {
		if (direction == -1) {
			// this.content = this.content.concat(this.content.splice(0,1));
			return false;
		} else if (direction == 1) {
			return true;
			// this.content = this.content.concat(this.content.splice(0,1));
		}
		this.setState({current: this.state.current + direction});
	}

	render() {
		console.log(`Rendering at position ${this.state.current} of ${this.props.content.length}`);
		return (
			<div className="instagram-post">
				<img className="arrow next" onClick={() => this.switchView(1)} src="assets/images/icons/arrow.png"/>
				<img className="arrow back" onClick={() => this.switchView(-1)} src="assets/images/icons/arrow.png"/>
				<InstagramPostCarousel content={this.props.content}></InstagramPostCarousel>
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
				);
			});

			let instagramViewport = React.createElement("div", {className: "instagram-viewport"}, ...instagramData);
			ReactDOM.render(instagramViewport, document.getElementById('instagram-drop-point'))
		}
	};

	xmlhttp.open("GET", "https://www.instagram.com/design.ecodesign/?__a=1", true);
	xmlhttp.send();
})();
