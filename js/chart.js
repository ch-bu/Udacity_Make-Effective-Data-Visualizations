// Set variables
var margin = {top: 40, right: 20, bottom: 140, left: 40},
    width = 1400 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
var categorialColors = d3.scale.category20b();

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

    // Add bar chart
    var bar = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.week); })
        .attr('fill', function(d) {

            if (d['year'] == '2015') {
                return categorialColors(1);
            } else if (d['year'] == '2016') {
                return categorialColors(2);
            } else if (d['year'] == '2014') {
                return categorialColors(3);
            } else if (d['year'] == '2013') {
                return categorialColors(4);
            }

        })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.duration); })
        .attr('height', function(d) { return height - y(d.duration); })
        .on("mouseover", function(d) {
            
            // Smooth transition on mouseover
            div.transition()
                .duration(200)
                .style("opacity", 0.9);

            // Append text to div
            div.html(d.week)
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            // Round hours to nearest tenth
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

    // Event listener for checkbox
    d3.select("input").on("change", change);


    function change() {
        /*
         * Sorts the x axis from ascending
         */

        // Rearrange domain
        var x0 = x.domain(data.sort(this.checked
            ? function(a, b) { return b.duration - a.duration; }
            : function(a, b) { return d3.ascending(a.week, b.week); })
            .map(function(d) { return d.week; }))
            .copy();

        // 
        svg.selectAll(".bar")
            .sort(function(a, b) { return x0(a.week) - x0(b.week); });

        var transition = svg.transition().duration(50),
            delay = function(d, i) { return i * 20; };

        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) { return x0(d.week); });

        transition.select(".axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);

    }

    d3.selectAll('.bar').data(data).exit().remove();

    // var newData = d3.selectAll('.bar').filter(function(d) {
    //     console.log(d.year == 2014);
    //     return d.year == 2014;
    // });

}

function type(d) {
    d.duration = +d.duration;
    d.year = +d.year;
    return d;
}

// Read csv and call draw function
d3.csv("../data/work_per_week.csv", type, draw);