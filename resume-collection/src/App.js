// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateResume from './CreateResume';
import ViewResume from './ViewResume';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/student/createresume" component={CreateResume} />
          <Route path="/student/getresume/:role" component={ViewResume} />
        </Switch>
      </Router>
  );
}

export default App;

