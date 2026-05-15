import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layout/layout";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Appointment = lazy(() => import("./pages/appointment"));
const Patients = lazy(() => import("./pages/patients"));
const Doctors = lazy(() => import("./pages/doctors"));
const Schedule = lazy(() => import("./pages/schedule"));
const BillingPage = lazy(() => import("./pages/billing"));

export default function App() {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointment />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/billing" element={<BillingPage />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
