import React, { useState } from 'react';
import {Navigate, Outlet, useNavigate} from 'react-router-dom';

const PrivateComponent=()=>{
    const auth = localStorage.getItem('user');

    return auth?<Outlet/> : <Navigate to="/signup"/>
}

export default PrivateComponent;