import React, {useState, useEffect} from "react";
import {useTranslation} from 'react-i18next'

const UserHome = () => {
    const {t} = useTranslation();

    return (
        <div className='p-10'>
            <h2 className='text-center'>{t('choose')} </h2>
        </div>
    )
}

export default UserHome
