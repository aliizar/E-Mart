import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";


export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main >
            <Navbar />

            {children}
            <Footer/>
        </main>
    )
}
