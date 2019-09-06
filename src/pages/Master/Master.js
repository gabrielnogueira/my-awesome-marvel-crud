import React from 'react';
import api from 'api';

api.get('/characters', {
    limit:1,
}).then(result=>{
    console.log(result);
})

export default ()=><div>Hello World!</div>  