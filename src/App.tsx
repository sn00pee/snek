import * as React from 'react'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { AppState } from './store'
import { setFood, FoodAction, foodState } from './store/food'
import { snekState, move, MoveTypes, set, MoveSet } from './store/snek'
import TheSnek from './components/TheSnek'
import TheFood from './components/TheFood'
import './App.scss'

const mapStateToProps = (state: AppState) => ({
  snek: state.snek,
  food: state.food
})

interface AppProps {
  snek: snekState
  food: foodState
  move: typeof move
  set: typeof set
  setFood: typeof setFood
}
interface StateProps {
  showScore: boolean
}

class App extends React.Component<AppProps, StateProps> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      showScore: false
    }
  }

  toggleScore = () => {
    this.setState({
      showScore: !this.state.showScore
    })
  }
  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.food.ate < this.props.food.ate) {
      this.setState({
        showScore: true
      })
    }
  }

  move = (action: MoveTypes) => {
    this.props.move(action)
  }

  set = (action: MoveSet) => {
    this.props.set(action)
  }

  setFood = (action: FoodAction) => {
    this.props.setFood(action)
  }

  render() {
    return (
      <div className="App">
        <CSSTransition classNames="dropdown" in={this.state.showScore} mountOnEnter unmountOnExit timeout={1000} onEntered={this.toggleScore}>
          <header className="header">
            <h1>Snek: {this.props.food.ate}</h1>
          </header>
        </CSSTransition>
        <TheSnek
          pos={this.props.snek}
          length={this.props.food.ate}
          onMove={this.move}
          onMoveSet={this.set}
        />
        <TheFood
          snek={this.props.snek}
          onSet={this.setFood}
          food={this.props.food}
        />
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  { move, set, setFood }
)(App)
