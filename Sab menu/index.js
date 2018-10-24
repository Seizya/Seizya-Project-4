//document.getElementById('level').scrollTop = document.getElementById('level').scrollHeight;
//menus--------------------------------------------------------------------------------------------
var ofa = false;

document.getElementById('menu').addEventListener('click', () => {
	ofa = !ofa;
	document.getElementById('menus').className = String(ofa);
	right_close();
})

//right-info---------------------------------------------------------------------------------------
var area_before;
var RBheight = (parseFloat(CSS(".right-button")["height"][0]) / parseFloat(CSS("#right")["height"])) * 100 + "%";
var RBbottom = (parseFloat(CSS(".right-button")["bottom"][0]) / parseFloat(CSS("#right")["height"])) * 100 + "%";
CSS(".right-button")["bottom"] = parseFloat(CSS(".right-button")["bottom"]) + parseFloat(CSS(".right-button")["height"]) * .5 + "px";
CSS(".right-button")["height"] = "0";

function starts(link, area) {
	if (document.getElementById("right").className == "true" && area != area_before) {
		right_close();
		startson("true");
	} else {
		startson();
	}
	area_before = area;

	function startson(TFa) {
		setTimeout(function () {
			CSS(".right-button")["height"] = RBheight;
			CSS(".right-button")["bottom"] = RBbottom;
		}, getCSS("right", "transition-duration") + (TFa == "true" ? getCSS("right", "transition-duration") * 2 /*+ getCSS("right", "transition-delay")*/ : 0))

		setTimeout(function () {
			document.getElementById("right_info").style.whiteSpace = "nowrap";

			document.getElementById("right_info").innerHTML =
				document.getElementById("area" + (area) + "_").innerHTML;

			document.getElementById('right').className = "true";
			setTimeout(() => {
				document.getElementById("right_info").style.whiteSpace = "normal";
			}, getCSS("right", "transition-duration"))


			document.getElementById('start').addEventListener('click', () => {
				document.getElementById('load').className = "true";
				setTimeout(() => {
					document.location.href = link;
					/*document.getElementById('load').className = "false";
					document.getElementById('right').className = "false";*/
				}, 3000)
			})
		}, TFa == "true" ? getCSS("right", "transition-delay") + getCSS("right", "transition-duration") + 200 : 0)
	}
}

function right_close() {
	CSS("#right")["transition-delay"] = parseFloat(CSS(".right-button")["transition-duration"][0]) * 2 + "s";
	//console.log(CSS("#right")["transition-delay"]);

	CSS(".right-button")["bottom"] = parseFloat(CSS(".right-button")["bottom"]) + parseFloat(CSS(".right-button")["height"]) * .5 + "px";
	CSS(".right-button")["height"] = "0";
	//console.log(CSS(".right-button")["bottom"])

	document.getElementById("right_info").style.whiteSpace = "nowrap";
	document.getElementById('right').className = "false";

	setTimeout(function () {
		CSS("#right")["transition-delay"] = "0s";
		//console.log(CSS("#right")["transition-delay"])
	}, getCSS("right", "transition-duration") + getCSS("right", "transition-delay"));
}

function getCSS(id, name) {
	return getCSSById(document.getElementById(id), name);
}

function getCSSById(element, name) {
	return parseFloat(window.getComputedStyle(element).getPropertyValue(name)) * 1000
}

function CSS(elements) {
	if (typeof elements == "string") {
		// Parse as querySelector
		elements = document.querySelectorAll(elements);
	}
	elements = Array.from(elements);
	// window.getComputedStyle(element).getPropertyValue(name);
	return new Proxy({}, {
		get: function (target, name) {
			return elements.map(function (element) {
				return window.getComputedStyle(element).getPropertyValue(name);
			})
		},
		set: function (target, name, value) {
			var errors = elements.map(function (element) {
				try {
					element.style[name] = value;
				} catch (e) {
					return e;
				}
				return undefined;
			});
			if (errors.reduce(function (pv, cv) {
					return pv + (cv ? 1 : 0);
				}, 0) == 0) return true;
			throw errors;
		}
	});
}