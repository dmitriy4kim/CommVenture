export interface Checkpoint {
    id: number;
    x: number;
    y: number;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface GameState {
    playerName: string;
    currentPosition: { x: number; y: number };
    completedCheckpoints: number[];
    currentCheckpoint: Checkpoint | null;
    score: number;
    maxScore: number;
    gameStarted: boolean;
    gameCompleted: boolean;
    showRules: boolean;
}

export const gameMap = {
    width: 2000,
    height: 1000,
    playerSize: 48,
    checkpointSize: 40,
    baseSpeed: 3,
};

export const checkpoints: Checkpoint[] = [
    {
        id: 1,
        x: 200,
        y: 200,
        question: 'Is it okay to send IT-related posts to the IT COMMUNITY TEAM chat?',
        options: [
            "Yes, it's an IT community so all IT content is welcome",
            "Only if it's directly affiliated with IT Community of Uzbekistan or approved by Shavkat aka",
            'Yes, but only on weekends',
            "Only if it's in Uzbek language",
        ],
        correctAnswer:
            "Only if it's directly affiliated with IT Community of Uzbekistan or approved by Shavkat aka",
        explanation:
            'The chat is for volunteers and their communication. Content not directly affiliated with IT Community of Uzbekistan needs approval from Shavkat aka.',
    },
    {
        id: 2,
        x: 400,
        y: 300,
        question: 'What is `Keling Tanishaylik bot` ?',
        options: [
            'This bot tracks volunteer attendance and task completion',
            'This bot automatically assigns tasks to new volunteers',
            'This bot sends daily motivational quotes to the community',
            'This bot helps volunteers meet and connect (in-person or online)',
        ],
        correctAnswer: 'This bot helps volunteers meet and connect (in-person or online)',
        explanation:
            'This bot helps volunteers meet and connect (in-person or online). To participate: 1. Vote “yes” when Shavkat aka sends the poll in the chat. 2. Start the bot (just press Start and keep the chat open).',
    },
    {
        id: 3,
        x: 600,
        y: 200,
        question: 'Is it allowed to welcome new volunteers?',
        options: [
            "It's better to wait until someone officially introduces them",
            'Of course, we are a very friendly community and welcome each new volunteer',
            'Only long-time members are allowed to greet new volunteers',
            'New members should only welcomed by admins',
        ],
        correctAnswer: 'Of course, we are a very friendly community and welcome each new volunteer',
        explanation:
            'We are a very friendly community and welcome each new volunteer, you can congratulate every new member.',
    },
    {
        id: 4,
        x: 800,
        y: 300,
        question: 'What format should your Telegram profile name follow?',
        options: [
            'Any name is fine',
            'Lastname Firstname',
            'Firstname Lastname in Latin letters with default font',
            'Username only, no real name needed',
        ],
        correctAnswer: 'Firstname Lastname in Latin letters with default font',
        explanation:
            'Your display name has to be in the "Firstname Lastname" format (not the other way around), in Latin letters and using default font.',
    },
    {
        id: 5,
        x: 1000,
        y: 200,
        question: 'What is "Bazaar Day"?',
        options: [
            'A day for selling IT equipment',
            'The last Sunday of the month when you can post your social media links',
            'A day for discussing market trends',
            'A day when new members can introduce themselves',
        ],
        correctAnswer: 'The last Sunday of the month when you can post your social media links',
        explanation:
            'Every last Sunday of the month is "Bazaar Day" or "Shameless Self-Promotion Day". On this day, you can post your social media links, links to your private blogs, etc.',
    },
    {
        id: 6,
        x: 1200,
        y: 300,
        question: "Can you add your friend to the volunteers' group?",
        options: [
            'Yes, anyone can add new members',
            'Yes, but only on Bazaar Day',
            'You can send your friends this bot: @itcomvolunteersbot',
            "Only if they're IT professionals",
        ],
        correctAnswer: 'You can send your friends this bot: @itcomvolunteersbot',
        explanation:
            'They must complete all the tasks in the bot and successfully pass the quiz. After completing all requirements, they will be eligible to become volunteers.',
    },
    {
        id: 7,
        x: 1400,
        y: 200,
        question: "What should you do if you can't fulfill a commitment to the team?",
        options: [
            'Just ignore it and hope no one notices',
            'Leave the group immediately',
            'Communicate as early as possible and try to find a replacement',
            'Wait until someone asks about it',
        ],
        correctAnswer: 'Communicate as early as possible and try to find a replacement',
        explanation:
            'The best approach is to communicate as early as possible and, if applicable, try to help find a replacement for your responsibilities.',
    },
    {
        id: 8,
        x: 1600,
        y: 300,
        question: 'Can you discuss unrelated topics in the IT COMMUNITY TEAM chat?',
        options: [
            'Yes, any topic is welcome',
            'Only if it relates to IT policy',
            'No, keep discussions relevant to what we do as a team',
            'Only on weekends',
        ],
        correctAnswer: 'No, keep discussions relevant to what we do as a team',
        explanation:
            'Unfortunately, no. Keep discussions relevant to what we do as a team. Avoid topics related to politics, religion, private lives of people, etc.',
    },
    {
        id: 9,
        x: 1800,
        y: 200,
        question:
            'Can you congratulate people in the IT COMMUNITY TEAM chat with birthdays or holidays?',
        options: [
            'Only if it relates to IT COMMUNITY leaders',
            "Sure, but only with Shavkat aka's permission",
            'Yes, any topic is welcome',
            "We are very kind community but in this case you should write people's DM",
        ],
        correctAnswer: "We are very kind community but in this case you should write people's DM",
        explanation:
            'Because it floods the chat with identical messages, we are just too big now. But we have an open-source chat for that.',
    },
    {
        id: 10,
        x: 1900,
        y: 300,
        question: 'Can you post vacancies from your company in the group?',
        options: [
            'Yes, any job posting is welcome',
            'Only tech jobs are allowed',
            "Only with Shavkat aka's permission or if exclusive to volunteers",
            'Only on Mondays',
        ],
        correctAnswer: "Only with Shavkat aka's permission or if exclusive to volunteers",
        explanation:
            "You should either ask Shavkat aka's permission or your vacancy should be exclusive to volunteers of IT Community of Uzbekistan (e.g., an internship which only considers volunteers).",
    },
];
