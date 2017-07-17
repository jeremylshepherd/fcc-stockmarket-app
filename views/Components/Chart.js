import React, { Component, } from 'react';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    let show = {...this.props};
    return (
        <div>
          <pre>{JSON.stringify(show, null, 2)}</pre>
        </div>
      );
  }
}