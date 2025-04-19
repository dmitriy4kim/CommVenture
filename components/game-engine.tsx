"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { type GameState, gameMap, checkpoints } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"

interface GameEngineProps {
  gameState: GameState
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
  onGameComplete: () => void
}

const GameEngine: React.FC<GameEngineProps> = ({ gameState, setGameState, onGameComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const animationFrameRef = useRef<number>(0)
  const characterImageRef = useRef<HTMLImageElement | null>(null)
  const checkpointImageRef = useRef<HTMLImageElement | null>(null)
  const completedCheckpointImageRef = useRef<HTMLImageElement | null>(null)
  const mapRef = useRef({ offsetX: 0, offsetY: 0 })

  useEffect(() => {
    // Load character image
    const characterImg = new Image()
    characterImg.src = "/images/character.png"
    characterImg.crossOrigin = "anonymous"
    characterImg.onload = () => {
      characterImageRef.current = characterImg
    }

    // Create checkpoint images
    const checkpointImg = document.createElement("canvas")
    checkpointImg.width = gameMap.checkpointSize
    checkpointImg.height = gameMap.checkpointSize
    const ctxCheckpoint = checkpointImg.getContext("2d")
    if (ctxCheckpoint) {
      ctxCheckpoint.fillStyle = "#4ADE80"
      ctxCheckpoint.beginPath()
      ctxCheckpoint.arc(
        gameMap.checkpointSize / 2,
        gameMap.checkpointSize / 2,
        gameMap.checkpointSize / 2,
        0,
        Math.PI * 2,
      )
      ctxCheckpoint.fill()
      ctxCheckpoint.strokeStyle = "white"
      ctxCheckpoint.lineWidth = 2
      ctxCheckpoint.stroke()
      ctxCheckpoint.fillStyle = "white"
      ctxCheckpoint.font = "bold 20px Arial"
      ctxCheckpoint.textAlign = "center"
      ctxCheckpoint.textBaseline = "middle"
      ctxCheckpoint.fillText("?", gameMap.checkpointSize / 2, gameMap.checkpointSize / 2)
    }
    const checkpointImgData = checkpointImg.toDataURL()
    const checkpointImgObj = new Image()
    checkpointImgObj.src = checkpointImgData
    checkpointImgObj.onload = () => {
      checkpointImageRef.current = checkpointImgObj
    }

    // Create completed checkpoint image
    const completedCheckpointImg = document.createElement("canvas")
    completedCheckpointImg.width = gameMap.checkpointSize
    completedCheckpointImg.height = gameMap.checkpointSize
    const ctxCompletedCheckpoint = completedCheckpointImg.getContext("2d")
    if (ctxCompletedCheckpoint) {
      ctxCompletedCheckpoint.fillStyle = "#10B981"
      ctxCompletedCheckpoint.beginPath()
      ctxCompletedCheckpoint.arc(
        gameMap.checkpointSize / 2,
        gameMap.checkpointSize / 2,
        gameMap.checkpointSize / 2,
        0,
        Math.PI * 2,
      )
      ctxCompletedCheckpoint.fill()
      ctxCompletedCheckpoint.strokeStyle = "white"
      ctxCompletedCheckpoint.lineWidth = 2
      ctxCompletedCheckpoint.stroke()
      ctxCompletedCheckpoint.fillStyle = "white"
      ctxCompletedCheckpoint.beginPath()
      const size = gameMap.checkpointSize * 0.3
      ctxCompletedCheckpoint.moveTo(gameMap.checkpointSize / 2 - size, gameMap.checkpointSize / 2)
      ctxCompletedCheckpoint.lineTo(gameMap.checkpointSize / 2 - size / 2, gameMap.checkpointSize / 2 + size / 2)
      ctxCompletedCheckpoint.lineTo(gameMap.checkpointSize / 2 + size, gameMap.checkpointSize / 2 - size / 2)
      ctxCompletedCheckpoint.lineWidth = 3
      ctxCompletedCheckpoint.stroke()
    }
    const completedCheckpointImgData = completedCheckpointImg.toDataURL()
    const completedCheckpointImgObj = new Image()
    completedCheckpointImgObj.src = completedCheckpointImgData
    completedCheckpointImgObj.onload = () => {
      completedCheckpointImageRef.current = completedCheckpointImgObj
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key.toLowerCase()]: true }))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key.toLowerCase()]: false }))
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !gameState || gameState.currentCheckpoint) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const render = () => {
      if (!canvasRef.current || !gameState) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Update player position based on keys
      const speed = gameMap.baseSpeed
      let newX = gameState.currentPosition.x
      let newY = gameState.currentPosition.y

      if (keys["w"] || keys["arrowup"]) newY -= speed
      if (keys["s"] || keys["arrowdown"]) newY += speed
      if (keys["a"] || keys["arrowleft"]) newX -= speed
      if (keys["d"] || keys["arrowright"]) newX += speed

      // Boundary checks
      newX = Math.max(gameMap.playerSize / 2, Math.min(newX, gameMap.width - gameMap.playerSize / 2))
      newY = Math.max(gameMap.playerSize / 2, Math.min(newY, gameMap.height - gameMap.playerSize / 2))

      // Update map offset to center the player
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      mapRef.current.offsetX = Math.max(0, Math.min(newX - canvasWidth / 2, gameMap.width - canvasWidth))
      mapRef.current.offsetY = Math.max(0, Math.min(newY - canvasHeight / 2, gameMap.height - canvasHeight))

      // Check for checkpoint collision
      for (const checkpoint of checkpoints) {
        if (!gameState.completedCheckpoints.includes(checkpoint.id)) {
          const distance = Math.sqrt(Math.pow(newX - checkpoint.x, 2) + Math.pow(newY - checkpoint.y, 2))

          if (distance < (gameMap.playerSize / 2 + gameMap.checkpointSize / 2) * 0.8) {
            setGameState((prevState) => ({
              ...prevState,
              currentCheckpoint: checkpoint,
            }))
            break
          }
        }
      }

      // Update position
      setGameState((prevState) => ({
        ...prevState,
        currentPosition: { x: newX, y: newY },
      }))

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#f5f7f9"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw path
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 20
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.beginPath()
      let firstCheckpoint = true
      for (const checkpoint of checkpoints) {
        const x = checkpoint.x - mapRef.current.offsetX
        const y = checkpoint.y - mapRef.current.offsetY
        if (firstCheckpoint) {
          ctx.moveTo(x, y)
          firstCheckpoint = false
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw checkpoints
      for (const checkpoint of checkpoints) {
        const x = checkpoint.x - mapRef.current.offsetX
        const y = checkpoint.y - mapRef.current.offsetY

        // Check if the checkpoint is visible on screen
        if (
          x >= -gameMap.checkpointSize &&
          x <= canvas.width + gameMap.checkpointSize &&
          y >= -gameMap.checkpointSize &&
          y <= canvas.height + gameMap.checkpointSize
        ) {
          if (gameState.completedCheckpoints.includes(checkpoint.id)) {
            if (completedCheckpointImageRef.current) {
              ctx.drawImage(
                completedCheckpointImageRef.current,
                x - gameMap.checkpointSize / 2,
                y - gameMap.checkpointSize / 2,
                gameMap.checkpointSize,
                gameMap.checkpointSize,
              )
            }
          } else {
            if (checkpointImageRef.current) {
              ctx.drawImage(
                checkpointImageRef.current,
                x - gameMap.checkpointSize / 2,
                y - gameMap.checkpointSize / 2,
                gameMap.checkpointSize,
                gameMap.checkpointSize,
              )
            }
          }

          // Draw checkpoint number
          ctx.fillStyle = "black"
          ctx.font = "bold 14px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "top"
          ctx.fillText(`${checkpoint.id}`, x, y + gameMap.checkpointSize / 2 + 5)
        }
      }

      // Draw player
      const playerX = gameState.currentPosition.x - mapRef.current.offsetX
      const playerY = gameState.currentPosition.y - mapRef.current.offsetY

      if (characterImageRef.current) {
        ctx.drawImage(
          characterImageRef.current,
          playerX - gameMap.playerSize / 2,
          playerY - gameMap.playerSize / 2,
          gameMap.playerSize,
          gameMap.playerSize,
        )
      } else {
        ctx.fillStyle = "#4f46e5"
        ctx.beginPath()
        ctx.arc(playerX, playerY, gameMap.playerSize / 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw player name
      ctx.fillStyle = "#1f2937"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(gameState.playerName, playerX, playerY - gameMap.playerSize / 2 - 20)

      // Draw UI for mobile controls
      if (window.innerWidth < 768) {
        const controlSize = 50
        const margin = 20
        const alpha = 0.5
      
        // Up arrow
        ctx.fillStyle = `rgba(79, 70, 229, ${keys["arrowup"] ? 0.7 : alpha})`
        ctx.beginPath()
        ctx.arc(canvas.width - margin - controlSize * 1.5, canvas.height - margin - controlSize * 1.5, controlSize/2, 0, Math.PI * 2)
        ctx.fill()
        
        // Up arrow strelka
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        const upX = canvas.width - margin - controlSize * 1.5
        const upY = canvas.height - margin - controlSize * 1.5
        // Strelka (up)
        ctx.moveTo(upX, upY + 10)
        ctx.lineTo(upX, upY - 10)
        ctx.moveTo(upX - 8, upY - 2)
        ctx.lineTo(upX, upY - 10)
        ctx.lineTo(upX + 8, upY - 2)
        ctx.stroke()
      
        // Down arrow - originalga nisbatan biroz yuqoriroq (controlSize * 0.5 ga)
        ctx.fillStyle = `rgba(79, 70, 229, ${keys["arrowdown"] ? 0.7 : alpha})`
        ctx.beginPath()
        ctx.arc(canvas.width - margin - controlSize * 1.5, canvas.height - margin - controlSize * 0.5, controlSize/2, 0, Math.PI * 2)
        ctx.fill()
        
        // Down arrow strelka
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        const downX = canvas.width - margin - controlSize * 1.5
        const downY = canvas.height - margin - controlSize * 0.5
        // Strelka (down)
        ctx.moveTo(downX, downY - 10)
        ctx.lineTo(downX, downY + 10)
        ctx.moveTo(downX - 8, downY + 2)
        ctx.lineTo(downX, downY + 10)
        ctx.lineTo(downX + 8, downY + 2)
        ctx.stroke()
      
        // Left arrow
        ctx.fillStyle = `rgba(79, 70, 229, ${keys["arrowleft"] ? 0.7 : alpha})`
        ctx.beginPath()
        ctx.arc(margin + controlSize / 2, canvas.height - margin - controlSize * 1.5, controlSize/2, 0, Math.PI * 2)
        ctx.fill()
        
        // Left arrow strelka
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        const leftX = margin + controlSize / 2
        const leftY = canvas.height - margin - controlSize * 1.5
        // Strelka (left)
        ctx.moveTo(leftX + 10, leftY)
        ctx.lineTo(leftX - 10, leftY)
        ctx.moveTo(leftX - 2, leftY - 8)
        ctx.lineTo(leftX - 10, leftY)
        ctx.lineTo(leftX - 2, leftY + 8)
        ctx.stroke()
      
        // Right arrow
        ctx.fillStyle = `rgba(79, 70, 229, ${keys["arrowright"] ? 0.7 : alpha})`
        ctx.beginPath()
        ctx.arc(margin + controlSize * 1.5, canvas.height - margin - controlSize * 1.5, controlSize/2, 0, Math.PI * 2)
        ctx.fill()
        
        // Right arrow strelka
        ctx.beginPath()
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        const rightX = margin + controlSize * 1.5
        const rightY = canvas.height - margin - controlSize * 1.5
        // Strelka (right)
        ctx.moveTo(rightX - 10, rightY)
        ctx.lineTo(rightX + 10, rightY)
        ctx.moveTo(rightX + 2, rightY - 8)
        ctx.lineTo(rightX + 10, rightY)
        ctx.lineTo(rightX + 2, rightY + 8)
        ctx.stroke()
      }

      // Draw progress indicator
      const progressWidth = canvas.width * 0.8
      const progressHeight = 10
      const progressX = (canvas.width - progressWidth) / 2
      const progressY = 50

      // Background
      ctx.fillStyle = "#e5e7eb"
      ctx.beginPath()
      ctx.roundRect(progressX, progressY, progressWidth, progressHeight, 5)
      ctx.fill()

      // Progress
      const progress = gameState.completedCheckpoints.length / checkpoints.length
      ctx.fillStyle = "#10B981"
      ctx.beginPath()
      ctx.roundRect(progressX, progressY, progressWidth * progress, progressHeight, 5)
      ctx.fill()

      // Text
      ctx.fillStyle = "#1f2937"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(
        `Progress: ${gameState.completedCheckpoints.length}/${checkpoints.length}`,
        canvas.width / 2,
        progressY - 5,
      )

      // Score
      ctx.fillStyle = "#1f2937"
      ctx.font = "14px Arial"
      ctx.textAlign = "right"
      ctx.textBaseline = "top"
      ctx.fillText(`Score: ${gameState.score}/${gameState.maxScore}`, canvas.width - 20, 20)

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)
    animationFrameRef.current = animationFrameId

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [gameState, keys, setGameState])

  useEffect(() => {
    // Function to handle canvas resizing
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    // Initial sizing
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Virtual joystick touch handlers for mobile
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      // Check if touch is in one of the control areas
      const controlSize = 50
      const margin = 20
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      // Up arrow area
      if (
        x >= canvasWidth - margin - controlSize * 2 &&
        x <= canvasWidth - margin - controlSize &&
        y >= canvasHeight - margin - controlSize * 2 &&
        y <= canvasHeight - margin - controlSize
      ) {
        setKeys((prevKeys) => ({ ...prevKeys, arrowup: true }))
      }

      // Down arrow area
      else if (
        x >= canvasWidth - margin - controlSize * 2 &&
        x <= canvasWidth - margin - controlSize &&
        y >= canvasHeight - margin - controlSize &&
        y <= canvasHeight - margin
      ) {
        setKeys((prevKeys) => ({ ...prevKeys, arrowdown: true }))
      }

      // Left arrow area
      else if (
        x >= margin &&
        x <= margin + controlSize &&
        y >= canvasHeight - margin - controlSize * 2 &&
        y <= canvasHeight - margin
      ) {
        setKeys((prevKeys) => ({ ...prevKeys, arrowleft: true }))
      }

      // Right arrow area
      else if (
        x >= margin + controlSize &&
        x <= margin + controlSize * 2 &&
        y >= canvasHeight - margin - controlSize * 2 &&
        y <= canvasHeight - margin
      ) {
        setKeys((prevKeys) => ({ ...prevKeys, arrowright: true }))
      }
    }

    const handleTouchEnd = () => {
      setKeys((prevKeys) => ({
        ...prevKeys,
        arrowup: false,
        arrowdown: false,
        arrowleft: false,
        arrowright: false,
      }))
    }

    canvas.addEventListener("touchstart", handleTouchStart, { passive: false })
    canvas.addEventListener("touchend", handleTouchEnd)
    canvas.addEventListener("touchcancel", handleTouchEnd)

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      canvas.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [])

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  // Handle answer submission
  const handleSubmit = () => {
    if (!selectedAnswer || !gameState || !gameState.currentCheckpoint) return

    const correct = selectedAnswer === gameState.currentCheckpoint.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }))
    }
  }

  // Handle continue after seeing result
  const handleContinue = () => {
    if (!gameState || !gameState.currentCheckpoint) return

    setSelectedAnswer(null)
    setShowResult(false)

    setGameState((prevState) => {
      if (!prevState.currentCheckpoint) return prevState

      const newCompletedCheckpoints = [...prevState.completedCheckpoints]
      if (!newCompletedCheckpoints.includes(prevState.currentCheckpoint.id)) {
        newCompletedCheckpoints.push(prevState.currentCheckpoint.id)
      }

      // Check if all checkpoints are completed
      if (newCompletedCheckpoints.length === checkpoints.length) {
        onGameComplete()
        return {
          ...prevState,
          completedCheckpoints: newCompletedCheckpoints,
          currentCheckpoint: null,
          gameCompleted: true,
        }
      }

      return {
        ...prevState,
        completedCheckpoints: newCompletedCheckpoints,
        currentCheckpoint: null,
      }
    })
  }

  // If gameState is not defined, render a loading state
  if (!gameState) {
    return <div>Loading game...</div>
  }

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full touch-none" />

      {gameState && gameState.currentCheckpoint && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center">
                Checkpoint {gameState.currentCheckpoint.id}
              </CardTitle>
              <CardDescription className="text-center">Answer correctly to continue your journey!</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-medium text-lg">{gameState.currentCheckpoint.question}</p>

              {!showResult ? (
                <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect} className="space-y-3">
                  {gameState.currentCheckpoint.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div
                  className={`rounded-lg p-4 flex ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                >
                  <div className={`rounded-full p-2 mr-3 ${isCorrect ? "bg-green-100" : "bg-red-100"}`}>
                    {isCorrect ? <Check className="h-6 w-6 text-green-600" /> : <X className="h-6 w-6 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{isCorrect ? "Correct!" : "Incorrect!"}</p>
                    <p className="mt-1 text-sm">{gameState.currentCheckpoint.explanation}</p>
                    {!isCorrect && (
                      <p className="mt-2 text-sm font-medium">
                        Correct answer: {gameState.currentCheckpoint.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {!showResult ? (
                <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleContinue} className="w-full">
                  Continue
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="absolute bottom-4 left-4 text-xs text-gray-600">
        Use WASD or arrow keys to move. <br /> On mobile, use the virtual controls.
      </div>
    </div>
  )
}

export default GameEngine
