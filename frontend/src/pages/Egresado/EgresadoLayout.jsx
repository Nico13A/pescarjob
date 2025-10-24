import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const EgresadoLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-50 pb-10 min-h-3/4 px-5 md:px-10">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default EgresadoLayout;
