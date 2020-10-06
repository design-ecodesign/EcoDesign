(function () {
	// try {
	const heading = document.querySelector('.heading');
	const nullBuffer = document.querySelector('#null-buffer');

	const handler = (entries) => {
		if (!entries[0].isIntersecting) {
			heading.classList.add('out-of-view');
		} else {
			heading.classList.remove('out-of-view');
		}
	};

	const observer = new window.IntersectionObserver(handler);
	observer.observe(nullBuffer);
	// } catch (TypeError) {}

	// let redirect = document.querySelectorAll(".nav-link.redirect");
	// document.style = "";
	// redirect.forEach(element => {
	// 	document.style += `
	// 		#${element.id}:hover {
	// 			background-color: saddlebrown;
	// 			width: ${element.getElementsByTagName('span')[0].innerHTML.length*17 + 30}px !important;
	// 		}
	// 	`;
	// });

	// console.log(document.style);
})();
