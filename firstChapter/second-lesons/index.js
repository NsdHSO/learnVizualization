const canvas = d3.select('.canva')
// add an svg element

const svg = canvas.append('svg')
    .attr('width', 600)
    .attr('height', 600)

const margin = {top: 20, right: 20, bottom: 70, left: 70}
const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.bottom - margin.top
const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
const rect = graph.selectAll('rect')

// Create axes group

const div = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`)
const yAxisGroup = graph.append('g')


d3.json('./data.json', (data) => {

    const y = d3.scaleLinear()
        .domain([
            0,
            d3.max(data, d => d.rating)])
        .range([
            graphHeight,
            0])
    const x = d3.scaleBand()
        .domain(data.map(item => item.rating))
        .range([
            0,
            500])
        .paddingInner(0.03)
        .paddingOuter(0.2)

    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)
    rect.data(data)
        .enter()
        .append('rect')
        .transition()
            .attr('y', d => y(d.rating))
            .delay((d,i) => i * 50)
            .ease(d3.easeElasticInOut)
        .attr('fill', (d) => d.color)
        .attr('width', (d) => x.bandwidth() / 2)
        .attr('height', (d) => graphHeight - y(d.rating))
        .attr('x', (d, i) => x(d.rating) / 2)
        .attr('y', d => y(d.rating))
        .on('mouseout', function (d, i,u) {
            d3.select(u[i])
                .transition()
                .duration('50')
                .attr('opacity', '1')
            div.transition()
                .duration(100)
                .style('opacity', 0)
        })


})