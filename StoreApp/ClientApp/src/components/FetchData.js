import React, { Component } from 'react';

export class FetchData extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }

    componentDidMount() {
        this.getItemData();
  }

  render() {
      const {items} = this.state
    return (
      <div>
            <ul>
                {items && items.length > 0 ? items.map(item => {
                    return <li key={item.id}>item.name  item.price</li>
                }) : "No Items found"}
                   
                 
            </ul>
      </div>
    );
  }

  async getItemData() {
    const response = await fetch('api/getitems');
    const data = await response.json();
    this.setState({ items: data, loading: false });
  }
}
