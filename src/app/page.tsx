import Image from "next/image";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter.tsx";
import Button from "@/components/Button";

export default function Home() {

  return (
    <main>
      <HomeHeader />

      <section>
        <div className="wrapper grid grid-cols-1 place-content-center gap-8 min-h-[90vh] py-20 space-y-20">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg text-center space-y-8">
              <h2 className="text-5xl font-bold">
                Your Expenses, Income,
                & Budgets. Together.
              </h2>

              <p className="text-lg font-bold">
                Track your spending, manage your budget, and achieve your financial goals
                with Takify's easy to use tools and insights.
              </p>

              <div className="flex items-center justify-center">
                <Button href="/signup">Join Now</Button>
              </div>
            </div>
          </div>

          <div className="w-full mx-auto max-w-6xl">
            <div className="relative pr-16">
              <div className="relative aspect-[2/1] border border-takify-light_silver rounded-xl overflow-hidden bg-takify-light_silver shadow-xl">
                <Image src="/assets/images/takify_dashboard.png" alt="Takify Dashbaord" fill objectFit="cover" />
              </div>

              <div className="absolute bottom-0 right-0 z-10 w-[220px] aspect-[1/2.1] overflow-hidden rounded-3xl bg-takify-light_silver">
                <Image
                  src="/assets/images/takify_mobile_home.png"
                  alt="Takify Mobile Home"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeFooter />
    </main>
  )
}