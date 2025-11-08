import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const EgresadoLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-50 pb-10 min-h-screen px-5 md:px-10">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default EgresadoLayout;