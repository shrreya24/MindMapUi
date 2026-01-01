import { useState, useMemo } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

import mindmapData from "./data/mindmap.json";
import { parseMindmap } from "./utils/parseMindmap";
import MindmapNode from "./components/MindmapNode";

export default function App() {
  const [rfInstance, setRfInstance] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeText, setNodeText] = useState({});

  const { nodes, edges } = useMemo(
    () => parseMindmap(mindmapData),
    []
  );

  const nodeTypes = {
    mindmap: MindmapNode
  };

const processedNodes = nodes.map((node) => ({
  ...node,
  type: "mindmap",
  hidden: collapsed[node.id] && node.data.raw.children,
data: {
  labelText: nodeText[node.id] || node.data.label,
  summary: node.data.summary,
  raw: node.data.raw,
  onChange: (val) =>
    setNodeText((prev) => ({ ...prev, [node.id]: val })),
  onToggle: () =>
    setCollapsed((prev) => ({
      ...prev,
      [node.id]: !prev[node.id]
    })),
  onSelect: () => setSelectedNode(node)
}
}));

  const processedEdges = edges.map((edge) => ({
    ...edge,
    hidden: collapsed[edge.source]
  }));

  const handleNodeClick = (_, node) => {
  setSelectedNode(node);

  // Toggle only if NOT editing
  setCollapsed((prev) => ({
    ...prev,
    [node.id]: !prev[node.id]
  }));
};


  const handleResetView = () => {
    if (rfInstance) rfInstance.fitView({ padding: 0.2 });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Mindmap */}
      <div
        style={{
          flex: 3,
          position: "relative",
          backgroundColor: "#f4f6f8"
        }}
      >
        <button
          onClick={handleResetView}
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 10,
            padding: "6px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#ffffff",
            cursor: "pointer"
          }}
        >
          Reset View
        </button>

        <ReactFlow
          nodes={processedNodes}
          edges={processedEdges}
          nodeTypes={nodeTypes}
          onInit={setRfInstance}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background gap={24} size={1} color="#e5e7eb" />
        </ReactFlow>
      </div>

      {/* Side Panel */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          borderLeft: "1px solid #ddd",
          background: "#ffffff"
        }}
      >
        {selectedNode ? (
          <>
             <h3>
  {nodeText[selectedNode.id] || selectedNode.data.label}
</h3>
<p>{selectedNode.data.summary}</p>

    
            <p>
              <b>Children:</b>{" "}
              {selectedNode.data.raw.children
                ? selectedNode.data.raw.children.length
                : 0}
            </p>
          </>
        ) : (
          <p>Select a node to view details</p>
        )}
      </div>
    </div>
  );
}
