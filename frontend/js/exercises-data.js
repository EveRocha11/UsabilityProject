/* eslint-disable */
// Exercise bank: 4 blocks × 3 levels × 3 game types + challenge set
// fill sentence structure: { before, after, options[], answer (index) }
// dialogue line structure: { char (index into characters[]), text, isChoice?, options[], answer }
// matching structure: { pairs: [{ left, right }] }

const EXERCISE_DATA = {

  // ─── BLOCK 1: Cambios, Historias y Experiencias ─────────────────────────────
  // Grammar: Past Continuous + Past Simple (when/while) + Present Perfect (ever/never/already/yet)

  b1: {
    l1: {
      match: {
        instruction: 'Match each question or statement with the correct response.',
        pairs: [
          { left: 'Have you ever lived abroad?',        right: "No, I've never left my country!" },
          { left: "I've already visited Paris twice.",   right: "Wow, that's amazing!"            },
          { left: 'Have you met her yet?',               right: 'No, not yet.'                    },
          { left: "She's already graduated!",            right: 'Congratulations!'                 },
          { left: "I've never tried sushi.",             right: 'Really? You should try it!'      },
        ],
      },
      fill: {
        instruction: 'Look at the image and complete each sentence.',
        imageDesc: '[Screen reader: Two side-by-side images. Left: a brown floppy disk labeled "1990 — Technology then". Right: a blue cloud icon with an upload arrow labeled "Today — Technology now". A bold arrow points from left to right showing change over time.]',
        sentences: [
          { before: 'When I was young, people', after: 'pagers to send messages.',        options: ['were using','used','use','have used'],                         answer: 0 },
          { before: 'She',                       after: 'to a new smartphone already.',   options: ['has switched','switched','was switching','switches'],           answer: 0 },
          { before: 'While he',                  after: 'on the phone, the battery died.',options: ['was talking','talked','has talked','talks'],                    answer: 0 },
          { before: 'They',                      after: 'their computers yet.',            options: ["haven't updated","didn't update","weren't updating","don't update"], answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete the conversation by choosing the correct options.',
        characters: ['Ana', 'Tom'],
        lines: [
          { char: 0, text: "It's so great to see you! I haven't seen you since college!" },
          { char: 1, text: "I know! What {blank} you {blank} since then?",  isChoice: true, options: ['have / been doing', 'did / do', 'were / doing'],    answer: 0 },
          { char: 1, text: "I graduated, got a job in London, and I've already bought my own apartment!" },
          { char: 0, text: '{blank} you ever thought about coming back?',   isChoice: true, options: ['Have', 'Did', 'Were'],                              answer: 0 },
          { char: 0, text: 'While I {blank} for you at the café, I ran into Maria!', isChoice: true, options: ['was waiting', 'waited', 'have waited'],   answer: 0 },
          { char: 1, text: 'No way! What {blank} she {blank} when you saw her?', isChoice: true, options: ['was / doing', 'has / done', 'did / do'],       answer: 0 },
          { char: 0, text: 'She {blank} just {blank} her first book!',      isChoice: true, options: ['has / published', 'had / published', 'was / publishing'], answer: 0 },
        ],
      },
    },

    l2: {
      match: {
        instruction: 'Match each reaction with the correct situation.',
        pairs: [
          { left: 'Oh no! Really?!',           right: "She's never been to a concert before."     },
          { left: "That's incredible!",         right: "He's already run three marathons."          },
          { left: "I can't believe it!",        right: "They've just announced their engagement."   },
          { left: 'Are you serious?',           right: 'Has he ever worked abroad?'                 },
          { left: 'Good for you!',              right: "She's finally got her driver's license."    },
        ],
      },
      fill: {
        instruction: 'Look at the task list and complete each sentence.',
        imageDesc: "[Screen reader: A smartphone screen showing a to-do list app. Two items are crossed out with a green checkmark: 'Book flight tickets' and 'Pack bags'. Two items have no checkmark: 'Find apartment' and 'Update laptop'. A progress bar at the top shows 50% completion.]",
        sentences: [
          { before: 'Mark',       after: 'his flight tickets already.',    options: ['has booked','booked','was booking','books'],                       answer: 0 },
          { before: '',           after: 'they found an apartment yet?',   options: ['Have','Did','Were','Do'],                                          answer: 0 },
          { before: 'While she',  after: 'her bags, her taxi arrived.',    options: ['was packing','packed','has packed','packs'],                       answer: 0 },
          { before: 'He',         after: 'to another city before.',        options: ["has never moved","never moved","was never moving","never moves"],  answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete the conversation with the correct options.',
        characters: ['Sara', 'Lena'],
        lines: [
          { char: 0, text: "Did you hear about Jake? He's moved to Japan!" },
          { char: 1, text: '{blank} you ever {blank} that was going to happen?', isChoice: true, options: ['Have / thought', 'Did / think', 'Were / thinking'], answer: 0 },
          { char: 0, text: 'While he {blank} at that tech company, he got a job offer in Tokyo.', isChoice: true, options: ['was working', 'worked', 'has worked'], answer: 0 },
          { char: 1, text: 'Has he {blank} found an apartment there yet?', isChoice: true, options: ['already', 'ever', 'never'],    answer: 0 },
          { char: 0, text: 'Not yet, but he {blank} already enrolled in Japanese classes!', isChoice: true, options: ['has', 'had', 'was'], answer: 0 },
          { char: 1, text: "I {blank} ever lived abroad. I'd be terrified!", isChoice: true, options: ["'ve never", "didn't", "wasn't"], answer: 0 },
        ],
      },
    },

    l3: {
      match: {
        instruction: 'Match each reaction with the correct life event.',
        pairs: [
          { left: "Seriously? That's wild!",  right: "I've already changed jobs three times this year." },
          { left: 'Have you heard the news?', right: "They've never argued in 20 years."                },
          { left: "I'm so proud of you!",     right: "She's just defended her PhD thesis."              },
          { left: 'That happened to me too!', right: 'Has your flight ever been cancelled?'              },
          { left: "You're kidding!",          right: "He's never cooked a meal in his life."            },
        ],
      },
      fill: {
        instruction: 'Look at the technology timeline and complete each sentence.',
        imageDesc: '[Screen reader: A horizontal timeline with four labeled stops and icons. First stop "1990": a brown floppy disk. Second stop "2000": a silver CD-ROM. Third stop "2010": a small USB flash drive. Fourth stop "2024": a blue cloud with an upload arrow. Bold arrows connect each icon to the next.]',
        sentences: [
          { before: 'In 1990, students', after: 'all their work on floppy disks.',    options: ['were saving','saved','have saved','save'],            answer: 0 },
          { before: 'Since 2010, most companies', after: 'to cloud storage.',          options: ['have moved','moved','were moving','move'],            answer: 0 },
          { before: 'While the system', after: ', it lost all the data.',              options: ['was updating','updated','has updated','updates'],     answer: 0 },
          { before: 'They', after: 'their files yet — be careful!',                    options: ["haven't backed up","didn't back up","weren't backing up","don't back up"], answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete the conversation by choosing the correct options.',
        characters: ['Mike', 'Cris'],
        lines: [
          { char: 0, text: 'How long {blank} you {blank} in this city?', isChoice: true, options: ['have / lived', 'did / live', 'were / living'], answer: 0 },
          { char: 1, text: "I've lived here for ten years. But I was actually born in Quito." },
          { char: 0, text: 'Really! {blank} you ever {blank} back there?', isChoice: true, options: ['Have / been', 'Did / go', 'Were / going'],    answer: 0 },
          { char: 1, text: 'Yes! While I {blank} my family last summer, I rediscovered how much I miss it.', isChoice: true, options: ['was visiting', 'visited', 'have visited'], answer: 0 },
          { char: 0, text: 'Have you already {blank} about moving back?', isChoice: true, options: ['thought', 'thinking', 'think'],                 answer: 0 },
          { char: 1, text: "I haven't decided yet. But I've never felt so {blank} about a place.", isChoice: true, options: ['strongly', 'strong', 'strengthen'], answer: 0 },
        ],
      },
    },
  },

  // ─── BLOCK 2: Mundo Profesional y Desarrollo Personal ───────────────────────
  // Grammar: Gerunds & Infinitives + 2nd Conditional + 3rd Conditional

  b2: {
    l1: {
      match: {
        instruction: 'Match each professional trait with the correct description.',
        pairs: [
          { left: "I'm good at organizing projects.",           right: 'Keeps everything on schedule — Project Manager.'      },
          { left: 'She enjoys helping patients.',               right: 'Dedicated to healthcare — Doctor.'                   },
          { left: 'If I had more time, I would learn coding.',  right: 'Motivated to grow — Aspiring programmer.'            },
          { left: 'He avoids making decisions under pressure.', right: 'Works better with planning and clear deadlines.'     },
          { left: 'I plan to become a team leader.',            right: 'Ambitious and focused on professional growth.'       },
        ],
      },
      fill: {
        instruction: 'Read the job posting and complete each sentence.',
        imageDesc: "[Screen reader: A printed job posting document with the title 'Project Manager — Wanted' in bold at the top. Below it, a bulleted requirements list: a checkmark icon next to each item — 'Teamwork skills', 'Willingness to travel', 'Ability to meet deadlines', 'Strong presentation skills'. A company logo appears in the upper right corner.]",
        sentences: [
          { before: 'We are looking for someone who enjoys', after: 'in a team.',              options: ['working','to work','work','worked'],              answer: 0 },
          { before: 'The candidate must be willing',          after: 'frequently.',             options: ['to travel','traveling','travel','travelled'],    answer: 0 },
          { before: 'If she',   after: 'better presentation skills, she would get the promotion.', options: ['had','has','would have','have'],             answer: 0 },
          { before: 'He keeps', after: 'deadlines, which is unprofessional.',                  options: ['missing','to miss','miss','missed'],              answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this job interview conversation.',
        characters: ['Interviewer', 'Candidate'],
        lines: [
          { char: 0, text: 'Tell me about yourself. What are you good {blank}?', isChoice: true, options: ['at doing', 'to do', 'do'],                            answer: 0 },
          { char: 1, text: "I'm great at {blank} complex problems and I enjoy working with data.", isChoice: true, options: ['solving', 'to solve', 'solve'],      answer: 0 },
          { char: 0, text: 'If you {blank} any skill, what would it be?',         isChoice: true, options: ['could improve', 'can improve', 'improved'],           answer: 0 },
          { char: 1, text: 'I would focus on {blank} my public speaking skills.', isChoice: true, options: ['improving', 'to improve', 'improve'],                 answer: 0 },
          { char: 0, text: 'Imagine you {blank} a client asking you to falsify a report. What would you do?', isChoice: true, options: ['had', 'have', 'would have'], answer: 0 },
          { char: 1, text: 'I would refuse {blank} that and report it to my supervisor.', isChoice: true, options: ['to do', 'doing', 'do'],                       answer: 0 },
        ],
      },
    },

    l2: {
      match: {
        instruction: 'Match each work personality trait with its description.',
        pairs: [
          { left: 'Dedicated',  right: "She never stops trying to improve."                    },
          { left: 'Ambitious',  right: 'He aims to be CEO in five years.'                      },
          { left: 'Flexible',   right: "She's great at adapting quickly to change."             },
          { left: "If I were more organized, I'd finish on time.", right: 'Looking at a messy desk, wishing for better habits.' },
          { left: "She's interested in becoming a consultant.",    right: 'She plans to advise companies in the future.'        },
        ],
      },
      fill: {
        instruction: 'Look at the comic strip and complete each sentence.',
        imageDesc: "[Screen reader: A three-panel black-and-white comic strip. Panel 1: An employee with a speech bubble of a lightbulb presents an idea excitedly to a seated boss. Panel 2: The boss congratulates a smiling second employee, handing them an award. Panel 3: The original employee stands at a distance, arms crossed, looking shocked and hurt after realizing their idea was stolen.]",
        sentences: [
          { before: 'She regrets', after: 'nothing when her idea was stolen.',             options: ['saying','to say','say','said'],                           answer: 0 },
          { before: 'If she',      after: 'up, she might have gotten the promotion.',      options: ['had spoken','spoke','would speak','has spoken'],          answer: 0 },
          { before: 'He pretended', after: 'about the situation.',                         options: ['not to know','not knowing','to not know','to unknow'],    answer: 0 },
          { before: 'If they',     after: 'honest, the team would have trusted them more.',options: ['had been','were','would be','have been'],                 answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this corporate meeting about an ethical issue.',
        characters: ['Manager', 'Employee A', 'Employee B'],
        lines: [
          { char: 0, text: 'Someone {blank} leaking client data. We need to talk.',          isChoice: true, options: ['has been', 'had been', 'was being'],         answer: 0 },
          { char: 1, text: 'I suggest {blank} the investigation to an external team.',        isChoice: true, options: ['handing', 'to hand', 'hand'],                 answer: 0 },
          { char: 0, text: 'If we {blank} acted earlier, we could have prevented this.',     isChoice: true, options: ['had', 'have', 'would have'],                   answer: 0 },
          { char: 2, text: 'I propose {blank} a new data protection policy immediately.',    isChoice: true, options: ['to implement', 'implementing', 'implement'],   answer: 0 },
          { char: 0, text: 'If we {blank} more transparent, our clients would trust us more.', isChoice: true, options: ['were', 'are', 'would be'],                  answer: 0 },
        ],
      },
    },

    l3: {
      match: {
        instruction: 'Match each trait or situation with the correct description.',
        pairs: [
          { left: 'Creative',   right: 'She loves designing new concepts from scratch.'     },
          { left: 'Persistent', right: 'He keeps trying even after repeated failure.'       },
          { left: 'Empathetic', right: "She's skilled at understanding others' feelings."   },
          { left: "I wish I hadn't sent that email.",  right: 'A regret about a past action — 3rd Conditional.' },
          { left: 'If I had studied harder, I would have gotten the scholarship.', right: 'Reflecting on a missed opportunity.' },
        ],
      },
      fill: {
        instruction: 'Look at the career decision tree and complete each sentence.',
        imageDesc: "[Screen reader: A decision tree diagram on a white background. At the top, a box labeled 'Career Choice'. Two branches extend downward. Left branch: 'Tech Startup' leads to a box labeled 'Outcome: Financial struggle, long hours'. Right branch: 'Corporate Job' leads to a box labeled 'Outcome: Stability, steady growth'. Dashed arrows point back upward labeled 'Looking back'.]",
        sentences: [
          { before: 'She decided', after: 'the promotion even though it meant relocating.',           options: ['to take','taking','take','took'],                          answer: 0 },
          { before: 'If he',       after: 'the other path, he would not have struggled financially.',  options: ['had chosen','chose','would choose','has chosen'],          answer: 0 },
          { before: 'They practiced', after: 'before the big meeting.',                                options: ['negotiating','to negotiate','negotiate','negotiated'],     answer: 0 },
          { before: 'If she',      after: 'for feedback earlier, she could have improved her project.',options: ['had asked','asked','would ask','has asked'],               answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this career review conversation.',
        characters: ['Mentor', 'Employee'],
        lines: [
          { char: 0, text: 'Looking back, do you think you made the right choice {blank} that startup?', isChoice: true, options: ['joining', 'to join', 'join'],          answer: 0 },
          { char: 1, text: "Honestly, if I {blank} known about the company culture, I wouldn't have accepted.", isChoice: true, options: ['had', 'have', 'would have'], answer: 0 },
          { char: 0, text: 'What would you recommend {blank} in a similar situation?', isChoice: true, options: ['doing', 'to do', 'do'],                                  answer: 0 },
          { char: 1, text: "I'd suggest {blank} the team before signing the contract.", isChoice: true, options: ['meeting', 'to meet', 'meet'],                            answer: 0 },
          { char: 0, text: 'If you {blank} that advice back then, how would things be different?', isChoice: true, options: ['had taken', 'took', 'would take'],           answer: 0 },
          { char: 1, text: 'I believe I {blank} progressed much faster in my career.', isChoice: true, options: ['would have', 'would', 'had'],                            answer: 0 },
        ],
      },
    },
  },

  // ─── BLOCK 3: Cultura, Entretenimiento y Expresiones Globales ────────────────
  // Grammar: Passive Voice (present + past) + Present Perfect with for/since

  b3: {
    l1: {
      match: {
        instruction: 'Match each movie reaction with the correct genre.',
        pairs: [
          { left: "I was on the edge of my seat the whole time!",   right: 'Action / Adventure film'  },
          { left: 'I was terrified — I could not sleep after!',      right: 'Horror film'              },
          { left: 'I laughed so hard — it was hilarious!',           right: 'Comedy film'              },
          { left: 'I was bored by the slow and confusing plot.',     right: 'Slow art-house film'      },
          { left: 'The Eiffel Tower is visited by millions of tourists.', right: 'Photo: Paris landmark' },
        ],
      },
      fill: {
        instruction: 'Look at the ancient Egypt timeline and complete each sentence.',
        imageDesc: "[Screen reader: A historical timeline on a sandy background. Three labeled points connected by arrows. Left: '2560 BC' — illustration of the Great Pyramid with small worker figures and lifting ropes. Center: '1922' — an archaeologist with a lantern entering a dark stone doorway. Right: 'Today' — a group of tourists in modern clothing taking photos in front of the pyramids under a bright sky.]",
        sentences: [
          { before: 'The pyramids',            after: 'over 4,500 years ago.',            options: ['were built','have been built','are built','built'],                answer: 0 },
          { before: "Tutankhamun's tomb",       after: 'in 1922.',                         options: ['was discovered','is discovered','has been discovered','discovered'], answer: 0 },
          { before: 'The site',                 after: 'by UNESCO for decades.',            options: ['has been protected','was protected','is protecting','protects'],  answer: 0 },
          { before: 'Millions of tourists',     after: 'Giza since records began.',         options: ['have visited','visited','are visited','visit'],                   answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this movie review conversation.',
        characters: ['Host', 'Guest'],
        lines: [
          { char: 0, text: "Welcome! Today we're reviewing 'The Lost City.' It {blank} directed by a first-time filmmaker.", isChoice: true, options: ['was', 'has been', 'is'], answer: 0 },
          { char: 1, text: 'I was really {blank} by the cinematography — stunning visuals!', isChoice: true, options: ['impressed', 'impressing', 'impressive'],                  answer: 0 },
          { char: 0, text: 'Same here. How long {blank} you {blank} a fan of this genre?', isChoice: true, options: ['have / been', 'did / be', 'were / been'],                  answer: 0 },
          { char: 1, text: 'Since I was a teenager. Adventure films have always {blank} me.', isChoice: true, options: ['excited', 'been exciting', 'exciting'],                  answer: 0 },
          { char: 0, text: 'The soundtrack {blank} composed by an Oscar-winning artist — did you notice?', isChoice: true, options: ['was', 'has been', 'were'],                  answer: 0 },
        ],
      },
    },

    l2: {
      match: {
        instruction: 'Match each entertainment experience with the correct reaction.',
        pairs: [
          { left: "I couldn't put it down — I read it in one night!", right: 'Thriller novel cover'              },
          { left: 'The live performance was absolutely breathtaking!', right: 'Concert event poster'             },
          { left: 'I found the whole documentary fascinating.',        right: 'Nature documentary poster'        },
          { left: "I've been a fan since 2010.",                      right: 'Person wearing a vintage band shirt' },
          { left: "She's been acting for over 20 years.",             right: 'Actor holding an award statuette'  },
        ],
      },
      fill: {
        instruction: "Look at the artist's career timeline and complete each sentence.",
        imageDesc: "[Screen reader: A horizontal music career timeline on a dark purple background. Four labeled milestone icons appear in sequence. '2001': a debut album cover with a golden microphone. '2005': a globe with a dotted flight path around it, labeled 'World Tour'. '2010': a single spotlight microphone, labeled 'Solo Career begins'. 'Today': a gold star icon labeled 'Icon status'.]",
        sentences: [
          { before: 'Her first album', after: 'in 2001.',                                      options: ['was released','has been released','released','is released'],            answer: 0 },
          { before: 'She',             after: 'internationally since 2005.',                     options: ['has toured','was toured','toured','tours'],                            answer: 0 },
          { before: 'Her latest song', after: 'over 50 million times.',                         options: ['has been downloaded','was downloaded','downloaded','is downloaded'],    answer: 0 },
          { before: 'She',             after: 'solo for more than a decade.',                   options: ['has been performing','was performing','has performed','performed'],     answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this travel vlog conversation.',
        characters: ['Vlogger', 'Follower'],
        lines: [
          { char: 0, text: 'Here in Cartagena! This city {blank} founded in 1533.',              isChoice: true, options: ['was', 'has been', 'were'],                            answer: 0 },
          { char: 1, text: 'How long {blank} you {blank} traveling South America?',               isChoice: true, options: ['have / been', 'did / be', 'were / been'],            answer: 0 },
          { char: 0, text: "I've been traveling since January — almost six months! I've been completely {blank} by the culture.", isChoice: true, options: ['amazed', 'amazing', 'amaze'], answer: 0 },
          { char: 0, text: 'This cathedral {blank} constructed in the 17th century and {blank} been a national monument since 1984.', isChoice: true, options: ['was / has', 'has been / was', 'is / has'], answer: 0 },
          { char: 1, text: 'You must find it {blank} to live out of a backpack for so long!',    isChoice: true, options: ['exhausting', 'exhausted', 'exhaust'],                answer: 0 },
        ],
      },
    },

    l3: {
      match: {
        instruction: 'Match each cultural experience with the correct description.',
        pairs: [
          { left: 'I was deeply moved by the exhibition.',                   right: 'Person standing thoughtfully in front of a painting in a museum' },
          { left: 'The match was so exciting — we could not stop cheering!', right: 'Person raising arms at a packed sports stadium'                  },
          { left: "I've been collecting vinyl records since I was 15.",       right: 'Person surrounded by a large, organized record collection'       },
          { left: 'Radio programs were broadcast globally for decades.',      right: 'Old vintage wooden radio with a fabric speaker on a shelf'       },
          { left: 'I find outdoor music festivals completely energizing!',    right: 'A crowd dancing and waving under colorful stage lights'          },
        ],
      },
      fill: {
        instruction: 'Look at the world map and complete each sentence.',
        imageDesc: "[Screen reader: A stylized world map with four countries highlighted in different colors, each with a small icon of their traditional product. Colombia in green: coffee beans and a steaming cup. France in blue: a wine bottle and grapes. Japan in red: a circuit board and robot arm. Egypt in orange: papyrus leaves and a hieroglyph-covered tablet. Each country has a small flag icon next to its name.]",
        sentences: [
          { before: 'Colombian coffee', after: 'to over 80 countries.',                         options: ['is exported','was exported','has been exported','exports'],         answer: 0 },
          { before: 'The first papyrus', after: 'in ancient Egypt thousands of years ago.',     options: ['was made','is made','has been made','made'],                        answer: 0 },
          { before: 'Japanese technology', after: 'rapidly since the 1950s.',                   options: ['has been developed','was developed','is developed','developed'],    answer: 0 },
          { before: 'French cuisine', after: 'by UNESCO since 2010.',                           options: ['has been recognized','was recognized','is recognized','recognized'], answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this cultural exchange conversation.',
        characters: ['Student A', 'Student B'],
        lines: [
          { char: 0, text: "I {blank} fascinated by this country's traditions since I arrived.", isChoice: true, options: ["'ve been", 'was', 'am been'],                     answer: 0 },
          { char: 1, text: 'How long {blank} you {blank} here?',                                 isChoice: true, options: ['have / been', 'did / be', 'were / been'],         answer: 0 },
          { char: 0, text: "For three months. I've been {blank} by how different the celebrations are.", isChoice: true, options: ['surprised', 'surprising', 'surprise'],    answer: 0 },
          { char: 1, text: 'Many of our festivals {blank} celebrated for hundreds of years.',    isChoice: true, options: ['have been', 'were', 'are being'],                  answer: 0 },
          { char: 0, text: "It's so {blank} to learn about a new culture firsthand!",            isChoice: true, options: ['enriching', 'enriched', 'enrich'],                answer: 0 },
        ],
      },
    },
  },

  // ─── BLOCK 4: Comunicación Humana, Relaciones y Planes ──────────────────────
  // Grammar: Modals for Speculation + Time Clauses + Reported Speech

  b4: {
    l1: {
      match: {
        instruction: 'Match each body language or invitation with its meaning.',
        pairs: [
          { left: 'Avatar crossing arms tightly',               right: 'He must be feeling defensive or closed off.'       },
          { left: 'Avatar with a wide smile and thumbs up',     right: "She can't be unhappy — she looks delighted!"       },
          { left: 'Avatar checking their watch repeatedly',     right: 'He might be in a hurry or feeling impatient.'      },
          { left: '"You are cordially invited to our annual gala."', right: 'A formal written invitation to an event.'    },
          { left: 'Avatar waving goodbye warmly',               right: 'A farewell gesture common across most cultures.'   },
        ],
      },
      fill: {
        instruction: 'Look at the public signs and complete each sentence.',
        imageDesc: "[Screen reader: Four public signs displayed in a row on a light grey background. Sign 1: A red circle with a lit cigarette crossed out — No Smoking symbol. Sign 2: A circular road sign with the number '50' — Speed limit. Sign 3: A yellow triangle with a stick figure slipping — Slippery floor warning. Sign 4: A blue rectangle with a white wheelchair icon — Accessible reserved parking.]",
        sentences: [
          { before: 'You',     after: "smoke in this area — it's strictly prohibited.", options: ["can't",'must','might','should'],                           answer: 0 },
          { before: 'Drivers', after: 'follow the speed limit at all times.',            options: ['must','might',"can't",'could'],                          answer: 0 },
          { before: 'The floor is wet, so people', after: 'slip if they are not careful.', options: ['might','must',"can't",'should'],                      answer: 0 },
          { before: 'As soon as you', after: ', show your invitation at the door.',      options: ['arrive','will arrive','arrived','are arriving'],          answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this chat between two friends planning an event.',
        characters: ['Mia', 'Leo'],
        lines: [
          { char: 0, text: "I sent the invites but Tom hasn't replied. He {blank} have seen the message yet.", isChoice: true, options: ['might not', "can't", 'must not'],  answer: 0 },
          { char: 1, text: "He {blank} be at work — he's always busy on Mondays.",              isChoice: true, options: ['must', 'might not', "can't"],                    answer: 0 },
          { char: 0, text: 'He told me he {blank} coming for sure before the weekend.',         isChoice: true, options: ['was', 'is', 'were'],                              answer: 0 },
          { char: 1, text: "Before we {blank} the venue, let's confirm the guest list.",         isChoice: true, options: ['book', 'will book', 'booked'],                   answer: 0 },
          { char: 0, text: "Good idea. As soon as everyone {blank}, we'll send the final details.", isChoice: true, options: ['confirms', 'will confirm', 'confirmed'],       answer: 0 },
        ],
      },
    },

    l2: {
      match: {
        instruction: 'Match each gesture or cultural situation with its interpretation.',
        pairs: [
          { left: 'Avatar nodding slowly and repeatedly',         right: 'Might mean agreement — or just acknowledgment.'         },
          { left: 'Avatar pointing directly at another person',   right: "Can't — Considered rude in many Asian cultures."        },
          { left: '"The guests are kindly requested to arrive by 7 pm."', right: 'A formal written invitation to an event.'      },
          { left: 'Avatar covering mouth while laughing softly',  right: 'Must — A polite gesture showing politeness here.'       },
          { left: 'Two people shaking hands firmly',              right: 'Must — Signals confidence in professional settings.'    },
        ],
      },
      fill: {
        instruction: 'Look at the calendar notes and complete each sentence.',
        imageDesc: "[Screen reader: A monthly wall calendar with yellow sticky notes on several dates. Two notes are crossed out with green checkmarks: 'Submit report ✓' and 'Team meeting ✓'. Two notes have no checkmark and a small clock icon: 'Call dentist' and 'Pick up package'. A red circle marks the current date.]",
        sentences: [
          { before: 'She said she',   after: 'the dentist before the end of the month.',  options: ['would call','will call','called','calls'],              answer: 0 },
          { before: 'After he',       after: 'the report, he can take the afternoon off.', options: ['submits','submitted','will submit','has submitted'],  answer: 0 },
          { before: 'She',            after: 'have forgotten the package — it has been two weeks!', options: ['must','can\'t','might','should'],             answer: 0 },
          { before: 'He told us he',  after: 'the meeting the following day.',             options: ['was attending','is attending','will attend','attends'], answer: 0 },
        ],
      },
      dialogue: {
        instruction: "Complete this conversation about a missing laptop.",
        characters: ['Sam', 'Alex'],
        lines: [
          { char: 0, text: "Where's my laptop? It {blank} be in my room — I left it on my desk!", isChoice: true, options: ["can't", 'might', 'must'],       answer: 0 },
          { char: 1, text: 'Maybe Jake borrowed it. He {blank} have needed it for his presentation.', isChoice: true, options: ['might', "can't", 'must not'], answer: 0 },
          { char: 0, text: 'He told me yesterday that he {blank} his own device.',                isChoice: true, options: ['was using', 'is using', 'used'],   answer: 0 },
          { char: 1, text: 'As soon as Jake {blank} home, we should ask him.',                    isChoice: true, options: ['gets', 'will get', 'got'],         answer: 0 },
          { char: 0, text: 'He said he {blank} back before dinner.',                              isChoice: true, options: ['would be', 'will be', 'is'],       answer: 0 },
        ],
      },
    },

    l3: {
      match: {
        instruction: 'Match each gesture or invitation with its correct meaning.',
        pairs: [
          { left: 'Avatar smiling with open hands, relaxed shoulders', right: 'Open body language — must indicate friendliness.'          },
          { left: 'Avatar avoiding eye contact, looking down shyly',   right: 'Might mean respect, not shyness, in some cultures.'        },
          { left: '"Hey! You should totally come to my party Friday!"', right: 'A casual, informal party invitation.'                     },
          { left: 'Avatar crossing fingers behind their back',          right: 'She might be hoping for good news secretly.'               },
          { left: 'Two people bowing slowly and respectfully',          right: 'Must be a formal greeting in East Asian cultures.'         },
        ],
      },
      fill: {
        instruction: 'Look at the chat messages and complete each sentence.',
        imageDesc: "[Screen reader: A phone screen showing a messaging app conversation. Top message from 'Carlos' in a grey bubble: 'Are you coming tonight?' Below it, two reply options shown as contrasting bubbles: a green bubble saying 'I'll be there!' and a grey bubble saying 'Can't make it, sorry!' At the bottom, a text input bar shows a message being typed: 'Let me know as soon as you decide.']",
        sentences: [
          { before: 'She said that she', after: 'make it to the dinner.',             options: ["couldn't","can't","won't","doesn't"],                   answer: 0 },
          { before: 'Before you',        after: 'the party, say goodbye to the host.', options: ['leave','will leave','left','are leaving'],              answer: 0 },
          { before: 'He',                after: 'have misunderstood — his expression was totally confused.', options: ['must',"might","can't",'should'],   answer: 0 },
          { before: 'She told him she',  after: 'as soon as the meeting finished.',   options: ['would arrive','will arrive','arrives','arrived'],         answer: 0 },
        ],
      },
      dialogue: {
        instruction: 'Complete this last-minute plan change conversation.',
        characters: ['Carla', 'Julia'],
        lines: [
          { char: 0, text: "I don't think Paulo is coming tonight. He {blank} have forgotten.", isChoice: true, options: ['might', "can't", 'must not'],   answer: 0 },
          { char: 1, text: 'He {blank} forget — he was so excited about it this morning!',       isChoice: true, options: ["can't", 'might', 'must'],       answer: 0 },
          { char: 0, text: 'He texted earlier and said he {blank} running late from work.',       isChoice: true, options: ['was', 'is', 'were'],             answer: 0 },
          { char: 1, text: "As soon as he {blank}, we'll start the movie.",                       isChoice: true, options: ['arrives', 'will arrive', 'arrived'], answer: 0 },
          { char: 0, text: 'He told me he {blank} be here before 9.',                            isChoice: true, options: ['would', 'will', 'is going to'],   answer: 0 },
          { char: 1, text: "Let's order food now. After we {blank}, I'm sure he'll show up.",    isChoice: true, options: ['order', 'will order', 'ordered'],  answer: 0 },
        ],
      },
    },
  },

  // ─── CHALLENGE MODE ──────────────────────────────────────────────────────────

  challenge: {
    match: {
      instruction: 'Match each expression with its correct response.',
      pairs: [
        { left: 'Can you repeat that more slowly?',    right: 'Of course! Take your time.'         },
        { left: 'I really enjoy learning languages.',  right: 'Me too! It opens so many doors.'    },
        { left: 'Practice makes perfect!',             right: "That's so true — keep going!"       },
        { left: "What's the weather like today?",      right: "It's sunny and warm outside."       },
        { left: 'Have a great day!',                   right: 'Thanks, you too!'                   },
      ],
    },
    fill: {
      instruction: 'Complete each sentence with the correct word or phrase.',
      imageDesc: "[Screen reader: A colorful illustration of a language learning app interface. A cartoon student sits at a desk surrounded by open books, a laptop showing a video call, and speech bubbles with foreign words. A horizontal progress bar in the background shows 60% completion with a graduation cap icon at the end.]",
      sentences: [
        { before: 'She', after: "English for three years and she's getting better.",  options: ['has been studying','studied','is studying','studies'],   answer: 0 },
        { before: 'If I', after: 'more free time, I would practice every day.',        options: ['had','have','would have','has'],                         answer: 0 },
        { before: 'Languages', after: 'more easily when you practice daily.',           options: ['are learned','were learned','learned','is learned'],     answer: 0 },
        { before: 'Before you', after: 'a new word, try to use it in a sentence.',      options: ['forget','will forget','forgot','are forgetting'],        answer: 0 },
      ],
    },
    dialogue: {
      instruction: 'Complete this language learning conversation.',
      characters: ['Teacher', 'Student'],
      lines: [
        { char: 0, text: 'How long {blank} you {blank} English?',              isChoice: true, options: ['have / been studying', 'did / study', 'were / studying'],  answer: 0 },
        { char: 1, text: 'For about two years. I enjoy {blank} new grammar rules.', isChoice: true, options: ['learning', 'to learn', 'learn'],                    answer: 0 },
        { char: 0, text: "Great! If you {blank} more often, you'd improve even faster.", isChoice: true, options: ['practiced', 'would practice', 'practice'],    answer: 0 },
        { char: 1, text: 'I know! My last teacher told me I {blank} speaking every day.', isChoice: true, options: ['should practice', 'practiced', 'was practicing'], answer: 0 },
        { char: 0, text: 'As soon as you {blank} comfortable, try talking to native speakers.', isChoice: true, options: ['feel', 'will feel', 'felt'],             answer: 0 },
      ],
    },
  },
};
