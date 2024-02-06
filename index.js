var randomBeer;
var pH;

const randomButton = document.querySelector(".randombtn");

randomButton.addEventListener("click", () => {
	getRandomBeer();
});

async function getRandomBeer() {
	try {
		const response = await fetch("https://api.punkapi.com/v2/beers/random");
		randomBeer = await response.json();
		console.log(randomBeer);
		updateBeer();
	} catch (error) {
		console.error("Error fetching random beer:", error);
	}
}

function updateBeer() {
	const randomPh = randomBeer[0].ph;
	const bgColor = getRandomColor(randomPh);
	const imageUrl = randomBeer[0].image_url; // Access the first element of the array
	const html = `<div id="randombeer" style="background:${bgColor};">
        <div class="infobtn">i</div>
        <img src="${imageUrl}" alt="" />
        <h1 id="randomname">${randomBeer[0].name}</h1>
    </div>
    <card id="beerinfo">
        <div class="close">X</div>
        <div class="img"><img src="${imageUrl}" alt="" /></div>
        <div class="info">
            <h2>${randomBeer[0].name}</h2>
            <p>${randomBeer[0].description}</p>
            <ul>
                <li><span>Alcohol by volume (ABV)</span><span>${randomBeer[0].abv}</span></li>
                <li><span>Volume</span><span>${randomBeer[0].volume.value} ${randomBeer[0].volume.unit}</span></li>
                <li><span>PH</span><span>${randomPh}</span></li>
                </ul>
            <h3>Ingredients</h3>
            <h3>Food Pairing</h3>
            <p><span class="tip">Tip</span>${randomBeer[0].brewers_tips}</p>
        </div>
        
    </card>`;
	const insertinto = document.querySelector("#randombeerinput");
	insertinto.innerHTML = "";
	insertinto.insertAdjacentHTML("afterbegin", html);

	const infoBtn = document.querySelector(".infobtn");
	const infoHTML = document.getElementById("beerinfo");
	const closeBtn = document.querySelector(".close");
	closeBtn.addEventListener("click", () => {
		infoHTML.style.display = "none";
		infoBtn.style.display = "block";
	});

	infoBtn.addEventListener("click", () => {
		infoBtn.style.display = "none";
		infoHTML.style.display = "grid";
	});
}

function getRandomColor(pH) {
	// pH ranges from 0 to 14, so we can map it to a hue value between 0 and 360
	const hue = pH * 25; // Adjust this factor to fit your desired range

	// Convert HSV (hue, saturation, value) to RGB (red, green, blue)
	const c = 0.5; // Constant saturation and value for now
	const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
	const m = 0.5; // Medium lightness for now
	let r, g, b;

	if (0 <= hue && hue < 60) {
		[r, g, b] = [c, x, 0];
	} else if (60 <= hue && hue < 120) {
		[r, g, b] = [x, c, 0];
	} else if (120 <= hue && hue < 180) {
		[r, g, b] = [0, c, x];
	} else if (180 <= hue && hue < 240) {
		[r, g, b] = [0, x, c];
	} else if (240 <= hue && hue < 300) {
		[r, g, b] = [x, 0, c];
	} else {
		[r, g, b] = [c, 0, x];
	}

	// Convert RGB values to hexadecimal
	const rgb = [r, g, b].map((v) =>
		Math.round((v + m) * 255)
			.toString(16)
			.padStart(2, "0")
	);
	return "#" + rgb.join("");
}

getRandomBeer();
