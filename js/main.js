//Declare constants for frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};


//creates a scale for left visualization
const LEFT_VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const LEFT_VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

//create a new frame - scatterplot
const FRAME1 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "left"); 


//creates a scale for middle visualization
const MID_VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const MID_VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

//create a new frame - scatterplot
const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "middle"); 


//read data and create plot
d3.csv("data/iris.csv").then((data) => {

  //LEFT VISUALIZATION

   // find max X
  const MAX_X1 = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });
          // Note: data read from csv is a string, so you need to
          // cast it to a number if needed 
  
  // Define scale functions that maps our data values 
  // (domain) to pixel values (range)
  const X_SCALE1 = d3.scaleLinear() 
                    .domain([0, (MAX_X1 + 1)]) // add some padding  
                    .range([0, LEFT_VIS_WIDTH]); 

  // Add an x axis to the visualization  
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.top + 
              "," + (LEFT_VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE1).ticks(10)) 
          .attr("font-size", '10px'); 

   // find max Y
  const MAX_Y1 = d3.max(data, (d) => { return parseInt(d.Petal_Length); });

  //Define scale functions that map our data values
  const Y_SCALE1 = d3.scaleLinear()
             .domain([0, (MAX_Y1 + 1)])
             .range([LEFT_VIS_HEIGHT, 0]);

   //Use X_SCALE1 and Y_SCALE1 to plot our points with appropriate x & y values
  FRAME1.selectAll("points")
      .data(data) //passed from .then
      .enter()
      .append("circle")
      .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); })
      .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.top); })
      .attr("r", 4)
      .attr("class", (d) => {return d.Species});


    //Add a y-axis to the visualization
  FRAME1.append("g")
      .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE1).ticks(10)) 
          .attr("font-size", '10px'); 

  //MIDDLE VISUALIZATION

   // find max X
  const MAX_X2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
          // Note: data read from csv is a string, so you need to
          // cast it to a number if needed 

  // Define scale functions that maps our data values 
  // (domain) to pixel values (range)
  const X_SCALE2 = d3.scaleLinear() 
                    .domain([0, (MAX_X2 + 1)]) // add some padding  
                    .range([0, MID_VIS_WIDTH]); 

   // Add an x axis to the visualization  
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.top + 
              "," + (MID_VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE2).ticks(10)) 
          .attr("font-size", '10px'); 

   // find max Y
  const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });

  //Define scale functions that map our data values
  const Y_SCALE2 = d3.scaleLinear()
             .domain([0, (MAX_Y2 + 1)])
             .range([MID_VIS_HEIGHT, 0]);

   //Use X_SCALE2 and Y_SCALE2 to plot our points with appropriate x & y values
  FRAME2.selectAll("points")
      .data(data) //passed from .then
      .enter()
      .append("circle")
      .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); })
      .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); })
      .attr("r", 4)
      .attr("class", (d) => {return d.Species});

  //Add a y-axis to the visualization
  FRAME2.append("g")
      .attr("transform", "translate(" + MARGINS.left + 
              "," + (MARGINS.top) + ")") 
        .call(d3.axisLeft(Y_SCALE2).ticks(10)) 
          .attr("font-size", '10px'); 


});