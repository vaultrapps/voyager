import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Rentals from './pages/Rentals';
import Cruises from './pages/Cruises';
import Restaurants from './pages/Restaurants';
import Moving from './pages/Moving';
import Military from './pages/Military';
import International from './pages/International';
import Concierge from './pages/Concierge';
import Deals from './pages/Deals';
import Dashboard from './pages/Dashboard';
import PlanStep1 from './pages/PlanStep1';
import PlanStep2 from './pages/PlanStep2';
import PlanStep3 from './pages/PlanStep3';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/flights"       element={<Flights />} />
            <Route path="/hotels"        element={<Hotels />} />
            <Route path="/rentals"       element={<Rentals />} />
            <Route path="/cruises"       element={<Cruises />} />
            <Route path="/restaurants"   element={<Restaurants />} />
            <Route path="/moving"        element={<Moving />} />
            <Route path="/military"      element={<Military />} />
            <Route path="/international" element={<International />} />
            <Route path="/concierge"     element={<Concierge />} />
            <Route path="/deals"         element={<Deals />} />
            <Route path="/dashboard"     element={<Dashboard />} />
            <Route path="/plan"          element={<PlanStep1 />} />
            <Route path="/plan/compare"  element={<PlanStep2 />} />
            <Route path="/plan/summary"  element={<PlanStep3 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
