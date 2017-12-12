import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state={
      uid:null,
      owner:null
    }
  }
  ComponentDidMount(){
    base.onAuth((user) => {
      if(user){
         this.authHandler(null, {user});
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  }
  authenticate(provider){
    console.log(`Trying to login with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }
  logout(){
    base.unauth();
    this.setState({uid:null});
  }
  authHandler(err, authData){
    console.log(authData);
    if(err){
      console.error(err);
      return;

    }
    const storeRef = base.database().ref(this.props.storeId);

    storeRef.once('value',(snapshot)=>{
      const data = snapshot.val()||{};
      if (!data.owner){
        storeRef.set({
          owner:authData.user.uid
        });
      }
      this.setState({
        uid: authData.user.uid,
        owner:data.owner || authData.user.uid 
      }); 
    });

  }
  renderLogin(){
    return(
      <nav className="login">
      <h2>Inventory</h2>
      <p>Sign in to manage your store's Inventory</p>
      <button className="facebook" onClick={()=>this.authenticate('facebook')}>Login with Facebook</button>
      <button className="twitter" onClick={()=>this.authenticate('twitter')}>Login with Twitter</button>
      <button className="github" onClick={()=>this.authenticate('github')}>Login with GitHub</button>

      </nav>
      )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder="Price"  onChange={(e) => this.handleChange(e, key)}/>

        <select type="text" name="status" value={fish.status} placeholder="Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Available!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name="desc" value={fish.desc} placeholder="Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={(e)=> this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
      const logout = <button onClick={this.logout}>Log Out!</button>

      if(!this.state.uid){
        return <div>{this.renderLogin()}</div>


      }
      if(this.state.uid!==this.state.owner){
        return(
          <div>
            <p>sorry,you are not the owner of this store</p> 
            {logout}
          </div>
          )
      }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}
Inventory.propTypes={
loadSamples: React.PropTypes.func.isRequired,
addFish:React.PropTypes.func.isRequired,
removeFish:React.PropTypes.func.isRequired,
fishes:React.PropTypes.object.isRequired,
updateFish:React.PropTypes.func.isRequired,
storeId:React.PropTypes.string.isRequired,

};


export default Inventory;