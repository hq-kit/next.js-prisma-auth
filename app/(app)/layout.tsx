import { auth } from '@/auth'
import { AppNavbar } from '@/components/app-navbar'
import { Footer } from '@/components/footer'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    return (
        <>
            <AppNavbar user={session?.user}>{children}</AppNavbar>
            <Footer />
        </>
    )
}
