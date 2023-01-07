import '../../public/css/app.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {useStateValue} from "./states/StateProvider";
import Home from "./home";

function App() {
    const [darkToggle, setDarkToggle] = React.useState(false)

    return (
        <div className={`h-screen w-full flex items-center justify-center bg-gray-300 flex-col
                        ${darkToggle && 'dark text-white'}`}
        >
            <div className="rounded h-full w-screen overflow-hidden bg-gray-100 p-5 rounded-lg dark:bg-gray-900">
                <label className="toggleDarkBtn">
                    <input type="checkbox" onClick={() => setDarkToggle(!darkToggle)} />
                    <span className="slideBtnTg round"/>
                </label>
                <Router>
                    {/*<Home/>*/}
                    <h2 className='mt-12'>Heyyyyyyyyy</h2>
                    {/*<Routes>*/}
                    {/*    <Route index element={user ? <Navigate to="/armaturenbrett"/> : <Navigate to="/anmeldung"/>}/>*/}
                    {/*    <Route path="/einstellungen" element={user ? <Settings settings={settings}/> : <Navigate to="/anmeldung"/>}/>*/}
                    {/*    {*/}
                    {/*        AdminRouter.map(route => (*/}
                    {/*            <Route key={route.id} path={route.path}*/}
                    {/*                   element={user ? route.component : <Navigate to="/anmeldung"/>}/>*/}
                    {/*        ))*/}
                    {/*    }*/}
                    {/*    <Route path="/anmeldung" element={!user ? <Login/> : <Navigate to="/armaturenbrett"/>}/>*/}
                    {/*</Routes>*/}
                </Router>
                <ToastContainer style={{zIndex: '99999999999'}}/>
            </div>
        </div>

    );
}

export default App;

