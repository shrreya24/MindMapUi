import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Pencil } from "lucide-react";

export default function MindmapNode({ data }) {
  const [editing, setEditing] = useState(false);
  const [localText, setLocalText] = useState(data.labelText);

  // Sync when external data changes
  useEffect(() => {
    setLocalText(data.labelText);
  }, [data.labelText]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (editing) return;
    data.onSelect();
    data.onToggle();
  };

  const saveEdit = () => {
    data.onChange(localText); // commit once
    setEditing(false);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: 12,
        borderRadius: 10,
        background: "#1e293b",
        color: "#e5e7eb",
        minWidth: 170,
        border: "1px solid #334155",
        position: "relative"
      }}
    >
      <Handle type="target" position={Position.Left} />

      {editing ? (
        <input
          autoFocus
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          style={{
            width: "100%",
            background: "#0f172a",
            color: "#e5e7eb",
            border: "1px solid #475569",
            borderRadius: 6,
            padding: 6
          }}
        />
      ) : (
        <strong>{data.labelText}</strong>
      )}

      {!editing && (
        <button
  onClick={(e) => {
    e.stopPropagation();
    setEditing(true);
  }}
  style={{
    position: "absolute",
    top: 4,
    right: 6,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8"
  }}
  title="Edit node"
>
  <Pencil size={16} />
</button>

      )}

      <Handle type="source" position={Position.Right} />
    </div>
  );
}
