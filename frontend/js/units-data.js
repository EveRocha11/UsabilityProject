/* Shared content for all 4 units. Used by units.js and unit-detail.js. */
const UNITS_DATA = [
  {
    id: 1,
    badge: 'U1',
    title: 'Unit 1',
    subtitle: 'Changes, Stories & Experiences',
    meta: '3 lessons · ~30 min',
    block: 'b1',
    grammar: [
      { title: 'Present Perfect',   desc: 'Use of ever, never, already, yet and just to talk about past experiences and recent events.' },
      { title: 'Past Simple',       desc: 'Regular and irregular verbs in narrative contexts; use with when to introduce a completed action.' },
      { title: 'Past Continuous',   desc: 'Actions in progress at a specific moment in the past; combined with while to show simultaneous actions.' },
      { title: 'Time Expressions',  desc: 'Since, for, just, yet, already — how to choose the right expression depending on tense and context.' },
    ],
    lessons: [
      { icon: 'icon-book.svg',   title: 'Practice Present Perfect with ever, never, already and yet in real conversations.' },
      { icon: 'icon-target.svg', title: 'Combine Past Simple and Present Perfect to describe life events and personal stories.' },
      { icon: 'icon-star.svg',   title: 'Use Past Continuous with when and while to narrate interrupted actions.' },
    ],
  },
  {
    id: 2,
    badge: 'U2',
    title: 'Unit 2',
    subtitle: 'Professional World & Personal Growth',
    meta: '3 lessons · ~30 min',
    block: 'b2',
    grammar: [
      { title: 'Gerunds & Infinitives',    desc: 'When to use -ing (enjoy working, avoid making) vs. the infinitive (plan to do, want to be) after common verbs.' },
      { title: 'Second Conditional',       desc: 'Hypothetical present or future situations: If + past simple, would + base verb.' },
      { title: 'Third Conditional',        desc: 'Imagined outcomes for past situations: If + past perfect, would have + past participle.' },
      { title: 'Professional Vocabulary',  desc: 'Language for describing skills, job roles, and workplace situations in formal and semi-formal contexts.' },
    ],
    lessons: [
      { icon: 'icon-book.svg',   title: 'Identify when to use gerunds or infinitives in professional and everyday contexts.' },
      { icon: 'icon-target.svg', title: 'Practice the Second Conditional to talk about hypothetical situations and wishes.' },
      { icon: 'icon-star.svg',   title: 'Master the Third Conditional to reflect on past decisions and imagined outcomes.' },
    ],
  },
  {
    id: 3,
    badge: 'U3',
    title: 'Unit 3',
    subtitle: 'Culture, Entertainment & Global Expressions',
    meta: '3 lessons · ~30 min',
    block: 'b3',
    grammar: [
      { title: 'Passive Voice (Present)',    desc: 'The product is made in Japan. Use when the agent is unknown or less important than the action.' },
      { title: 'Passive Voice (Past)',       desc: 'The pyramids were built over 4,500 years ago. Focus shifts from who to what happened.' },
      { title: 'Present Perfect with for/since', desc: 'She has lived here for ten years / since 2015. Express how long a state has continued.' },
      { title: 'Cultural Vocabulary',        desc: 'Expressions for discussing art, media, entertainment, and global cultural experiences.' },
    ],
    lessons: [
      { icon: 'icon-book.svg',   title: 'Understand and use the passive voice in present and past cultural contexts.' },
      { icon: 'icon-target.svg', title: 'Describe cultural experiences using the passive voice and time expressions.' },
      { icon: 'icon-star.svg',   title: 'Express how long things have been happening using for and since.' },
    ],
  },
  {
    id: 4,
    badge: 'U4',
    title: 'Unit 4',
    subtitle: 'Communication, Relationships & Plans',
    meta: '3 lessons · ~30 min',
    block: 'b4',
    grammar: [
      { title: 'Modals for Speculation', desc: "Must, might, can't — express certainty, possibility or impossibility about present situations." },
      { title: 'Time Clauses',           desc: 'Use as soon as, before, after, when with simple present tense to refer to future events.' },
      { title: 'Reported Speech',        desc: 'Shifting tenses and pronouns when reporting what someone said: "He said he was working."' },
      { title: 'Social Language',        desc: 'Formal and informal ways to invite, accept, decline, and plan events in English.' },
    ],
    lessons: [
      { icon: 'icon-book.svg',   title: 'Use modal verbs to speculate about situations and interpret body language.' },
      { icon: 'icon-target.svg', title: 'Apply reported speech and time clauses in real-life conversation scenarios.' },
      { icon: 'icon-star.svg',   title: 'Plan events and describe changes using modals and reported speech together.' },
    ],
  },
];

/* ── Progress helpers ────────────────────────────────────────────────────── */

function nivelGetProgress(email) {
  const key = `nivela_progress_${email}`;
  const p   = JSON.parse(localStorage.getItem(key) || '{}');

  if (!p.units) {
    p.units = {
      1: { complete: false, lessons: [false, false, false] },
      2: { complete: false, lessons: [false, false, false] },
      3: { complete: false, lessons: [false, false, false] },
      4: { complete: false, lessons: [false, false, false] },
    };
  }
  if (!p.currentUnit) p.currentUnit = 1;

  return { key, p };
}

function nivelSaveProgress(key, p) {
  localStorage.setItem(key, JSON.stringify(p));
}

function nivelUnitUnlocked(p, unitId) {
  if (unitId === 1) return true;
  return p.units[unitId - 1] && p.units[unitId - 1].complete;
}

function nivelLessonUnlocked(p, unitId, lessonIdx) {
  if (!nivelUnitUnlocked(p, unitId)) return false;
  if (lessonIdx === 0) return true;
  return !!p.units[unitId].lessons[lessonIdx - 1];
}
