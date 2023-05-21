import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServiceProviderApproval from "./pages/ServiceProviderApproval";
import VerifiedSP from "./pages/VerifiedSP";
import RejectedSP from "./pages/RejectedSP";
import ServiceProvider from "./pages/ServiceProvider";
import ServicePage from "./pages/ServicePage";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
      <Router>
          <Routes>
              <Route path="/login" element={user ? <Navigate to="/" replace /> :  <Login />} />
              <Route path="/register" element={user ? <Navigate to="/" replace /> :  <Register />} />
                {
                user && (
                <>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/serviceproviderapproval/:id" element={<ServiceProviderApproval />} />
                    <Route path="/verifiedSP" element={<VerifiedSP />} />
                    <Route path="/serviceprovider/:id" element={<ServiceProvider />} />
                    <Route path="/service/:id" element={<ServicePage />} />
                    <Route path="/rejectedSP" element={<RejectedSP />} />
                </>
                  )
                }

          </Routes>
      </Router>
    );
}

export default App;
