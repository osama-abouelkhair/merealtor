import React from "react";

import Realestate from "../components/Realestate";
import RealestateStore from "../stores/RealestateStore";
import * as RealestateAction from "../actions/RealestateActions";
import UserStore from "../stores/UserStore";

export default class CategoryList extends React.Component {    
    constructor(){
        super();
        this.getAllCategories = this.getAllCategories.bind(this);
        
            this.state = {
                categories: []
            };
        
    }

    componentWillMount() {
        console.log("mount");
        CategoryStore.on("change", this.getAllCategories);
    }

    componentWillUnmount(){
        CategoryStore.removeListener("change", this.getAllCategories);
    }

    componentWillUpdate(){
        console.log("will update");
        CategoryStore.on("change", this.getAllCategories);
    }

    componentWillReceiveProps(){
        console.log("will recieve props");
        
    }

    shouldComponentUpdate() {
        console.debug('shouldComponentUpdate');
    
        return true;
      }

      componentDidMount(){
        const token = UserStore.getToken();
        console.log("token from did mount ", token);
        if(token !== undefined || token !=="")
        {
            this.setState({
                
                categories: CategoryStore.getAll()
            });
        }
      }
    getAllCategories(){ 
        
        console.log("token ", UserStore.getToken());
        this.setState({
            
            categories: CategoryStore.getAll()
        }
    );
    console.log("state ", this.state);
    
}

    addRealestate() {
        CategoryAction.addRealestate({
            realestateName: "title",
        })
    }

  render() {
    const { realestate } = this.state;
    const Realestate = realestate.map((realestate, i) => {
        return <Realestate key={i} {...realestate}/>;
    });    
    return (
        <div class="row">
            <div class="col">
          <button class="btn btn-primary" onClick={this.addRealestate.bind(this)}>Add</button>
          {Realestate}
          </div>
         </div>
    );
  }
}
