const lightColors = {
	"wallpaper": "#c8ffc8",

	"red": "#f32c61",
	"green": "#71c79c",
	"orange": "#f88a6c",
	"blue": "#6495ed",
	"white": "#f0fff0",

	"dark_red": "#c70c3e",
	"dark_green": "#42986e",
	"dark_orange": "#ce6244",
	"dark_blue": "#2164df",
	"dark_white": "#dce9e9",

	"darker-than-back": "#00000030",
	"lighter-than-back": "#ffffff30"
};

const darkColors = {
	"wallpaper": "#383838",

	"red": "#f32c61",
	"green": "#4d8468",
	"orange": "#f55023",
	"blue": "#6495ed",
	"white": "#f0fff0",

	"dark_red": "#c70c3e",
	"dark_green": "#4f6d5e",
	"dark_orange": "#ca5c3f",
	"dark_blue": "#2164df",
	"dark_white": "#dce9e9",

	"darker-than-back": "#ffffff30",
	"lighter-than-back": "#00000030"
}

document.body.style = `
	--eco-wallpaper: ${lightColors.wallpaper};
	--eco-red: ${lightColors.red};
	--eco-orange: ${lightColors.orange};
	--eco-green: ${lightColors.green};
	--eco-blue: ${lightColors.blue};
	--eco-white: ${lightColors.white};

	--eco-dark-red: ${lightColors.dark_red};
	--eco-dark-orange: ${lightColors.dark_orange};
	--eco-dark-green: ${lightColors.dark_green};
	--eco-dark-blue: ${lightColors.dark_blue};
	--eco-dark-white: ${lightColors.dark_white};
`;


function reloadCSS() {
	$("link").each(function() {
		if ($(this).attr("rel") == "stylesheet") {
			if ($(this).attr("href").startsWith("assets")) {
				$(this).attr("href", $(this).attr("href") + "?id=" + new Date().getMilliseconds());
				console.log(`Reloaded ${$(this).attr("href")}`);
			}
		}
	});

	return true;
}

let themeSwitch = document.getElementById('reload-css');

themeSwitch.addEventListener(
	"click",
	() => {
		var colorSpace;
		switch (themeSwitch.className) {
			case "dark":
				themeSwitch.firstElementChild.src = "assets/images/icons/dark-mode.png";
				themeSwitch.className = "light";
				colorSpace = lightColors;
				break;
			case "light":
				themeSwitch.firstElementChild.src = "assets/images/icons/light-mode.png";
				themeSwitch.className = "dark";
				themeSwitch.style.boxShadow = "1px 1px 3px white";
				colorSpace = darkColors;
				break;
		}

		document.body.style = `
			--eco-wallpaper: ${colorSpace.wallpaper};
			--eco-red: ${colorSpace.red};
			--eco-orange: ${colorSpace.orange};
			--eco-green: ${colorSpace.green};
			--eco-blue: ${colorSpace.blue};
			--eco-white: ${colorSpace.white};

			--eco-dark-red: ${colorSpace.dark_red};
			--eco-dark-orange: ${colorSpace.dark_orange};
			--eco-dark-green: ${colorSpace.dark_green};
			--eco-dark-blue: ${colorSpace.dark_blue};
			--eco-dark-white: ${colorSpace.dark_white};
		`;
	}
);
