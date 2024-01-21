import { useState } from 'react';
import "../styles/ColorChangePopup.css";

const ColorChangePopup = ({ categoryColors, setCategoryColors, onClose }) => {
  const [selectedColors, setSelectedColors] = useState(categoryColors);

  const handleColorChange = (category, color) => {
    setSelectedColors({ ...selectedColors, [category]: color });
  };

  const handleSubmit = () => {
    setCategoryColors(selectedColors);
    onClose();
  };

  return (
    <div>
      {Object.keys(selectedColors).map((category) => (
        <div key={category} className='change-color'>
          <label>{category}</label>
          <select
            value={selectedColors[category]}
            onChange={(e) => handleColorChange(category, e.target.value)}
          >
            <option value="#00FFAD">Mint Green</option>
            <option value="#E8D603">Yellow</option>
            <option value="#11E803">Green</option>
            <option value="#D603E8">Pink</option>
            <option value="#8AFF00">Green</option>    
            <option value="#031EE8">Blue</option>
            <option value="#E80303">Red</option>
            <option value="#9103E8">Purple</option>
            <option value="#03E8E3">Turquoise</option>
            <option value="#E88803">Orange</option>
            <option value="#723C1E">Brown</option>
            <option value="#03E8E3">Turquoise</option>
            <option value="#E88803">Orange</option>
            <option value="#723C1E">Brown</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ColorChangePopup;