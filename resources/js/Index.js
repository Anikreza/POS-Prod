import '../../public/css/app.css';
import React, {useCallback, useEffect, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import {useStateValue} from "./states/StateProvider";
import Api from "./api/api";
import NotFound from "./views/notFound";
import Register from "./views/forms/register";
import Login from "./views/forms/login";
import Home from "./views/home";
import Sidebar from "./components/layouts/sidebar";

function App() {

    const [{showNotification,theme}, dispatch] = useStateValue();
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;

    const getNotification = useCallback(
        async () => {
            (admin)&&
            await Api().get('/notification')
                .then(res => {
                    res.data.map(notification => {
                        (showNotification) &&
                        console.log('noti: ', res.data)
                        toast.warning(notification.message, {
                            position: "bottom-left",
                            closeOnClick:true,
                            hideProgressBar:true,
                            autoClose:100000,
                            onClick:event => console.log(event.target.innerText),
                        });
                    })
                })
                .catch(e => console.log('error', e));
        },
        [],
    );

    useEffect(async () => {
        getNotification().then(r => r)
    }, [getNotification]);
    return (
        <div className={`${theme && 'dark text-white'}`}>
            <div className="overflow-hidden min-h-screen bg-appWhite dark:bg-body2">
                <Router>
                    <Sidebar/>
                    <Routes>
                        <Route path='*' exact={true} element={<NotFound/>}/>

                        <Route path='/' element={<Home/>}/>

                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </Router>
                <ToastContainer style={{zIndex: '99999999999'}}/>
            </div>
        </div>

    );
}

export default App;

