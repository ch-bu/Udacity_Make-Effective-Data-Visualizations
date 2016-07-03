// Set variables
var margin = {top: 70, right: 20, bottom: 40, left: 40},
    width = 1100 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Colors
var primaryColor = "#C63D0F";
var secondaryColor = "#3B3738";
var thirdColor = "#558C89";

var weekSummary = $("#weekSummary");

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
    .orient("bottom")
    .tickFormat("");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Append svg
var svg = d3.select("#barchart").append("svg")
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
    .attr("stroke", "#808080")
    .text("Week of the year");

// Add a y-axis label.
svg.append("text")
    .attr("class", "label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("stroke", "#808080")
    .attr("transform", "rotate(-90)")
    .text("weekly work (hours)");

// Define the div for the tooltip
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Saves the whole data set
var weekData = null;
var currData = null;


d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function saveData(data) {

    // Assign data to weekData variable
    weekData = data;

    // Create year cards
    createYearCards(weekData);

    // Draw svg with whole data
    draw(weekData);

    // Add click event for all time data
    clickAllTimeEvent();

    // Event listener for checkbox
    d3.select("input").on("change", change);
}

function clickAllTimeEvent() {
    /*
     * Enables to redraw data for all weeks since end of 2013
     */

     // Add click event to cards
    $("#allWeeksCard").click(function(obj) {

        // Remove class
        $(".card").children().removeClass("currentCard");

        // Draw barchart with whole data
        draw(weekData);

    });

}

function draw(data) {
    /*
     * Draw graph 
     */

    // Assign current selection to currData variable
    currData = data;

    // Uncheck checkbox
    var sortChecked = $("#myCheckbox").prop("checked");

    // Specify domains
    x.domain(data.map(function(d) { return d.week; }));
    // y.domain([0, d3.max(data, function(d) { return d.duration; })]);
    y.domain([0, 55]);

    // Sort data according to checkbox
    var x0 = x.domain(currData.sort(sortChecked ? function(a, b) {
            return b.duration - a.duration;
        } : function(a, b) {
            return d3.ascending(a.week, b.week);
        })
        .map(function(d) { return d.week; }))
        .copy();

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.week) - x0(b.week); });

    // Append x-axis to svg
    svg.select(".x.axis").transition().duration(300).call(xAxis);
    svg.select(".y.axis").transition().duration(300).call(yAxis);

    // Remove existing lines
    svg.selectAll(".hourLine").remove();

    // Add horizontal line
    svg.append("svg:line")
        .attr("x0", 0)
        .attr("x1", width)
        .attr("y1", y(40))
        .attr("y2", y(40))
        .attr("class", "hourLine")
        .style("stroke", "#ccc");

    // Bind data to nonexisting bars
    var bar = svg.selectAll(".bar")
        .data(data);

    // Remove unnecessary bars
    bar.exit()
        .transition()
        .duration(300)
        .attr("y", y(0))
        .attr("height", height - y(0))
        .style("fill-opacity", 1e-6)
        .remove();
     
    // Add bars to chart    
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.week); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.duration); })
        .attr("height", function(d) { return height - y(d.duration); })
        .style("fill", function(d) {

            // Number of week
            var thisWeek = parseInt(d.week.slice(12, 14));

            // Highlight weeks I worked 100%
            if (d.year >= 2016 && thisWeek >= 14) {
                return thirdColor;
            }
        })
        .on("mouseover", function(currWeek) {
            
            // Color current week
            d3.selectAll(".bar")
                .filter(function(d) {
                    return d.week == currWeek.week;
                })
                .style("fill", secondaryColor);

            weekSummary.text("You worked " +
                Number(currWeek.duration).toFixed(1) +
                " hours in week " + currWeek.week.slice(12) +
                " of " + currWeek.week.slice(0, 4));

        })
        .on("mouseout", function(d) {

            // Reapply normal color on mouseout
            d3.selectAll(".bar")
                .style("fill", function(d) {

                    var thisWeek = parseInt(d.week.slice(12, 14));

                    // Highlight weeks I worked 100%
                    if (d.year >= 2016 && thisWeek >= 14) {
                        return thirdColor;
                    } else {
                        return primaryColor;
                    }
                });

            weekSummary.text("");
        });

    // Update set
    bar.transition().duration(300)
        .attr("x", function(d) {
            return x(d.week);
        })
        .attr("y", function(d) {
            return y(d.duration);
        })
        .attr("width", x.rangeBand())
        .attr("height", function(d) {
            return height - y(d.duration);
        })
        .style("fill", function(d) {

            var thisWeek = parseInt(d.week.slice(12, 14));

            // Highlight weeks I worked 100%
            if (d.year >= 2016 && thisWeek >= 14) {
                return thirdColor;
            } else {
                return primaryColor;
            }
        });

    // Add events for cards after a second
    setTimeout(function() {
        addHandlers();
    }, 500);

}


function change() {
    /*
     * Sorts the x axis from ascending
     */

    // Uncheck checkbox
    var sortChecked = $("#myCheckbox").prop("checked");

    // Rearrange domain
    var x0 = x.domain(currData.sort(sortChecked ? function(a, b) {
            return b.duration - a.duration;
        } : function(a, b) {
            return d3.ascending(a.week, b.week);
        })
        .map(function(d) { return d.week; }))
        .copy();

    svg.selectAll(".bar")
        .sort(function(a, b) { return x0(a.week) - x0(b.week); });

    var transition = svg.transition().duration(50);
    var barDelay = function(d, i) {
        return i * 10;
    };

    transition.selectAll(".bar")
        .delay(barDelay)
        .attr("x", function(d) { return x0(d.week); });

    transition.select(".axis")
        .call(xAxis)
        .selectAll("g")
        .delay(barDelay);

}


function createYearCards(data) {
    /*
     * Creates cards for every year in data
     */

    // Get unique years
    var uniqueYears = d3.map(data, function(d) { return d.year; }).keys();

    // Get card div
    var cardDiv = $("#cards");

    // Card template
    var card = document.getElementById("card").innerHTML;

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

    // Add click event to cards
    $(".card").click(function(obj) {

        // Remove class
        $(".card").children().removeClass("currentCard");

        // Remove events for cards
        $(".card").off();

        // Get target element
        var targetElement = $(obj.target);
        var year = null;

        // Target is div
        if (targetElement.is("div")) {
            targetElement.addClass("currentCard");
            year = Number(targetElement.find("span").text());
        // Target element is span
        } else if (targetElement.is("span")) {
            targetElement.parent().addClass("currentCard");
            year = Number(targetElement.text());
        }

        // Update data
        var dataSelection = weekData.filter(function(d) {
            return d.year == year;
        });

        // Draw barchart
        draw(dataSelection);


    });
}

function type(d) {

    // Typecast strings to number
    d.duration = +d.duration;
    d.year = +d.year;
    return d;
}

// Read csv and call draw function
d3.csv("../data/work_per_week.csv", type, saveData);