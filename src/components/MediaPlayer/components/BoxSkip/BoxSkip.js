import React from 'react';
import "./styles.css";

const BoxSkip = (props)=>{
return(
    <div className={"box_skip " + props.class_name} >
          <img src={props.src_img} alt={props.alt_img}></img>
    </div>
);
};

export default BoxSkip;