import Link from "next/link";

export default function DoctorDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Virtual Care</h1>
          <button className="text-red-500 font-semibold hover:underline">Logout</button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Link href="/pending-reports">
            <div className="p-6 bg-blue-100 rounded-lg text-center cursor-pointer hover:bg-blue-200 shadow-md">
              <img src="/icons/reports.png" alt="Pending Reports" className="mx-auto mb-2 w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700">Pending Reports</p>
            </div>
          </Link>
          <Link href="/diagnosis-history">
            <div className="p-6 bg-green-100 rounded-lg text-center cursor-pointer hover:bg-green-200 shadow-md">
              <img src="/icons/history.png" alt="Diagnosis History" className="mx-auto mb-2 w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700">Diagnosis History</p>
            </div>
          </Link>
          <Link href="/profile" className="col-span-2">
            <div className="p-6 bg-yellow-100 rounded-lg text-center cursor-pointer hover:bg-yellow-200 shadow-md">
              <img src="/icons/profile.png" alt="Profile" className="mx-auto mb-2 w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700">Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
