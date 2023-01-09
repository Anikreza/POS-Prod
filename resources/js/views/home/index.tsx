import React, {useState, useEffect} from "react";
// @ts-ignore
import AdminHome from "../../components/adminHome";
// @ts-ignore
import UserHome from "../../components/userHome";

const Home = ({}) => {
    // @ts-ignore
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
