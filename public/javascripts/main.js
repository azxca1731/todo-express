//Active Script
(() => {
	var links = document.getElementById("link").children;
	var url = window.location.pathname;
	Array.from(links).map(item => {
		const {
			attributes: {
				href: { nodeValue }
			}
		} = item;
		if (nodeValue === url) {
			item.className += " active";
		}
	});
})();
