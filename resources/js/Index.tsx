import '../../public/css/app.css';
import React, {useCallback, useEffect, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
// @ts-ignore
import {useStateValue} from "./states/StateProvider";
// @ts-ignore
import Api from "./api/api";
// @ts-ignore
import NotFound from "./views/notFound";
// @ts-ignore
import Register from "./views/forms/register";
// @ts-ignore
import Login from "./views/forms/login";
// @ts-ignore
import Home from "./views/home";
// @ts-ignore
import Sidebar from "./components/layouts/sidebar";

function Index() {

    const [{showNotification,theme}, dispatch] = useStateValue();
    let user: any;
    // @ts-ignore
    user = JSON.parse(localStorage.getItem('user'));
    let admin = user?.admin;

    const getNotification = useCallback(
        async () => {
            (admin)&&
            await Api().get('/notification')
                .then((res: { data: any[]; }) => {
                    res.data.map(notification => {
                        (showNotification) &&
                        toast.warning(notification.message, {
                            position: "bottom-left",
                            closeOnClick:true,
                            hideProgressBar:true,
                            autoClose:100000000,
                        });
                    })
                })
                .catch((e: any) => console.log('error', e));
        },
        [],
    );
    // @ts-ignore
    useEffect(async () => {
        return getNotification().then(r => r);
    }, [getNotification]);

    return (
        <div className={`${theme && 'dark text-white'}`}>
            <div className="overflow-hidden min-h-screen bg-appWhite dark:bg-body2">
                <Router>
                    <Sidebar/>
                    <Routes>
                        <Route path='*' element={<NotFound/>}/>

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

// @ts-ignore
export default Index;

