var { Enumerable, fn } = require('anod');

/**
 * @fileoverview
 * Table of contents
 * 1. Public API
 * 2. Type definitions
 * 3. Object implementations
 * 4. Internal functionality
 */

//#region 1. Public API

var _ = void 0,
	a = factory('a'),
	abbr = factory('abbr'),
	address = factory('address'),
	area = factory('area'),
	article = factory('article'),
	aside = factory('aside'),
	audio = factory('audio'),
	b = factory('b'),
	base = factory('base'),
	bdi = factory('bdi'),
	bdo = factory('bdo'),
	blockquote = factory('blockquote'),
	body = factory('body'),
	br = factory('br'),
	button = factory('button'),
	canvas = factory('canvas'),
	caption = factory('caption'),
	cite = factory('cite'),
	code = factory('code'),
	col = factory('col'),
	colgroup = factory('colgroup'),
	data = factory('data'),
	datalist = factory('datalist'),
	dd = factory('dd'),
	del = factory('del'),
	details = factory('details'),
	dfn = factory('dfn'),
	dialog = factory('dialog'),
	div = factory('div'),
	dl = factory('dl'),
	dt = factory('dt'),
	em = factory('em'),
	embed = factory('embed'),
	fieldset = factory('fieldset'),
	figcaption = factory('figcaption'),
	figure = factory('figure'),
	footer = factory('footer'),
	h1 = factory('h1'),
	h2 = factory('h2'),
	h3 = factory('h3'),
	h4 = factory('h4'),
	h5 = factory('h5'),
	h6 = factory('h6'),
	head = factory('head'),
	header = factory('header'),
	hr = factory('hr'),
	html = factory('html'),
	i = factory('i'),
	iframe = factory('iframe'),
	img = factory('img'),
	input = factory('input'),
	ins = factory('ins'),
	kbd = factory('kbd'),
	label = factory('label'),
	legend = factory('legend'),
	li = factory('li'),
	link = factory('link'),
	main = factory('main'),
	map = factory('map'),
	mark = factory('mark'),
	meta = factory('meta'),
	meter = factory('meter'),
	nav = factory('nav'),
	noscript = factory('noscript'),
	object = factory('object'),
	ol = factory('ol'),
	optgroup = factory('optgroup'),
	option = factory('option'),
	output = factory('output'),
	p = factory('p'),
	param = factory('param'),
	picture = factory('picture'),
	pre = factory('pre'),
	progress = factory('progress'),
	q = factory('q'),
	rp = factory('rp'),
	rt = factory('rt'),
	ruby = factory('ruby'),
	s = factory('s'),
	samp = factory('samp'),
	script = factory('script'),
	section = factory('section'),
	select = factory('select'),
	small = factory('small'),
	source = factory('source'),
	span = factory('span'),
	strong = factory('strong'),
	style = factory('style'),
	sub = factory('sub'),
	summary = factory('summary'),
	sup = factory('sup'),
	svg = factory('svg'),
	table = factory('table'),
	tbody = factory('tbody'),
	td = factory('td'),
	template = factory('template'),
	textarea = factory('textarea'),
	tfoot = factory('tfoot'),
	th = factory('th'),
	thead = factory('thead'),
	time = factory('time'),
	title = factory('title'),
	tr = factory('tr'),
	track = factory('track'),
	u = factory('u'),
	ul = factory('ul'),
	video = factory('video'),
	wbr = factory('wbr');

//#endregion

//#region 2. Type definitions

/**
 * @typedef {boolean|number|string|null|undefined|symbol} Primitive
 */

/**
 * @template T
 * @typedef {T|function(): T} Attribute
 */

/**
 * @typedef {Object<string,Attribute<Primitive>>} GlobalAttributes
 */

/**
 * @typedef {Object} VNode
 * @property {number} flag
 * @property {Node|Node[]} node
 * @property {VNode=} next
 * @property {VNode[]=} childNodes
 */

/**
 * @typedef {Primitive|VElement} OpNode
 */

/**
 * @typedef {Array<Op>} OpArray
 */

/**
 * @typedef {OpNode|OpArray} Op
 */

//#endregion

/**
 * 
 * @param {Op} op 
 * @param {HTMLElement} parent 
 */
 function render(op, parent) {
	var i, ln, 
		type = typeof op;
	if (op == null || type === 'boolean') {
	} else if (type === 'string' || type === 'number' || type === 'symbol') {
		parent.appendChild(document.createTextNode(op));
	} else if (type === 'object') {
		if (op instanceof VElement) {
			renderElement(op, parent);
		} else if (Array.isArray(op)) {
			for (i = 0, ln = op.length; i < ln; i++) {
				render(op[i], parent);
			}
		} else if (op instanceof Enumerable) {

		}
	}
}


//#region 3. Object implementations

/**
 * 
 * @param {string} tagName 
 * @param {Attribute<string>} className 
 * @param {*} attributes 
 * @param {*} childNodes 
 */
function VElement(tagName, className, attributes, childNodes) {
	this.tagName = tagName;
	this.className = className;
	this.attributes = attributes;
	this.childOps = childNodes;
}

//#endregion

//#region 4. Internal functionality

/**
 * 
 * @param {string} tagName
 * @returns {function(Attribute<string>,GlobalAttributes,Op): VNode}
 */
function factory(tagName) {
	return function (className, attributes, childOps) {
		return new VElement(tagName, className, attributes, childOps);
	}
}

/**
 * @param {VElement} op 
 * @param {HTMLElement} parent
 * @returns {HTMLElement}
 */
function renderElement(op, parent) {
	var key, val,
		className = op.className, 
		attributes = op.attributes, 
		op = op.childOps,
		element = document.createElement(op.tagName);
	if (className != null) {
		if (typeof className === 'function') {
			fn(function() {
				element.className = className();
			});
		} else {
			element.className = className;
		}
	}
	if (attributes != null) {
		for (key in attributes) {
			val = attributes[key];
			if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) {
				element[key] = val;
			} else if (typeof val === 'function') {
				fn(function() {
					var v = val();
					if (v == null || v === false) {
						delete element[key];
					} else {
						element[key] = v;
					}
				});
			} else {
				element[key] = val;
			}
		}
	}
	if (op != null) {
		render(element, op);
	}
	parent.appendChild(element);
	return element;
}

//#endregion

module.exports = {
	_, render,
	a, abbr, address, area, article, aside,
	audio, b, base, bdi, bdo, blockquote,
	body, br, button, canvas, caption,
	cite, code, col, colgroup, data, datalist,
	dd, del, details, dfn, dialog, div,
	dl, dt, em, embed, fieldset, figcaption,
	figure, footer, h1, h2, h3, h4, h5, h6,
	head, header, hr, html, i, iframe, img,
	input, ins, kbd, label, legend, li, link,
	main, map, mark, meta, meter, nav,
	noscript, object, ol, optgroup, option,
	output, p, param, picture, pre, progress,
	q, rp, rt, ruby, s, samp, script, section,
	select, small, source, span, strong, style,
	sub, summary, sup, svg, table, tbody, td,
	template, textarea, tfoot, th, thead, time,
	title, tr, track, u, ul, video, wbr
};