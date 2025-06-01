import { AppNavbar } from '@/app/(app)/app-navbar'
import { Footer } from '@/components/footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppNavbar>{children}</AppNavbar>
            <Footer />
        </>
    )
}
