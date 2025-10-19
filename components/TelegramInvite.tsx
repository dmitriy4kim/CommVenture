import { useState } from 'react';
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, ClipboardCopy } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    playerName: string;
    bioText: string;
    setBioText: (text: string) => void;
    referredBy: string;
    setReferredBy: (text: string) => void;
    addedBy: string;
    setaddedBy: (text: string) => void;
};

export default function TelegramInvite({
    playerName,
    bioText,
    setBioText,
    referredBy,
    setReferredBy,
    addedBy,
    setaddedBy,
}: Props) {
    const [copied, setCopied] = useState(false);

    const templateText = `Full Name: ${playerName}
    Short bio: ${bioText || '[Please fill in your bio]'}
    Referred by: ${referredBy || '[Please fill in who referred you]'}
    Added by: ${addedBy || '[Please fill in who referred you]'}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(templateText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto text-gray-800">
            <p className="text-center text-lg font-medium">
                ✅ You have successfully completed the{' '}
                <span className="text-green-600 font-semibold">ITQuiz</span> challenge! <br />
                You are now ready to join our amazing volunteer community.
            </p>

            <div className="space-y-5">
                <h3 className="font-semibold text-xl text-gray-900">
                    🎯 Please prepare your introduction:
                </h3>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="bioText" className="text-sm font-semibold block mb-1">
                            Short bio:
                        </label>
                        <textarea
                            id="bioText"
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Tell us a bit about yourself..."
                            value={bioText}
                            onChange={(e) => setBioText(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="referredBy" className="text-sm font-semibold block mb-1">
                            Referred by (
                            <span className="italic">
                                Who invited you to the community? Name and Telegram username
                            </span>{' '}
                            ):
                        </label>
                        <Input
                            id="referredBy"
                            placeholder="e.g. John Smith (@johnsmith)"
                            className="w-full p-3 mb-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={referredBy}
                            onChange={(e) => setReferredBy(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="addedBy" className="text-sm font-semibold block mb-1">
                            Added by (
                            <span className="italic">
                                Who shared the link to this game with you? Name and Telegram
                                username
                            </span>{' '}
                            ):
                        </label>
                        <Input
                            id="addedBy"
                            placeholder="e.g. John Smith (@johnsmith)"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={addedBy}
                            onChange={(e) => setaddedBy(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-sm space-y-4">
                <h4 className="font-semibold text-xl text-blue-800 ">✨ Example:</h4>

                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg overflow-hidden mx-auto">
                    <img
                        src="/images/ex_photo.png"
                        alt="Profile"
                        className="w-full h-full object-cover object-center "
                    />
                </div>
                <div className="flex items-start gap-4">

                    <div className="text-sm leading-relaxed space-y-2">
                        <p>
                            Hey everyone, I’m <strong>Atabek</strong>! 👋
                            <br />
                            I’m 19 years old, born and raised in Nukus, Karakalpakstan — where the
                            summers are scorching hot, and the sunsets look like they’re straight
                            out of a painting. 🎨 Right now, I’m knee-deep in prep work for
                            university (wish me luck!).
                        </p>
                        <p>
                            I’m a huge basketball fan 🏀 — you’ll usually find me practicing jump
                            shots or playing pickup games with friends. Off the court, I run the{' '}
                            <strong>Reclaim Project</strong>, where I organize clean-up drives and
                            workshops to promote recycling and sustainability in my community. (Yes,
                            I genuinely enjoy geeking out about eco-friendly solutions! 🌱)
                        </p>
                        <p>
                            Oh, and I love languages! I speak four (working on a fifth… shh), and
                            I’m always down to swap slang or teach someone a Karakalpak phrase. 💬
                        </p>
                        <p>
                            Fun fact: I only started reading books seriously last year. My first
                            real read was &quot;The Consumer Society&quot; — now I’m hooked on
                            geeking out about philosophy and tech. 📚
                        </p>
                        <p>
                            Referred by: [
                            <span className="italic">
                                Who shared the link to this game with you?
                            </span>{' '}
                            ]
                        </p>
                        <p>
                            Added by: [
                            <span className="italic">Who invited you to the community?</span> ]
                        </p>

                        <p>
                            Let’s connect!
                            <br />
                            👉 LinkedIn: [link]
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-green-50 rounded-xl border border-green-200 shadow-sm space-y-4">
                <p className="text-gray-700">
                    📝 Don&#39;t forget to <strong>copy</strong> and paste the following template with your{' '}
                    <strong className="underline">photo</strong> when you join:
                </p>

                <div className="relative bg-white p-4 rounded border border-gray-200 text-sm font-mono leading-relaxed">
                    <b>Full Name:</b> {playerName} <br />
                    <b>Short bio:</b> {bioText || '[Please fill in your bio]'} <br />
                    <b>Referred by:</b> {referredBy || '[Please fill in who referred you]'} <br />
                    <b>Added by:</b> {addedBy || '[Please fill in who added you]'} <br />
                    <motion.button
                        onClick={handleCopy}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        className='
                            flex items-center gap-2 ml-1
                            px-4 py-1.5 mt-4 text-sm
                            bg-gradient-to-r from-green-500 to-emerald-500
                            text-white cursor-pointer
                            rounded-full shadow-lg hover:shadow-xl
                            transition-all duration-300 hover:scale-105
                            focus:ring-4 focus:ring-emerald-300 outline-none font-bold
                        '
                    >
                        <ClipboardCopy size={16} />
                        {copied ? "Copied!" : "Copy"}
                    </motion.button>
                </div>

                <div
                    role="note"
                    className="relative overflow-hidden rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 font-sans"
                >

                    <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 rotate-12 bg-white/60 blur-md animate-[sheen_1.1s_ease-in-out_infinite]" />
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 text-xl leading-none">⚠️</span>
                        <div className="text-sm leading-relaxed">
                            <p className="font-semibold tracking-tight">Attention</p>
                            <ul className="mt-1 list-disc pl-5 space-y-1">
                                <li>Your Telegram must have a public <span className="font-semibold">@username</span> (nickname).</li>
                                <li>Set your display name in the format <span className="font-semibold">Firstname Lastname</span>.</li>
                                <li>Use the default font — no emojis, symbols, or stylized fonts.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="font-semibold text-lg text-green-800">✅ Your Telegram group link:</p>

                <a
                    href="https://t.me/+IJD9iZO7WyNhYTk6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-emerald-300 outline-none font-semibold text-lg"
                >
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    Join the Group
                    <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                </a>
            </div>
        </div>
    );
}
