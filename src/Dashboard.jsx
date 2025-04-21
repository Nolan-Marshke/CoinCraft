import supabase from './supabase-client';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [topDeal, setTopDeal] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    const response = await supabase
      .from('sales_deals')
      .select(
        `
        name,
        value
        `,
      )
      .order('value', { ascending: false })
      .limit(1);

    if (response.data && response.data.length > 0) {
      setTopDeal(response.data[0]);
    }
    
    console.log(response);
  }

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        {topDeal && (
          <div>
            <p>Top Deal: {topDeal.name}</p>
            <p>Value: ${topDeal.value}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
