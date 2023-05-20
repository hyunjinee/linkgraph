export const nodes: any = [];
export const links: any = [];

const MAIN_NODE_SIZE = 50;
const CHILD_NODE_SIZE = 20;
const LEAF_NODE_SIZE = 5;

const addMainNode = (node: any) => {
  node.size = MAIN_NODE_SIZE;
  nodes.push(node);
};

const addChildNode = (parentNode: any, childNode: any, size: number = CHILD_NODE_SIZE) => {
  childNode.size = size;
  nodes.push(childNode);
  links.push({ source: parentNode, target: childNode });
};

const parentNode = { id: 'Computer Science' };
const childNode = { id: 'Operating Systems' };
addMainNode(parentNode);
addChildNode(parentNode, childNode);

for (let i = 0; i < 20; i++) {
  addChildNode(childNode, { id: '' });
}

// addChildNode(parentNode, { id: 'Programming Languages' });
// addChildNode(childNode, { id: 'Linux' }, LEAF_NODE_SIZE);
// addChildNode(childNode, { id: 'Windows' });
// addChildNode(childNode, { id: 'MacOS' });
