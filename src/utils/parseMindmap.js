let xOffset = 0;
let yOffset = 0;
export function parseMindmap(
  node,
  x = 0,
  y = 0,
  nodes = [],
  edges = [],
  parent = null,
  visible = true
) {
  nodes.push({
    id: node.id,
    data: {
      label: node.title,
      summary: node.summary,
      raw: node
    },
    position: { x, y },
    hidden: !visible
  });

  if (parent) {
    edges.push({
      id: `${parent}-${node.id}`,
      source: parent,
      target: node.id,
      hidden: !visible
    });
  }

  if (node.children) {
    node.children.forEach((child, index) => {
      parseMindmap(
        child,
        x + 220,
        y + index * 120,
        nodes,
        edges,
        node.id,
        visible
      );
    });
  }

  return { nodes, edges };
}
