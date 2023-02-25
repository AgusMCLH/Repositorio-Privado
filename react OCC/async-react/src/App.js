import Test from './component/promises/promises';
import Nav from './component/Nav/nav';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './routes/Home/Home';
import People from './routes/detail/People';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/people/:id" element={<People></People>}></Route>
          <Route exact path="/people" element={<People></People>}></Route>
          <Route exact path="/test" element={<Test></Test>}></Route>
        </Routes>

        {/* <Test /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
