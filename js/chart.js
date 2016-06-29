// Set variables
var margin = {top: 40, right: 20, bottom: 140, left: 40},
    width = 1200 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var categorialColors = d3.scale.category20b();

// Scale x axis
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

// Scale y axis
var y = d3.scale.linear()
    .range([height, 0]);

// Add axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat("");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

// Append svg
var svg = d3.select("#barchart").append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Make axes ready
svg.append("g")
    .attr("class", "x axis")
    // Translate axis to the bottom of svg
    .attr("transform", "translate(0," + height + ")");

// Append y-axis to svg
svg.append("g")
    .attr("class", "y axis");

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

// Define the div for the tooltip
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Saves the whole data set
var weekData = null;


function saveData(data) {

    // Assign data to weekData variable
    weekData = data;

    // Create year cards
    createYearCards(weekData);

    // Draw svg with whole data
    draw(weekData);

    // Add click event for all time data
    clickAllTimeEvent();
}

function clickAllTimeEvent() {
    /*
     * Enables to redraw data for all weeks since end of 2013
     */

     // Add click event to cards
    $('#allWeeksCard').click(function(obj) {

        draw(weekData);

    });

}

function draw(data) {
    /*
     * Draw graph 
     */


    // Uncheck checkbox
    // var checkbox = $("#myCheckbox");
    // if (checkbox.prop("checked")) {
    //     checkbox.prop("checked", false);
    // }

    // Specify domains
    x.domain(data.map(function(d) { return d.week; }));
    y.domain([0, d3.max(data, function(d) { return d.duration; })]);

    // Append x-axis to svg
    svg.select(".x.axis").transition().duration(300).call(xAxis);
    svg.select(".y.axis").transition().duration(300).call(yAxis);

    // Bind data to nonexisting bars
    var bar = svg.selectAll('.bar')
        .data(data);

    // Remove unnecessary bars
    bar.exit()
        .transition()
        .duration(300)
        .attr("y", y(0))
        .attr("height", height - y(0))
        .style('fill-opacity', 1e-6)
        .remove();
     
    // Add bars to chart    
    bar.enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(d.week); })
        .attr('width', x.rangeBand())
        .attr('y', function(d) { return y(d.duration); })
        .attr('height', function(d) { return height - y(d.duration); })
        .on("mouseover", function(currWeek) {
            
            // Color current week
            d3.selectAll('.bar')
                .filter(function(d) {
                    return d.week == currWeek.week;
                })
                .style("fill", "#226764");

            // Round hours to nearest tenth
            hours.text(currWeek.week + " - " + Number(currWeek.duration).toFixed(1) + " h");
        })
        .on("mouseout", function(d) {

            // Reapply normal color on mouseout
            d3.selectAll('.bar')
                .style("fill", "#A8383B");

            // Empty text box
            hours.text("");
        });


    // Update set
    bar.transition().duration(300)
        .attr("x", function(d) {
            return x(d.week);
        })
        .attr("y", function(d) {
            return y(d.duration);
        })
        .attr('width', x.rangeBand())
        .attr("height", function(d) {
            return height - y(d.duration);
        });

    // Div for weekly hours
    var hours = svg.append("text")
        .attr("x", 40)
        .attr("y", height - 10)
        .attr("font-size", "3rem")
        .attr("fill", "#fff");

    // Add events for cards after a second
    setTimeout(function() {
        addHandlers();
    }, 500);
    

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

        svg.selectAll(".bar")
            .sort(function(a, b) { return x0(a.week) - x0(b.week); });

        var transition = svg.transition().duration(50);
        var delay = function(d, i) { return i * 10; };
 
        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) { return x0(d.week); });

        transition.select(".axis")
            .call(xAxis)
            .selectAll("g")
            .delay(delay);

    }
}

function createYearCards(data) {

    // Get unique years
    var uniqueYears = d3.map(data, function(d) { return d.year; }).keys();

    // Get card div
    var cardDiv = $('#cards');

    // Card template
    var card = document.getElementById('card').innerHTML;

    // Append years to dom
    for (year in uniqueYears) {
        var rendered = Mustache.render(card, {year: uniqueYears[year]});
        cardDiv.append(rendered);
    }

}

function addHandlers() {
    /*
     * Add event listeners for cards
     */

    // Add hover functionality
    // $('.card').hover(function(obj) {

    //     // Find year from card mouse is over
    //     var year = Number($(obj.target).find("span").text());

    //     d3.selectAll('.bar')
    //         .filter(function(d) {
    //             return d.year == year;
    //         })
    //         .transition()
    //         .duration(400).
    //         style('fill', '#226764');

    // }, function(obj) {

    //     d3.selectAll('.bar')
    //         .transition()
    //         .duration(200).
    //         style('fill', '#A8383B');
    // });

    // Add click event to cards
    $('.card').click(function(obj) {

        // Remove events for cards
        $('.card').off();

        // Get target element
        var targetElement = $(obj.target);
        var year = null;

        // Target is div
        if (targetElement.is("div")) {
            year = Number(targetElement.find("span").text());
        } else if (targetElement.is("span")) {
            year = Number(targetElement.text());
        }

        // // Update data
        var dataSelection = weekData.filter(function(d) {
            return d.year == year;
        });

        // Draw barchart
        draw(dataSelection);

    });
}

function type(d) {
    d.duration = +d.duration;
    d.year = +d.year;
    return d;
}

// Read csv and call draw function
d3.csv("../data/work_per_week.csv", type, saveData);