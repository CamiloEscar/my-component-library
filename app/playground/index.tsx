import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Button from '../components/demoButtons';

const Playground = () => {
  const [code, setCode] = useState('<Button label="Click Me" />');

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl mb-4">Playground</h2>
      <div className="grid grid-cols-2 gap-4">
        <MonacoEditor
          width="600"
          height="400"
          language="javascript"
          theme="vs-light"
          value={code}
          onChange={handleEditorChange}
        />
        <div className="preview bg-white shadow p-4">
          <h3>Component Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: code }} />
        </div>
      </div>
    </div>
  );
};

export default Playground;
