import React, { useEffect } from "react";
import "../styles/TitleBar.css"

const TitleBar = ({ onToggleSidebar }) => { // Add the onToggleSidebar prop here
    useEffect(() => {
        document.getElementById('minimize').addEventListener('click', () => {
            window.electron.minimizeApp();
        });

        document.getElementById('maximize').addEventListener('click', () => {
            window.electron.maximizeApp();
        });

        document.getElementById('close').addEventListener('click', () => {
            window.electron.closeApp();
        });
    }, []);

    return (
        <div className='topbar'>
            <div className='titlebar'>
                <button id='showHideMenus' className='toggleButton' onClick={onToggleSidebar}></button>
                <div className='title'>BudgetBuddy</div>
            </div>
            <div className='titleBarBtns'>
                <button id='minimize' className='topBtn minimizeBtn'></button>
                <button id='maximize' className='topBtn maximizeBtn'></button>
                <button id='close' className='topBtn closeBtn'></button>
            </div>
        </div>
    )
}

export default TitleBar
