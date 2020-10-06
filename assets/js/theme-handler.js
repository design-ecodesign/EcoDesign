const lightColors = {
	"eco-wallpaper": "#c8ffc8",

	"eco-red": "#f32c61",
	"eco-green": "#71c79c",
	"eco-orange": "#f88a6c",
	"eco-blue": "#6495ed",
	"eco-white": "#f0fff0",

	"eco-dark-red": "#c70c3e",
	"eco-dark-green": "#42986e",
	"eco-dark-orange": "#ce6244",
	"eco-dark-blue": "#2164df",
	"eco-dark-white": "#dce9e9",

	"darker-than-back": "#00000030",
	"lighter-than-back": "#ffffff30"
};

const darkColors = {
	"eco-wallpaper": "#c8ffc8",

	"eco-red": "#f32c61",
	"eco-green": "#71c79c",
	"eco-orange": "#f88a6c",
	"eco-blue": "#6495ed",
	"eco-white": "#f0fff0",

	"eco-dark-red": "#c70c3e",
	"eco-dark-green": "#42986e",
	"eco-dark-orange": "#ce6244",
	"eco-dark-blue": "#2164df",
	"eco-dark-white": "#dce9e9",

	"darker-than-back": "#00000030",
	"lighter-than-back": "#ffffff30"
}

const colorPairs = {
	"wallpaper": ["#c8ffc8", "#282828"],
	"red": ["#f32c61", "#c70c3e"], 
	"green": ["#71c79c", "#21533a"],
	"blue": ["#6495ed", "#2164df"],
	"orange": ["#f88a6c", "#f55023"],
	"white": ["#f0fff0", "#dce9e9"]
}

// console.log(document.styleSheets);

function reloadCSS() {
	$("link").each(function() {
		if ($(this).attr("rel") == "stylesheet") {
			if ($(this).attr("href").startsWith("assets")) {
				$(this).attr("href", $(this).attr("href") + "?id=" + new Date().getMilliseconds());
				console.log(`Reloaded ${$(this).attr("href")}`);
			}
		}
	});
}

let themeSwitch = document.getElementById('reload-css');
// console.log(themeSwitch.firstElementChild);
// console.log(themeSwitch.style);

themeSwitch.addEventListener(
	"click",
	() => {
		console.log(themeSwitch.className);
		const mode = themeSwitch.className == "light";
		document.body.style = `
			--eco-wallpaper: ${colorPairs.wallpaper[Number(mode)]} !important;
			--eco-red: ${colorPairs.red[Number(mode)]} !important;
			--eco-orange: ${colorPairs.orange[Number(mode)]} !important;
			--eco-green: ${colorPairs.green[Number(mode)]} !important;
			--eco-blue: ${colorPairs.blue[Number(mode)]} !important;
			--eco-white: ${colorPairs.white[Number(mode)]} !important;

			--eco-dark-red: ${colorPairs.red[Number(!mode)]} !important;
			--eco-dark-orange: ${colorPairs.orange[Number(!mode)]} !important;
			--eco-dark-green: ${colorPairs.green[Number(!mode)]} !important;
			--eco-dark-blue: ${colorPairs.blue[Number(!mode)]} !important;
			--eco-dark-white: ${colorPairs.white[Number(!mode)]} !important;
		`;
		switch (themeSwitch.className) {
			case "dark":
				console.log("Is dark, switch to light");
				themeSwitch.firstElementChild.src = "assets/images/icons/dark-mode.png";
				themeSwitch.className = "light";
				break;
			case "light":
				console.log("Is light, switch to dark");
				themeSwitch.firstElementChild.src = "assets/images/icons/light-mode.png";
				themeSwitch.className = "dark";
				themeSwitch.style.boxShadow = "1px 1px 3px white";
				break;
		}
		// console.log(themeSwitch.firstElementChild);
		// reloadCSS();
	}
);

console.log("Loaded theme engine");
