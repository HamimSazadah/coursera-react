import './App.css';
import Main from './components/MainComponent';
import { Component } from 'react';
import { DISHES } from './shared/dishes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render() {
    return (
      <div className="App">
         <Main />
      </div>
    );
  }

}
export default App;
