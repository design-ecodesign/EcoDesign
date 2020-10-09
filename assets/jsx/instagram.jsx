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
		for (const [i, data] of this.props.content.entries()) {
			// console.log(data);
			if (data[1]) {
				children.push(
					<video muted style={{display: i == this.props.activeView ? "inline-block" : "none"}} className="content" controls>
						<source src={data[0]}/>
					</video>
				);
			} else {
				// let url = data[0];
				// console.log(url);
				children.push(
					<img style={{display: i == this.props.activeView ? "inline-block" : "none"}} className="content" src={data[0]}/>
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
		// this.content = this.props.content;
		this.switchView = this.switchView.bind(this);
	}

	switchView(direction) {
		console.log(`Rendering at position ${this.state.current} of ${this.props.content.length}`);
		if (direction == -1) {
			if (this.state.current == 0) {
				// console.log("r u dumb");
				return;
			}
			// this.content = this.content.slice(0,1).concat(this.content.slice(1, this.content.length));
			// return false;
		} else if (direction == 1) {
			if (this.state.current == this.props.content.length-1) {
				// console.log("r u dumb");
				return;
			}
			// this.content = this.content.slice(this.content.length-1,this.content.length).concat(0, this.content.length-1);
			// return true;
		}
		this.setState({current: this.state.current + direction});
	}

	render() {
		return (
			<div className="instagram-post">
				<img className="arrow next" onClick={() => this.switchView(1)} src="assets/images/icons/arrow.png"/>
				<img className="arrow back" onClick={() => this.switchView(-1)} src="assets/images/icons/arrow.png"/>
				<InstagramPostCarousel activeView={this.state.current} content={this.props.content}></InstagramPostCarousel>
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
