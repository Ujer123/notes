import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Note from './Note';
import Write from './Write';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/write" element={<Write />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
