import React from "react";



//state component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [{
        name:'Ron',
        active:true
      },{
        name:'Harry',
        active:true
      },{
        name:'Jack',
        active:false
      }],
      input: ''
    }
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
    this.clearList=this.clearList.bind(this)
    this.handleFriendsStatus=this.handleFriendsStatus.bind(this)
  }

  handleRemoveFriend(name) {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.filter((friend) => friend.name !== name)
      }
    })
  }

  handleAddFriend() {
    this.setState((currentState) => {
      return {
        friends: currentState.friends.concat([{
          name:currentState.input,
          active:true
        }]),
        input: ''
      }
    })
  }

  clearList(){
    this.setState(()=>{
      return{
        friends:[],
      }
    })
  }

handleFriendsStatus(name){
  const tempfriend=this.state.friends.find((friend)=>friend.name===name)
this.setState((currentState)=>{
  return{
    friends:currentState.friends.filter((friend)=>friend.name!==name).concat([{
      name,
      active:!tempfriend.active
    }])
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
      <FriendsList list={this.state.friends.filter((freind)=>freind.active===true)} onRemove={this.handleRemoveFriend} onDeactivate={this.handleFriendsStatus} />
      <InactiveFriendsList list={this.state.friends.filter((freind)=>freind.active===false)} onActivate={this.handleFriendsStatus}/>
    </div>
  }
}

const FriendsList = (props) => {
  return (
    <div>
      <h1>Active Friends</h1>
      <ul>
        {props.list.map((friend) =>
          <li key={friend.name}>
            <span>{friend.name}</span> &nbsp;
            <button onClick={() => { props.onRemove(friend.name) }}>Remove</button> &nbsp;
            <button onClick={()=>{props.onDeactivate(friend.name)}}>Deactivate</button>
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
        {props.list.map((friend)=>(
          <li key={friend.name}>{friend.name} <button onClick={()=>props.onActivate(friend.name)}>Activate</button></li>
        ))}
      </ul>
    </div>
  )
}

export default App