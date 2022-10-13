// setting up constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 =
	d3.select('#scatterplt')
		.append('svg')
			.attr('height', FRAME_HEIGHT)
			.attr('width', FRAME_WIDTH)
			.attr('class', 'frame')
		.append('g')
			.attr("transform", `translate(${MARGINS.left},${MARGINS.top})`);


d3.csv('data/scatter-data.csv').then( function(data) {
	// Add X axis
  	const x = d3.scaleLinear()
    	.domain([0, d3.max(data, function (d) { return d.x})])
    	.range([ 0, VIS_WIDTH]);
  	FRAME1.append("g")
    	.attr("transform", "translate(0," + 300 + ")")
    	.call(d3.axisBottom(x));

	// Add Y axis
	const y = d3.scaleLinear()
  		.domain([0, d3.max(data, function (d) { return d.y})])
  		.range([VIS_HEIGHT - 100, 0])
	FRAME1.append("g")
  		.call(d3.axisLeft(y));

  	// Add dots
  	FRAME1.append('g')
    	.selectAll("dot")
    	.data(data)
    	.enter()
    	.append("circle")
      	.attr("cx", function (d) { return x(d.x); } )
      	.attr("cy", function (d) { return y(d.y); } )
      	.attr("r", 10)
      	.attr('fill','#00BFFF')
      	.attr('class', 'datapoint')
      	.on("click", function(d) {
      		const target = d3.select(this)
      		const pointdisplay = document.getElementById('pointClick');
    		const pointtext = document.getElementById('point');
      		const currentStroke = target.attr("stroke")
      		if(currentStroke == "none"){
          		target.attr("stroke","green")
          		target.attr("stroke-width","5px")
          		pointdisplay.style.display = 'block'
          		pointtext.style.display ='block'
      		}else{
          		target.attr("stroke","none")}
          		pointtext.style.display = 'none'
			}) 

})

// making barchart 
const FRAME2 = d3.select("#Barchart")
                .append("svg")
                    .attr("width", FRAME_WIDTH)
                    .attr("height", FRAME_HEIGHT)
                    .attr("class", "frame"); 

// building 
function build_bar_chart() {
    d3.csv('bar-data.csv').then((data) => {

        // creating x scale 
        const X_SCALE = d3.scaleBand() // for categorical data 
                            .range([0, VIS_WIDTH])
                            .domain(data.map(d => d.Category))
                            .padding(0.2); 
        // Adding x axis
        FRAME2.append("g")
                .attr("transform", "translate(" + MARGINS.left +
                    "," + (VIS_HEIGHT + MARGINS.top) + ")")
                .call(d3.axisBottom(X_SCALE));  

        // creating Y scale 
        const Y_SCALE = d3.scaleLinear()
                            .domain([0, 100000])
                            .range([VIS_HEIGHT, 0]); 

        // Adding Y axis 
        FRAME2.append("g")
                .attr("transform", "translate(" + MARGINS.left +
                    "," + MARGINS.top + ")")
                .call(d3.axisLeft(Y_SCALE));  

        // Add bars 
        FRAME2.selectAll("bars")
                .data(data)
                .enter()
                .append("rect")
                    .attr("x", (d) => {
                        // x pos depends on category 
                        return (X_SCALE(d.Category) + MARGINS.left); 
                    })
                    .attr("y", (d) => {
                        // start of rect depends on value 
                        return (Y_SCALE(d.Value) + MARGINS.top);
                    })
                    .attr("height", (d) => {
                        // height of bar should be height of vis - value
                        return (VIS_H - Y_SCALE(d.Value));
                    })
                    .attr("width", X_SCALE.bandwidth()) // width comes from X_SCALE for free
                    .attr("class", (d) => {
                        return (d.Category + " bar"); 
                    }); 
    })
}

build_bar_chart();
