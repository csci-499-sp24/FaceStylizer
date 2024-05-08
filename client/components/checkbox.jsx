import React, { useState } from 'react';

const NextCheckbox = ({ defaultChecked, onChange }) => {
  const [isCustomSelected, setIsCustomSelected] = useState(defaultChecked);

  const handleCheckboxChange = () => {
    setIsCustomSelected(!isCustomSelected);
    if (onChange) {
      onChange(isCustomSelected);
    }
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" checked={isCustomSelected} className="peer sr-only" onChange={handleCheckboxChange} />
      <div className={`peer flex h-8 items-center gap-4 rounded-full bg-orange-600 px-3 ${isCustomSelected ? 'peer-checked:bg-stone-600 peer-checked:after:translate-x-full' : ''} after:absolute after:left-1 after: after:h-6 after:w-20 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700 text-sm text-white`}>
        <span>Pretrained</span>
        <span>Custom</span>
      </div>
    </label>
  );
};

export default NextCheckbox;
