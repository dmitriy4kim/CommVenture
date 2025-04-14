import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Trophy } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/images/logo.png"
                alt="IT Community of Uzbekistan"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <span className="font-bold text-lg sm:text-xl">CommVenture</span>
          </div>
          <Link href="/onboarding">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to <span className="text-green-600">CommVenture</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-[600px]">
                  Your interactive journey to becoming an IT Community volunteer starts here. Learn, explore, and join
                  our vibrant community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/onboarding">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/onboarding?showRules=true">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Community Rules <BookOpen className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="IT Community Volunteers"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How CommVenture Works</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-[700px] mx-auto">
                An engaging, interactive experience designed to prepare you for volunteering with the IT Community of
                Uzbekistan
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Learn the Rules</h3>
                <p className="text-gray-600">
                  Understand the community guidelines and expectations through an interactive experience
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Complete Challenges</h3>
                <p className="text-gray-600">
                  Navigate through interactive checkpoints and answer questions to test your knowledge
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join the Community</h3>
                <p className="text-gray-600">
                  Successfully complete the journey to receive access to our volunteer Telegram group
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What Our Volunteers Say</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-[700px] mx-auto">
                Hear from members who have already joined our community
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-bold">Alisher Isaev</h4>
                    <p className="text-sm text-gray-500">Frontend Developer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  &quot;Joining the IT Community as a volunteer has been one of the best decisions of my career. I have met
                  amazing people and learned so much!&quot;
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-bold">Malika Rakhimova</h4>
                    <p className="text-sm text-gray-500">UX Designer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  &quot;The onboarding process was fun and engaging. It helped me understand the community values and how I
                  can contribute effectively.&quot;
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-bold">Bobur Umarov</h4>
                    <p className="text-sm text-gray-500">Backend Developer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  &quot;The community has opened so many doors for me professionally. The networking opportunities are
                  incredible!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl max-w-[700px] mx-auto mb-8 text-green-50">
              Start your journey today and become part of the IT Community of Uzbekistan volunteer team
            </p>
            <Link href="/onboarding">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Begin Your Adventure <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/logo.png"
                    alt="IT Community of Uzbekistan"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className="font-bold">CommVenture</span>
              </div>
              <p className="text-gray-400 text-sm">
                An interactive onboarding experience for IT Community of Uzbekistan volunteers.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/onboarding" className="hover:text-white transition-colors">
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link href="/onboarding?showRules=true" className="hover:text-white transition-colors">
                    Community Rules
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://t.me/itcommunityuz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/it-community-of-uzbekistan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} IT Community of Uzbekistan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
