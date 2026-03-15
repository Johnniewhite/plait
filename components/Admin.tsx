import React, { useState } from 'react';

interface Submission {
  _id: string;
  formType: string;
  [key: string]: any;
}

const COLLECTIONS = [
  { key: 'USER_WAITLIST', label: 'User Waitlist' },
  { key: 'STYLIST_WAITLIST', label: 'Stylist Waitlist' },
  { key: 'NOMINATE', label: 'Nominations' },
  { key: 'CONTACT', label: 'Contact Submissions' },
];

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('USER_WAITLIST');
  const [data, setData] = useState<Record<string, Submission[]>>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'plaitapp') {
      setAuthenticated(true);
      setError('');
      fetchData('USER_WAITLIST');
    } else {
      setError('Incorrect password');
    }
  };

  const fetchData = async (formType: string) => {
    setLoading(true);
    setActiveTab(formType);
    try {
      const res = await fetch(`/api/admin?formType=${formType}`);
      const json = await res.json();
      if (json.data) {
        setData((prev) => ({ ...prev, [formType]: json.data }));
      }
    } catch {
      console.error('Failed to fetch data');
    }
    setLoading(false);
  };

  const entries = data[activeTab] || [];

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="flex gap-2 mb-6 flex-wrap">
          {COLLECTIONS.map((col) => (
            <button
              key={col.key}
              onClick={() => fetchData(col.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === col.key
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-500">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  {Object.keys(entries[0])
                    .filter((k) => k !== '_id' && k !== 'formType')
                    .map((key) => (
                      <th key={key} className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry._id || i} className="border-b last:border-0 hover:bg-gray-50">
                    {Object.entries(entry)
                      .filter(([k]) => k !== '_id' && k !== 'formType')
                      .map(([key, val]) => (
                        <td key={key} className="px-4 py-3 text-sm text-gray-800">
                          {val instanceof Object ? JSON.stringify(val) : String(val ?? '')}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
