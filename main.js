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
