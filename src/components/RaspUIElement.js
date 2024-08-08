import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

const RaspUIElement = ({ id, uniqueId, url, path, styles, classes, onElementClick,onNavElementClick,navItems }) => {
  console.log("UI RASP NAV items: ",navItems);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PICTURE',
    item: { id, uniqueId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    console.log("item dropped classes:", styles);
  }, []);

  return (
    id!==3?<div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={(e) => {
        e.stopPropagation();
        onElementClick(id, uniqueId, path, styles, classes);
      }}
      // className={classes} // Apply classes here
    >
      {React.cloneElement(url, { style: { ...styles }, className: classes })}
    </div>:
    <nav className='navbar bg-light rounded-pill'>

    <ul
    className={`${classes}`}
    ref={drag}
    style={styles}
    onClick={(e) => {
      e.stopPropagation();
      onNavElementClick(id, uniqueId, path, styles, classes,navItems);
    }}
  >
    <li className="navbar-brand ">Navbar</li>
    {navItems.map((item) => {
      return <li className="nav-item my-auto">{item}</li>;
    })}
  </ul>
    </nav>
  );
};

export default RaspUIElement;
