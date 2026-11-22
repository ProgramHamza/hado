/** English page copy. The Slovak file must have exactly the same shape (see `Copy`). */
export const en = {
  locale: "en-US",
  meta: {
    title: "Hado, control panels for gloved hands",
    description:
      "Hado (波動, wave) is a sealed, glass-free control panel for cold stores, yards and wet sites. A coded signal from an insert in the work glove locates each press and identifies the operator.",
  },
  nav: {
    how: "How it works",
    where: "Where",
    try: "Try it",
    pricing: "Pricing",
    team: "Team",
    faq: "Questions",
    pilot: "Run a pilot",
    language: "Language",
  },
  hero: {
    wave: "wave",
    title: "Controls that work in freezer gloves",
    lead: "Hado is a sealed control panel with no glass screen, made for cold stores, yards and wet sites. A small insert in the work glove sends a coded radio signal. From it the panel works out where you pressed and whose glove it was, so nobody has to take their gloves off.",
    ctaHow: "See how it works",
    ctaPilot: "Run a pilot",
    readoutTitle: "Sensor model. Move your pointer over the field.",
    readoutXY: "Touch X / Y",
    readoutPhase: "Phase shift",
    readoutOperator: "Operator",
    operatorValue: "glove 07",
    readoutNote: "An illustration of the principle, not live data.",
  },
  intro: {
    lines: ["No more taking gloves off to press a button.", "No glass to fog up or crack.", "And you know who pressed what."],
    stats: [
      {
        pre: "",
        suf: " °C",
        text: "Freezer warehouses, where operators wear thick insulated gloves and screens fog with condensation.",
      },
      {
        pre: "~",
        suf: " mm",
        text: "Roughly the glove thickness today's glove-mode touchscreens are specified for. Insulated gloves are thicker.",
      },
      { pre: "< ", suf: " mm", text: "Pass mark for our go/no-go test: mean touch error with no per-user calibration." },
      { pre: "$", suf: "B", text: "Industrial HMI terminal market in 2025 (Straits Research, 2025)." },
    ],
  },
  story: {
    aria: "Scroll animation of the Hado signal path",
    captions: [
      { h: "The glove sends a signal", p: "An insert sewn into the work glove emits a coded signal in a licence-free radio band." },
      {
        h: "The panel works out the position",
        p: "Each sensor at the edge of the sealed panel sees the signal slightly later and weaker. Phase and magnitude give the position. Move your pointer over the panel to press it yourself.",
      },
      {
        h: "Frost and water don't trigger it",
        p: "In the cold and wet, a glass screen fogs up and registers touches nobody made. The coded signal works the same whatever the glove thickness.",
      },
      {
        h: "Each glove has its own code",
        p: "Each glove carries its own code, so the panel logs who pressed what. Move your pointer to press.",
      },
    ],
    steps: ["Send", "Compare", "Cold & wet", "Identify"],
    labels: {
      glassFalse: "Glass screen, false touches:",
      hadoFalse: "Hado, false touches: 0",
      insert: "glove insert",
      insulated: "insulated glove",
      sensors: "sensors",
      panel: "Hado panel · press log: operator 07",
      phase: "phase",
      level: "level",
    },
  },
  how: {
    title: "How it works",
    p1: "A small insert sewn into company-issued work gloves sends a coded signal in a licence-free ISM band (13.56 or 40.68 MHz). Sensors around a sealed, glass-free panel measure how the signal arrives, how late and how weak, and from that we calculate where the fingertip is. The code tells us which glove it was.",
    p2: "The panel sits next to the screen you already have and replaces the touch or keypad input. The display and the computer stay as they are. We don't use rings on the factory floor because they are dangerous near rotating machinery. That's why the emitter is in the glove.",
    p3: "The principle builds on SkinTrack, published by Carnegie Mellon researchers at CHI 2016, which located touches from the phase and amplitude of a signal travelling through the body, with 99 % touch detection and a mean error of 7.6 mm. We flipped it around for industry: emitter in the glove, sensors in the panel, a code per operator.",
  },
  name: {
    title: "Why the name",
    text: "In Japanese, 波動 means wave, or wave motion. We picked it because every press travels as a radio wave, and because it's short and easy to say in any language.",
  },
  sites: {
    title: "Where we start",
    lead: "We start where gloves are thickest, surfaces are wet and there is no rotating machinery at the terminal. Later we want to move into other thick-glove sectors such as mining, energy and defence.",
    items: [
      {
        title: "Cold stores",
        when: "First",
        text: "Freezer warehouses at −25 °C. Operators wear thick insulated gloves, screens fog with condensation, and taking a glove off means cold hands and lost minutes.",
      },
      {
        title: "Yards and ports",
        when: "Next",
        text: "Outdoor terminals in rain, frost and dirt. Heavy work gloves, wet surfaces, and many hands on the same panel.",
      },
      {
        title: "Food washdown",
        when: "Next",
        text: "Lines hosed down every shift. A sealed, glass-free surface with nothing to crack and nothing to collect dirt.",
      },
    ],
    later: {
      when: "Later, consumer version",
      title: "On the back of your hand",
      text: "A ring sends the signal and the back of your hand becomes the touchpad, to control a smartwatch, smart glasses or earbuds without touching them. This is the original SkinTrack idea and a later consumer variant, not our first product.",
      note: "Rings stay out of industry: near rotating machinery they are a degloving hazard and usually banned, so the industrial emitter lives in the glove.",
    },
  },
  benefits: {
    title: "What it changes for operators",
    items: [
      {
        h: "Works through thick gloves",
        p: "The signal comes from the glove insert, not from skin touching glass, so insulated and soaked gloves are not the limit.",
      },
      {
        h: "Condensation doesn't trigger presses",
        p: "Water, frost and a sleeve brushing the panel emit no code, so they cannot trigger a press.",
      },
      {
        h: "Logs who pressed what",
        p: "Each glove carries its own code. The panel logs which operator pressed what, with no badge tap per action.",
      },
      { h: "Layout set in software", p: "Buttons and zones change with a software update, not a rewired keypad." },
      {
        h: "Not for safety circuits",
        p: "Hado is an operator input. Emergency stops stay hardwired, as EN 60204-1 and ISO 13850 require.",
      },
      {
        h: "PIN and badge fallback",
        p: "No glove insert or a flat battery? Visitors and maintenance log in with PIN and badge and keep working.",
      },
      {
        h: "Permissions follow the glove",
        p: "The panel knows who is pressing and what they may do. Machine settings only open for the gloves of people allowed to change them, with no PIN or badge.",
      },
      {
        h: "Ignores motor noise",
        p: "Each glove's code lets the receiver filter out interference from motors and inverters on the floor.",
      },
      {
        h: "Nothing to crack or scratch",
        p: "The sensors sit under a tough cover that handles frost, water, washdown and impacts.",
      },
    ],
  },
  tryIt: {
    title: "Try it yourself",
    lead: "Three buttons, like our proof of concept. Press them with each technology, then turn thick gloves and condensation on or off.",
    techLabel: "Technology",
    hado: "Hado",
    glass: "Glove-mode touchscreen",
    wet: "Thick gloves and condensation",
    prompt: "Press a button.",
    pressed: "You pressed",
    registered: "registered",
    byOperator: "by operator 07",
    correct: "Correct",
    of: "of",
    note: "The touchscreen's errors are simulated to show the contrast. They are not test data; our head-to-head test against a glove-mode touchscreen is planned for Q1 2027.",
  },
  savings: {
    title: "What taking gloves off costs",
    lead: "Every glove removal is a pause and a safety risk. Set your own numbers to see the time it adds up to. This is an estimate from your inputs, not measured data.",
    workers: "Workers on touchscreens",
    removals: "Glove removals per worker per shift",
    seconds: "Seconds lost each time",
    rate: "Labour cost per hour",
    secondsUnit: "s",
    assumes: "Assumes 230 shifts a year.",
    hours: "hours lost every year",
    paid: "in paid time, per year",
  },
  pricing: {
    title: "Pricing",
    lead: "Target prices, to be confirmed in paid pilots. The inserts are replaced together with the work gloves, and the software licence covers glove and operator management and press logs.",
    items: [
      {
        name: "Hado panel",
        price: "590–790 €",
        note: "Sealed, glass-free control panel next to the existing screen. Price depends on size.",
      },
      {
        name: "Glove inserts",
        price: "25–40 € / pair",
        note: "Sewn into company-issued work gloves and replaced with them. Target ≥ 12 h battery, washable, works at −25 °C.",
      },
      { name: "Software licence", price: "~10 € / month per panel", note: "Glove and operator management, press logs for audits, updates." },
    ],
    hardware:
      "Hardware cost: the current prototype bill of materials is about 200–300 €. The series target is under 150 €, by moving to an integrated multi-channel receiver.",
  },
  status: {
    title: "Where we are now",
    lead: "Right now we have a lab proof of concept. It tells three touch zones apart after five minutes of calibration, using a single gain and phase receiver. Before we build a product, it has to pass the test below, and it is allowed to fail.",
    photoAlt:
      "Hado proof of concept worn on the hand: an AD8302 gain and phase receiver board on the back of the hand, wired to sensor electrodes on a wristband",
    photoCaption:
      "The lab proof of concept: a gain and phase receiver on the back of the hand, wired to sensor electrodes on a wristband. It is the original on-skin setup we use to test the principle, before the glove insert and the sealed panel.",
    spec: [
      ["3", "Touch zones today"],
      ["5 min", "Calibration today"],
      ["ISM", "Licence-free band, 13.56 or 40.68 MHz"],
      ["200–300 €", "Prototype bill of materials"],
      ["under 150 €", "Series cost target"],
    ],
    timeline: [
      ["Q1 2027", "Three-month go/no-go test (below) and interviews with cold-store operators. If it fails, we simplify Hado to a rugged keypad with operator identification."],
      ["Q3 2027", "Industrial prototype (sealed panel, glove insert, ISM band) and two paid pilots or binding orders in cold storage."],
      ["2028", "CE certification, a small series and more pilots."],
      ["2028–2029", "Market launch and first revenue."],
    ],
    testTitle: "The go/no-go test",
    tests: [
      "Blind test with 10 people and 3 glove types: nitrile, 3 mm leather, 5 mm insulated",
      "No per-user calibration, targets under a 4 mm cover; pass at mean error under 10 mm and touch F1 above 97 %",
      "Repeat with a salt-water film and soaked gloves",
      "Paid EMC pre-scan: radiated immunity and glove emissions",
      "Head-to-head against an off-the-shelf glove-mode touchscreen with the same gloves and cover",
    ],
  },
  pilot: {
    title: "Pilot it in your cold store",
    text: "We are looking for cold-storage, logistics and port sites where operators fight touchscreens in thick gloves. Tell us about one panel and the gloves your people wear, and we will come and test it with you.",
    emailLabel: "Your work email",
    messageLabel: "Message",
    messagePlaceholder: "Which site and panel, and what gloves your people wear.",
    send: "Send message",
    sending: "Sending…",
    sent: "Thanks, your message has been sent. We'll reply to the email you gave us.",
    error: "Something went wrong and the message wasn't sent. Please try again in a minute.",
    offline: "The contact form isn't connected yet. Please check back soon.",
    cooldown: "Your message was already sent. Please wait a minute before sending another one.",
    tooManyLinks: "Please remove some links from the message and try again.",
    subject: "Hado pilot interest",
  },
  team: {
    title: "Team",
    lead: "A small team from Bratislava, Slovakia, with roots in robotics research. Hado is developed by Cassava s. r. o.",
    members: [
      {
        role: "Founder of Hado, CTO",
        photoAlt: "Marek Hromada at MILSET ESE 2026 with his bionic hand project",
        bio: "Came up with Hado and builds the hardware and signal processing.",
        highlights: [
          "Winner of FVaT AMAVET 2025 and 2026; ISEF 2027 finalist",
          "Two-time National Centre of Robotics Prize winner",
          "Robotics research in Japan (ENMA) and Slovakia (COCOHRIP)",
        ],
      },
      {
        role: "CFO",
        photoAlt: "Adam Daniel Donoval",
        bio: "Co-founder and managing director of Cassava s. r. o. Handles finance, grants and investors.",
        highlights: [
          "Co-founder of Papaya International, a youth non-profit running Erasmus+ projects",
          "Future Founders (The Spot) and InVenture Mind (Georgia Tech)",
          "Two-time Noove Challenge winner, BARS5 winner, Economics Olympiad bronze",
        ],
      },
      {
        role: "COO",
        photoAlt: "Teo Višňovský",
        bio: "Co-founder and managing director of Cassava s. r. o. Runs operations: pilots, suppliers and customer discovery.",
        highlights: [
          "Software engineer at Aerostacks: drone data for avalanche-risk prediction",
          "Co-founder of Papaya International; Future Founders (The Spot)",
          "IT lead at AproMUN; maths and physics tutor",
        ],
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        q: "How does it work?",
        a: "An insert sewn into the work glove sends a coded radio signal in a licence-free ISM band (13.56 or 40.68 MHz). Sensors in the panel measure its phase shift and magnitude difference to place the touch in two dimensions, and the code tells the panel which glove it is.",
      },
      {
        q: "Does it replace our touchscreen?",
        a: "No. Hado is a sealed, software-defined control panel that sits next to the existing screen and replaces the touch or keypad input. Your display and computer stay as they are.",
      },
      {
        q: "Does it really work in freezer gloves?",
        a: "That is exactly what our first test checks: 10 people, nitrile, 3 mm leather and 5 mm insulated gloves, no calibration, with a salt-water film. Today's glove-mode touchscreens are specified for gloves up to roughly 1.5 to 2 mm.",
      },
      {
        q: "Can it be used for safety functions?",
        a: "No. Hado is for operator input only. Emergency stops and other safety functions stay hardwired, as EN 60204-1 and ISO 13850 require.",
      },
      {
        q: "What if a glove insert is missing or flat?",
        a: "The panel falls back to PIN and badge login, so visitors and maintenance can still operate it. The insert is designed for at least a 12-hour shift.",
      },
      {
        q: "What will it cost?",
        a: "Target prices: about 590 to 790 € per panel depending on size, 25 to 40 € per pair of glove inserts, and a software licence of about 10 € a month per panel for glove management and press logs. The prototype bill of materials is about 200 to 300 € today; the series target is under 150 €.",
      },
      {
        q: "Why a glove insert and not a ring?",
        a: "Rings are usually banned near rotating machinery because they can catch and cause degloving injuries. Gloves are already managed protective equipment, so the industrial emitter is sewn into them. A ring is only planned for a later consumer variant, where the back of the hand controls a smartwatch, glasses or earbuds.",
      },
      {
        q: "Where is the project today?",
        a: "A lab proof of concept that tells three touch zones apart after about five minutes of calibration. The next step is a three-month go/no-go validation in Q1 2027.",
      },
      {
        q: "Where does the idea come from?",
        a: "SkinTrack, a 2016 study from Carnegie Mellon University, showed that the phase of a signal travelling through the body can locate a touch. We turn the principle around for industry: the emitter is in the glove, the sensors are in a sealed panel, and each glove carries its own code.",
      },
      {
        q: "How does it connect to our systems?",
        a: "It plugs in like a USB keyboard or connects to your control system over Modbus or OPC UA, so your own maintenance team can install it. The target enclosure rating is IP67 / IP69K.",
      },
      {
        q: "How is it different from rugged touchscreens and keypads?",
        a: "Industrial touchscreens from makers like Siemens, B&R or Exor handle gloves and water better every year, but are usually specified for gloves up to 1.5 to 2 mm. IP69K piezo and inductive keypads are tough but fixed. Badge login identifies a session, not each press. Hado works through thick insulated gloves, logs who made every press, ties permissions to the glove and lets you change the layout in software.",
      },
      {
        q: "Where will you sell first?",
        a: "Slovakia, Czechia and Austria first, close to our pilot sites. Then Germany, Poland and the Netherlands, the largest cold-chain markets in Europe and home to many warehouse equipment makers. Later the US and Canada.",
      },
      {
        q: "How big is the market?",
        a: "Industrial HMI terminals were a 5.5 billion USD market in 2025, expected to reach 9.9 billion by 2034 (Straits Research). About 1.4 million industrial control panels are sold each year; we estimate 10 to 15 % of them work in thick gloves, cold or wet, around 150,000 to 200,000 panels a year.",
      },
      {
        q: "Why the name Hado?",
        a: "波動 (hadō) is Japanese for wave, or wave motion: a nod to the radio waves that carry every press. It is short and easy to say in any language.",
      },
    ],
  },
  footer: {
    text: "radio frequency user interface. Based on SkinTrack, CMU, 2016.",
    study: "Read the study",
  },
};

export type Copy = typeof en;
