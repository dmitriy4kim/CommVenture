"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, AlertTriangle, BookOpen, GamepadIcon as GameController, Info } from "lucide-react"
import Image from "next/image"
import { communityRules } from "@/lib/community-rules"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [playerName, setPlayerName] = useState("")
  const [nameError, setNameError] = useState(false)
  const [activeTab, setActiveTab] = useState<string>(searchParams.get("showRules") ? "rules" : "welcome")

  const handleStartGame = () => {
    if (!playerName.trim() || !playerName.includes(" ")) {
      setNameError(true)
      return
    }
    setNameError(false)
    localStorage.setItem("commventure_player_name", playerName)
    router.push("/game")
  }

  return (
    <div className="min-h-screen bg-[#77c042]">
      <header className="border-b bg-neutral-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src="/images/logo.png"
                alt="IT Community of Uzbekistan"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-full"
                priority
              />
            </div>
            <span className="font-bold text-lg sm:text-xl text-white">CommVenture</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="welcome" className="text-base cursor-pointer">
                <BookOpen className="h-4 w-4 mr-1" /> Welcome
              </TabsTrigger>
              <TabsTrigger value="rules" className="text-base cursor-pointer">
                <Info className="h-4 w-4 mr-1" />Rules
              </TabsTrigger>
              <TabsTrigger value="start" className="text-base cursor-pointer">
                <GameController className="h-4 w-4 mr-1" />Game
              </TabsTrigger>
            </TabsList>

            {/* Welcome Tab */}
            <TabsContent value="welcome">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-6 relative w-64 h-24">
                    <Image
                      src="/images/it_community.png"
                      alt="IT Community of Uzbekistan"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                  <CardTitle className="text-3xl mb-2">Welcome to CommVenture</CardTitle>
                  <CardDescription className="text-lg">
                    Your interactive journey to becoming an IT Community volunteer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <p>
                      CommVenture is an interactive onboarding experience designed to introduce you to the IT Community
                      of Uzbekistan volunteer team. Through this engaging journey, you will learn about our community
                      values, rules, and expectations.
                    </p>

                    <h3>What to Expect</h3>
                    <p>
                      In this interactive game, you will navigate through a series of checkpoints, each testing your
                      knowledge of our community guidelines. Successfully complete the challenges to earn your place in
                      our volunteer team!
                    </p>

                    <h3>Why This Matters</h3>
                    <p>
                      Understanding our community rules and culture is essential for effective collaboration. This
                      gamified experience makes learning engaging while ensuring you are well-prepared to contribute to
                      our community.
                    </p>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 hover:scale-103 transition-transform duration-300 cursor-pointer">
                    <h3 className="font-medium text-amber-800 text-lg mb-3">Before You Begin:</h3>
                    <ul className="space-y-2 text-amber-700">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Review the Community Rules tab to familiarize yourself with our guidelines</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Prepare to answer questions about these rules during the game</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>You will need to score at least 70% to receive the Telegram group link</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="bg-[#77c042] text-white hover:bg-[#77c045] hover:text-white" asChild>
                    <Link href="/">
                      <ArrowLeft className="mr-1 h-4 w-4" />Home
                    </Link>
                  </Button>
                  <Button className="text-white cursor-pointer bg-neutral-800" onClick={() => setActiveTab("rules")}>
                    View  Rules <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">IT Community Rules & Guidelines</CardTitle>
                  <CardDescription>
                    Please familiarize yourself with these rules before joining our volunteer community
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-y-auto cursor-pointer">
                  <div className="space-y-6">
                    {communityRules.map((rule, index) => (
                      <div key={index} className="p-5 bg-white rounded-lg shadow-sm border">
                        <p className="font-medium text-gray-900 mb-2 text-lg">{rule.question}</p>
                        <p className="text-gray-600">{rule.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className=" cursor-pointer bg-[#77c042] text-white hover:bg-[#77c045] hover:text-white" onClick={() => setActiveTab("welcome")}>
                    <ArrowLeft className="mr-2 h-4 w-4 " /> Back
                  </Button>
                  <Button onClick={() => setActiveTab("start")} className="cursor-pointer">
                    Continue to Game <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Start Game Tab */}
            <TabsContent value="start" className="mb-15">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Ready to Begin Your Journey?</CardTitle>
                  <CardDescription>Enter your information to start the CommVenture game</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="playerName" className="text-sm font-medium block">
                      Enter your full name (First & Last Name)
                    </label>
                    <Input
                      id="playerName"
                      type="text"
                      placeholder="e.g. John Smith"
                      value={playerName}
                      onChange={(e) => {
                        setPlayerName(e.target.value)
                        if (nameError) setNameError(false)
                      }}
                      className={nameError ? "border-red-500" : ""}
                    />
                    {nameError && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Please enter your full name (First & Last Name)
                      </p>
                    )}
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:scale-103 transition-transform duration-300 cursor-pointer">
                    <h3 className="font-medium text-green-800 text-lg mb-3">Game Instructions:</h3>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>
                          Move your character using WASD or arrow keys (desktop) or on-screen controls (mobile)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Visit each checkpoint (green circles) on the map</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Answer questions about community rules at each checkpoint</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Complete all checkpoints and score at least 70% to succeed</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-between">
                <Button variant="outline" onClick={() => setActiveTab("rules")} className="w-full sm:w-auto cursor-pointer cursor-pointer bg-[#77c042] text-white hover:bg-[#77c042] hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Rules
                </Button>
                <Button onClick={handleStartGame} disabled={!playerName.trim()} className="w-full sm:w-auto cursor-pointer ">
                  Start Game <GameController className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t mt-12 py-6 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm text-white">
              © {new Date().getFullYear()} IT Community of Uzbekistan. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/itcommunityuz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-white"
              >
                Telegram
              </a>
              <a
                href="https://www.instagram.com/itcommunityuzb/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/it-community-of-uzbekistan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://www.youtube.com/@ITCommunityofUzbekistan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-white"
              >
                Youtube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
