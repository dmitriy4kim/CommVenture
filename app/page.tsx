import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Trophy } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-neutral-800">
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
            <span className="font-bold text-lg text-white sm:text-xl">CommVenture</span>
          </div>
          <Link href="/onboarding">
            <Button className="cursor-pointer bg-[#77c042] text-white hover:bg-[#77c042]">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24 mb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to <span className="text-[#77c042]">CommVenture</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-[600px]">
                  Your interactive journey to becoming an IT Community volunteer starts here. Learn, explore, and join
                  our vibrant community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/onboarding">
                    <Button size="lg" className="w-full sm:w-auto cursor-pointer bg-[#77c042] hover:bg-[#77c042]">
                      Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/onboarding?showRules=true">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto cursor-pointer  text-[#77c042] hover:text-[#77c042]">
                      View Community Rules <BookOpen className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/images/volunters.png"
                  alt="IT Community Volunteers"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl hover:cursor-pointer hover:scale-103 transition-transform duration-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-neutral-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl  tracking-tighter sm:text-4xl md:text-5xl text-white">How CommVenture Works</h2>
              <p className="mt-4 text-xl text-white max-w-[700px] mx-auto">
                An engaging, interactive experience designed to prepare you for volunteering with the IT Community of
                Uzbekistan
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-neutral-800 rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Learn the Rules</h3>
                <p className="text-gray-400">
                  Understand the community guidelines and expectations through an interactive experience
                </p>
              </div>

              <div className="bg-neutral-800 rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Complete Challenges</h3>
                <p className="text-gray-400">
                  Navigate through interactive checkpoints and answer questions to test your knowledge
                </p>
              </div>

              <div className="bg-neutral-800 rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Join the Community</h3>
                <p className="text-gray-400">
                  Successfully complete the journey to receive access to our volunteer Telegram group
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IT Community Section */}
        <section className="py-16 bg-[#77c042]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl  tracking-tighter sm:text-4xl md:text-5xl text-white">What is the IT Community for you?</h2>
              <p className="mt-4 text-xl text-white max-w-[700px] mx-auto">
                The IT Community is a space where tech enthusiasts grow, connect, and support each other.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-[#77c042] rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl  font-bold mb-2 text-white">🤗 Welcoming and friendly environment</h3>
                <p className="text-white">Always helping and learning from each other.</p>
              </div>

              <div className="bg-[#77c042] rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2 ">🚀 Real projects you can join and contribute to</h3>
                <p className="text-white">Working on hands-on, real-world tech projects.</p>
              </div>

              <div className="bg-[#77c042] rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2 ">🏢 Demo Days – visits to top tech companies and their campuses</h3>
                <p className="text-white">Exploring leading tech companies and their work culture.</p>
              </div>

              <div className="bg-[#77c042] rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2 ">🎯 Access to exclusive internships and job offers</h3>
                <p className="text-white">Get direct access to amazing internship and job opportunities.</p>
              </div>

              <div className="bg-[#77c042] rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2 ]">🎁 Merch & certificates for active volunteers</h3>
                <p className="text-white">Earn cool swag and certificates for your contributions.</p>
              </div>

              <div className="bg-[#77c042] rounded-xl p-6 shadow-sm border border-[#77c042] flex flex-col items-center text-center hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl text-white font-bold mb-2 ">🗓 Weekly meetups with other motivated members</h3>
                <p className="text-white">Join weekly meetups to share ideas and grow together.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-neutral-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">What Our Volunteers Say</h2>
              <p className="mt-4 text-xl text-white max-w-[700px] mx-auto">
                Hear from members who have already joined our community
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              <div className="bg-neutral-800 rounded-xl p-6 shadow-sm border border-[#77c042] cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-bold text-white">Yusufjon Tolibjonov</h4>
                    <p className="text-sm text-gray-500">Frontend Developer</p>
                  </div>
                </div>
                <p className="text-white">
                  &quot;Joining the IT Community as a volunteer has been one of the best decisions of my career. I have met
                  amazing people and learned so much!&quot;
                </p>
              </div>

              

              <div className="bg-neutral-800 rounded-xl p-6 shadow-sm border border-[#77c042] cursor-pointer hover:scale-103 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <h4 className="font-bold text-white">Fayozbek Esirgapov</h4>
                    <p className="text-sm text-gray-500">Backend Developer</p>
                  </div>
                </div>
                <p className="text-white">
                  &quot;The community has opened so many doors for me professionally. The networking opportunities are
                  incredible!&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#77c042] text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl max-w-[700px] mx-auto mb-8 text-green-50">
              Start your journey today and become part of the IT Community of Uzbekistan volunteer team
            </p>
            <Link href="/onboarding">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 cursor-pointer">
                Begin Your Adventure <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-neutral-800 text-white py-12">
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
                    href="https://t.me/itcommunityuzb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/itcommunityuzb/#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@ITCommunityofUzbekistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    You Tube
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

            
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} IT Community of Uzbekistan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
