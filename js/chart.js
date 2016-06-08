// Set variables
var margin = {top: 40, right: 20, bottom: 30, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// Append svg
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Scale x axis
// var x = d3.scale.ordinal()


function draw(data) {

    console.log(data);

}

// Read csv and call draw function
d3.csv("../data/work_per_week.csv", draw);