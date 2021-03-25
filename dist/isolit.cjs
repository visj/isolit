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
function t(data) {
	return new VText(data);
}
function $if(proc) {
	return new VIf(proc);
}
function $for(list, proc) {
	return new VFor(list, proc);
}
function $event(code, childNodes) {
	return new VEvent(code, childNodes);
}
var VFlag = {
	Text: 1,
	Element: 2,
	Event: 4,
	If: 8,
	For: 16,
}
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
function VText(data) {
	this.flag = VFlag.Text;
	this.node = null;
	this.data = data;
}
function VElement(tagName, className, attributes, childNodes) {
	this.flag = VFlag.Element;
	this.node = null;
	this.tagName = tagName;
	this.className = className;
	this.attributes = attributes;
	this.childNodes = childNodes;
}
function VIf(proc) {
	this.flag = VFlag.If;
	this.node = null;
	this.proc = proc;
}
function VFor(list, proc) {
	this.flag = VFlag.For;
	this.node = null;
	this.proc = proc;
	this.list = list;
}
function VEvent(code, childNodes) {
	this.flag = VFlag.Event;
	this.node = null;
	this.code = code;
	this.childNodes = childNodes;
}
function factory(tagName) {
	return function (className, attributes, childNodes) {
		return new VElement(tagName, className, attributes, childNodes);
	}
}
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
module.exports = {
	render: render,
	_: _,
	t: t,
	$if: $if,
	$for: $for,
	$event: $event,
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