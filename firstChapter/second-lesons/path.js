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

// Create a pie generator
const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

// Define the arc generator
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(150);

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
    .delay((d, i) => i * 250)
    .ease(d3.easeBackIn)
    .attr("d", (d, i) => {
        if (i === 2) {
            const centroid = arc.centroid(d);
            const triangleSize = 375; // Dimensiunea triunghiului
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
            console.log(d);
            return 'translate(-35, -129) rotate(326)';
        } else {
            return null;
        }
    })
    .attr("fill", (d, i) => colors[i])
    .attr("stroke", "white")
    .attr("stroke-width", 2);


const radius = 150; // Replace 150 with your desired radius value

const labelArc = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

const pieLabels = svg.selectAll("g")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${labelArc.centroid(d)[0] + 2 * (22)}, ${labelArc.centroid(d)[1] + 2 * (-4)}) rotate(146.5)`);

const displayValueLabels = pieLabels
    .append("foreignObject")
    .attr("width", "8rem")
    .attr("height", "18rem")
    .style("max-width", "80px")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("align-items", "center")
    .style("justify-content", "center");

const labelDivs = displayValueLabels
    .append("xhtml:div")
    .style("color", "white")
    .style("font-size", "20px")
    .style("display", "flex")
    .style("flex-direction", "column");

labelDivs
    .append("span")
    .style('min-width', '2rem')
    .text((d) => d.data.displayValue);

labelDivs
    .append("span")
    .style("font-size", "40px")
    .text((d) => d.value + "%");

// Find the division for "Economii" with value "20%"
const economiiDivision = pieLabels.filter((d) => d.data.label === "20%");


economiiDivision
    .style('min-width', '20rem ')
    .append("foreignObject")
    .attr("width", "8rem")
    .attr("height", "18rem")
    .append('xhtml:div').style('margin-top', '4rem')
    .style("color", "white")
    .transition()
    .delay((d, i) => i * 250)
    .ease(d3.easeBackIn)
    .style("font-size", "20px")
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
