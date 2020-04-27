// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, 
//and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then (function(statedata) {  
    // Log an error if one exists
    // if (error) return console.warn(error)

    statedata.forEach(function(data) {
        // 
        data.age = +data.age;
        data.smokes = +data.smokes;
      })


  // Create Scales
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(statedata, d => d.age)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([4, d3.max(statedata, d => d.smokes)])
    .range([height, 0]);

  // Create Axes

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);


  // Append the axes to the chartGroup
  // Add bottomAxis
chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  
  
  // Add leftAxis to the left side of the display
chartGroup.append("g")
    .call(leftAxis);

// Create Circles


    chartGroup.selectAll("circle")
        .data(statedata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("opacity", ".5");

    chartGroup.append("g").selectAll("text")
        .data(statedata)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.age))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("font_family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "white")
        .style("font-weight", "bold");



// 



chartGroup.append("text")
    .attr("transform", `translate(${width / 3}, ${height + margin.top + 20})`)
    .text("Age in years");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height/1.2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percentage of smokers");


    });
