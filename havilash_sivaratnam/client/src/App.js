import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css';


function App() {
  var foregroundRef = useRef(null);

  return (
    <BrowserRouter>
      <div className="App h-full w-full">
        <div ref={foregroundRef} className='sm:hidden' />
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
