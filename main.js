const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 200;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME1 =
	d3.select('#scatterplt')
		.append('svg')
			.attr('height', FRAME_HEIGHT)
			.attr('width', FRAME_WIDTH)
			.attr('class', 'frame');