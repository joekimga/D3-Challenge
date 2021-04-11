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


    // Initial Params
    var chosenXAxis = "poverty";
    
    // Create Scale Functions
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(healthData, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(healthData, d => d.healthcare)])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);    

   // Append Axes to the chart
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    svg.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.id}<br>Poverty: ${d.poverty}<br>Hits: ${d.healthcare}`);
      });

    // Create tooltip in the chart
    svg.call(toolTip);     
    
    // Create event listeners to display and hide the tooltip
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });    

    // Create axes labels
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("<b>In Poverty (%)</b>");

    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Obese (%)");
  }).catch(function(error) {
    console.log(error);
  });        










}   // End of makeResponsive function



