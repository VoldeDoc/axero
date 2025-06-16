
import Navbar from "@/components/Layout/header/navbar"
import Footer from "./footer/footer"
import Headline from "./header/Tools/Headline"
interface Props {
    children: React.ReactNode
    }

export default function LandingPageLayout({ children }: Props) {
  return (
    <>
    <Headline/>
    <Navbar/>
    <main>
        {children}
    </main>
    <Footer/>
    </>
  )
}
