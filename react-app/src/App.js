import React from "react";
import PropTypes from 'prop-types';



//state component
class App extends React.Component{
  constructor(){
    super();
    this.state={
      txt:'This is the initial state'
    }
  }
  update (e){
    this.setState({
      txt:e.target.value
    })
  }
  render(){
    return <div>
      <h1>{this.state.txt}</h1>
      <input type="text" onChange={this.update.bind(this)}></input>&nbsp;
      <Button>React</Button>
      </div>
  }
}

const Button=(props)=><button>{props.children}</button>

App.propTypes={
  txt:PropTypes.string
}

App.defaultProps={
  txt:"This is a default value"
}

export default App