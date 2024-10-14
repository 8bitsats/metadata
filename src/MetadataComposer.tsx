import React, { useState } from 'react';
import { Save } from 'lucide-react';

const MetadataComposer: React.FC = () => {
  const [metadata, setMetadata] = useState({
    name: '',
    symbol: '',
    description: '',
    image: '',
    attributes: [{ trait_type: '', value: '' }]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const handleAttributeChange = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttributes = [...metadata.attributes];
    newAttributes[index][field] = value;
    setMetadata(prev => ({ ...prev, attributes: newAttributes }));
  };

  const addAttribute = () => {
    setMetadata(prev => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: '', value: '' }]
    }));
  };

  const removeAttribute = (index: number) => {
    const newAttributes = metadata.attributes.filter((_, i) => i !== index);
    setMetadata(prev => ({ ...prev, attributes: newAttributes }));
  };

  const saveMetadata = () => {
    const jsonString = JSON.stringify(metadata, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'metadata.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 border-purple-500 rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-green-400">Metadata Composer</h2>
      <div className="space-y-4">
        <input
          name="name"
          value={metadata.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
        />
        <input
          name="symbol"
          value={metadata.symbol}
          onChange={handleInputChange}
          placeholder="Symbol"
          className="w-full bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
        />
        <textarea
          name="description"
          value={metadata.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
          rows={3}
        />
        <input
          name="image"
          value={metadata.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="w-full bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
        />
        <div>
          <h3 className="text-lg font-semibold mb-2 text-purple-400">Attributes</h3>
          {metadata.attributes.map((attr, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                value={attr.trait_type}
                onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                placeholder="Trait Type"
                className="flex-1 bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
              />
              <input
                value={attr.value}
                onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                placeholder="Value"
                className="flex-1 bg-gray-700 text-white border-purple-500 focus:border-green-400 rounded-md p-2"
              />
              <button onClick={() => removeAttribute(index)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Remove
              </button>
            </div>
          ))}
          <button onClick={addAttribute} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md mt-2">
            Add Attribute
          </button>
        </div>
      </div>
      <button onClick={saveMetadata} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md mt-4">
        <Save className="inline-block mr-2 h-4 w-4" /> Save Metadata
      </button>
    </div>
  );
};

export default MetadataComposer;