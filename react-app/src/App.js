import React from "react";



//state component
class App extends React.Component{
  constructor(){
    super();
    this.state={
      friends:['Ron','Harry','James']
    }
    this.handleRemoveFriend=this.handleRemoveFriend.bind(this)
  }

  handleRemoveFriend(name){
    this.setState((currentState)=>{
      return{
        friends:currentState.friends.filter((friend)=>friend!==name)
      }
    })
  }
  
  render(){
    return <div>
       <FriendsList list={this.state.friends} onRemove={this.handleRemoveFriend}/>
      </div>
  }
}

const FriendsList=(props)=>{
   return <ul>
     {props.list.map((name)=>
      <li key={name}>
        <span>{name}</span> &nbsp;
        <button onClick={()=>{props.onRemove(name)}}>Remove</button>
        </li>
     )}
   </ul> 
}

export default App