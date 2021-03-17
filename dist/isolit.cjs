var anod = require('anod');
var Enumerable = anod.Enumerable;
var fn = anod.fn;
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
function VElement(tagName, className, attributes, childNodes) {
	this.tagName = tagName;
	this.className = className;
	this.attributes = attributes;
	this.childOps = childNodes;
}
function factory(tagName) {
	return function (className, attributes, childOps) {
		return new VElement(tagName, className, attributes, childOps);
	}
}
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
module.exports = {
	_: _,
	render: render,
	a: a,
	abbr: abbr,
	address: address,
	area: area,
	article: article,
	aside: aside,
	audio: audio,
	b: b,
	base: base,
	bdi: bdi,
	bdo: bdo,
	blockquote: blockquote,
	body: body,
	br: br,
	button: button,
	canvas: canvas,
	caption: caption,
	cite: cite,
	code: code,
	col: col,
	colgroup: colgroup,
	data: data,
	datalist: datalist,
	dd: dd,
	del: del,
	details: details,
	dfn: dfn,
	dialog: dialog,
	div: div,
	dl: dl,
	dt: dt,
	em: em,
	embed: embed,
	fieldset: fieldset,
	figcaption: figcaption,
	figure: figure,
	footer: footer,
	h1: h1,
	h2: h2,
	h3: h3,
	h4: h4,
	h5: h5,
	h6: h6,
	head: head,
	header: header,
	hr: hr,
	html: html,
	i: i,
	iframe: iframe,
	img: img,
	input: input,
	ins: ins,
	kbd: kbd,
	label: label,
	legend: legend,
	li: li,
	link: link,
	main: main,
	map: map,
	mark: mark,
	meta: meta,
	meter: meter,
	nav: nav,
	noscript: noscript,
	object: object,
	ol: ol,
	optgroup: optgroup,
	option: option,
	output: output,
	p: p,
	param: param,
	picture: picture,
	pre: pre,
	progress: progress,
	q: q,
	rp: rp,
	rt: rt,
	ruby: ruby,
	s: s,
	samp: samp,
	script: script,
	section: section,
	select: select,
	small: small,
	source: source,
	span: span,
	strong: strong,
	style: style,
	sub: sub,
	summary: summary,
	sup: sup,
	svg: svg,
	table: table,
	tbody: tbody,
	td: td,
	template: template,
	textarea: textarea,
	tfoot: tfoot,
	th: th,
	thead: thead,
	time: time,
	title: title,
	tr: tr,
	track: track,
	u: u,
	ul: ul,
	video: video,
	wbr: wbr
};