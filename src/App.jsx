import { useState, useMemo } from "react";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

import mindmapData from "./data/mindmap.json";
import { parseMindmap } from "./utils/parseMindmap";

export default function App() {
  const [rfInstance, setRfInstance] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);

  // Parse JSON → nodes & edges
  const { nodes, edges } = useMemo(
    () => parseMindmap(mindmapData),
    []
  );

  // Handle collapse + hover summary
  const processedNodes = nodes.map((node) => ({
    ...node,
    hidden: collapsed[node.id] && node.data.raw.children,
    data: {
      ...node.data,
      label: (
        <div title={node.data.summary}>
          <strong>{node.data.label}</strong>
        </div>
      )
    }
  }));

  const processedEdges = edges.map((edge) => ({
    ...edge,
    hidden: collapsed[edge.source]
  }));

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
    setCollapsed((prev) => ({
      ...prev,
      [node.id]: !prev[node.id]
    }));
  };

  const handleResetView = () => {
    if (rfInstance) {
      rfInstance.fitView({ padding: 0.2 });
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Mindmap Area */}
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
          onInit={setRfInstance}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background
            gap={24}
            size={1}
            color="#7a7d86ff"
          />
        </ReactFlow>
      </div>

      {/* Side Panel */}
      <div
        style={{
          flex: 1,
          padding: "16px",
          borderLeft: "1px solid #ddd",
          background: "#d0def1ff"
        }}
      >
        {selectedNode ? (
          <>
            <h3>{selectedNode.data.raw.title}</h3>
            <p>{selectedNode.data.raw.summary}</p>
            <p>
              <b>Child Nodes:</b>{" "}
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
