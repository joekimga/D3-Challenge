// @TODO: YOUR CODE HERE!

// function makeResponsive() {

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
    .attr("height", svgHeight);
        
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

    // Import csv file
d3.csv("assets/data/data.csv").then(function(healthData) {
      healthData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
  });


    // Initial Params
    //var chosenXAxis = "poverty";
    
    // function used for updating x-scale var upon click on axis label
  //function xScale(poverty, chosenXAxis) {
  // create scales
var xLinearScale = d3.scaleLinear()
  .domain([d3.min(healthData, d => d.poverty) * 0.8,
    d3.max(healthData, d => d.poverty) * 1.2
  ])
  .range([0, width]);
var yLinearScale = d3.scaleLinear()
  .domain([d3.min(healthData, d => d.healthcare) * 0.8,
  d3.max(healthData, d => d.healthcare) * 1.2
  ])
  .range([height, 0]);
    //return xLinearScale;

 // } // Create initial axis functions
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);


        // append x axis
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

// append y axis
chartGroup.append("g")
  .call(leftAxis);

     // append initial circles
var circlesGroup = chartGroup.selectAll("circle")
.data(healthData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 20)
.attr("fill", "pink")
.attr("opacity", ".5")
.classed("stateCircle", true);

chartGroup.append("g")
.selectAll("circle")
.data(healthData)
.enter()
.append("text")
.text(d => d.abbr)
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("dy", 3)
.attr("text-anchor", "middle")
.classed("stateText", true);

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("text-anchor", "middle")
.attr("fill", "blue")
.attr("font-size", "10px") 
.style("font-weight", "bold")
.text("In Poverty (%)");

  // append y axis
chartGroup.append("text")
.attr("y", 0 - ((margin.left/2)+2))
.attr("x", 0 - (height / 2))
.attr("text-anchor", "middle")
.attr("fill", "blue")
.attr("font-size", "10px") 
.style("font-weight", "bold")
.text("HealthCare (%)")
.attr("transform", "rotate(-90)");

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Obesity: ${d.healthcare}`);
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
           
});



//   // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   var label;

//   if (chosenXAxis === "poverty") {
//     label = "In poverty (%):";
//   }
//   else {
//     label = "Age (Median):";
//   }

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.id}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("../assets/data/data.csv").then(function(healthData, err) {
//   if (err) throw err;

//   // parse data
//   healthData.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.healthcare = +data.healthcare;
//     // data.num_albums = +data.num_albums;
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(poverty, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(poverty, d => d.healthcare)])
//     .range([height, 0]);

 



 

//   // Create group for two x-axis labels
//   var labelsGroup = svg.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);



//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(hairData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "healthcare") {
//           healthcareLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           healthcareLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           povertyLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });






//   d3.csv("../assets/data/data.csv").then(function(healthData) {
//     healthData.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.healthcare = +data.healthcare;
// });
  //   // Create Scale Functions
  //   var xLinearScale = d3.scaleLinear()
  //     .domain([20, d3.max(healthData, d => d.poverty)])
  //     .range([0, width]);

  //   var yLinearScale = d3.scaleLinear()
  //     .domain([0, d3.max(healthData, d => d.healthcare)])
  //     .range([height, 0]);

  //   // Create axis functions
  //   var bottomAxis = d3.axisBottom(xLinearScale);
  //   var leftAxis = d3.axisLeft(yLinearScale);    

  //  // Append Axes to the chart
  //   svg.append("g")
  //     .attr("transform", `translate(0, ${height})`)
  //     .call(bottomAxis);

  //   svg.append("g")
  //     .call(leftAxis);

  //   // Create Circles
  //   var circlesGroup = chartGroup.selectAll("circle")
  //   .data(healthData)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", d => xLinearScale(d.poverty))
  //   .attr("cy", d => yLinearScale(d.healthcare))
  //   .attr("r", "15")
  //   .attr("fill", "pink")
  //   .attr("opacity", ".5");

  //   // Initialize tool tip
  //   var toolTip = d3.tip()
  //     .attr("class", "tooltip")
  //     .offset([80, -60])
  //     .html(function(d) {
  //       return (`${d.id}<br>Poverty: ${d.poverty}<br>Hits: ${d.healthcare}`);
  //     });

  //   // Create tooltip in the chart
  //   svg.call(toolTip);     
    
  //   // Create event listeners to display and hide the tooltip
  //   circlesGroup.on("click", function(data) {
  //       toolTip.show(data, this);
  //     })
  //       // onmouseout event
  //       .on("mouseout", function(data, index) {
  //         toolTip.hide(data);
  //       });    

  //   // Create axes labels
  //   svg.append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 0 - margin.left + 40)
  //     .attr("x", 0 - (height / 2))
  //     .attr("dy", "1em")
  //     .attr("class", "axisText")
  //     .text("<b>In Poverty (%)</b>");

  //   svg.append("text")
  //     .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
  //     .attr("class", "axisText")
  //     .text("Obese (%)");
  // }).catch(function(error) {
  //   console.log(error);
  // });        


// }   // End of makeResponsive function

