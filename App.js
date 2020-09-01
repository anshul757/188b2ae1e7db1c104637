import React, {Component} from 'react';
import Routes from './app/Routes';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default App;
