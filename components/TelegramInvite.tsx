import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

type AgreementKey = 'hasUsername' | 'displayNameFormat';

export default function TelegramInvite() {
    const [agreements, setAgreements] = useState<Record<AgreementKey, boolean>>({
        hasUsername: false,
        displayNameFormat: false,
    });

    const allChecked = Object.values(agreements).every(Boolean);

    const toggleAgreement = (key: AgreementKey) => {
        setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto text-gray-800">
            <p className="text-center text-lg font-medium">
                ✅ You have successfully completed the{' '}
                <span className="text-green-600 font-semibold">ITQuiz</span> challenge! <br />
                You are now ready to join our amazing volunteer community.
            </p>

            <div className="p-6 bg-green-50 rounded-xl border border-green-200 shadow-sm space-y-4">
                <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-3">
                    <p className="font-semibold text-amber-900">Before joining, confirm all:</p>
                    <label className="flex items-start gap-3 text-sm leading-relaxed text-amber-900 cursor-pointer">
                        <input
                            type="checkbox"
                            className="mt-0.5 size-4 min-h-4 min-w-4 shrink-0 grow-0 accent-emerald-600"
                            checked={agreements.hasUsername}
                            onChange={() => toggleAgreement('hasUsername')}
                        />
                        <span>I confirm that I have a Telegram username set.</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm leading-relaxed text-amber-900 cursor-pointer">
                        <input
                            type="checkbox"
                            className="mt-0.5 size-4 min-h-4 min-w-4 shrink-0 grow-0 accent-emerald-600"
                            checked={agreements.displayNameFormat}
                            onChange={() => toggleAgreement('displayNameFormat')}
                        />
                        <span>
                            I confirm that my Telegram display name is in Firstname Lastname format,
                            using Latin letters only and default font (no special symbols or
                            decorative characters).
                        </span>
                    </label>
                </div>

                <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm leading-relaxed text-red-900">
                    By confirming these requirements, you agree to follow them immediately
                    after joining. If any of these conditions are not met, we reserve the right to
                    remove and permanently ban you from the group without additional notice.
                </div>

                {allChecked ? (
                    <>
                        <p className="font-semibold text-lg text-green-800">
                            ✅ Your Telegram group link:
                        </p>

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
                    </>
                ) : (
                    <p className="text-sm text-amber-800 font-medium">
                        Please check all the confirmations to unlock the Join the Group button.
                    </p>
                )}
            </div>
        </div>
    );
}
