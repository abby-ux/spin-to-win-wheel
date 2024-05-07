const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const landedOn = document.getElementById("landed-on");
const spinBtn = document.querySelector(".submit-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const textLabelsContainer = document.getElementById("text-labels");

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

// Draw the wheel sections
function drawWheel() {
    for (let i = 0; i < numSections; i++) {
        // Get the angle for each section
        const angle = (Math.PI * 2) / numSections;
        // Being draw path and move cursor to the center of the wheel
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        // Add an arc to the draw path, then close the path 
        ctx.arc(centerX, centerY, radius, i * angle, (i + 1) * angle);
        ctx.closePath();
        // Set the fill color and fill in this section
        ctx.fillStyle = sections[i].color;
        ctx.fill();
    }

    // // Add text labels
    // ctx.fillStyle = "black";
    // ctx.font = "bold 8px Arial";
    // ctx.textBaseline = "middle";
    // ctx.textAlign = "center";
    // for (let i = 0; i < numSections; i++) {
    //     // Add 0.5 so text will be centered
    //     const angle = (i + 0.5) * (Math.PI * 2) / numSections;
    //     // Calculate x and y position for the text
    //     const x = centerX + Math.cos(angle) * (radius * 0.6);
    //     const y = centerY + Math.sin(angle) * (radius * 0.6);
    //     ctx.fillText(sections[i].label, x, y);
    // }

    // Loop through sections to create text labels
    for (let i = 0; i < numSections; i++) {
        const angle = (i + 0.5) * (Math.PI * 2) / numSections;
        const x = centerX + Math.cos(angle) * (radius * 0.6);
        const y = centerY + Math.sin(angle) * (radius * 0.6);

        // Create a new text label element
        const labelElement = document.createElement("div");
        labelElement.textContent = sections[i].label;
        labelElement.style.position = "absolute";
        labelElement.style.left = x + "px";
        labelElement.style.top = y + "px";
        // Rotate the text label to align with the wheel section
    const rotation = angle + Math.PI / 2; // Adjust rotation by 90 degrees
    labelElement.style.transform = `rotate(${rotation}rad)`;
        // labelElement.style.transform = `translate(-50%, -50%) rotate(${0}rad)`;

        // Append the text label to the container
        textLabelsContainer.appendChild(labelElement);
    }
}

// Initialize the wheel
drawWheel();


// Function to animate the wheel spin
// Function to animate the wheel spin
function spin() {
    const animationDuration = 3000; // in milliseconds
    const startAngle = 0;
    const endAngle = Math.random() * 360 * 10; // 10 rotations
    const startTime = performance.now();

    if (nameInput.value === '' || emailInput.value === ''){
        spinBtn.style.display = "none";
        alert("You must enter you name and email address to spin the wheel.")
    } else {

        function animate(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            const angle = startAngle - (startAngle - endAngle) * progress;
            wheel.style.transform = `rotate(${angle}deg)`;
            const textLabels = document.querySelectorAll("#text-labels");
            // const numLabels = textLabels.length;
            // const anglePerLabel = 360 / numLabels;

            textLabels.forEach((label, index) => {
                // const labelAngle = (angle + anglePerLabel * (index)) % 360;
                // const labelRotation = (labelAngle + 90) * Math.PI / 180; // Convert to radians and adjust by 90 degrees
                // const labelX = centerX + Math.cos(labelRotation) * (radius * 0.6);
                // const labelY = centerY + Math.sin(labelRotation) * (radius * 0.6);

                // label.style.left = labelX + "px";
                // label.style.top = labelY + "px";

                label.style.transform = `rotate(${angle}deg)`;
                
            });

            // console.log(textLabels);
            // textLabels.forEach(label => {
            //     label.style.transformOrigin = "center center"; // Set rotation origin to the center of the label
            //     label.style.transform = `rotate(${angle}deg)`; // Translate to center and rotate
            // });


            // // Rotate the text labels along with the wheel
            // const labelRotation = angle * Math.PI / 180; // Convert to radians
            // const textLabels = document.querySelectorAll(".text-label");
            // textLabels.forEach(label => {
            //     label.style.transform = `rotate(${-angle}deg)`; // Rotate in the opposite direction
            // });

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
                if (finalAngle >= 270 && finalAngle <= 30){
                    landedOnLabel = "Free Cardio Pickelball Class"
                } else if (finalAngle > 30 && finalAngle <= 90) {
                    landedOnLabel = "Free Guest Pass";
                }
                else if (finalAngle > 90 && finalAngle <= 150) {
                    landedOnLabel = "Free Lesson";
                }
                else if (finalAngle > 150 && finalAngle <= 210) {
                    landedOnLabel = "50% Off Membership for One Month";
                }
                else if (finalAngle > 210 && finalAngle <= 270) {
                    landedOnLabel = "Free Drink";
                }
                else {
                    landedOnLabel = "Free 1 Hour Court Reservation";
                }
                // Update the #landed-on element with the correct value
                landedOn.textContent = "Landed on: " + landedOnLabel + ". Final angle: " + finalAngle;
            }
        }

        requestAnimationFrame(animate);
    }
}



// spinBtn.addEventListener("click", spin);
