import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "../header/Header";
import OverallTransfers from "../overall-transfers/OverallTransfers";
import SickLeaves from "../sick-leaves/SickLeaves";
import Wages from '../wages/Wages';

const Main = () => {
    return (
        <div>
            <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" element={<Wages />}></Route>
                    <Route path="/wages" element={<Wages />}></Route>
                    {/* <Route path={["/","/wages"]} element={<Wages />}></Route> */}
                    <Route path="sick-leaves" element={<SickLeaves />}></Route>
                    <Route path="overall-transfers" element={<OverallTransfers />}></Route>
                </Routes>
            </BrowserRouter>
        </div>        
    );
};

export default Main;