import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import RaspUIElement from "./RaspUIElement";
import { UIElementList } from "./utils";
import { useContext } from 'react';
import BoardContext from '../context/board-context';
import RaspUINavElement from "./RaspUINavElement";

const RaspUIContainer = ({
  id,
  uniqueId,
  styles,
  path,
  onElementClick,
  onNavElementClick,
  classes,
}) => {
  // console.log("CONTAINER RASP NAV items: ",navItems);
  const { addUIItem, ui_items } = useContext(BoardContext);

  const createBoardItem = (item) => {
    const baseItem = UIElementList.find((picture) => item.id === picture.id);
    console.log("BaseItem: ", baseItem);
    let boardItem = { ...baseItem, uniqueId: Date.now(), styles: {}, className: baseItem.url.props.className !== undefined ? baseItem.url.props.className : '' };
    if (baseItem.type === 'navbar') boardItem = { ...boardItem, items: ['Home'] };
    console.log("Nav BaseItem: ", boardItem);

    return boardItem;
  };

  const addItemToBoard = (item) => {
    const boardItem = createBoardItem(item);
    addUIItem(boardItem, `${path}/container${uniqueId}`);
  };

  const [{ isOverBoard }, dropBoard] = useDrop(() => ({
    accept: "text" || "input" || "button" || "form"||'navbar',
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        addItemToBoard(item);
      }
    },
    collect: (monitor) => ({
      isOverBoard: !!monitor.isOver(),
    }),
  }));
  // useEffect(()=>{
  //   console.log("Nav Items",navItems);
  // })

  useEffect(() => {
    console.log("Container:", id);
    
  }, [id]);

  return (
    <div
      className={`border ${classes}`} // Apply classes here
      style={{ ...styles }}
      ref={dropBoard}
      onClick={(e) => {
        e.stopPropagation();
        onElementClick(id, uniqueId, path, styles, classes);
        // onNavElementClick(id,uniqueId,path,styles,classes,navItems)
      }}
    >
      {ui_items[`${path}/container${uniqueId}`]?.map((item, i) => (
        item.type === 'container' ? (
          <RaspUIContainer
            key={i}
                id={item.id}
                uniqueId={item.uniqueId}
                styles={item.styles}
                classes={item.className}
                path={item.path}
                onElementClick={onElementClick}
                onNavElementClick={onNavElementClick}
          />
        ) : (
          <RaspUIElement
            key={i}
            id={item.id}
            uniqueId={item.uniqueId}
            url={item.url}
            styles={item.styles}
            path={item.path}
            classes={item.className}
            onElementClick={onElementClick}
            onNavElementClick={onNavElementClick}
            navItems={item.items}

          />
        )
      ))}
    </div>
  );
};

export default RaspUIContainer;
