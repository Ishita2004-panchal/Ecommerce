import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Detail from './components/Detail';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <Router>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/detail/:id' element={<Detail />} />
        </Routes>
      </Router>
      {/* </header> */}
    </div>
  );
}

export default App;
