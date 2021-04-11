// @TODO: YOUR CODE HERE!

function makeResponsive() {

    //  Set Graph Dimensions
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;



    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(${margin.left}, ${margin.top})");

    // Import csv file
    d3.csv("../assets/data/data.csv").then(function(healthData) {
        healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });


}   // End of makeResponsive function












