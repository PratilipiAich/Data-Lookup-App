import React, { Component, useState, useEffect } from "react";
import Axios from "axios";
import MaterialTable from "material-table";
import * as ReactBootstrap from "react-bootstrap";
import SplitButton from "./SplitButton";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsReturned: false,
      liked: false
    };
    if (JSON.parse(window.localStorage.getItem("bankData")))
      this.bankData = JSON.parse(window.localStorage.getItem("bankData"));
    else this.bankData = [];
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let city = "MUMBAI"
    if(JSON.parse(window.localStorage.getItem("city")))
      city = JSON.parse(window.localStorage.getItem("city"))
  
    const resApi = await Axios.get(
      `https://vast-shore-74260.herokuapp.com/banks?city=${city}`
    );
    this.bankData = resApi.data;
    this.setState({
      dataIsReturned: true,
    });
    window.localStorage.setItem("bankData", JSON.stringify(this.bankData));
    //window.location.reload()
  }
  
  handleLiked = () => {
    // this.setState({
    //     liked: true
    // })
      if (this.state.liked){
this.setState({
    liked: false
})}
else{
this.setState({
    liked: true
})
}
  }
  render() {
    const columns = [
        {
            field: '',
            title: 'Favorites',
            render: rowData => 

            this.state.liked?
            <FavoriteIcon style={{ fontSize: 30, color: 'red', cursor: 'pointer' }} onClick={(e)=> this.handleLiked(this.bankData)}/>
            :
            <FavoriteBorderIcon style={{ fontSize: 30, color: 'red', cursor: 'pointer' }}  
            onClick={(e)=> this.handleLiked(this.bankData)}/>
            //this.state.liked ?
           // <FavoriteIcon onClick={this.handleClick()} style={{color: 'red', width: 50, borderRadius: '50%', cursor: 'pointer'}}/>:
           // <FavoriteBorderIcon onClick={this.handleClick()} style={{color: 'red', width: 50, borderRadius: '50%', cursor: 'pointer'}}/>
          },
      {
        title: "Bank Id",
        field: "bank_id",
      },
      {
        title: "Bank Name",
        field: "bank_name",
      },
      {
        title: "Branch",
        field: "branch",
      },
      {
        title: "IFSC",
        field: "ifsc",
      },
      {
        title: "District",
        field: "district",
      },
      {
        title: "City",
        field: "city",
      },
      {
        title: "State",
        field: "state",
      },
      {
        title: "Address",
        field: "address",
      },
    ];

    return this.state.dataIsReturned ? (
        <div>
        <SplitButton/>
        <br/><br/>
      <MaterialTable
        title="Bank Search Application"
        data={this.bankData}
        columns={columns}
        options={{
          title: false,
        }}
      />
      </div>
    ) : (
      <h4>
        Loading {" "} <ReactBootstrap.Spinner animation="border" />
      </h4>
    );
  }
}
export default Table;
