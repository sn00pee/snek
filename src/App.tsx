import * as React from 'react';
import { connect } from 'react-redux'
import { AppState } from './store'
import { snekState, move, MoveTypes, set, MoveSet } from './store/snek'
import TheSnek from './components/TheSnek'
import TheFood from './components/TheFood'
import './App.scss';

const mapStateToProps = (state: AppState) => ({
  snek: state.snek
})

interface AppProps {
  snek: snekState
  move: typeof move,
  set: typeof set
}

class App extends React.Component<AppProps> {

  move = (action: MoveTypes) => {
    this.props.move(action)
  }

  set = (action: MoveSet) => {
    this.props.set(action)
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>Snek</h1>
        </header>
        <TheSnek pos={this.props.snek} onMove={this.move} onMoveSet={this.set} />
        <TheFood />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { move, set }
)(App);
