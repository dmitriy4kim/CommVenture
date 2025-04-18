"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import GameEngine from "@/components/game-engine"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { checkpoints, type GameState } from "@/lib/game-data"
import Confetti from "@/components/confetti"
import { ArrowLeft, Trophy, BookOpen, CheckCircle, GamepadIcon as GameController } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function GamePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [gameState, setGameState] = useState<GameState>({
    playerName: "",
    currentPosition: { x: checkpoints[0].x, y: checkpoints[0].y },
    completedCheckpoints: [],
    currentCheckpoint: null,
    score: 0,
    maxScore: checkpoints.length,
    gameStarted: false,
    gameCompleted: false,
    showRules: false,
  })
  const [showIntro, setShowIntro] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [bioText, setBioText] = useState("")
  const [referredBy, setReferredBy] = useState("")

  useEffect(() => {
    // Load player name from localStorage
    const storedName = localStorage.getItem("commventure_player_name")
    if (storedName) {
      setGameState((prev) => ({ ...prev, playerName: storedName }))
      setIsLoading(false)
    } else {
      router.push("/onboarding")
    }
  }, [router])

  const handleStartGame = () => {
    setShowIntro(false)
    setGameState((prev) => ({ ...prev, gameStarted: true }))
  }

  const handleGameComplete = () => {
    setShowConfetti(true)
    setGameState((prev) => ({ ...prev, gameCompleted: true }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent mb-4"></div>
          <p>Loading game...</p>
        </div>
      </div>
    )
  }

  if (showIntro && gameState.playerName) {
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
                  priority
                />
              </div>
              <span className="font-bold text-white text-lg sm:text-xl">CommVenture</span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="text-center border-b pb-6">
                <CardTitle className="text-2xl sm:text-3xl">Welcome, {gameState.playerName}!</CardTitle>
                <CardDescription className="text-lg">
                  You are about to embark on your CommVenture journey
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <GameController className="w-12 h-12 text-green-600" />
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-center text-lg">
                    In this interactive experience, you will navigate through a series of checkpoints to test your
                    knowledge of the IT Community rules and guidelines.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                    <h3 className="font-medium text-green-800 flex items-center text-lg mb-2">
                      <Trophy className="h-5 w-5 mr-2" /> Your Mission
                    </h3>
                    <ul className="text-sm text-green-700 space-y-1.5">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Visit all {checkpoints.length} checkpoints on the map</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Answer questions correctly to earn points</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Complete all checkpoints to finish the game</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Earn at least 7 points to get the Telegram link</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 hover:cursor-pointer hover:scale-103 transition-transform duration-300">
                    <h3 className="font-medium text-amber-800 flex items-center text-lg mb-2">
                      <BookOpen className="h-5 w-5 mr-2" /> Controls
                    </h3>
                    <ul className="text-sm text-amber-700 space-y-1.5">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Desktop: Use WASD or arrow keys to move</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Mobile: Use the on-screen controls to move</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Navigate to the green circles with question marks</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                        <span>Answer questions to progress through the game</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200  hover:cursor-pointer hover:scale-101 transition-transform duration-300">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> This game is designed to test your knowledge of the IT Community rules. If
                    you haven not reviewed them yet, you can go back to the onboarding page to study them before starting.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" className="bg-[#77c042] text-white hover:bg-[#77c042] hover:text-white" asChild>
                  <Link href="/onboarding">
                    <ArrowLeft className=" h-4 w-4" />  Onboarding
                  </Link>
                </Button>
                <Button onClick={handleStartGame} className="px-8 cursor-pointer">
                  Start Game
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  if (gameState.gameCompleted) {
    const passed = gameState.score >= 7 // 70% to pass

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
                  priority
                />
              </div>
              <span className="font-bold text-white text-lg sm:text-xl">CommVenture</span>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {showConfetti && passed && <Confetti />}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="text-center border-b pb-6">
                <CardTitle className="text-2xl sm:text-3xl">
                  {passed ? (
                    <div className="flex items-center justify-center gap-2">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                      Congratulations!
                    </div>
                  ) : (
                    "Almost there!"
                  )}
                </CardTitle>
                <CardDescription className="text-lg">
                  You scored {gameState.score} out of {gameState.maxScore}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {passed ? (
                  <div className="space-y-6">
                    <p className="text-center text-lg">
                      You have successfully completed the CommVenture challenge! You are now ready to join our volunteer
                      community.
                    </p>

                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Please prepare your introduction:</h3>

                      <div>
                        <label htmlFor="bioText" className="text-sm font-medium block mb-1">
                          Short bio:
                        </label>
                        <textarea
                          id="bioText"
                          rows={3}
                          className="w-full p-2 border rounded-md"
                          placeholder="Tell us a bit about yourself..."
                          value={bioText}
                          onChange={(e) => setBioText(e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="referredBy" className="text-sm font-medium block mb-1">
                          Referred by (Name and Telegram username):
                        </label>
                        <Input
                          id="referredBy"
                          placeholder="e.g. John Smith (@johnsmith)"
                          value={referredBy}
                          onChange={(e) => setReferredBy(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-medium text-lg mb-2">Here is your Telegram group link:</p>
                      <a
                        href="https://t.me/+IJD9iZO7WyNhYTk6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline block mb-4 text-lg"
                      >
                        Click here
                      </a>
                      <p className="mb-2 text-gray-700">Copy and paste the following template when you join:</p>
                      <div className="bg-white p-4 rounded border text-sm font-mono">
                        <b>Full Name:</b> {gameState.playerName}
                        <br />
                        <b>Short bio:</b> {bioText || "[Please fill in your bio]"}
                        <br />
                        <b>Referred by:</b> {referredBy || "[Please fill in who referred you]"}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-center text-lg">
                      You need to score at least 7 points to join our volunteer community. Do not worry, you can try
                      again!
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={() => {
                          setGameState({
                            ...gameState,
                            currentPosition: { x: checkpoints[0].x, y: checkpoints[0].y },
                            completedCheckpoints: [],
                            currentCheckpoint: null,
                            score: 0,
                            gameCompleted: false,
                          })
                          setShowConfetti(false)
                        }}
                        size="lg"
                        className="px-8"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button onClick={() => router.push("/")} variant="outline" className="bg-[#77c042] text-white hover:bg-[#77c042] hover:text-white cursor-pointer">
                  Return to Home
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="fixed inset-0">
      {gameState && (
        <GameEngine gameState={gameState} setGameState={setGameState} onGameComplete={handleGameComplete} />
      )}
    </div>
  )
}
