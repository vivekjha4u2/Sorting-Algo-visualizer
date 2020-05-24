import React from 'react';

export default class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // heading: this.props.heading,
            // desc: this.props.desc,
            // wt: "",
            // avgt: "",
            //bt:"",
            // ws: "",

        };
    }
    render() {
        return (
            <div>
                <div>
                    <h2>Algorithm: {this.props.heading}</h2>
                    <p>Description: {this.props.desc}</p>

                </div>
                <div>
                    <h5>Worst time complexity: {this.props.wt}</h5>
                    <h5>Average time complexity: {this.props.avgt}</h5>

                    <h5>Best time complexity: {this.props.bt}</h5>
                    <h5>Worst space complexity: {this.props.ws}</h5>
                </div>
            </div>
        )
    }
}
