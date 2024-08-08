import React, { useState } from "react";
import { useDrag } from "react-dnd";

const RaspUINavElement = ({
  id,
  uniqueId,
  url,
  path,
  styles,
  classes,
  onElementClick,
  navItems=[]
}) => {
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PICTURE",
    item: { id, uniqueId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ul
      className={`${classes}`}
      ref={drag}
      style={styles}
      onClick={(e) => {
        e.stopPropagation();
        onElementClick(id, uniqueId, path, styles, classes,navItems);
      }}
    >
      {navItems.map((item) => {
        return <li className="nav-item">{item}</li>;
      })}
    </ul>
  );
};

export default RaspUINavElement;
