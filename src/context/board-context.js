import React, { useEffect, useState } from "react";

const BoardContext = React.createContext({
  ui_items: { 'root': [] },
  addUIItem: (ui_item, path) => {},
  updateBoardElementStyles: (uniqueId, path, newStyles) => {},
  updateBoardElementClasses: (uniqueId, path, newClasses) => {},
  updateBoardElementItems: (uniqueId, path, newItems) => {}
});

export default BoardContext;

export const BoardContextProvider = (props) => {
  const [board, setBoard] = useState({
    ui_items: { 'root': [] },
    addUIItem: (ui_item, path) => addUIItem(ui_item, path),
    updateBoardElementStyles: (uniqueId, path, newStyles) => updateBoardElementStyles(uniqueId, path, newStyles),
    updateBoardElementClasses: (uniqueId, path, newClasses) => updateBoardElementClasses(uniqueId, path, newClasses),
    updateBoardElementItems: (uniqueId, path, newItems) => updateBoardElementItems(uniqueId, path, newItems),
  });

  const addUIItem = (ui_item, path) => {
    setBoard((prevBoard) => {
      const new_ui_items = { ...prevBoard.ui_items };
      if (!new_ui_items[path]) {
        new_ui_items[path] = [];
      }

      if (ui_item.type === 'container') {
        let new_path = `${path}/container${ui_item.uniqueId}`;
        new_ui_items[new_path] = [];
      }

      const newItem = { ...ui_item, path: path };
      new_ui_items[path].push(newItem);

      return {
        ...prevBoard,
        ui_items: new_ui_items,
      };
    });
  };

  const updateBoardElementStyles = (uniqueId, path, newStyles) => {
    setBoard((prevBoard) => {
      const new_ui_items = { ...prevBoard.ui_items };

      if (!new_ui_items[path]) {
        return prevBoard;
      }

      new_ui_items[path] = new_ui_items[path].map(item =>
        item.uniqueId === uniqueId ? { ...item, styles: newStyles } : item
      );

      return {
        ...prevBoard,
        ui_items: new_ui_items,
      };
    });
  };

  useEffect(() => {
    console.log("Board Item after updating styles: ", board);
  }, [board]);

  const updateBoardElementClasses = (uniqueId, path, newClasses) => {
    setBoard((prevBoard) => {
      const new_ui_items = { ...prevBoard.ui_items };

      if (!new_ui_items[path]) {
        return prevBoard;
      }

      new_ui_items[path] = new_ui_items[path].map(item =>
        item.uniqueId === uniqueId ? { ...item, className: newClasses } : item
      );

      return {
        ...prevBoard,
        ui_items: new_ui_items,
      };
    });
  };

  const updateBoardElementItems = (uniqueId, path, newItems) => {
    console.log("New items", newItems);
    setBoard((prevBoard) => {
      const new_ui_items = { ...prevBoard.ui_items };

      if (!new_ui_items[path]) {
        return prevBoard;
      }

      new_ui_items[path] = new_ui_items[path].map(item =>
        item.uniqueId === uniqueId ? { ...item, items: newItems } : item
      );

      return {
        ...prevBoard,
        ui_items: new_ui_items,
      };
    });
  };

  useEffect(() => {
    console.log("Board Item after updating classes: ", board);
  }, [board]);

  useEffect(() => {
    console.log("Board Item after updating items: ", board);
  }, [board]);

  return (
    <BoardContext.Provider value={board}>
      {props.children}
    </BoardContext.Provider>
  );
};
    