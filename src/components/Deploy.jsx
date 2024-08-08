import React from "react";
import { useLocation } from "react-router-dom";
import parse from 'html-react-parser';

const Deploy = () => {
  const location = useLocation();
  const { key } = location.state || {};

  return (
    <div>
      {key ? parse(key) : <div>No content to display</div>}
    </div>
  );
};

export default Deploy;
