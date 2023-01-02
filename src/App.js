import React, {useState} from 'react';
import Field from './components/Field';
import Translate from './components/Translate';
import Languages from './components/Languages';
import './App.css';

function App() {
  const [language, setLanguage] = useState('es');
  const [text, setText] = useState('');

  return (
    <div className="App">
      <Field onChange={setText} />
      <Languages language={language} onLanguageChange={setLanguage} />
      <hr />
      <Translate text={text} language={language} />
    </div>
  );
}

export default App;