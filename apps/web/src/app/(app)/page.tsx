import { HeaderComponent } from '@/components/layout/header/header'

export default async function Home() {
  return (
    <div className="py-4">
      <HeaderComponent />
      <main>MY MAIN CONTENT HERE...</main>
    </div>
  )
}
