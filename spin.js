const wheel = document.getElementById("wheel");
const landedOn = document.getElementById("landed-on");
const spinBtn = document.querySelector(".submit-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const sections = [
    { label: "Free Lesson", color: "#FF6347" },
    { label: "50% Off Membership for One Month", color: "#6495ED" },
    { label: "Free Drink", color: "#32CD32" },
    { label: "Free 1 Hour Court Reservation", color: "#FF8C00" },
    { label: "Free Cardio Pickleball Class", color: "#9370DB" },
    { label: "Free Guest Pass", color: "#20B2AA" }
];

// Calculate sections, center, and radius
const numSections = sections.length;
const centerX = wheel.width / 2;
const centerY = wheel.height / 2;
const radius = Math.min(wheel.width, wheel.height) / 2 * 0.8;

function spin() {
    const animationDuration = 3000; // in milliseconds
    const startAngle = 0;
    const endAngle = Math.random() * 360 * 10; // 10 rotations
    const startTime = performance.now();

    if (nameInput.value === '' || emailInput.value === '') {
        spinBtn.style.display = "none";
        alert("You must enter your name and email address to spin the wheel.");
        return; // Exit function if input fields are empty
    }

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const angle = startAngle - (startAngle - endAngle) * progress;
        wheel.style.transform = `rotate(${angle}deg)`;

        // If animation isn't done, recursively call the function
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Calculate the final angle after the animation completes (between 0 - 360)
            let finalAngle = 360 - (angle % 360);
            // Calculate the section index based on the final angle
            const anglePerSection = 360 / numSections;
            let sectionIndex = Math.floor(finalAngle / anglePerSection);

            let landedOnLabel = "????";
            // Determine the section label based on the final angle
            if (finalAngle >= 332 && finalAngle <= 30) {
                landedOnLabel = "50% Off Membership for One Month"
            } else if (finalAngle > 30 && finalAngle <= 90) {
                landedOnLabel = "Free Drink";
            } else if (finalAngle > 90 && finalAngle <= 148) {
                landedOnLabel = "Free 1 Hour Court Reservation";
            } else if (finalAngle > 148 && finalAngle <= 210) {
                landedOnLabel = "Free Cardio Pickelball Class";
            } else if (finalAngle > 210 && finalAngle <= 270) {
                landedOnLabel = "Free Guest Pass";
            } else {
                landedOnLabel = "Free Lesson";
            }
            // Update the #landed-on element with the correct value
            landedOn.textContent = "Landed on: " + landedOnLabel + ". Final angle: " + finalAngle;
        }
    }

    requestAnimationFrame(animate);
}

// spinBtn.addEventListener("click", spin);
