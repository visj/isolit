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

/**
 * 
 * @param {string|Attribute<string>} data 
 * @returns {VNode}
 */
function t(data) {
	return new VText(data);
}

/**
 * 
 * @param {Attribute<ChildNode>} proc 
 */
function $if(proc) {
	return new VIf(proc);
}

/**
 * @template T
 * @param {Enumerable<T>} list 
 * @param {function(T,number=): ChildNode} proc 
 */
function $for(list, proc) {
	return new VFor(list, proc);
}

/**
 * 
 * @param {number} code 
 * @param {ChildNode} childNodes 
 */
function $event(code, childNodes) {
	return new VEvent(code, childNodes);
}

//#endregion

//#region 2. Type definitions

/**
 * @typedef {boolean|number|string|null|undefined|symbol} Primitive
 */

/**
 * @typedef {Object} VNode
 * @property {number} flag
 * @property {Node} node
 */

/**
 * @template T
 * @typedef {T|function(): T} Attribute
 */

/**
 * @typedef {Object<string,Attribute<Primitive>>} GlobalAttributes
 */

/**
 * @typedef {Array<VNode>} VArray
 */

/**
 * @typedef {VNode|VArray} ChildNode
 */

//#endregion

/**
 * @const
 * @enum {number}
 */
var VFlag = {
	Text: 1,
	Element: 2,
	Event: 4,
	If: 8,
	For: 16,
}

/**
 * 
 * @param {ChildNode} cnode 
 * @param {HTMLElement} parent 
 */
 function render(cnode, parent) {
	var i, ln,
		flag = cnode.flag;
	if (Array.isArray(cnode)) {
		for (i = 0, ln = cnode.length; i < ln; i++) {
			render(cnode[i], parent);
		}
	} else {
		if (flag & VFlag.Text) {
			renderText(cnode);
			parent.appendChild(cnode.node);
		} else if (flag & VFlag.Element) {
			renderElement(cnode);
			parent.appendChild(cnode.node);
		} else if (flag & VFlag.Event) {
	
		} else if (flag & VFlag.If) {
	
		} else if (flag & VFlag.For) {
	
		}
	}
}


//#region 3. Object implementations

/**
 * @constructor
 * @param {string|Attribute<string>} data 
 */
function VText(data) {
	this.flag = VFlag.Text;
	this.node = null;
	this.data = data;
}

/**
 * @constructor
 * @param {string} tagName 
 * @param {Attribute<string>} className 
 * @param {GlobalAttributes} attributes 
 * @param {ChildNode} childNodes 
 */
function VElement(tagName, className, attributes, childNodes) {
	this.flag = VFlag.Element;
	this.node = null;
	this.tagName = tagName;
	this.className = className;
	this.attributes = attributes;
	this.childNodes = childNodes;
}

/**
 * @constructor
 * @param {Attribute<ChildNode>} proc 
 */
function VIf(proc) {
	this.flag = VFlag.If;
	this.node = null;
	this.proc = proc;
}

/**
 * @template T
 * @constructor
 * @param {Enumerable<T>} list 
 * @param {function(T,number=): ChildNode} proc 
 */
function VFor(list, proc) {
	this.flag = VFlag.For;
	this.node = null;
	this.proc = proc;
	this.list = list;
}

/**
 * @constructor
 * @param {number} code 
 * @param {ChildNode} childNodes 
 */
function VEvent(code, childNodes) {
	this.flag = VFlag.Event;
	this.node = null;
	this.code = code;
	this.childNodes = childNodes;
}

//#endregion

//#region 4. Internal functionality

/**
 * 
 * @param {string} tagName
 * @returns {function(Attribute<string>,GlobalAttributes,Op): VNode}
 */
function factory(tagName) {
	return function (className, attributes, childNodes) {
		return new VElement(tagName, className, attributes, childNodes);
	}
}

/**
 * 
 * @param {VText} vnode 
 */
function renderText(vnode) {
	var data = vnode.data,
		node = document.createTextNode('');
	if (typeof data === 'function') {
		fn(function() {
			node.data = data();
		});
	} else {
		node.data = data;
	}
	vnode.node = node;
	vnode.data = null;
}

/**
 * @param {VElement} vnode 
 */
function renderElement(vnode) {
	var key, val,
		className = vnode.className, 
		attributes = vnode.attributes, 
		childNodes = vnode.childNodes,
		element = document.createElement(vnode.tagName);
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
			if (typeof val === 'function') {
				fn(function(attr) {
					var v = attr();
					if (v == null || v === false) {
						delete element[key];
					} else {
						element[key] = v;
					}
					return attr;
				}, val);
			} else {
				element[key] = val;
			}
		}
	}
	if (childNodes != null) {
		render(childNodes, element);
	}
	vnode.node = element;
	vnode.tagName = null;
	vnode.className = null;
	vnode.attributes = null;
	vnode.childNodes = null;
}

//#endregion

module.exports = {
	render, _, t, $if, $for, $event,
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

