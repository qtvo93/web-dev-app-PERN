import React, { Fragment, useState, useEffect } from "react";
import * as MdIcons from "react-icons/md";

const Filter = ({setFilter}) => {
    function handleFitler(currentElement, otherElement, checked) {
        let otherCheckBox = document.getElementById(otherElement)
        if (checked) {
            otherCheckBox.checked = false
            setFilter(currentElement)
        } else {
            setFilter("")
        }  
    } 

    return (
    <Fragment>
        <div style={{fontFamily: 'Source Sans Pro', display: 'block'}} className="d-flex mt-5 justify-content-around">
        <h4 style={{position: 'relative'}}> <MdIcons.MdFilterAlt  size={20}/> Filter Todo:</h4>
        <label style={{marginTop:"2.5px", marginRight:"5px", marginLeft:"8px"}}>
        <input class="btn" style={{
                                position: "relative",
                                // borderRadius: 3,
                                // marginTop: "5px"
                                marginRight: "10px"
                              }} 
                type="checkbox" id="filterDone" onChange={(e)=>handleFitler("filterDone","filterPending",e.target.checked)} >
        </input>
        Done
        </label>
        <label style={{marginTop:"2.5px"}}>
        <input class="btn" style={{
                                position: "relative",
                                // borderRadius: 3,
                                marginLeft: "10px",
                                marginRight: "10px"
                              }} 
                type="checkbox" id="filterPending" onChange={(e)=>handleFitler("filterPending","filterDone",e.target.checked)} >
        </input>
        Pending
        </label>
      </div>
    </Fragment>
    );
  }
  
  export default Filter;