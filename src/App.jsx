import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

import './App.css';

const App = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => {
        const componentsData = data.slice(0, 20).map((item) => ({
          id: item.id,
          image: item.url,
          position: { x: 0, y: 0 },
          size: { width: 200, height: 200 },
        }));
        setComponents(componentsData);
      });
  }, []);

  const handleDrag = (index, e, { x, y }) => {
    const updatedComponents = [...components];
    updatedComponents[index].position = { x, y };
    setComponents(updatedComponents);
  };

  const handleResize = (index, e, direction, ref, delta) => {
    const updatedComponents = [...components];
    const { width, height } = ref.style;
    updatedComponents[index].size = { width, height };
    setComponents(updatedComponents);
  };

  const handleDelete = (index) => {
    const updatedComponents = [...components];
    updatedComponents.splice(index, 1);
    setComponents(updatedComponents);
  };

  return (
    <div id="parent" className="parent-container">
      {components.map((component, index) => (
        <div className='elementBox'>
          <Draggable
          key={component.id}
          position={component.position}
          onStop={(e, data) => handleDrag(index, e, data)}
        >
          <Resizable
            className="component-resizable"
            size={component.size}
            onResize={(e, direction, ref, delta) => handleResize(index, e, direction, ref, delta)}
          >
            <div className="component">
              <img src={component.image} alt="Component" className="component-image" />
              <div className="component-delete" onClick={() => handleDelete(index)}>
                X
              </div>
            </div>
          </Resizable>
        </Draggable>
        </div>
      ))}
    </div>
  );
};

export default App;
