import "./App.css";
import Dashboard from "./components/layout/Dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <div className="container">
          <Dashboard />
        </div>
      </Switch>
    </Router>
  );
};

export default App;
