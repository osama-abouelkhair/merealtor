import React from "react";

export default class Category extends React.Component {
    constructor(props) {
        super();

        console.log("props ", props)
    }
    render() {
        const { title } = this.props;
        const { dateTime } = this.props;
        const { img } = this.props;

        return (
            <div class="row">
                <div class="col-md-2">
                    <img src={img}></img>
                </div>
                <div class="col-md-8">
                    <p>{title}</p>
                </div>
                <div class="col-md-2">
                    <h4>{dateTime}</h4>
                </div>
            </div>
        );
    }
}
