const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 =
	d3.select('#scatterplt')
		.append('svg')
			.attr('height', FRAME_HEIGHT)
			.attr('width', FRAME_WIDTH)
			.attr('class', 'frame');

// data_scat = d3.csv('data/scatter-data.csv');

// const MAX_Y = d3.max(data_scat, (d) => {return d.y;});
// const Y_SCALE = d3.scaleLinear()
// 				.domain([0, MAX_Y])
// 				.range([VIS_HEIGHT, 0]);

// const MAX_X = d3.max(data_scat, (d) => {return d.x;});
// const X_SCALE = d3.scaleLinear()
// 				.domain([0, MAX_X])
// 				.range([0,VIS_WIDTH]);

