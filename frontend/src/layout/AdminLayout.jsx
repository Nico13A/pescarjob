import Footer from "../components/Footer/Footer"
import Navbar from "../components/Navbar/Navbar"

const AdminLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-100 pb-10 min-h-screen px-5 md:px-10">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminLayout
