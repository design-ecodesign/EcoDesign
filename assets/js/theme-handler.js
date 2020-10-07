const lightMode = {
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

	"darker_than_back": "#00000030",
	"lighter_than_back": "#ffffff30"
};

const darkMode = {
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

	"darker_than_back": "#ffffff30",
	"lighter_than_back": "#00000030"
}

// document.body.style = `
// 	--eco-wallpaper: ${lightColors.wallpaper};

// 	--eco-red: ${lightColors.red};
// 	--eco-orange: ${lightColors.orange};
// 	--eco-green: ${lightColors.green};
// 	--eco-blue: ${lightColors.blue};
// 	--eco-white: ${lightColors.white};

// 	--eco-dark-red: ${lightColors.dark_red};
// 	--eco-dark-orange: ${lightColors.dark_orange};
// 	--eco-dark-green: ${lightColors.dark_green};
// 	--eco-dark-blue: ${lightColors.dark_blue};
// 	--eco-dark-white: ${lightColors.dark_white};

// 	// --darker-than-back: ${lightColors.lighter_than_back};
// 	// --lighter-than-back: ${lightColors.darker_than_back};
// `;


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
		// var colorSpace;
		switch (themeSwitch.className) {
			case "dark":
				themeSwitch.firstElementChild.src = "assets/images/icons/dark-mode.png";
				themeSwitch.className = "light";
				// colorSpace = lightColors;
				document.body.style = "";
				break;
			case "light":
				themeSwitch.firstElementChild.src = "assets/images/icons/light-mode.png";
				themeSwitch.className = "dark";
				themeSwitch.style.boxShadow = "1px 1px 3px white";
				// colorSpace = darkColors;
				document.body.style = `
					--eco-wallpaper: ${darkMode.wallpaper} !important;
					--eco-red: ${darkMode.red} !important;
					--eco-orange: ${darkMode.orange} !important;
					--eco-green: ${darkMode.green} !important;
					--eco-blue: ${darkMode.blue} !important;
					--eco-white: ${darkMode.white} !important;

					--eco-dark-red: ${darkMode.dark_red} !important;
					--eco-dark-orange: ${darkMode.dark_orange} !important;
					--eco-dark-green: ${darkMode.dark_green} !important;
					--eco-dark-blue: ${darkMode.dark_blue} !important;
					--eco-dark-white: ${darkMode.dark_white} !important;
				`;
				break;
		}

		localStorage.setItem("theme", themeSwitch.className);
	}
);

if (localStorage.getItem("theme") === "dark") {
	$("#reload-css").click();
}
