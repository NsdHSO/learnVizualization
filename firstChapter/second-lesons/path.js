// Data
const data = [
    {label: '50%', value: 50},
    {label: '30%', value: 30},
    {label: '20%', value: 20}
];

// Colors
const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'];

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
    .delay((d,i) => i * 250)
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
            console.log(d)
            return 'translate(-35, -129) rotate(326)';
        } else {
            return null;
        }
    })
    .attr("fill", (d, i) => colors[i])
    .attr("stroke", "white")
    .attr("stroke-width", 2);


// Apply rotation to the triangle

// Add labels
slices.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text(d => 'test');
