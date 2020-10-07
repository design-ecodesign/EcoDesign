let cartReference = document.getElementById("cart-content");
let cartButton = document.getElementById("cart-button");
let cartBadge = document.getElementById("cart-badge");

var jsonData, cartCards = [];
var cart = new Set();
var previousCost = 0;
var numItems = 0;
var firstItemAdded = false;


function showToolTip() {
	let tooltip = document.createElement("div");
	tooltip.id = "cart-tooltip";
	tooltip.style = `
		display: none;
		width: 160px; height: 60px;
		position: absolute;
		bottom: 93px; right: 0;
	`;

	let tip = document.createElement("div");
	tip.id = "tip";
	tip.innerHTML = "Click to view cart."
	tip.style = `
		position: absolute;
		top: 0; left: 0;
		background-color: var(--eco-orange);
		border-radius: 10px;
		font-size: 18px;
		color: var(--eco-white);
		font-weight: 600;
		height: 45px;
		z-index: 51;
		padding: 5%;
	`;

	let tail = document.createElement("div");
	tail.id = "tail";
	tail.style = `
		position: absolute;
		left: 65%; bottom: 5px;
		background-color: var(--eco-orange);
		border: none; outline: none;
		transform: rotate(45deg);
		width: 20px; height: 20px;
		z-index: 50;
	`;

	tooltip.appendChild(tip);
	tooltip.appendChild(tail);

	cartButton.appendChild(tooltip);

	$("#cart-tooltip").fadeIn(500);
	$("#cart-tooltip").delay(1500).fadeOut(500);

	firstItemAdded = true;
}

function renderCart() {
	cartReference.innerHTML = "";

	var currentCost = 0;

	for (const card of cart) {
		cartReference.appendChild(card);
		currentCost += Number(
			card.children[1]
				.children[1]
				.innerHTML.replace(/[^0-9.-]+/g, "")
		);
	}

	if (!cart.size) {
		let placeholder = document.createElement("span");
		placeholder.id = "total-cost";
		placeholder.innerHTML = "Cart is empty";
		placeholder.style = `
			position: absolute;
			left: 37%; top: 45%;
			font-size: 20px;
			color: var(--eco-white);
		`;

		cartReference.appendChild(placeholder);
	} else {
		let totalCostElement = document.createElement("div");

		let cartFooter = document.createElement("div");

		cartFooter.style = `
			position: absolute;
			bottom: 14px;
			width: 97%;
		`;

		let denoter = document.createElement("div");
		denoter.innerHTML = "Total: $";
		denoter.className = "total-cost label";

		let cost = document.createElement("div");
		cost.className = "total-cost cost";
		cost.id = "total-cost-raw";
		cost.innerHTML = currentCost.toFixed(2);

		totalCostElement.appendChild(denoter);
		totalCostElement.appendChild(cost);

		let checkout = document.createElement("button");
		checkout.id = "go-to-checkout";
		checkout.innerHTML = "Go to checkout";

		cartFooter.appendChild(checkout);
		cartFooter.appendChild(document.createElement("hr"));
		cartFooter.appendChild(totalCostElement);

		cartReference.appendChild(cartFooter);

	}

	console.log(currentCost);
	if (currentCost != 0) {
		updateCost("total-cost-raw", previousCost, currentCost);
		updateBadge();
	}
	previousCost = currentCost;
}

function updateBadge() {
	cartBadge.style = `opacity: ${numItems > 0 ? "100%" : "0%"};`;
	cartBadge.innerHTML = cartReference.children.length - 1;
}

function removeFromCart(deleteThis) {
	cart.delete(deleteThis);
	numItems -= 1;
	renderCart();
	// updateBadge();
}

function clearCart() {
	cartReference.innerHTML = "";
	numItems = 0;
	renderCart();
	// updateBadge();
}

function updateCost(id, start, end) {
	if (start == end) {
		return;
	}
	var range = end - start;
	var current = start;
	var increment = end > start ? 1 : -1;
	var stepTime = Math.abs(Math.floor(300 / range));
	var obj = document.getElementById(id);
	var timer = setInterval(function() {
		current += increment;
		obj.innerHTML = current.toFixed(2);
		if (current == end) {
			clearInterval(timer);
		}
	}, stepTime);
}

function renderCartCard(productSpecs) {
	let card = document.createElement("div");
	card.className = "cart-card";
	card.id = productSpecs.Name.toLowerCase().replaceAll(" ", "-");

	const regex = /file[/]d[/](.+)[/]/;
	const fileID = productSpecs.Images[0].match(regex)[1];

	let image = document.createElement("img");
	image.className = "cart-card-thumbnail";
	image.src = `https://drive.google.com/uc?id=${fileID}&export=download`;

	let snippet = document.createElement("div");
	snippet.className = "card-column";

	let name = document.createElement("span");
	name.innerHTML = productSpecs.Name;
	name.className = "cart-card-name";

	let denoter = document.createElement("div");
	denoter.innerHTML = "Total: ";
	denoter.className = "cart-card-price";

	let price = document.createElement("span");
	price.innerHTML = productSpecs.Price;
	price.className = "cart-card-price";

	snippet.appendChild(name);
	snippet.appendChild(price);

	let remove = document.createElement("button");
	remove.className = `remover-button`;

	remove.onclick = function() {
		removeFromCart(card);
	};

	card.appendChild(image);
	card.appendChild(snippet);
	card.appendChild(remove);

	return card;
}


class ImageCarousel extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var images = [];
		var indicators = [];

		const regex = /file[/]d[/](.+)[/]/;
		const carouselID = `${this.props.itemName.toLowerCase().replaceAll(" ", "-")}-carousel`;

		for (const [i, url] of this.props.itemImages.entries()) {
			const fileID = url.match(regex)[1];

			images.push(
				<div className={`carousel-item ${i == 0 ? "active" : ""}`}>
					<img src={`https://drive.google.com/uc?id=${fileID}&export=download`}/>
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


class ProductContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isActive: this.props.isActive};
		this.addToCart = this.addToCart.bind(this);
	}

	changeFocus() {
		this.props.callbackFunction([this.props.productKey, this.state.isActive]);
		this.setState({isActive: !this.state.isActive});
	}

	addToCart() {
		cart.add(cartCards[Number(this.props.productKey)]);
		numItems += 1;
		renderCart();

		if (cartButton.value == "closed" && !firstItemAdded) {
			showToolTip();
			// firstItemAdded = true;
		}
	}

	render() {
		const regex = /file[/]d[/](.+)[/]/;
		const fileID = this.props.itemImages[0].match(regex)[1];
		const fileURL = `https://drive.google.com/uc?id=${fileID}&export=download`;
		const bullets = this.props.itemDescription.map(bullet => <li>{bullet}</li>);

		return (
			<div className="collapsible" style={this.props.style}>
				<input className="collapsing toggle" type="checkbox"
						onClick={() => this.changeFocus()}/>
				<div className="collapsing island">
					<div className="info maximized">{this.props.itemName}</div>

					<div className="columns">
						<ImageCarousel itemImages={this.props.itemImages} itemName={this.props.itemName}></ImageCarousel>
					</div>
					<div className="columns">
						{React.createElement("ul", {className: "description-bullets info"}, ...bullets)}
					</div>

					<div className="image center" src={fileURL} style={{background: `url(${fileURL})`}}></div>
					<div className="center info minimized name">{this.props.itemName}</div>
					<div className="center info minimized price">{this.props.itemPrice}</div>

					<button id={`add-${this.props.itemName.toLowerCase().replaceAll(" ", "-")}`}
							className="purchasing info"
							onClick={() => this.addToCart()}>
						Add to cart
					</button>

					<div className="purchasing">
						<div className="info price per">{`${this.props.itemPrice}`}</div>
						{/* <input type="number" className="info price multiplier" min="1" defaultValue="1"></input> */}
					</div>
				</div>
				<span className="carousel-control-prev-icon mock-check"></span>
			</div>
		);
	}
}

class Inventory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {active: -1};
		this.toggleInspectMode = this.toggleInspectMode.bind(this);

	}

	toggleInspectMode(activeKey) {
		if (activeKey[1] == false) {
			this.setState({active: activeKey[0]});
		} else {
			this.setState({active: -1});
		}
	}

	render() {
		var elements = [];

		for (const [i, product] of this.props.products.entries()) {
			const style = {};
			style["order"] = (i == this.state.active ? -1 : i);
			style["display"] = (this.state.active != -1 && style.order != -1 ? "none" : "inline-block");

			const item = <ProductContainer
				itemImages={product["Images"]}
				itemName={product["Name"]}
				itemPrice={product["Price"]}
				itemDescription={product["Description"]}
				productKey={i}
				callbackFunction={this.toggleInspectMode}
				style={style}
				isActive={i == this.state.active}
			></ProductContainer>

			elements.push(item);
		}

		return React.createElement("div", {id: "inventory"}, ...elements);
	}
}

(function () {
	document.cookie = "SameSite=None; Secure";

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			jsonData = JSON.parse(this.responseText);

			var inventory = <Inventory products={jsonData["Products"]}></Inventory>;
			cartCards = jsonData["Products"].map(product => renderCartCard(product));

			ReactDOM.render(inventory, document.getElementById("shopping"));
		}
	}

	xmlhttp.open("GET", "https://del.dog/raw/inventory-8-31-2020", true);
	// xmlhttp.open("GET", "assets/inventory-8-28-2020.json", true);

	xmlhttp.send();
	renderCart();
})();


function toggleCart() {
	var toggle = document.getElementById("cart-button");
	toggle.value = toggle.value  == "closed" ? "opened" : "closed";
}
