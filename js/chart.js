// Set variables
var margin = {top: 40, right: 20, bottom: 140, left: 40},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Scale x axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

// Scale y axis
var y = d3.scale.linear()
    .range([height, 0]);

// Add axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat("");
    // .innerTickSize(-height)
    // .outerTickSize(0)
    // .tickPadding(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');
    // .innerTickSize(-width)
    // .outerTickSize(0)
    // .tickPadding(10);

// Append svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the div for the tooltip
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


function draw(data) {
    /*
     * Draw graph 
     */

    // Specify domains
    x.domain(data.map(function(d) { return d.week; }));
    y.domain([0, d3.max(data, function(d) { return d.duration; })]);

    // Append x-axis to svg
    svg.append("g")
        .attr("class", "x axis")
        // Translate axis to the bottom of svg
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

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
        .attr('height', function(d) { return height - y(d.duration); })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0.9);
            div.html(d.week)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            hours.text(Number(d.duration).toFixed(1) + " h");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);

            hours.text("");
        });

    // Div for weekly hours
    var hours = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - (height - 100))
        .attr("font-size", "5rem");

    // Add an x-axis label.
    svg.append("text")
        .attr("class", "label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 20)
        .text("Month of the year");

    // Add a y-axis label.
    svg.append("text")
        .attr("class", "label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("weekly work (hours)");

    // debugger;

}

function type(d) {
    d.duration = +d.duration;
    return d;
}

// Read csv and call draw function
d3.csv("../data/work_per_week.csv", type, draw);