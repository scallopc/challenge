import { useState } from "react";
import "./App.css";

export default function App() {
  const [list, setList] = useState<any>([]);
  const [undid, setUndid] = useState<any>([]);

  const handleClick = (e: any) => {
    const newCircle = {
      clientX: e.clientX,
      clientY: e.clientY,
    };
    setList([...list, newCircle]);
  };

  const handleContainerButton = (event: any) => {
    event.stopPropagation();
  };

  const handleUndo = () => {
    const newArray = [...list].slice(0, -1);
    if (list.length === 0) {
      return;
    }
    const lastItem = list[list.length -1];
    setUndid([...undid, lastItem]);
    setList(newArray);
  };

  const handleRedo = () => {
    const recoverLastItem = undid[undid.length -1];
    const newArray = [...undid].slice(0, -1);
    if (undid.length === 0) {
      return;
    }
    setUndid(newArray);
    setList([...list, recoverLastItem]);
  };

  return (
    <div className="container" onClick={handleClick}>
      <div className="container-button" onClick={handleContainerButton}>
        <button className="btn-undo" onClick={handleUndo}>
          Desfazer
        </button>
        <button className="btn-redo" onClick={handleRedo}>
          Refazer
        </button>
      </div>
      {list.map((item, i) => {
        return (
          <span
            key={i}
            className="circle"
            style={{ left: item.clientX, top: item.clientY }}
          />
        );
      })}
    </div>
  );
}
