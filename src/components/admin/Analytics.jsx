function Analytics() {
    // Mock data - replace with real data from your backend
    const analytics = {
      totalSales: 1000,
      orders: 50,
      influencerStats: [
        { name: 'Influencer 1', sales: 20, revenue: 400 },
        { name: 'Influencer 2', sales: 15, revenue: 300 },
      ]
    };
  
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Analytics Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold">${analytics.totalSales}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold">{analytics.orders}</p>
          </div>
        </div>
  
        <div>
          <h3 className="text-lg font-semibold mb-4">Influencer Performance</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Influencer</th>
                  <th className="px-4 py-2 text-left">Sales</th>
                  <th className="px-4 py-2 text-left">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {analytics.influencerStats.map((stat, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{stat.name}</td>
                    <td className="px-4 py-2">{stat.sales}</td>
                    <td className="px-4 py-2">${stat.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default Analytics;