import React, {useState, useEffect} from "react";
import AdminHome from "../../components/adminHome";
import UserHome from "../../components/userHome";

const Home = ({}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    let role = user?.user.role;

    return (
        <div>
            {
                role === 'admin' ?
                    <AdminHome/>
                    :
                    <UserHome/>
            }
        </div>
    )
}

export default Home
