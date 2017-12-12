import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component{

	goToStore(event){
		event.preventDefault();
		console.log('You changed the URL');
		const storeId = this.storeInput.value;
		console.log(`Going to ${storeId}`);
		this.context.router.transitionTo(`/store/${storeId}`);

	}
	render(){
		return (
			<form className="store-selector" onSubmit={(e)=> this.goToStore(e)}>
			<table>
			<h1>Catch of the day</h1>
	<input type="text" required placeholder="Search" defaultValue={ getFunName() } ref={(input) => {this.storeInput = input} } /><br/>
			<button type="submit">Search</button>
</table>
			</form>

			)
}
}
StorePicker.contextTypes = {
	router: React.PropTypes.object
}
export default StorePicker;