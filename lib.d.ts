export type Primitive = boolean | number | string | symbol | null | undefined;

export interface VNode {
	readonly flag: number;
	readonly node: Node;
}

export type Attribute<T> = T | (() => T);

export interface VArray extends ReadonlyArray<VNode> { }

export type ChildNode = VNode | VArray;