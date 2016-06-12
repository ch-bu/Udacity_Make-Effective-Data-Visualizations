// Set variables
var margin = {top: 40, right: 20, bottom: 80, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Scale x axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

// Scale y axis
var y = d3.scale.linear()
    .range([height, 0]);

// Add axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

// Append svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function draw(data) {
    /*
     * Draw graph 
     */

    // Specify domains
    x.domain(data.map(function(d) { return d.week; }));
    y.domain([0, d3.max(data, function(d) { return d.duration; })]);

    // Append axis to svg
    svg.append("g")
        .attr("class", "x axis")
        // Translate axis to the bottom of svg
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr('class', 'x-axis-text');
        //.attr("x", 0);

    // Append y-axis to svg
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add bar chart
    var bar = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.week); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.duration); })
        .attr('height', function(d) { return height - y(d.duration); });

    // debugger;

}

function type(d) {
    d.duration = +d.duration;
    return d;
}

// Read csv and call draw function
d3.csv("../data/work_per_week.csv", type, draw);