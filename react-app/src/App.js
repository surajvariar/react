import React from "react";



//state component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: ['Ron', 'Harry', 'James'],
      inactivefriends:['Josh'],
      input: ''
    }
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
    this.clearList=this.clearList.bind(this)
    this.handleDeactivate=this.handleDeactivate.bind(this)
    this.handleActivate=this.handleActivate.bind(this)
  }

  handleRemoveFriend(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.filter((friend) => friend !== name)
      }
    })
  }

  handleAddFriend() {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.concat([this.state.input]),
        input: ''
      }
    })
  }

  clearList(){
    this.setState(()=>{
      return{
        friends:[],
        inactivefriends:[]
      }
    })
  }

  handleDeactivate(name){
    this.setState((currentState)=>{
      return{
        friends:currentState.friends.filter((friend)=>friend!==name),
        inactivefriends:currentState.inactivefriends.concat([name])
      }
    })
  }

  handleActivate(name){
    this.setState((currentState)=>{
      return{
        inactivefriends:currentState.inactivefriends.filter((friend)=>friend!==name),
        friends:currentState.friends.concat([name])
      }
    })
  }

  updateInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  render() {
    return <div>
      <input type="text" placeholder="New Friend" value={this.state.input} onChange={this.updateInput}></input>
      <button onClick={this.handleAddFriend}>Submit</button>
      <br></br>
      <button onClick={this.clearList}>Clear All</button>
      <FriendsList list={this.state.friends} onRemove={this.handleRemoveFriend} onDeactivate={this.handleDeactivate}/>
      <InactiveFriendsList inactivelist={this.state.inactivefriends} onActivate={this.handleActivate}/>
    </div>
  }
}

const FriendsList = (props) => {
  return (
    <div>
      <h1>Active Friends</h1>
      <ul>
        {props.list.map((name) =>
          <li key={name}>
            <span>{name}</span> &nbsp;
            <button onClick={() => { props.onRemove(name) }}>Remove</button> &nbsp;
            <button onClick={()=>{props.onDeactivate(name)}}>Deactivate</button>
          </li>
        )}
      </ul>
    </div>
  )


}

const InactiveFriendsList=(props)=>{
  return(
    <div>
      <h1>Inactive Friends</h1>
      <ul>
        {props.inactivelist.map((name)=>(
          <li>{name} <button onClick={()=>props.onActivate(name)}>Activate</button></li>
        ))}
      </ul>
    </div>
  )
}

export default App