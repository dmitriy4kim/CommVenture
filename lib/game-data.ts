export interface Checkpoint {
    id: number
    x: number
    y: number
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }
  
  export interface GameState {
    playerName: string
    currentPosition: { x: number; y: number }
    completedCheckpoints: number[]
    currentCheckpoint: Checkpoint | null
    score: number
    maxScore: number
    gameStarted: boolean
    gameCompleted: boolean
    showRules: boolean
  }
  
  export const gameMap = {
    width: 2000,
    height: 1000,
    playerSize: 48,
    checkpointSize: 40,
    baseSpeed: 3,
  }
  
  export const checkpoints: Checkpoint[] = [
    {
      id: 1,
      x: 200,
      y: 200,
      question: "Is it okay to send IT-related posts to the UZ IT COMMUNITY chat?",
      options: [
        "Yes, it's an IT community so all IT content is welcome",
        "Only if it's directly affiliated with IT Community of Uzbekistan or approved by Shavkat aka",
        "Yes, but only on weekends",
        "Only if it's in Uzbek language",
      ],
      correctAnswer: "Only if it's directly affiliated with IT Community of Uzbekistan or approved by Shavkat aka",
      explanation:
        "The chat is for volunteers and their communication. Content not directly affiliated with IT Community of Uzbekistan needs approval from Shavkat aka.",
    },
    {
      id: 2,
      x: 400,
      y: 300,
      question: "Can you add your friend to the volunteers' group?",
      options: [
        "Yes, anyone can add new members",
        "Yes, but only on Bazaar Day",
        "No, every member should be selected by the admins",
        "Only if they're IT professionals",
      ],
      correctAnswer: "No, every member should be selected by the admins",
      explanation:
        "Every member should be selected by the admins. You can ask your friend to message admins like Shavkat aka for the selection process.",
    },
    {
      id: 3,
      x: 600,
      y: 200,
      question: 'What is the "2G Community" joke about?',
      options: [
        "People who use slow internet connections",
        "People who reply to very old messages",
        "Second generation of IT Community members",
        "People who respond slowly to messages",
      ],
      correctAnswer: "People who reply to very old messages",
      explanation:
        "It started as a joke when Roman replied to an old message in a discussion thread. The 2G Community embraces the slow vibe, congratulating each other on long-past holidays and greeting new members who joined ages ago.",
    },
    {
      id: 4,
      x: 800,
      y: 300,
      question: "What format should your Telegram profile name follow?",
      options: [
        "Any name is fine",
        "Lastname Firstname",
        "Firstname Lastname in Latin letters with default font",
        "Username only, no real name needed",
      ],
      correctAnswer: "Firstname Lastname in Latin letters with default font",
      explanation:
        'Your display name has to be in the "Firstname Lastname" format (not the other way around), in Latin letters and using default font.',
    },
    {
      id: 5,
      x: 1000,
      y: 200,
      question: 'What is "Bazaar Day"?',
      options: [
        "A day for selling IT equipment",
        "The last Sunday of the month when you can post your social media links",
        "A day for discussing market trends",
        "A day when new members can introduce themselves",
      ],
      correctAnswer: "The last Sunday of the month when you can post your social media links",
      explanation:
        'Every last Sunday of the month is "Bazaar Day" or "Shameless Self-Promotion Day". On this day, you can post your social media links, links to your private blogs, etc.',
    },
    {
      id: 6,
      x: 1200,
      y: 300,
      question: "When using the Keling Tanishaylik bot, what must you do?",
      options: [
        "Delete the chat with the bot after being matched",
        "Just vote 'yes' in the poll",
        "Press 'start' in the bot and vote 'yes' in the poll",
        "Send your resume to the bot",
      ],
      correctAnswer: "Press 'start' in the bot and vote 'yes' in the poll",
      explanation:
        'You need to: 1) Vote "yes" in the Keling Tanishaylik poll in the group chat, and 2) Press "start" in the bot and don\'t delete the chat with the bot.',
    },
    {
      id: 7,
      x: 1400,
      y: 200,
      question: "What should you do if you can't fulfill a commitment to the team?",
      options: [
        "Just ignore it and hope no one notices",
        "Leave the group immediately",
        "Communicate as early as possible and try to find a replacement",
        "Wait until someone asks about it",
      ],
      correctAnswer: "Communicate as early as possible and try to find a replacement",
      explanation:
        "The best approach is to communicate as early as possible and, if applicable, try to help find a replacement for your responsibilities.",
    },
    {
      id: 8,
      x: 1600,
      y: 300,
      question: "Can you discuss politics in the UZ IT COMMUNITY chat?",
      options: [
        "Yes, any topic is welcome",
        "Only if it relates to IT policy",
        "No, keep discussions relevant to what we do as a team",
        "Only on weekends",
      ],
      correctAnswer: "No, keep discussions relevant to what we do as a team",
      explanation:
        "Unfortunately, no. Keep discussions relevant to what we do as a team. Avoid topics related to politics, religion, private lives of people, etc.",
    },
    {
      id: 9,
      x: 1800,
      y: 200,
      question: "What is Roman known for in the group?",
      options: [
        "Being the oldest member",
        "Creating the most innovative projects",
        "Being the head of the 2G Community",
        "Being the most humble and handsome person (as he always says)",
      ],
      correctAnswer: "Being the most humble and handsome person (as he always says)",
      explanation:
        "Roman used to jokingly call himself the most humble and handsome person, and then everyone picked this up. Now he's known by everyone as the most handsome and humble person (as he always says).",
    },
    {
      id: 10,
      x: 1900,
      y: 300,
      question: "Can you post vacancies from your company in the group?",
      options: [
        "Yes, any job posting is welcome",
        "Only tech jobs are allowed",
        "Only with Shavkat aka's permission or if exclusive to volunteers",
        "Only on Mondays",
      ],
      correctAnswer: "Only with Shavkat aka's permission or if exclusive to volunteers",
      explanation:
        "You should either ask Shavkat aka's permission or your vacancy should be exclusive to volunteers of IT Community of Uzbekistan (e.g., an internship which only considers volunteers).",
    },
  ]
  