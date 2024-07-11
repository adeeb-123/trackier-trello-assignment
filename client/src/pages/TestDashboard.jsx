import React from 'react'

const TestDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    <h1 className="text-2xl font-semibold text-gray-800">Sprint Plans</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded p-2 w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className="bg-red-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">+</button>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row mt-6 space-y-4 lg:space-y-0 lg:space-x-4">
                <nav className="w-full lg:w-1/4 bg-white p-4 shadow-md rounded-md">
                    <ul className="space-y-2">
                        <li className="text-green-500 font-semibold">Overview</li>
                        <li className="hover:text-green-500">List</li>
                        <li className="text-green-500 font-semibold">Board</li>
                        <li className="hover:text-green-500">Timeline</li>
                        <li className="hover:text-green-500">Calendar</li>
                        <li className="hover:text-green-500">Dashboard</li>
                        <li className="hover:text-green-500">Messages</li>
                    </ul>
                </nav>

                <main className="flex-1 p-4 bg-white shadow-md rounded-md">
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                        {['Backlog', 'Ready', 'In Progress', 'Done'].map((status) => (
                            <div className="w-full lg:w-1/4 bg-gray-50 p-4 rounded-md shadow-md" key={status}>
                                <h2 className="font-semibold mb-4 text-gray-700">{status}</h2>
                                <div className="space-y-4">
                                    {/* Example task card */}
                                    <div className="bg-white p-4 rounded shadow-sm">
                                        <h3 className="font-semibold text-gray-800">Task Title</h3>
                                        <p className="text-sm text-gray-500">Description</p>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-xs text-blue-500 bg-blue-100 p-1 rounded">Label</span>
                                            <span className="text-xs text-gray-500">Date</span>
                                        </div>
                                    </div>
                                    {/* Add more task cards as needed */}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TestDashboard
