// Data
const data = [
    {label: '50%', displayValue: 'Nevoi ', value: 50},
    {label: '30%', displayValue: 'TEST', value: 30},
    {label: '20%', displayValue: 'TEST##', value: 20}
];

// Colors
const colors = [
    'linear-gradient(48.82deg, #036A6D 14.59%, #65CDCF 83.23%)',
    '#36A2EB',
    '#FFCE56'
];
const outerRadius = 50; // Valoarea outerRadius dorită
const proportieTriunghi = 2; // Raportul de proporție dintre triangleSize și outerRadius
const proportieOuterRadius = 1; // Raportul de proporție dintre triangleSize și
const triangleOffset = outerRadius * 0.2; // Ajustează procentul (0.2) pentru a obține poziția dorită
const fontSize = Math.max(12, outerRadius * 0.2); // Ajustează procentul (0.03) și dimensiunea minimă (12) pentru a obține valorile dorite
const triangleRotation = 326; // Ajustează valoarea pentru a schimba rotația triunghiului
const triangleSize = outerRadius * (proportieTriunghi / proportieOuterRadius);
// Create a pie generator
const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

// Define the arc generator
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(outerRadius);

// Create the SVG element
const svg = d3.select("#chart")
    .append("g")
    .attr("transform", "translate(500, 500)");

// Generate the pie slices
const slices = svg.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
    .transition()
    .delay((d, i) => i * 550)
    .ease(d3.easeCircleInOut)
    .attr("d", (d, i) => {
        if (i === 2) {
            const centroid = arc.centroid(d);
            const trianglePath = `M ${centroid[0] - triangleSize / 1.2},${centroid[1] - triangleSize / 2} `
                + `L ${centroid[0] + triangleSize / 1.45},${centroid[1] - triangleSize / 2} `
                + `L ${centroid[0]},${centroid[1] + triangleSize / 2} Z`;
            return trianglePath;
        } else {
            return arc(d);
        }
    })
    .attr('transform', (d, i) => {
        if (i === 2) {
            const centroid = arc.centroid(d);
            return `translate(${centroid[0] + triangleOffset}, ${centroid[1] - triangleOffset}) rotate(${triangleRotation})`;
        } else {
            return null;
        }
    })
    .attr("fill", (d, i) => colors[i])
    .attr("stroke", "white")
    .attr("stroke-width", 2);



const labelArc = d3.arc()
    .innerRadius(outerRadius * 0.5)
    .outerRadius(outerRadius * 0.8);
const pieLabels = svg
    .selectAll("g")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("transform", (d) => {
        const centroid = labelArc.centroid(d);
        const offsetX = centroid[0] + 2 * (outerRadius * 0.05);
        const offsetY = centroid[1] + 2 * (-outerRadius * 0.01);
        const rotation = 146.5;
        return `translate(${offsetX}, ${offsetY}) rotate(${rotation})`;
    });

const displayValueLabels = pieLabels
    .append("foreignObject")
    .attr("width", (d) => {
        const pathLength = arc(d).length;
        return Math.min(pathLength, 80); // Ajustează valoarea maximă dorită pentru lățimea `foreignObject`
    })
    .attr("height", (d) => {
        const pathLength = arc(d).length;
        return Math.min(pathLength, 180); // Ajustează valoarea maximă dorită pentru înălțimea `foreignObject`
    })
    .style("max-width", "80px")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("align-items", "center")
    .style("justify-content", "center");

const labelDivs = displayValueLabels
    .append("xhtml:div")
    .style("color", "white")
    .style("font-size", `${fontSize}px`)
    .style("display", "flex")
    .style("flex-direction", "column");

labelDivs
    .append("span")
    .style('min-width', '2rem')
    .text((d) => d.data.displayValue);

labelDivs
    .append("span")
    .style("font-size", `${fontSize}px`)
    .text((d) => d.value + "%");

// Find the division for "Economii" with value "20%"
const economiiDivision = pieLabels.filter((d) => d.data.label === "20%");


economiiDivision
    .style('min-width', '20rem ')
    .append("foreignObject")
    .attr("width", (d) => {
        const pathLength = arc(d).length;
        return Math.min(pathLength, 80); // Ajustează valoarea maximă dorită pentru lățimea `foreignObject`
    })
    .attr("height", (d) => {
        const pathLength = arc(d).length;
        return Math.min(pathLength, 180); // Ajustează valoarea maximă dorită pentru înălțimea `foreignObject`
    })
    .append('xhtml:div').style('margin-top', '4rem')
    .style("color", "white")
    .transition()
    .delay((d, i) => i * 250)
    .ease(d3.easeBackIn)
    .style("font-size", `${fontSize}px`)
    .style("display", "flex")
    .text('iva')
// Add a gradient to the "Nevoi Fundamentale" slice
const nevoiFundamentaleSlice = slices.filter((d, i) => i === 0); // Select the first slice (index 0)

// Define the gradient
const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "nevoiFundamentaleGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "100%").attr("y2", "100%");

// Add gradient stops
gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#036A6D");
gradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#65CDCF");
gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ff0000");
// Apply the gradient to the slice
nevoiFundamentaleSlice.attr("fill", "url(#nevoiFundamentaleGradient)");
