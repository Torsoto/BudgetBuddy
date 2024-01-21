import { useState } from 'react';

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
            <option value="#00FFAD">#Mint Green</option>
            <option value="#E8D603">#E8D603</option>
            <option value="#11E803">#11E803</option>
            <option value="#D603E8">#D603E8</option>
            <option value="#8AFF00">#8AFF00</option>
            <option value="#031EE8">#031EE8</option>
            <option value="#E80303">#E80303</option>
            <option value="#9103E8">#9103E8</option>
            <option value="#03E8E3">#03E8E3</option>
            <option value="#E88803">#E88803</option>
            <option value="#000000">#000000</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ColorChangePopup;