import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import TextToSpeech from './components/TextToSpeech';


function App() {
  return (
    <div className="App">
      <TextToSpeech />
      <footer>
        <a href="https://github.com/SUPERTEMPO/texttospeech">Designed & Developed with <span>&hearts;</span> by Peter Kelvin Torver</a>
      </footer>
    </div>
  );
}

export default App;
