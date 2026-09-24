export type PillarGroup = 'values' | 'craft' | 'soul'
export type IconName = 'shield' | 'heart' | 'paw' | 'chip' | 'star' | 'smile'

export interface Pillar {
  id: string
  face: string
  group: PillarGroup
  /** CSS custom-property reference for the card accent colour */
  accent: string
  icon: IconName
  category: string
  title: string
  body: string
  reflection: string
  tags: string[]
}

export interface FilterOption {
  id: 'all' | PillarGroup
  label: string
}

export const filters: FilterOption[] = [
  { id: 'all', label: 'All Dimensions' },
  { id: 'values', label: 'Values & Family' },
  { id: 'craft', label: 'Craft & Intellect' },
  { id: 'soul', label: 'Soul & Spirit' },
]

export const pillars: Pillar[] = [
  {
    id: 'patriot',
    face: 'FACE #01',
    group: 'values',
    accent: 'var(--c-patriot)',
    icon: 'shield',
    category: 'Dedication · Discipline · National Soul',
    title: 'The Patriot & Servant to Society 🇮🇳',
    body: "Your dedication to the country through the RSS and your commitment to society aren't just things you do — they define who you are. You carry a sense of duty, selflessness, and discipline that lifts everyone around you. You don't just talk about making a difference; you live it, every single day.",
    reflection: 'A nation is quietly built by people who serve without asking for anything back. You are one of them.',
    tags: ['Conscious Warrior', 'Duty First'],
  },
  {
    id: 'son',
    face: 'FACE #02',
    group: 'values',
    accent: 'var(--c-son)',
    icon: 'heart',
    category: 'Pillar of Strength · Respect · Roots',
    title: 'The Devoted Son & Family Man 👨‍👩‍👧',
    body: 'Before everything else, you are a grounded, loving son. The respect and care you show your parents and family reveal the true strength of your character. No matter how busy or successful you become, your family always comes first.',
    reflection: 'Success fades. The way you honour your roots is what people remember for a lifetime.',
    tags: ['Family Values', 'Grounded'],
  },
  {
    id: 'soul',
    face: 'FACE #03',
    group: 'soul',
    accent: 'var(--c-soul)',
    icon: 'paw',
    category: 'Empathy in Action · Silent Guardian',
    title: 'The Gentle Soul (Animals & Society) 🐾',
    body: "Behind the sharp engineer's mind and the packed schedule lives a soft, deeply empathetic heart. Whether it's feeding stray animals, helping someone before they even ask, or standing up for those who need it most, your kindness speaks far louder than words.",
    reflection: "The world is a little gentler simply because you're in it.",
    tags: ['Animal Lover', 'Pure Empathy'],
  },
  {
    id: 'brain',
    face: 'FACE #04',
    group: 'craft',
    accent: 'var(--c-brain)',
    icon: 'chip',
    category: 'Hardware Precision · Software Architecture',
    title: 'The Dual-Brain Engineer 🧠⚙️',
    body: 'How many people can bridge the gap between mechanical engineering and complex software with such ease? Your curiosity knows no bounds. You dive headfirst into every problem, work until the job is done right, and never, ever stop learning.',
    reflection: 'Two disciplines, one relentless mind — that is a rare and dangerous kind of brilliant.',
    tags: ['Dual-Source Intellect', 'Relentless Solver'],
  },
  {
    id: 'spirit',
    face: 'FACE #05',
    group: 'soul',
    accent: 'var(--c-spirit)',
    icon: 'star',
    category: 'Consciousness · Faith · Cosmic Alignment',
    title: 'The Spiritual Seeker & Manifestor 🙏',
    body: "There's a deep spiritual side to you — a genuine belief in the universe and its timing. You don't just move through life; you manifest it, walking your path with unshakeable faith and a quiet, steady positivity.",
    reflection: 'What you believe, you build. And you have always believed in beautiful things.',
    tags: ['High Frequency', 'Manifestation Master'],
  },
  {
    id: 'play',
    face: 'FACE #06',
    group: 'craft',
    accent: 'var(--c-play)',
    icon: 'smile',
    category: 'Daily Laughs · Meme Royalty · Top Dog',
    title: 'The Playful Kid & Favorite Person 😄',
    body: "And then there's the side only the lucky few get to see: the playful joker, the meme lord, the one who turns an ordinary morning meeting into a moment of laughter. So take this as your official reminder — you are brilliant, you are deeply loved, and you are truly one of a kind.",
    reflection: 'Genius is impressive. A genius who makes everyone laugh is unforgettable.',
    tags: ['The Fun Factor', 'Extraordinaire'],
  },
]
