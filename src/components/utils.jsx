export const UIElementList = [
  {
    id: 1,
    type: "input",
    url: <input className="form-control" />,
  },
  { id: 2, type: "button", url: <button className="btn btn-success">Submit</button> },
  {
    id: 3,
    type: "navbar",
    url: <ul className="navbar-nav flex-row w-100 justify-content-around"> Home</ul>
  },
  { id: 4, type: "button", url: <button className="btn btn-danger">Cancel</button> },
  {
    id: 5,
    type: "container",
    url: <div className="border border-2 h-25"></div>,
  },
  {
    id: 6,
    type: "container",
    url: <div className="d-flex border border-2 h-25"></div>,
  },
  // { id: 7, type: "button", url: <button className="btn btn-danger">Cancel</button> },
];

export const stylesToString = (styles) => {
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n');
};

export const stringToStyles = (cssString) => {
  const styles = {};
  cssString.split('\n').forEach((line) => {
    const [key, value] = line.split(':').map((item) => item.trim());
    if (key && value) {
      styles[key] = value.replace(';', '');
    }
  });
  return styles;
};

export const stringToClasses = (classString) => {
  return classString.split(/\s+/).join(' ');
};
