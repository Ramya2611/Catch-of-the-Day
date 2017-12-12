import React from 'react';
class AddfishForm extends React.Component{
	createFish(event){
		event.preventDefault();
		console.log('Gonna make some Fishes!!!');
			
		const fish={
			name : this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc: this.desc.value,
			image: this.image.value,

		}
		this.props.addFish(fish);
		this.fishForm.reset();

	}


	render(){
		return(
			<form ref={(input)=>this.fishForm=input} className="fish-edit" onSubmit={(e)=>this.createFish(e)}>
			<input ref={(input) => this.name=input} type="text" placeholder="Name" />
			<input ref={(input) => this.price=input} type="text" placeholder="Price" />
			<select ref={(input) => this.status=input}>
				<option value="available">Available</option>
				<option value="unavailable">Out of Stock</option>

			</select>
			<textarea ref={(input) => this.desc=input}placeholder="Description "></textarea>
			<input ref={(input) => this.image=input}type="text" placeholder="Image" />
			<button type="submit">+Add Fish</button>

			</form>
			
			

			)
	}
}

AddfishForm.propTypes = {
	addFish : React.PropTypes.func.isRequired
}
export default AddfishForm;