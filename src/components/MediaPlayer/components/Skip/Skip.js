import React from 'react';
import "./styles.css";

const Skip=(props)=>{
return(
    <div className='skip_intro'>
        {props.message}
    </div>
);
};

export default Skip;