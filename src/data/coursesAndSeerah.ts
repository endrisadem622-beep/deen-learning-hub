import { Course, SeerahEvent, Quiz } from "../types";

export const COURSES: Course[] = [
  {
    id: "aqeedah",
    icon: "Compass",
    title: {
      en: "Aqeedah (Islamic Creed)",
      am: "ዐቂዳ (ኢስላማዊ እምነት)",
    },
    desc: {
      en: "Learn the foundational pillars of Iman, Tawheed (monotheism), and the pure belief system.",
      am: "የእምነት (ኢማን) ምሰሶዎችን፣ ተውሒድን (የአላህን አንድነት) እና ትክክለኛውን የእምነት መሰረት ይማሩ።",
    },
    lessons: [
      {
        id: "aqeedah-1",
        title: {
          en: "The Three Categories of Tawheed",
          am: "ሦስቱ የተውሒድ ክፍሎች",
        },
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ",
        body: {
          en: "Tawheed is divided into Tawheed ar-Rububiyyah (Lordship: Allah alone is the Creator and Sustainer), Tawheed al-Uluhiyyah (Worship: directing all devotion, prayer, and vows strictly to Allah), and Tawheed al-Asma was-Sifat (Names and Attributes: affirming what Allah and His Messenger confirmed without distortion or negation).",
          am: "ተውሒድ በሦስት ይከፈላል፦ ተውሒድ አር-ሩቡቢያህ (አላህ ብቻ ፈጣሪና አስተዳዳሪ መሆኑን ማመን)፣ ተውሒድ አል-ኡሉሂያህ (ማንኛውንም አምልኮ፣ ዱዓ እና ስግደት ለአላህ ብቻ ማድረግ)፣ እና ተውሒድ አል-አስማእ ወሲፋት (የአላህ ስሞችና ባሕሪያት ያለ ምንም ማመሳሰል ወይም ማስተባበል ማፅደቅ)።",
        },
      },
      {
        id: "aqeedah-2",
        title: {
          en: "The Six Pillars of Iman",
          am: "ስድስቱ የኢማን ምሰሶዎች",
        },
        body: {
          en: "Belief in Allah, His Angels, His Revealed Books, His Messengers, the Last Day (Day of Judgment), and Divine Decree (Qadar), both its good and sweet consequences as well as tests of patience.",
          am: "በአላህ ማመን፣ በመላእክቱ ማመን፣ በወረዱት ኪታቦች ማመን፣ በመልእክተኞቹ ማመን፣ በመጨረሻው ቀን ማመን፣ እና በቀደር (በአላህ ውሳኔ) በበጎውም ሆነ በፈተናው ማመን።",
        },
      },
    ],
  },
  {
    id: "salah",
    icon: "HandsPraying",
    title: {
      en: "Salah & Taharah (Prayer)",
      am: "ሶላት እና ጠሃራ (ስግደትና ንጽህና)",
    },
    desc: {
      en: "Master purification, spiritual presence (Khushu’), and the step-by-step prophetic method of prayer.",
      am: "የንጽህና ህጎችን፣ የልብ እርጋታን (ኹሹዕ) እና የነቢዩን ﷺ ትክክለኛ የስግደት አደራረግ ይማሩ።",
    },
    lessons: [
      {
        id: "salah-1",
        title: {
          en: "The Prophetic Wudu (Ablution)",
          am: "የነቢዩ ﷺ የውዱእ አደራረግ",
        },
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ",
        body: {
          en: "Begin with sincere intention (Niyyah) in the heart and Bismillah. Wash hands 3 times, rinse mouth and nose (Madmadah & Istinshaq), wash face from hairline to chin and ear to ear, wash arms including elbows, wipe entire head and ears, and wash feet up to ankles thoroughly.",
          am: "በልብ ውስጥ ቅን ኒያህ በማድረግና ቢስሚላህ በማለት ይጀምሩ። እጅን ሦስት ጊዜ መታጠብ፣ አፍንና አፍንጫን ማጽዳት፣ ፊትን ከግንባር ፀጉር እስከ አገጭና ከጆሮ እስከ ጆሮ መታጠብ፣ እጆችን እስከ ክርን ድረስ መታጠብ፣ ጭንቅላትንና ጆሮን ማበስ፣ እና እግሮችን እስከ ቁርጭምጭሚት መታጠብ።",
        },
      },
      {
        id: "salah-2",
        title: {
          en: "Attaining Khushu’ in Prayer",
          am: "በሶላት ውስጥ ኹሹዕ (የልብ መረጋጋት) ማግኘት",
        },
        body: {
          en: "Khushu’ is tranquility of body and heart. Reflect upon the meanings of Surah Al-Fatiha, visualize standing humbly before the Creator of the Heavens and Earth, eliminate worldly distractions before takbeer, and maintain still posture.",
          am: "ኹሹዕ የሰውነትና የልብ መረጋጋት ነው። የፋቲሓን ትርጉም እያስተነተኑ መስገድ፣ በሰማያትና በምድር ፈጣሪ ፊት መቆምን ማሰብ፣ ከሶላት በፊት የዱንያ ትኩረት የሚከፋፍሉ ነገሮችን ማስወገድና በረጋ እንቅስቃሴ መስገድ ነው።",
        },
      },
    ],
  },
  {
    id: "seerah",
    icon: "BookOpen",
    title: {
      en: "Seerah (Prophetic Biography)",
      am: "ሲራ (የነቢዩ ﷺ ታሪክ)",
    },
    desc: {
      en: "Journey through the life, noble character, struggles, and triumphs of Prophet Muhammad ﷺ.",
      am: "የነቢዩ ሙሐመድ ﷺ የህይወት ታሪክ፣ ታላቅ ስነ-ምግባር፣ ፈተናዎችና የድል ጉዞዎች ይወቁ።",
    },
    lessons: [
      {
        id: "seerah-1",
        title: {
          en: "The First Hijrah to Habasha (Abyssinia)",
          am: "የመጀመሪያው ሂጅራ ወደ ሀበሻ ምድር",
        },
        body: {
          en: `When the early Muslims faced severe persecution in Makkah, the Prophet ﷺ advised: "Go to Abyssinia, for therein is a righteous Christian king (an-Najashi) under whom no one is wronged." Jafar ibn Abi Talib recited Surah Maryam to the King, bringing tears to Najashi's eyes and securing royal sanctuary.`,
          am: "በመካ የነበሩ የመጀመሪያ ሙስሊሞች ከባድ ስቃይ ሲደርስባቸው ነቢዩ ﷺ እንዲህ አሉ፦ 'ወደ ሀበሻ ሂዱ፤ እዚያ ዘንድ ማንም የማይበደልበት ጻድቅ ንጉስ (ነጋሺ) አለና።' ጃዕፈር ኢብኑ አቢ ጣሊብ ለንጉሱ ሱረቱ መርየምን ሲቀራላቸው ንጉሱ በእንባ ተውጠው ፍጹም ከለላ ሰጧቸው።",
        },
      },
      {
        id: "seerah-2",
        title: {
          en: "The Treaty of Hudaybiyyah & Conquest of Makkah",
          am: "የሑደይቢያ ስምምነት እና የመካ ድል",
        },
        body: {
          en: `The Treaty showed supreme prophetic patience and political foresight. Two years later, the Prophet ﷺ entered Makkah in utter humility, bowing on his mount, and proclaimed general amnesty: "Go, for you are free!"`,
          am: "የሑደይቢያ ስምምነት የነቢዩን ﷺ ጥልቅ ትዕግስትና አስተዋይነት ያሳየ ነው። ከሁለት ዓመታት በኋላ ነቢዩ ﷺ መካን በከፍተኛ ትህትና በሰላም ተቆጣጥረው ለጠላቶቻቸው ሁሉ 'ሂዱ፤ ነጻ ናችሁ!' በማለት ምህረት አደረጉላቸው።",
        },
      },
    ],
  },
  {
    id: "fiqh",
    icon: "Student",
    title: {
      en: "Fiqh (Everyday Jurisprudence)",
      am: "ፊቅህ (እለታዊ የህይወት ህጎች)",
    },
    desc: {
      en: "Practical rulings covering daily transactions, family manners, purity, and permissible matters.",
      am: "እለታዊ ግብይቶችን፣ የቤተሰብ ስርዓትን፣ ሀላልና ሀራምን የተመለከቱ ተግባራዊ ህጎች።",
    },
    lessons: [
      {
        id: "fiqh-1",
        title: {
          en: "Halal Earnings and Honest Commerce",
          am: "ሀላል ገቢ እና ታማኝ ንግድ",
        },
        arabic: "وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا",
        body: {
          en: "Islam commands absolute honesty in weights, transparency about defects, avoidance of deception (Gharar) and interest (Riba). The truthful trader will be with the prophets on the Day of Resurrection.",
          am: "ኢስላም በንግድ ውስጥ ፍጹም ታማኝነትን፣ የዕቃዎችን ጉድለት በግልጽ ማሳወቅን፣ ማታለልን እና ወለድን (ሪባ) መከልከልን ያዛል። ታማኝ ነጋዴ የትንሳኤ ቀን ከነቢያት ጋር ይሆናል።",
        },
      },
    ],
  },
  {
    id: "fasting",
    icon: "MoonStars",
    title: {
      en: "Fasting & Ramadan (Sawm)",
      am: "ጾም እና ረመዳን (ሰውም)",
    },
    desc: {
      en: "Spiritual elevation, virtues of Laylat al-Qadr, rules of fasting, and voluntary fasts.",
      am: "የጾም መንፈሳዊ ፋይዳ፣ የለይለቱል ቀድር ክብር፣ የጾም ህጎችና ሱና ጾሞች።",
    },
    lessons: [
      {
        id: "fasting-1",
        title: {
          en: "The Inner Reality of Fasting",
          am: "የጾም ውስጣዊ ይዘትና ምስጢር",
        },
        body: {
          en: "Fasting is not merely refraining from food and drink; it is guarding the tongue against lies and backbiting, guarding eyes and ears from vanity, and nurturing profound Taqwa (consciousness of Allah).",
          am: "ጾም ከመብላትና መጠጣት መታቀብ ብቻ ሳይሆን ምላስን ከውሸትና ከሀሜት፣ ዓይንና ጆሮን ከማይረቡ ነገሮች መጠበቅ እንዲሁም አላህን የመፍራት (ተቅዋ) ጥበብ ነው።",
        },
      },
    ],
  },
  {
    id: "zakat",
    icon: "Heart",
    title: {
      en: "Zakat & Sadaqah (Purifying Wealth)",
      am: "ዘካህ እና ሰደቃ (ሀብትን ማጥራት)",
    },
    desc: {
      en: "Understanding Nisab, 2.5% calculation, rightful recipients, and the blessing of giving.",
      am: "የኒሷብ መጠን፣ የ2.5% ስሌት፣ ለዘካህ ተገቢ የሆኑ ወገኖች እና የመስጠት በረከት።",
    },
    lessons: [
      {
        id: "zakat-1",
        title: {
          en: "Calculating Zakat and Eligible Categories",
          am: "የዘካህ ስሌት እና ተገቢ የሆኑ ወገኖች",
        },
        arabic: "إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ",
        body: {
          en: "When wealth reaches the Nisab threshold (equivalent to 85g gold) and has been held for one lunar year (Hawl), 2.5% must be distributed among the eight categories specified in Surah at-Tawbah, notably the poor, needy, and debtors.",
          am: "ሀብት የኒሷብ ጣሪያ (ከ85 ግራም ወርቅ ጋር እኩል) ደርሶ አንድ አመት ሲሞላው 2.5% በሱረቱ አት-ተውባህ ላይ ለተገለጹት ምስኪኖች፣ ድሆችና ባለዕዳዎች መከፋፈል ግዴታ ነው።",
        },
      },
    ],
  },
  {
    id: "akhlaq",
    icon: "Sparkle",
    title: {
      en: "Akhlaq & Adab (Character & Manners)",
      am: "አኽላቅ እና አደብ (ስነ-ምግባርና ስርዓት)",
    },
    desc: {
      en: "Cultivate prophetic humility, truthfulness, honoring parents, and speech etiquette.",
      am: "የነቢያዊ ትህትናን፣ እውነተኛነትን፣ ወላጆችን ማክበርንና የመናገር ስርዓትን ማዳበር።",
    },
    lessons: [
      {
        id: "akhlaq-1",
        title: {
          en: "Speech Etiquette & Restraining the Tongue",
          am: "የንግግር ስርዓትና ምላስን መጠበቅ",
        },
        body: {
          en: `The Prophet ﷺ said: "Whoever believes in Allah and the Last Day, let him speak good or remain silent." Guarding speech prevents harm, unites hearts, and is heaviest on the Day of Judgment.`,
          am: "ነቢዩ ﷺ እንዲህ ብለዋል፦ 'በአላህና በመጨረሻው ቀን ያመነ ሰው መልካም ይናገር ወይም ዝም ይበል።' ንግግርን መቆጣጠር ጉዳትን ይከላከላል፣ ልቦችን አንድ ያደርጋል።",
        },
      },
    ],
  },
  {
    id: "quran-studies",
    icon: "BookOpen",
    title: {
      en: "Qur’an Sciences & Reflection",
      am: "የቁርኣን ሳይንስና ማስተንተን (ተደቡር)",
    },
    desc: {
      en: "Explore the divine preservation of the text, revelation context (Asbab an-Nuzul), and contemplation.",
      am: "የቁርኣን ጥበቃ፣ የወረደበት ታሪካዊ ሁኔታዎች (አስባቡን-ኑዙል) እና ጥልቅ ማስተንተን።",
    },
    lessons: [
      {
        id: "quran-1",
        title: {
          en: "The Etiquette of Reciting & Listening",
          am: "የቁርኣን ንባብ እና የማዳመጥ ስነ-ስርዓት",
        },
        arabic: "وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنصِتُوا",
        body: {
          en: "Approach the Book of Allah in a state of purity, seek refuge from Shaytan, recite with Tajweed and slow melodious pacing (Tartil), and pause to reflect on promises of mercy and warnings.",
          am: "የአላህን ቃል በንጽህና ይቅረቡ፣ ከተንኮለኛው ሰይጣን በአላህ ይጠበቁ፣ በተጅዊድና በዝግታ ይቅሩ፣ በምህረትና ማስጠንቀቂያ አያዎች ላይ ቆም ብለው ያስተንትኑ።",
        },
      },
    ],
  },
  {
    id: "hadith-studies",
    icon: "SealCheck",
    title: {
      en: "Hadith Sciences & Authentication",
      am: "የሐዲስ ሳይንስ እና ማረጋገጫ",
    },
    desc: {
      en: "Learn how the scholars verified Isnad (chain of transmission) and Matn (textual content).",
      am: "ታላላቅ የኢስላም ሊቃውንት የሐዲስ ሰንሰለትን (ኢስናድ) እና ጽሁፉን (መትኑን) እንዴት እንዳረጋገጡ ይወቁ።",
    },
    lessons: [
      {
        id: "hadith-1",
        title: {
          en: "Grading Hadiths: Sahih, Hasan, Da’if",
          am: "የሐዲስ ደረጃዎች፦ ሶሒሕ፣ ሐሰን፣ ደዒፍ",
        },
        body: {
          en: "A Sahih (sound) Hadith must possess five strict conditions: continuous chain of narrators, righteous character (’Adalah), precise memory (Dabt), absence of irregularity (Shadh), and freedom from subtle defects (’Illah).",
          am: "አንድ ሶሒሕ ሐዲስ አምስት መስፈርቶችን ማሟላት አለበት፦ ያልተቋረጠ ሰንሰለት፣ አስተላላፊዎች ጻድቅ መሆናቸው፣ ጠንካራ የማስታወስ ችሎታ፣ ያልተለመደ ግጭት አለመኖር እና ስውር ጉድለት የሌለው መሆን።",
        },
      },
    ],
  },
];

export const SEERAH_TIMELINE: SeerahEvent[] = [
  {
    id: "seerah-birth",
    year: "570 CE",
    title: { en: "The Year of the Elephant & Blessed Birth", am: "የዝሆኑ አመት እና የተባረከው ልደት" },
    body: {
      en: "The Messenger of Allah ﷺ was born in Makkah as an orphan in the noble Banu Hashim clan of Quraysh. Raised with impeccable character and known as Al-Amin (the Trustworthy).",
      am: "የአላህ መልእክተኛ ﷺ በመካ ከተማ በተከበረው የቁረይሽ ጎሳ ውስጥ በየቲምነት ተወለዱ። በከፍተኛ ስነ-ምግባር አድገው አል-አሚን (ታማኙ) ተብለው ተጠሩ።",
    },
  },
  {
    id: "seerah-revelation",
    year: "610 CE",
    title: { en: "First Revelation in Cave Hira", am: "በሒራ ዋሻ የመጀመሪያው ወሕይ (ራዕይ)" },
    body: {
      en: `At age 40, contemplating in Mount Hira, Archangel Jibril (Gabriel) appeared with the divine command: "Iqra" (Read!) in the name of your Lord who created.`,
      am: "በ40 አመታቸው በሒራ ዋሻ ውስጥ እያስተነተኑ ሳለ መልአኩ ጂብሪል 'አንብብ በዚያ በፈጠረው ጌታህ ስም!' የሚለውን የመጀመሪያውን የቁርኣን ቃል ይዞ መጣ።",
    },
  },
  {
    id: "seerah-habasha",
    year: "615 CE",
    title: { en: "The Migration to Abyssinia (Habasha - Ethiopia)", am: "የመጀመሪያው ፍልሰት ወደ ሀበሻ (ኢትዮጵያ)" },
    body: {
      en: "Under harsh persecution, the Prophet ﷺ dispatched his companions across the Red Sea to Ethiopia. The righteous King Ashama ibn Abjar (an-Najashi) welcomed and protected them against Quraysh envoys.",
      am: "በመካ ከባድ ስቃይ ሲበዛባቸው ነቢዩ ﷺ ሰሃቦቻቸውን ወደ ኢትዮጵያ (ሀበሻ) ላኩ። ጻድቁ ንጉስ ነጋሺ የቁረይሽን ተንኮል ውድቅ በማድረግ ለሙስሊሞች የተሟላ ከለላና ክብር ሰጧቸው።",
    },
  },
  {
    id: "seerah-isra",
    year: "621 CE",
    title: { en: "Al-Isra’ wal-Mi’raj (The Night Journey & Ascension)", am: "አል-ኢስራእ ወል-ሚዕራጅ (የሌሊት ጉዞና ዕርገት)" },
    body: {
      en: "A profound miracle from Makkah to Al-Aqsa in Jerusalem, and ascending through the heavens where the gift of the five daily prayers was ordained by Allah.",
      am: "ከመካ ወደ አል-አቅሷ (ኢየሩሳሌም) እና ወደ ሰማያት የተደረገ ተአምራዊ ጉዞ ሲሆን፣ በዚህም ወቅት አምስቱ እለታዊ ሶላቶች በአላህ ዘንድ በግዴታነት ተደነገጉ።",
    },
  },
  {
    id: "seerah-madinah",
    year: "622 CE",
    title: { en: "Hijrah to Madinah (The Islamic Calendar Begins)", am: "ወደ መዲና የተደረገው ታላቁ ሂጅራ" },
    body: {
      en: "Welcomed by the Ansar (Helpers) of Madinah, establishing brotherhood, the first mosque (Masjid an-Nabawi), and the historic Constitution of Madinah.",
      am: "የመዲና አንሷሮች ሞቅ ያለ አቀባበል አደረጉላቸው። ወንድማማችነት ተመሰረተ፣ የመጀመሪያው መስጊድ ተገነባ እና የመዲና ህገ-መንግስት ጸደቀ።",
    },
  },
  {
    id: "seerah-makkah",
    year: "630 CE",
    title: { en: "Peaceful Conquest of Makkah", am: "የመካ በሰላም መከፈት" },
    body: {
      en: "Returning victorious without shedding blood, purifying the Ka’bah of idols and pardoning those who had formerly persecuted the believers.",
      am: "ያለ ምንም ደም መፍሰስ በታላቅ ድል ተመለሱ፤ ካዕባን ከጣዖታት አጸዱ፤ ቀድሞ ያሰቃዩአቸውን ሁሉ ይቅር አሉ።",
    },
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: "quiz-aqeedah",
    courseId: "aqeedah",
    title: { en: "Foundations of Tawheed & Iman", am: "የተውሒድ እና የኢማን መሰረቶች" },
    questions: [
      {
        id: "q1",
        q: {
          en: "What does Tawheed al-Uluhiyyah refer to?",
          am: "ተውሒድ አል-ኡሉሂያህ ምንን ያመለክታል?",
        },
        options: [
          { en: "Believing Allah created the universe", am: "አላህ አጽናፈ ሰማይን መፍጠሩን ማመን" },
          { en: "Singling out Allah alone for all acts of worship", am: "ማንኛውንም አምልኮ ለአላህ ብቻ ማድረግ" },
          { en: "Believing in the angels", am: "በመላእክት ማመን" },
          { en: "Studying the Arabic language", am: "የዐረብኛ ቋንቋን መማር" },
        ],
        answer: 1,
        explain: {
          en: "Tawheed al-Uluhiyyah (worship) means directing prayer, supplication, sacrifices, and all devotion strictly to Allah alone.",
          am: "ተውሒድ አል-ኡሉሂያህ ማለት ዱዓን፣ ሶላትን እና ሁሉንም የአምልኮ ተግባራት ለአላህ ብቻ ማድረግ ነው።",
        },
      },
      {
        id: "q2",
        q: {
          en: "How many pillars of Iman (Faith) are there?",
          am: "ስንት የኢማን ምሰሶዎች አሉ?",
        },
        options: [
          { en: "Five", am: "አምስት" },
          { en: "Six", am: "ስድስት" },
          { en: "Seven", am: "ሰባት" },
          { en: "Four", am: "አራት" },
        ],
        answer: 1,
        explain: {
          en: "There are six pillars: Belief in Allah, His Angels, Books, Messengers, the Last Day, and Divine Decree (Qadar).",
          am: "ስድስቱ የኢማን ምሰሶዎች፦ በአላህ፣ በመላእክቱ፣ በኪታቦቹ፣ በመልእክተኞቹ፣ በመጨረሻው ቀን እና በቀደር ማመን ናቸው።",
        },
      },
    ],
  },
  {
    id: "quiz-salah",
    courseId: "salah",
    title: { en: "Salah & Purification Essentials", am: "የሶላት እና የንጽህና መሰረቶች" },
    questions: [
      {
        id: "qs1",
        q: {
          en: "Which Surah is obligatory to recite in every rak’ah of prayer?",
          am: "በእያንዳንዱ የሶላት ረከዓ ውስጥ መቅራት ግዴታ የሆነችው ሱራ የቷ ናት?",
        },
        options: [
          { en: "Surah Al-Ikhlas", am: "ሱረቱ አል-ኢኽላስ" },
          { en: "Surah Al-Fatihah", am: "ሱረቱ አል-ፋቲሓ" },
          { en: "Surah Al-Baqarah", am: "ሱረቱ አል-በቀራህ" },
          { en: "Surah Ya-Sin", am: "ሱረቱ ያሲን" },
        ],
        answer: 1,
        explain: {
          en: `The Prophet ﷺ said: "There is no prayer for the one who does not recite the Opening of the Book (Al-Fatihah)."`,
          am: "ነቢዩ ﷺ እንዲህ ብለዋል፦ 'የመጽሐፉን መክፈቻ (ፋቲሓን) ላልቀራ ሰው ሶላት የለውም።'",
        },
      },
    ],
  },
  {
    id: "quiz-seerah",
    courseId: "seerah",
    title: { en: "The Prophetic Biography & Abyssinia", am: "የነቢዩ ﷺ ሲራ እና የሀበሻ ታሪክ" },
    questions: [
      {
        id: "qse1",
        q: {
          en: "Which righteous king protected the first Muslim migrants in Habasha (Ethiopia)?",
          am: "የመጀመሪያዎቹን ሙስሊም ስደተኞች በሀበሻ ምድር ተቀብሎ ከለላ የሰጣቸው ጻድቁ ንጉስ ማን ነበሩ?",
        },
        options: [
          { en: "King Heraclius", am: "ንጉስ ሄራክሊየስ" },
          { en: "An-Najashi (King Ashama)", am: "ንጉስ ነጋሺ (አስሐማ)" },
          { en: "Chosroes of Persia", am: "የፋርስ ንጉስ ኪስራ" },
          { en: "Muqawqis of Egypt", am: "የግብጹ ሙቀውቂስ" },
        ],
        answer: 1,
        explain: {
          en: "King Ashama ibn Abjar (an-Najashi) welcomed the companions, wept upon hearing Surah Maryam, and gave them full safety.",
          am: "ንጉስ አስሐማ (ነጋሺ) የነቢዩን ﷺ ሰሃቦች በፍቅር ተቀብለው ሱረቱ መርየምን ሲሰሙ በማልቀስ ሙሉ ጥበቃ አደረጉላቸው።",
        },
      },
    ],
  },
];
