import type { Copy } from "./en";

/** Slovak page copy. Same shape as `en`; TypeScript flags any missing or extra key. */
export const sk: Copy = {
  locale: "sk-SK",
  meta: {
    title: "Hado, ovládacie panely pre ruky v rukaviciach",
    description:
      "Hado (波動, vlna) je utesnený ovládací panel bez skla pre mraziarenské sklady, vonkajšie areály a mokré prevádzky. Kódovaný signál z vložky v pracovnej rukavici určí miesto každého stlačenia a identifikuje operátora.",
  },
  nav: {
    how: "Ako to funguje",
    where: "Kde",
    try: "Vyskúšajte",
    pricing: "Ceny",
    team: "Tím",
    faq: "Otázky",
    pilot: "Pilotný projekt",
    language: "Jazyk",
  },
  hero: {
    wave: "vlna",
    title: "Ovládanie, ktoré funguje aj v hrubých rukaviciach",
    lead: "Hado je utesnený ovládací panel bez sklenenej obrazovky, určený pre mraziarne, vonkajšie areály a mokré prevádzky. Malá vložka v pracovnej rukavici vysiela kódovaný rádiový signál. Panel z neho zistí, kam ste stlačili a čia rukavica to bola, takže si nikto nemusí vyzliekať rukavice.",
    ctaHow: "Ako to funguje",
    ctaPilot: "Pilotný projekt",
    readoutTitle: "Model senzorov. Pohybujte kurzorom nad poľom.",
    readoutXY: "Dotyk X / Y",
    readoutPhase: "Fázový posun",
    readoutOperator: "Operátor",
    operatorValue: "rukavica 07",
    readoutNote: "Ilustrácia princípu, nie živé dáta.",
  },
  intro: {
    lines: ["Už žiadne vyzliekanie rukavíc kvôli jednému tlačidlu.", "Žiadne sklo, ktoré sa zarosí alebo praskne.", "A viete, kto čo stlačil."],
    stats: [
      {
        pre: "",
        suf: " °C",
        text: "Mraziarenské sklady, kde operátori nosia hrubé zateplené rukavice a obrazovky sa rosia kondenzátom.",
      },
      {
        pre: "~",
        suf: " mm",
        text: "Približne taká hrúbka rukavíc, na akú sú dnešné dotykové obrazovky s režimom pre rukavice určené. Zateplené rukavice sú hrubšie.",
      },
      {
        pre: "< ",
        suf: " mm",
        text: "Hranica úspechu nášho testu go/no-go: priemerná chyba dotyku bez kalibrácie na konkrétneho používateľa.",
      },
      { pre: "", suf: " mld. $", text: "Trh priemyselných HMI terminálov v roku 2025 (Straits Research, 2025)." },
    ],
  },
  story: {
    aria: "Animácia cesty signálu Hado pri posúvaní",
    captions: [
      { h: "Rukavica vyšle signál", p: "Vložka všitá do pracovnej rukavice vysiela kódovaný signál v bezlicenčnom rádiovom pásme." },
      {
        h: "Panel vypočíta polohu",
        p: "Každý senzor na okraji utesneného panela zachytí signál o niečo neskôr a slabší. Fáza a amplitúda určia polohu. Pohybom kurzora nad panelom ho môžete stlačiť sami.",
      },
      {
        h: "Mráz ani voda ho nespustia",
        p: "V chlade a vlhku sa sklenená obrazovka zarosí a registruje dotyky, ktoré nikto neurobil. Kódovaný signál funguje rovnako bez ohľadu na hrúbku rukavice.",
      },
      {
        h: "Každá rukavica má vlastný kód",
        p: "Každá rukavica má vlastný kód, takže panel zaznamená, kto čo stlačil. Pohybom kurzora stláčajte.",
      },
    ],
    steps: ["Vysiela", "Porovnáva", "Chlad a voda", "Identifikuje"],
    labels: {
      glassFalse: "Sklenená obrazovka, falošné dotyky:",
      hadoFalse: "Hado, falošné dotyky: 0",
      insert: "vložka v rukavici",
      insulated: "zateplená rukavica",
      sensors: "senzory",
      panel: "Panel Hado · záznam: operátor 07",
      phase: "fáza",
      level: "úroveň",
    },
  },
  how: {
    title: "Ako to funguje",
    p1: "Malá vložka všitá do firemných pracovných rukavíc vysiela kódovaný signál v bezlicenčnom pásme ISM (13,56 alebo 40,68 MHz). Senzory okolo utesneného panela bez skla merajú, ako signál prichádza, s akým oneskorením a akou silou, a z toho vypočítame, kde je prst. Kód nám povie, ktorá rukavica to bola.",
    p2: "Panel sa umiestni vedľa obrazovky, ktorú už máte, a nahradí dotykové alebo klávesnicové ovládanie. Displej aj počítač ostávajú. Prstene vo výrobe nepoužívame, pretože pri rotujúcich strojoch sú nebezpečné. Preto je vysielač v rukavici.",
    p3: "Princíp nadväzuje na SkinTrack, ktorý v roku 2016 publikovali výskumníci z Carnegie Mellon University a ktorý určoval polohu dotyku z fázy signálu šíriaceho sa telom. Otočili sme ho pre priemysel: vysielač v rukavici, senzory v paneli a vlastný kód pre každého operátora.",
  },
  name: {
    title: "Prečo tento názov",
    text: "V japončine znamená 波動 vlnu alebo vlnenie. Vybrali sme ho, lebo každé stlačenie putuje ako rádiová vlna, a tiež preto, že je krátky a ľahko sa vysloví v akomkoľvek jazyku.",
  },
  sites: {
    title: "Kde začíname",
    lead: "Začíname tam, kde sú rukavice najhrubšie, povrchy mokré a pri termináli nie sú rotujúce stroje.",
    items: [
      {
        title: "Mraziarne",
        when: "Najprv",
        text: "Mraziarenské sklady pri −25 °C. Operátori nosia hrubé zateplené rukavice, obrazovky sa rosia a vyzliecť si rukavicu znamená studené ruky a stratené minúty.",
      },
      {
        title: "Areály a prístavy",
        when: "Najprv",
        text: "Vonkajšie terminály v daždi, mraze a špine. Ťažké pracovné rukavice, mokré povrchy a veľa rúk na jednom paneli.",
      },
      {
        title: "Potravinárske prevádzky",
        when: "Potom",
        text: "Linky, ktoré sa každú zmenu umývajú hadicou. Utesnený povrch bez skla, kde nemá čo prasknúť a kde sa nedrží špina.",
      },
    ],
    later: {
      when: "Neskôr, verzia pre spotrebiteľov",
      title: "Na chrbte ruky",
      text: "Prsteň vysiela signál a chrbát ruky sa stane touchpadom na ovládanie smart hodiniek, inteligentných okuliarov či slúchadiel bez dotyku. Je to pôvodný nápad SkinTrack a neskorší spotrebiteľský variant, nie náš prvý produkt.",
      note: "Prstene do priemyslu nepatria: pri rotujúcich strojoch hrozí strhnutie kože z prsta a zvyčajne sú zakázané, preto je priemyselný vysielač v rukavici.",
    },
  },
  benefits: {
    title: "Čo to zmení pre operátorov",
    items: [
      {
        h: "Funguje cez hrubé rukavice",
        p: "Signál vychádza z vložky v rukavici, nie z kože dotýkajúcej sa skla, takže zateplené ani premočené rukavice nie sú prekážkou.",
      },
      {
        h: "Kondenzát nespúšťa stlačenia",
        p: "Voda, námraza ani rukáv, ktorý sa obtrie o panel, nevysielajú kód, takže nemôžu spustiť stlačenie.",
      },
      {
        h: "Záznam, kto čo stlačil",
        p: "Každá rukavica má vlastný kód. Panel zaznamená, ktorý operátor čo stlačil, bez prikladania karty pri každej akcii.",
      },
      { h: "Rozloženie sa nastavuje v softvéri", p: "Tlačidlá a zóny sa menia aktualizáciou softvéru, nie prerábaním klávesnice." },
      {
        h: "Nie pre bezpečnostné obvody",
        p: "Hado slúži na ovládanie operátorom. Núdzové zastavenie ostáva pevne zapojené, ako vyžadujú EN 60204-1 a ISO 13850.",
      },
      {
        h: "Záložné prihlásenie PIN-om a kartou",
        p: "Chýba vložka alebo je vybitá batéria? Návštevy a údržba sa prihlásia PIN-om a kartou a pracujú ďalej.",
      },
    ],
  },
  tryIt: {
    title: "Vyskúšajte si to",
    lead: "Tri tlačidlá, ako náš funkčný koncept. Stláčajte ich s každou technológiou a zapnite alebo vypnite hrubé rukavice a kondenzát.",
    techLabel: "Technológia",
    hado: "Hado",
    glass: "Dotyková obrazovka s režimom pre rukavice",
    wet: "Hrubé rukavice a kondenzát",
    prompt: "Stlačte tlačidlo.",
    pressed: "Stlačili ste",
    registered: "zaznamenané",
    byOperator: "operátorom 07",
    correct: "Správne",
    of: "z",
    note: "Chyby dotykovej obrazovky sú simulované, aby ukázali rozdiel. Nie sú to výsledky testov; priame porovnanie s dotykovou obrazovkou s režimom pre rukavice plánujeme na 1. štvrťrok 2027.",
  },
  savings: {
    title: "Koľko stojí vyzliekanie rukavíc",
    lead: "Každé vyzlečenie rukavice je prestávka a bezpečnostné riziko. Zadajte vlastné čísla a uvidíte, koľko času sa nazbiera. Je to odhad z vašich údajov, nie namerané dáta.",
    workers: "Pracovníci pri dotykových obrazovkách",
    removals: "Vyzlečenia rukavíc na pracovníka za zmenu",
    seconds: "Stratené sekundy zakaždým",
    rate: "Náklady na prácu za hodinu",
    secondsUnit: "s",
    assumes: "Počíta s 230 zmenami za rok.",
    hours: "stratených hodín ročne",
    paid: "v zaplatenom čase ročne",
  },
  pricing: {
    title: "Ceny",
    lead: "Cieľové ceny, ktoré potvrdíme v platených pilotných projektoch. Vložky sa vymieňajú spolu s pracovnými rukavicami a licencia pre prevádzku pokrýva identifikáciu operátorov a záznamy stlačení.",
    items: [
      {
        name: "Panel Hado",
        price: "590 – 790 €",
        note: "Utesnený ovládací panel bez skla vedľa existujúcej obrazovky. Cieľová cena.",
      },
      {
        name: "Vložky do rukavíc",
        price: "25 – 40 € / pár",
        note: "Všité do firemných pracovných rukavíc a vymieňané spolu s nimi. Cieľ: batéria ≥ 12 h, prateľné, fungujú pri −25 °C.",
      },
      {
        name: "Licencia pre prevádzku",
        price: "Za prevádzku",
        note: "Identifikácia operátorov, záznamy stlačení a audit, aktualizácie rozloženia.",
      },
    ],
    hardware:
      "Náklady na hardvér: materiál súčasného prototypu stojí približne 200 – 300 €. Cieľ pre sériovú výrobu je pod 150 € vďaka integrovanému viackanálovému prijímaču.",
  },
  status: {
    title: "Kde sme teraz",
    lead: "Zatiaľ máme laboratórny funkčný koncept. Po päťminútovej kalibrácii rozlíši tri dotykové zóny a používa jediný prijímač zisku a fázy. Skôr než postavíme produkt, musí prejsť testom nižšie, a pokojne ním môže aj neprejsť.",
    photoAlt:
      "Funkčný koncept Hado na ruke: doska prijímača zisku a fázy AD8302 na chrbte ruky, prepojená so snímacími elektródami na náramku",
    photoCaption:
      "Laboratórny funkčný koncept: prijímač zisku a fázy na chrbte ruky, prepojený so snímacími elektródami na náramku. Je to pôvodné zapojenie na koži, na ktorom overujeme princíp pred vložkou do rukavice a utesneným panelom.",
    spec: [
      ["3", "Dotykové zóny dnes"],
      ["5 min", "Kalibrácia dnes"],
      ["ISM", "Bezlicenčné pásmo, 13,56 alebo 40,68 MHz"],
      ["200 – 300 €", "Materiál prototypu"],
      ["pod 150 €", "Cieľ pre sériovú výrobu"],
    ],
    timeline: [
      ["Q1 2027", "Trojmesačné overenie go/no-go (nižšie). Ak neuspeje, skončíme alebo zmeníme smer."],
      ["Q3 2027", "Priemyselný prototyp a dva platené pilotné projekty alebo listy o zámere v mraziarňach."],
      ["2028", "Certifikácia CE a prvé tržby v rokoch 2028 až 2029."],
    ],
    testTitle: "Test go/no-go",
    tests: [
      "Slepý test s 10 ľuďmi a 3 typmi rukavíc: nitrilové, 3 mm kožené, 5 mm zateplené",
      "Bez kalibrácie na používateľa, ciele pod 4 mm krytom; úspech pri priemernej chybe pod 10 mm a F1 dotyku nad 97 %",
      "Zopakovanie s vrstvou slanej vody a premočenými rukavicami",
      "Platený predbežný test EMC: odolnosť voči vyžarovaniu a vyžarovanie rukavíc",
      "Priame porovnanie s bežne dostupnou dotykovou obrazovkou s režimom pre rukavice pri rovnakých rukaviciach a kryte",
    ],
  },
  pilot: {
    title: "Pilotný projekt vo vašej mraziarni",
    text: "Hľadáme mraziarne, logistické areály a prístavy, kde operátori zápasia s dotykovými obrazovkami v hrubých rukaviciach. Povedzte nám o jednom paneli a rukaviciach, ktoré vaši ľudia nosia, a prídeme to s vami otestovať.",
    emailLabel: "Váš pracovný e-mail",
    messageLabel: "Správa",
    messagePlaceholder: "O akú prevádzku a panel ide a aké rukavice vaši ľudia nosia.",
    send: "Odoslať správu",
    sending: "Odosiela sa…",
    sent: "Ďakujeme, správa bola odoslaná. Odpovieme na e-mail, ktorý ste zadali.",
    error: "Niečo sa pokazilo a správa sa neodoslala. Skúste to prosím o chvíľu znova.",
    offline: "Kontaktný formulár ešte nie je pripojený. Skúste to prosím čoskoro.",
    subject: "Záujem o pilotný projekt Hado",
  },
  team: {
    title: "Tím",
    lead: "Malý tím z Bratislavy s koreňmi vo výskume robotiky. Hado vyvíja Cassava s. r. o.",
    members: [
      {
        role: "CTO",
        photoAlt: "Marek Hromada na MILSET ESE 2026 so svojím projektom bionickej ruky",
        bio: "Vyvíja hardvér Hado, spracovanie signálu a algoritmy na rozpoznávanie dotyku.",
        highlights: [
          "Víťaz FVaT AMAVET 2025 a 2026, slovenského festivalu vedy a techniky: postup na MILSET ESE 2026 a na ISEF 2027 ako jeden z dvoch slovenských finalistov",
          "Dvojnásobný víťaz Ceny Národného centra robotiky na FVaT AMAVET 2025 a 2026",
          "Cena Národného centra robotiky a časopisu Nexttech za valivý kĺb Antromorph pre dostupné bionické ruky",
          "Strieborná medaila zo zimnej výzvy Medzinárodnej ekonomickej olympiády; dvojnásobný víťaz Noove Challenge",
          "Študentský výskumník v Laboratóriu umelej inteligencie a systémov na Toyohashi University of Technology v Japonsku (ENMA): middleware so spikujúcou neurónovou sieťou pre sociálne citlivú navigáciu robota Unitree Go2, so zlepšením predikovanej valencie ľudí o 57 % a nulovými kolíziami, nasadený na NVIDIA Jetson Orin AGX",
          "Študentský výskumník v Národnom centre robotiky (COCOHRIP): počítačové videnie a rozhodovacie modely minimax v Pythone, ROS2 a RViz, vďaka ktorým robotické rameno UR5 hrá dámu s ľuďmi",
        ],
      },
      {
        role: "Spoluzakladateľ, CFO",
        photoAlt: "Adam Daniel Donoval",
        bio: "Spoluzakladateľ a konateľ spoločnosti Cassava s. r. o. Má na starosti financie, rozpočty, žiadosti o granty a rokovania s investormi.",
        highlights: [
          "Spoluzakladateľ Papaya International, mládežníckej neziskovej organizácie s projektmi Erasmus+ po celej Európe: písanie grantov, partnerstvá a rozpočty",
          "Vybraný do programov Future Founders od The Spot a bratislavského pilotu InVenture Mind, podnikateľského programu Georgia Tech",
          "Dvojnásobný víťaz Noove Challenge a víťaz BARS5, súťaže Slovenskej akadémie vied; bronzová medaila zo zimnej výzvy Medzinárodnej ekonomickej olympiády",
          "Študoval podnikanie a ekonómiu vo Viedni a vo Veľkej Británii; pracuje po slovensky, anglicky a nemecky",
        ],
      },
      {
        role: "Spoluzakladateľ, COO",
        photoAlt: "Teo Višňovský",
        bio: "Spoluzakladateľ a konateľ spoločnosti Cassava s. r. o. Vedie prevádzku: pilotné projekty, dodávateľov a rozhovory so zákazníkmi z mraziarní a logistiky.",
        highlights: [
          "Softvérový inžinier v Aerostacks: zbiera a analyzuje dáta z dronu na predpovedanie lavínového rizika",
          "Spoluzakladateľ Papaya International, mládežníckej neziskovej organizácie s projektmi po celej Európe",
          "Vybraný do programu Future Founders od The Spot",
          "Zástupca generálneho tajomníka pre IT na AproMUN, študentskej konferencii Model OSN v Bratislave",
          "Doučuje matematiku a fyziku na doučma.sk a dobrovoľne pomáha v P-MAT",
          "Študoval v Brisbane v Austrálii a na Sir Karl Popper Schule vo Viedni; hovorí po slovensky, anglicky a čiastočne nemecky a španielsky",
        ],
      },
    ],
  },
  faq: {
    title: "Časté otázky",
    items: [
      {
        q: "Ako to funguje?",
        a: "Vložka všitá do pracovnej rukavice vysiela kódovaný rádiový signál v bezlicenčnom pásme ISM (13,56 alebo 40,68 MHz). Senzory v paneli merajú jeho fázový posun a rozdiel amplitúd, z čoho určia polohu dotyku v dvoch rozmeroch, a kód panelu povie, ktorá rukavica to je.",
      },
      {
        q: "Nahradí našu dotykovú obrazovku?",
        a: "Nie. Hado je utesnený ovládací panel definovaný softvérom, ktorý sa umiestni vedľa existujúcej obrazovky a nahradí dotykové alebo klávesnicové ovládanie. Displej aj počítač ostávajú.",
      },
      {
        q: "Naozaj funguje v mraziarenských rukaviciach?",
        a: "Presne to overí náš prvý test: 10 ľudí, nitrilové, 3 mm kožené a 5 mm zateplené rukavice, bez kalibrácie, s vrstvou slanej vody. Dnešné dotykové obrazovky s režimom pre rukavice sú určené pre rukavice do približne 1,5 až 2 mm.",
      },
      {
        q: "Dá sa použiť na bezpečnostné funkcie?",
        a: "Nie. Hado slúži iba na ovládanie operátorom. Núdzové zastavenie a ďalšie bezpečnostné funkcie ostávajú pevne zapojené, ako vyžadujú EN 60204-1 a ISO 13850.",
      },
      {
        q: "Čo ak vložka chýba alebo je vybitá?",
        a: "Panel prepne na prihlásenie PIN-om a kartou, takže ho návštevy aj údržba môžu ovládať ďalej. Vložka je navrhnutá aspoň na 12-hodinovú zmenu.",
      },
      {
        q: "Koľko to bude stáť?",
        a: "Cieľové ceny: približne 590 až 790 € za panel, 25 až 40 € za pár vložiek do rukavíc a softvérová licencia pre prevádzku na identifikáciu operátorov a záznamy. Materiál prototypu dnes stojí približne 200 až 300 €; cieľ pre sériovú výrobu je pod 150 €.",
      },
      {
        q: "Prečo vložka v rukavici a nie prsteň?",
        a: "Prstene sú pri rotujúcich strojoch zvyčajne zakázané, pretože sa môžu zachytiť a spôsobiť vážne poranenie prsta. Rukavice sú už riadeným ochranným prostriedkom, preto je priemyselný vysielač všitý do nich. Prsteň plánujeme iba pre neskorší spotrebiteľský variant, kde chrbát ruky ovláda smart hodinky, okuliare alebo slúchadlá.",
      },
      {
        q: "Kde je projekt dnes?",
        a: "Laboratórny funkčný koncept, ktorý po približne päťminútovej kalibrácii rozlíši tri dotykové zóny. Ďalším krokom je trojmesačné overenie go/no-go v 1. štvrťroku 2027.",
      },
      {
        q: "Odkiaľ pochádza nápad?",
        a: "SkinTrack, štúdia Carnegie Mellon University z roku 2016, ukázala, že z fázy signálu šíriaceho sa telom sa dá určiť poloha dotyku. My princíp otáčame pre priemysel: vysielač je v rukavici, senzory v utesnenom paneli a každá rukavica má vlastný kód.",
      },
      {
        q: "Prečo názov Hado?",
        a: "波動 (hadō) znamená po japonsky vlnu alebo vlnenie: odkaz na rádiové vlny, ktoré nesú každé stlačenie. Je krátky a ľahko sa vysloví v akomkoľvek jazyku.",
      },
    ],
  },
  footer: {
    text: "rádiofrekvenčné používateľské rozhranie. Na základe SkinTrack, CMU, 2016.",
    study: "Prečítajte si štúdiu",
  },
};
