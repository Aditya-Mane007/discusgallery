import React from "react";

async function Dashboard() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return <div>Dashboard</div>;
}

export default Dashboard;
