import * as React from 'react';
import { connect } from 'react-redux'
import { AppState } from './store'
import { snekState, move, MoveTypes } from './store/snek'
import TheSnek from './components/TheSnek'
import TheFood from './components/TheFood'
import './App.scss';

const mapStateToProps = (state: AppState) => ({
  snek: state.snek
})

interface AppProps {
  snek: snekState
  move: typeof move
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    console.log(this.props.snek)
  }

  move = (action: MoveTypes) => {
    this.props.move(action)
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Snek</h1>
        </header>
        <TheSnek pos={this.props.snek} onMove={this.move}  />
        <TheFood />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { move }
)(App);
