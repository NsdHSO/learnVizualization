const canvas = d3.select('.canva')

d3.json('data.json', function (data) {

    let svg = canvas.append('svg')
    svg.attr('width', 500)
        .attr('height', 500)
        .attr('fill', 'red')
    svg.append('circle')
        .attr('cx', 34)
        .attr('cy', 34)
        .attr('r', 30)
    svg.append('text')
        .text('ion')
        .attr('x', 100)
        .attr('y', 40)
        .attr('font-size', 40)
        .attr('fill', 'blue')

// data.forEach((data, index) => {
//     svg.append('rect')
//         .attr('width', 10)
//         .attr('fill', 'orange')
//         .attr('height', data)
//         .attr('x', 10 * index + 10)
//         .attr('y', 140)
// })
//     svg = canvas.append('svg')
//     const rect = svg.selectAll('rect')
//     rect.data(data)
//         .enter()
//         .append('rect')
//         .attr('width', 10)
//         .attr('fill', (d) => d.color)
//         .attr('height', (d) => d.rating* 2)
//         .attr('x', (d, index) => index*11)
//         .attr('y', (d, index) => 100 - (d.rating * 2))
//         .on('mouseover', function (d, i) {
//             d3.select(this)
//                 .transition()
//                 .duration('50')
//                 .attr('opacity', '.85')
//
//         })
//         .on('mouseout', function (d, i) {
//             d3.select(this)
//                 .transition()
//                 .duration('50')
//                 .attr('opacity', '1')
//         })

    const circle = svg.selectAll('circle')
        .data(data)



    circle.enter()
        .append('circle')
        .attr('cx', (data,u)=> Math.floor((Math.random() * 200) +data.rating*u))
        .attr('cy', data=> Math.floor((Math.random() * 100) +data.rating))
        .attr('r', data=> data.rating*2)
        .attr('fill', data => data.color)
})

