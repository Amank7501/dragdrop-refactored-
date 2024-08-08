import React, { useContext, useEffect, useState } from 'react';
import Item from './Item';
import RaspUIElement from './RaspUIElement';
import { useDrop } from 'react-dnd';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import RaspUIContainer from './RaspUIContainer';
import { stringToClasses, stringToStyles, stylesToString, UIElementList } from './utils';
import BoardContext from '../context/board-context';
import RaspUINavElement from './RaspUINavElement';

const DragDrop = () => {
  const { addUIItem, ui_items, updateBoardElementStyles, updateBoardElementClasses, updateBoardElementItems } = useContext(BoardContext);
  const [selectedElement, setSelectedElement] = useState(null);
  const [cssString, setCssString] = useState('');
  const [classString, setClassString] = useState('');
  const [navItem, setNavItem] = useState('');

  const navigate = useNavigate();

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
    addUIItem(boardItem, 'root');
  };

  const handleElementClick = (id, uniqueId, path, styles, classes) => {
    setSelectedElement({ id, uniqueId, path, styles, classes });
    setCssString(stylesToString(styles));
    setClassString(classes);
  };

  const onNavElementClick = (id, uniqueId, path, styles, classes, navItems) => {
    setSelectedElement({ id, uniqueId, path, styles, classes, navItems });
    setCssString(stylesToString(styles));
    setClassString(classes);
  };

  const [{ isOverBoard }, dropBoard] = useDrop(() => ({
    accept: 'text' || 'input' || 'button' || 'form' || 'PICTURE',
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        addItemToBoard(item);
      }
    },
    collect: (monitor) => ({
      isOverBoard: !!monitor.isOver(),
    }),
  }));

  const handleCssChange = (e) => {
    const newCssString = e.target.value;
    setCssString(newCssString);
    const newStyles = stringToStyles(newCssString);
    updateBoardElementStyles(selectedElement.uniqueId, selectedElement.path, newStyles);
  };

  const handleClassChange = (e) => {
    const newClassString = e.target.value;
    setClassString(newClassString);
    const newClasses = stringToClasses(newClassString);
    updateBoardElementClasses(selectedElement.uniqueId, selectedElement.path, newClasses);
  };

  const extractHTML = (ui_items) => {
    const traverse = (path) => {
      const elements = ui_items[path] || [];
      return elements.map((item) => {
        if (!React.isValidElement(item.url)) {
          console.error("Invalid React element:", item.url);
          return '';
        }
        const elementString1 = ReactDOMServer.renderToStaticMarkup(
          React.cloneElement(item.url, {
            style: item.styles,
            className: item.className // Include className here
          })
        );

        const elementString = `<div>${elementString1}</div>`;
        if (item.type === 'container') {
          const nestedPath = `${path}/container${item.uniqueId}`;
          const nestedContent = traverse(nestedPath);
          return `<div style="${styleObjectToString(item.styles)}" class="${item.className}">${nestedContent}</div>`; // Include className here
        }
        return elementString;
      }).join('');
    };

    const htmlContent = traverse('root');
    return htmlContent;
  };

  const styleObjectToString = (styleObject) => {
    return Object.entries(styleObject).map(([key, value]) => `${key}: ${value};`).join(' ');
  };

  const handleDeploy = () => {
    const htmlContent = extractHTML(ui_items);
    navigate('/deploy', { state: { key: htmlContent } });
  };

  useEffect(() => {
    console.log("Selected item changed:", selectedElement);
  }, [selectedElement]);

  const handleNavClick = () => {
    if (selectedElement) {
      const newNavItems = [...selectedElement.navItems, navItem];
      setSelectedElement({ ...selectedElement, navItems: newNavItems });
      updateBoardElementItems(selectedElement.uniqueId, selectedElement.path, newNavItems);
      
    }
  };

  const handleNavInputChange = (e) => {
    setNavItem(e.target.value);
  };

  return (
    <div className='container-fluid'>
      <div className='nav d-flex justify-content-around p-3 border bg-light mb-5 rounded-pill'>
        <div className='nav-item'>Page 1</div>
        <div className='nav-item'>My Application 1</div>
        <div className='nav-item'>
          <button type="button" className='btn bg-info border rounded-pill' onClick={handleDeploy}>Deploy</button>
        </div>
      </div>
      <div className='d-flex'>
        <div className="accordion col-2 p-4" id="accordionExample">
          {UIElementList.map((item) =>
            <Item key={item.id} id={item.id} type={item.type} url={item.url} />
          )}
        </div>
        <div className='Board border border-3 col-7 p-4 shadow-lg rounded' ref={dropBoard}>
          {ui_items['root']?.map((item, i) => (
            item.type !== 'container' ? (
              
                <RaspUIElement
                  key={i}
                  id={item.id}
                  uniqueId={item.uniqueId}
                  url={item.url}
                  styles={item.styles}
                  classes={item.className}
                  path={item.path}
                  onElementClick={handleElementClick}
                  onNavElementClick={onNavElementClick}
                  navItems={item.items}

                />
              
            ) : (
              <RaspUIContainer
                key={i}
                id={item.id}
                uniqueId={item.uniqueId}
                styles={item.styles}
                classes={item.className}
                path={item.path}
                onElementClick={handleElementClick}
                onNavElementClick={onNavElementClick}
              />
            )
          ))}
        </div>
        <div className="col-3 p-4 d-flex flex-column gap-4">
          <div className='d-flex flex-column gap-2 border'>
            {selectedElement && selectedElement.id === 3 && (
              <>
                <input className='form-control border-0' onChange={handleNavInputChange} />
                <button className='btn btn-primary' onClick={handleNavClick}>Add item</button>
              </>
            )}
          </div>
          <div>
            <div className='form-control text-center border border-2 border-dark'>
              <h5>Bootstrap</h5>
              {selectedElement ? `${selectedElement.path}-${selectedElement.uniqueId}` : ''}
            </div>
            <textarea
              className="form-control border border-2 border-dark rounded"
              rows="10"
              value={classString}
              onChange={handleClassChange}
            />
          </div>
          <div>
            <div className='form-control text-center border border-2 border-dark'>
              <h5>CSS</h5>
              {selectedElement ? `${selectedElement.path}-${selectedElement.uniqueId}` : ''}
            </div>
            <textarea
              className="form-control border border-2 border-dark rounded"
              rows="10"
              value={cssString}
              onChange={handleCssChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
