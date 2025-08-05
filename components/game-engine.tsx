'use client';

import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { type GameState, gameMap, checkpoints } from '@/lib/game-data';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, X, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface GameEngineProps {
    gameState: GameState;
    setGameState: React.Dispatch<React.SetStateAction<GameState>>;
    onGameComplete: () => void;
    onGameFail: () => void;
}

const GameEngine: React.FC<GameEngineProps> = ({
    gameState,
    setGameState,
    onGameComplete,
    onGameFail,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [gameFailed, setGameFailed] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true); // Default: audio is playing
    const characterImgRef = useRef<HTMLImageElement | null>(null);
    const checkpointImgRef = useRef<HTMLImageElement | null>(null);
    const completedImgRef = useRef<HTMLImageElement | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animatingToIndex, setAnimatingToIndex] = useState<number | null>(null);
    const [animProgress, setAnimProgress] = useState(0);
    const mapOffset = useRef({ x: 0, y: 0 });

    const handleToggle = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause(); // Pause if playing
            } else {
                audioRef.current.play(); // Play if paused
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const char = new Image();
        char.src = '/images/character.png';
        char.onload = () => (characterImgRef.current = char);

        {
            const cpCanv = document.createElement('canvas');
            cpCanv.width = cpCanv.height = gameMap.checkpointSize;
            const c = cpCanv.getContext('2d')!;
            c.fillStyle = '#4ADE80';
            c.beginPath();
            c.arc(
                gameMap.checkpointSize / 2,
                gameMap.checkpointSize / 2,
                gameMap.checkpointSize / 2,
                0,
                Math.PI * 2,
            );
            c.fill();
            c.strokeStyle = 'white';
            c.lineWidth = 2;
            c.stroke();
            c.fillStyle = 'white';
            c.font = 'bold 20px Arial';
            c.textAlign = 'center';
            c.textBaseline = 'middle';
            c.fillText('?', gameMap.checkpointSize / 2, gameMap.checkpointSize / 2);

            const img = new Image();
            img.src = cpCanv.toDataURL();
            img.onload = () => (checkpointImgRef.current = img);
        }

        {
            const ccCanv = document.createElement('canvas');
            ccCanv.width = ccCanv.height = gameMap.checkpointSize;
            const c = ccCanv.getContext('2d')!;
            c.fillStyle = '#10B981';
            c.beginPath();
            c.arc(
                gameMap.checkpointSize / 2,
                gameMap.checkpointSize / 2,
                gameMap.checkpointSize / 2,
                0,
                Math.PI * 2,
            );
            c.fill();
            c.strokeStyle = 'white';
            c.lineWidth = 2;
            c.stroke();
            c.strokeStyle = 'white';
            c.lineWidth = 3;
            c.beginPath();
            const s = gameMap.checkpointSize * 0.3;
            c.moveTo(gameMap.checkpointSize / 2 - s, gameMap.checkpointSize / 2);
            c.lineTo(gameMap.checkpointSize / 2 - s / 2, gameMap.checkpointSize / 2 + s / 2);
            c.lineTo(gameMap.checkpointSize / 2 + s, gameMap.checkpointSize / 2 - s / 2);
            c.stroke();

            const img = new Image();
            img.src = ccCanv.toDataURL();
            img.onload = () => (completedImgRef.current = img);
        }
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
        const up = (e: KeyboardEvent) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let raf: number;

        const render = () => {
            if (!isAnimating && !gameState.currentCheckpoint && !gameFailed) {
                let { x, y } = gameState.currentPosition;
                const sp = gameMap.baseSpeed;
                if (keys.w || keys.arrowup) y -= sp;
                if (keys.s || keys.arrowdown) y += sp;
                if (keys.a || keys.arrowleft) x -= sp;
                if (keys.d || keys.arrowright) x += sp;

                x = Math.max(
                    gameMap.playerSize / 2,
                    Math.min(x, gameMap.width - gameMap.playerSize / 2),
                );
                y = Math.max(
                    gameMap.playerSize / 2,
                    Math.min(y, gameMap.height - gameMap.playerSize / 2),
                );

                for (const cp of checkpoints) {
                    if (!gameState.completedCheckpoints.includes(cp.id)) {
                        const d = Math.hypot(x - cp.x, y - cp.y);
                        if (d < (gameMap.playerSize / 2 + gameMap.checkpointSize / 2) * 0.8) {
                            setGameState((s) => ({ ...s, currentCheckpoint: cp }));
                            break;
                        }
                    }
                }

                setGameState((s) => ({
                    ...s,
                    currentPosition: { x, y },
                }));
            }

            {
                const { x, y } = gameState.currentPosition;
                const cw = canvas.width,
                    ch = canvas.height;
                mapOffset.current.x = Math.max(0, Math.min(x - cw / 2, gameMap.width - cw));
                mapOffset.current.y = Math.max(0, Math.min(y - ch / 2, gameMap.height - ch));
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#f5f7f9';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < checkpoints.length - 1; i++) {
                const a = checkpoints[i];
                const b = checkpoints[i + 1];
                const ax = a.x - mapOffset.current.x;
                const ay = a.y - mapOffset.current.y;
                const bx = b.x - mapOffset.current.x;
                const by = b.y - mapOffset.current.y;

                ctx.lineWidth = 20;
                ctx.lineCap = 'round';

                if (isAnimating && animatingToIndex === i) {
                    const mx = ax + (bx - ax) * animProgress;
                    const my = ay + (by - ay) * animProgress;
                    ctx.strokeStyle = '#10B981';
                    ctx.beginPath();
                    ctx.moveTo(ax, ay);
                    ctx.lineTo(mx, my);
                    ctx.stroke();
                    ctx.strokeStyle = '#d1d5db';
                    ctx.beginPath();
                    ctx.moveTo(mx, my);
                    ctx.lineTo(bx, by);
                    ctx.stroke();
                } else {
                    const done = gameState.completedCheckpoints.includes(a.id);
                    ctx.strokeStyle = done ? '#10B981' : '#d1d5db';
                    ctx.beginPath();
                    ctx.moveTo(ax, ay);
                    ctx.lineTo(bx, by);
                    ctx.stroke();
                }
            }

            for (const cp of checkpoints) {
                const px = cp.x - mapOffset.current.x;
                const py = cp.y - mapOffset.current.y;
                if (
                    px < -gameMap.checkpointSize ||
                    px > canvas.width + gameMap.checkpointSize ||
                    py < -gameMap.checkpointSize ||
                    py > canvas.height + gameMap.checkpointSize
                )
                    continue;

                const done = gameState.completedCheckpoints.includes(cp.id);
                const img = done ? completedImgRef.current : checkpointImgRef.current;

                if (img) {
                    ctx.drawImage(
                        img,
                        px - gameMap.checkpointSize / 2,
                        py - gameMap.checkpointSize / 2,
                        gameMap.checkpointSize,
                        gameMap.checkpointSize,
                    );
                } else {
                    ctx.fillStyle = done ? '#10B981' : '#4ADE80';
                    ctx.beginPath();
                    ctx.arc(px, py, gameMap.checkpointSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.fillStyle = 'black';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(`${cp.id}`, px, py + gameMap.checkpointSize / 2 + 5);
            }

            {
                const px = gameState.currentPosition.x - mapOffset.current.x;
                const py = gameState.currentPosition.y - mapOffset.current.y;

                if (characterImgRef.current) {
                    ctx.drawImage(
                        characterImgRef.current,
                        px - gameMap.playerSize / 2,
                        py - gameMap.playerSize / 2,
                        gameMap.playerSize,
                        gameMap.playerSize,
                    );
                } else {
                    ctx.fillStyle = '#4ADE80';
                    ctx.beginPath();
                    ctx.arc(px, py, gameMap.playerSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.fillStyle = '#1f2937';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(gameState.playerName, px, py - gameMap.playerSize / 2 - 5);
            }

            {
                const pw = canvas.width * 0.8;
                const ph = 8;
                const px = (canvas.width - pw) / 2;
                const py = 40;

                ctx.fillStyle = '#e5e7eb';
                ctx.roundRect(px, py, pw, ph, 4);
                ctx.fill();

                const prog = gameState.completedCheckpoints.length / checkpoints.length;
                ctx.fillStyle = '#10B981';
                ctx.beginPath();
                ctx.roundRect(px, py, pw * prog, ph, 4);
                ctx.fill();

                ctx.fillStyle = '#1f2937';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillText(
                    `Progress: ${gameState.completedCheckpoints.length}/${checkpoints.length}`,
                    canvas.width / 2,
                    py - 4,
                );
            }

            raf = requestAnimationFrame(render);
        };

        const onResize = () => {
            if (!canvasRef.current) return;
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        };
        window.addEventListener('resize', onResize);
        onResize();
        raf = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, [gameState, keys, isAnimating, animatingToIndex, animProgress, gameFailed, setGameState]);

    // Handle answer selection
    const handleAnswerSelect = (value: string) => {
        setSelectedAnswer(value);
    };

    // Handle answer submission
    const handleSubmit = () => {
        if (!selectedAnswer || !gameState.currentCheckpoint) return;

        const correct = selectedAnswer === gameState.currentCheckpoint.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);
        if (!correct) {
            // If answer is incorrect, set game failed state
            setGameFailed(true);
            // Call the onGameFail callback
            onGameFail();
        }
    };

    // Handle continue after seeing result
    const handleContinue = () => {
        const cp = gameState.currentCheckpoint;
        if (!cp || !isCorrect) return;

        const idx = checkpoints.findIndex((c) => c.id === cp.id);
        const next = checkpoints[idx + 1];
        const isLast = idx === checkpoints.length - 1;

        setShowResult(false);
        setSelectedAnswer(null);

        setGameState((s) => ({
            ...s,
            currentCheckpoint: null,
        }));

        setIsAnimating(true);
        setAnimatingToIndex(idx);
        setAnimProgress(0);

        const fromX = gameState.currentPosition.x;
        const fromY = gameState.currentPosition.y;
        const toX = next ? next.x : fromX;
        const toY = next ? next.y : fromY;
        const frames = 60;
        let frame = 0;
        const dx = (toX - fromX) / frames;
        const dy = (toY - fromY) / frames;

        const id = setInterval(() => {
            frame++;
            setGameState((s) => ({
                ...s,
                currentPosition: {
                    x: fromX + dx * frame,
                    y: fromY + dy * frame,
                },
            }));
            setAnimProgress(frame / frames);

            if (frame >= frames) {
                clearInterval(id);
                setGameState((s) => ({
                    ...s,
                    currentPosition: { x: toX, y: toY },
                    score: s.score + 1,
                    completedCheckpoints: [...s.completedCheckpoints, cp.id],
                }));
                setTimeout(() => {
                    setIsAnimating(false);
                    setAnimatingToIndex(null);
                    setAnimProgress(0);
                    if (isLast) {
                        onGameComplete();
                    } else {
                        setGameState((s) => ({
                            ...s,
                            currentCheckpoint: next!,
                        }));
                    }
                }, 500);
            }
        }, 1000 / frames);
    };

    // Handle game restart
    const handleRestartGame = () => {
        setGameFailed(false);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsAnimating(false);
        setAnimatingToIndex(null);
        setAnimProgress(0);
        setGameState({
            ...gameState,
            currentPosition: { x: checkpoints[0].x, y: checkpoints[0].y },
            completedCheckpoints: [],
            currentCheckpoint: null,
            score: 0,
            gameCompleted: false,
        });
    };

    if (!gameState) return <div>Loading...</div>;

    return (
        <div className="relative w-full h-full">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full touch-none" />

            {gameState.currentCheckpoint && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4">
                    <Card className="max-w-md w-full">
                        <CardHeader>
                            <CardTitle className="text-center text-2xl">
                                Checkpoint {gameState.currentCheckpoint.id}
                            </CardTitle>
                            <CardDescription className="text-center">
                                Answer correctly to continue your journey!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium mb-4 text-lg">
                                {gameState.currentCheckpoint.question}
                            </p>
                            {!showResult ? (
                                <RadioGroup
                                    value={selectedAnswer || ''}
                                    onValueChange={handleAnswerSelect}
                                    className="space-y-2"
                                >
                                    {gameState.currentCheckpoint.options.map((opt, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2 p-3 border rounded hover:bg-gray-50"
                                        >
                                            <RadioGroupItem value={opt} id={`opt-${i}`} />
                                            <Label htmlFor={`opt-${i}`}>{opt}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : (
                                <div
                                    className={`p-4 rounded-lg flex items-center gap-3 ${
                                        isCorrect
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-red-50 border-red-200'
                                    }`}
                                >
                                    <div
                                        className={`p-2 rounded-full ${
                                            isCorrect ? 'bg-green-100' : 'bg-red-100'
                                        }`}
                                    >
                                        {isCorrect ? (
                                            <Check className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <X className="w-6 h-6 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {isCorrect ? 'Correct!' : 'Incorrect!'}
                                        </p>
                                        <p className="text-sm mt-1">
                                            {gameState.currentCheckpoint.explanation}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="justify-center">
                            {!showResult ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswer}
                                    className="w-full"
                                >
                                    Submit
                                </Button>
                            ) : isCorrect ? (
                                <Button
                                    onClick={handleContinue}
                                    className="w-full"
                                    disabled={isAnimating}
                                >
                                    Continue
                                </Button>
                            ) : (
                                <div className="w-full space-y-3">
                                    <p className="text-red-600 text-center font-medium">
                                        Game over! You must answer all questions correctly to
                                        continue.
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleRestartGame}
                                            variant="default"
                                            className="flex-1"
                                        >
                                            <RefreshCw className="mr-2" /> Try Again
                                        </Button>
                                        <Button asChild variant="outline" className="flex-1">
                                            <Link href="/">
                                                <Home className="mr-2" /> Home
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* Game Failed Overlay - shown when not at a checkpoint but game has failed */}
            {gameFailed && !gameState.currentCheckpoint && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle className="text-xl sm:text-2xl text-center text-red-600">
                                Game Over!
                            </CardTitle>
                            <CardDescription className="text-center">
                                You must answer all questions correctly to complete the game.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4 text-center">
                                You answered incorrectly at checkpoint{' '}
                                {gameState.completedCheckpoints.length + 1}.
                            </p>
                            <p className="mb-4 text-center">
                                Your score: {gameState.score}/{gameState.maxScore}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={handleRestartGame}
                                className="flex-1"
                                variant="default"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                            </Button>
                            <Button asChild variant="outline" className="flex-1">
                                <Link href="/">
                                    <Home className="mr-2 h-4 w-4" /> Return Home
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}

            <audio ref={audioRef} autoPlay loop className="hidden">
                <source src="/musics/uzmuz.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {/* Button to control audio */}
            <button
                onClick={handleToggle}
                className="cursor-pointer absolute top-3 right-4 p-1 px-3 rounded-full bg-[#10B981] text-white"
            >
                {isPlaying ? '🔊 On' : ' 🔇Off'}
            </button>
        </div>
    );
};

export default GameEngine;
