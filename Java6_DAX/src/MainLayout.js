import './App.css';
import { Outlet } from 'react-router-dom';

import Head from './part/user/Header';
import Footer from './part/user/Footer';


const MainLayout = () => {
    return (
        <div>
            <Head/>
            <main>
                <Outlet />
            </main>
            <footer className="bg-dark" id="tempaltemo_footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout; 