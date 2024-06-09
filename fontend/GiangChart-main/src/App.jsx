import { Route, Routes } from "react-router-dom";

import DashBoard from './DashBoard/DashBoard';
import DataSenior from './DataSenior/DataSenior';
import History from './History/History';
import Profile from './Profile/Profile';




import Header from "./Layout/Header";
function App() {
 return (
  <div className="h-screen">
  <Header />
  <Routes>
       <Route path="*" element={<DashBoard />} />
       <Route path="/data-senior" element={<DataSenior />} />
       <Route path="/history" element={<History />} />
       <Route path="/profile" element={<Profile />} />



  </Routes>
  </div>
 )
}

export default App;
