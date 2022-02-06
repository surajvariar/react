import React from "react";


window.API = {
  fetchFriends() {
    return new Promise((res, rej) => {
      const friends = [
        {
          name: 'Jordyn',
          active: true,
        },
        {
          name: 'Mikenzi',
          active: true,
        },
        {
          name: 'Jake',
          active: false
        }
      ]

      setTimeout(() => res(friends), 2000)
    })
  }
}


//state component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      input: '',
      loading:true
    }
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.handleAddFriend = this.handleAddFriend.bind(this)
    this.clearList=this.clearList.bind(this)
    this.handleFriendsStatus=this.handleFriendsStatus.bind(this)
  }

  

  componentDidMount(){
    window.API.fetchFriends().then((friends)=>{
      this.setState({
          friends,
          loading:false
      })
    })
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
    if(this.state.loading){
      return(
        <Loading/>
      )
    }
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

class Loading extends React.Component{
  constructor(){
    super()
    this.state={
      text:"Loading"
    }
  }
  componentDidMount(){
    const stopper=this.state.text + '...'
    this.interval = window.setInterval(() => {
      this.state.text === stopper
        ? this.setState(() => ({ text: 'Loading' }))
        : this.setState((prevState) => ({ text: prevState.text + '.' }))
    }, 300)
  }

  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render(){
    return <p>{this.state.text}</p>
  }
}

export default App