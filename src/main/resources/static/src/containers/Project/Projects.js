import React, { Component } from 'react';
import Item from '../../components/Item/Item';

class Projects extends Component {

    state = {
        projects: [
            { name: 'Project 1', description: 'Description' },
            { name: 'Project 2', description: 'Description' },
            { name: 'Project 3', description: 'Description' },
        ]
    }
    detailsHandler = (id) => {
        //we need to go to a project page with the project ID
    }

    /*changing lists:
        nameChangeHandler = (event, id) => {
            const personIndex = this.state.persons.findIndex(p => {
                return p.id === id;
            });
            const person = {
                ...this.state.persons[PersonIndex]
            };
            person.name = event.target.value;

            const persons = [...this.state.persons];
            persons[personINdex] = person;
            this.setState({persons: persons});
        }
    
    */

    render() {
        return (
            <div>
                {/* <Item detailsHandler={this.detailsHandler.bind(this, "id")} />
                <Item detailsHandler={this.detailsHandler.bind(this, "id")} />
                <Item detailsHandler={this.detailsHandler.bind(this, "id")} /> */}
                {
                    this.state.projects.map((project, index) => {
                        return <Item
                            detailsHandler={() => this.detailsHandler(index)}
                            name={project.name}
                            description={project.description}
                        />
                        {/*key={this should be somthing unique not the index}*/ }
                    })
                }
            </div>
        )
    }
}

export default Projects;