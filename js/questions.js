const QUESTION_SEEDS = {
	"General Awareness": [
		["Indian Polity", "On what date was the Constitution of India adopted?", "26 November 1949", ["15 August 1947", "26 January 1950", "2 October 1949"], "The Constituent Assembly adopted the Constitution on 26 November 1949."],
		["Indian Polity", "When did the Constitution of India come into effect?", "26 January 1950", ["26 November 1949", "15 August 1947", "2 October 1950"], "The Constitution came into effect on 26 January 1950."],
		["Geography", "Which is the largest Indian state by area?", "Rajasthan", ["Madhya Pradesh", "Maharashtra", "Uttar Pradesh"], "Rajasthan is India's largest state by area."],
		["Geography", "Which is the smallest Indian state by area?", "Goa", ["Sikkim", "Tripura", "Mizoram"], "Goa is the smallest Indian state by area."],
		["Geography", "Which is the longest river flowing entirely within India?", "Godavari", ["Ganga", "Yamuna", "Narmada"], "The Godavari is the longest river whose course lies entirely within India."],
		["Awards", "What is India's highest civilian award?", "Bharat Ratna", ["Padma Vibhushan", "Padma Bhushan", "Padma Shri"], "The Bharat Ratna is India's highest civilian award."],
		["Banking Awareness", "In which year did the Reserve Bank of India begin operations?", "1935", ["1947", "1950", "1921"], "The RBI began operations on 1 April 1935."],
		["Banking Awareness", "Where is the headquarters of the Reserve Bank of India?", "Mumbai", ["New Delhi", "Kolkata", "Chennai"], "The RBI's central office is in Mumbai."],
		["Banking Awareness", "Who signs the one-rupee note in India?", "The Finance Secretary", ["The RBI Governor", "The President", "The Prime Minister"], "The one-rupee note is issued by the Government of India and bears the Finance Secretary's signature."],
		["Important Days", "National Science Day in India is observed on which date?", "28 February", ["11 May", "5 June", "15 August"], "National Science Day marks C. V. Raman's discovery of the Raman effect on 28 February 1928."],
		["Modern History", "In which year was Mahatma Gandhi born?", "1869", ["1857", "1872", "1885"], "Mohandas Karamchand Gandhi was born on 2 October 1869."],
		["Modern History", "In which year did the Dandi March take place?", "1930", ["1920", "1935", "1942"], "Gandhi's Salt March to Dandi took place in 1930."],
		["Modern History", "In which year did the Quit India Movement begin?", "1942", ["1930", "1940", "1947"], "The Quit India Movement was launched in August 1942."],
		["Geography", "Dandi, the destination of Gandhi's Salt March, is in which state?", "Gujarat", ["Maharashtra", "Goa", "Tamil Nadu"], "Dandi is a coastal village in Gujarat."],
		["International Organizations", "Where is the SAARC Secretariat located?", "Kathmandu", ["Dhaka", "New Delhi", "Colombo"], "The SAARC Secretariat is located in Kathmandu, Nepal."],
		["International Organizations", "Where is UNESCO headquartered?", "Paris", ["Geneva", "Rome", "Vienna"], "UNESCO's headquarters are in Paris, France."],
		["Science", "Which is the largest planet in the Solar System?", "Jupiter", ["Saturn", "Earth", "Neptune"], "Jupiter is the largest planet in the Solar System."],
		["Biology", "Which pigment captures light energy for photosynthesis in plants?", "Chlorophyll", ["Haemoglobin", "Melanin", "Keratin"], "Chlorophyll in plant cells absorbs light used in photosynthesis."],
		["Biology", "A deficiency of which vitamin causes scurvy?", "Vitamin C", ["Vitamin A", "Vitamin D", "Vitamin K"], "Scurvy is caused by vitamin C deficiency."],
		["Physics", "What is the SI unit of electric current?", "Ampere", ["Volt", "Watt", "Ohm"], "The ampere is the SI base unit of electric current."],
		["Physics", "What is the SI unit of force?", "Newton", ["Joule", "Pascal", "Watt"], "Force is measured in newtons in the SI system."],
		["Biology", "How many chambers does the human heart have?", "Four", ["Two", "Three", "Five"], "The human heart has two atria and two ventricles."],
		["Biology", "Which organs filter waste from the blood to produce urine?", "Kidneys", ["Lungs", "Pancreas", "Spleen"], "The kidneys filter blood and produce urine."],
		["Chemistry", "What is the pH of neutral water at room temperature?", "7", ["0", "5", "14"], "A neutral solution has a pH of 7 at room temperature."],
		["Physics", "At approximately what temperature does pure water boil at sea level?", "100°C", ["0°C", "50°C", "120°C"], "At standard atmospheric pressure, pure water boils at 100°C."],
		["Science", "Which atmospheric layer contains most of the ozone layer?", "Stratosphere", ["Troposphere", "Mesosphere", "Thermosphere"], "Most atmospheric ozone is concentrated in the stratosphere."],
		["Geography", "Which is the largest ocean on Earth?", "Pacific Ocean", ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], "The Pacific Ocean is Earth's largest and deepest ocean."],
		["Geography", "Which important latitude passes through central India?", "Tropic of Cancer", ["Equator", "Tropic of Capricorn", "Arctic Circle"], "The Tropic of Cancer crosses India roughly through its central region."],
		["Indian Polity", "Who is the constitutional head of an Indian state?", "The Governor", ["The Chief Minister", "The Chief Secretary", "The Speaker"], "The Governor is the constitutional head of a state; executive government is led by the Chief Minister."],
		["Indian Polity", "Fundamental Rights are contained in which part of the Indian Constitution?", "Part III", ["Part II", "Part IV", "Part IVA"], "Fundamental Rights are set out in Part III of the Constitution."],
	],
	"Quantitative Aptitude": [
		["Percentage", "What is 25% of 480?", "120", ["100", "110", "125"], "480 × 25/100 = 120."],
		["Profit and Loss", "An article costs ₹500 and sells for ₹600. What is the profit percentage?", "20%", ["10%", "15%", "25%"], "Profit is ₹100; 100/500 × 100 = 20%."],
		["Average", "What is the average of 10, 20, 30, 40 and 50?", "30", ["25", "35", "40"], "The sum is 150; 150 ÷ 5 = 30."],
		["Ratio", "A sum of ₹720 is divided in the ratio 5:7. What is the larger share?", "₹420", ["₹300", "₹360", "₹480"], "There are 12 parts; one part is ₹60, so 7 parts equal ₹420."],
		["Simple Interest", "Find the simple interest on ₹2,000 at 5% per year for 3 years.", "₹300", ["₹200", "₹250", "₹350"], "SI = PRT/100 = 2000 × 5 × 3 / 100 = ₹300."],
		["Speed and Distance", "A vehicle covers 150 km in 3 hours. What is its average speed?", "50 km/h", ["45 km/h", "55 km/h", "60 km/h"], "Average speed = distance/time = 150/3 = 50 km/h."],
		["Time and Work", "If a worker completes a job in 12 days, what fraction is completed in one day at a constant rate?", "1/12", ["1/10", "1/6", "12"], "One day's work is the reciprocal of 12 days, or 1/12."],
		["Number System", "What is the least common multiple of 12 and 18?", "36", ["24", "30", "72"], "12 = 2²×3 and 18 = 2×3²; the LCM is 2²×3² = 36."],
		["Number System", "What is the highest common factor of 48 and 60?", "12", ["6", "10", "24"], "The greatest number dividing both 48 and 60 is 12."],
		["Algebra", "If x + 7 = 19, what is x?", "12", ["10", "11", "13"], "Subtract 7 from both sides: x = 12."],
		["Algebra", "If 3x = 42, what is x?", "14", ["12", "13", "15"], "Divide both sides by 3: x = 14."],
		["Mensuration", "What is the area of a rectangle 12 cm long and 5 cm wide?", "60 cm²", ["34 cm²", "50 cm²", "120 cm²"], "Area = length × width = 12 × 5 = 60 cm²."],
		["Mensuration", "What is the perimeter of a square with side 9 cm?", "36 cm", ["18 cm", "27 cm", "81 cm"], "Perimeter = 4 × side = 4 × 9 = 36 cm."],
		["Fractions", "What is 3/4 of 64?", "48", ["42", "46", "52"], "64 × 3/4 = 16 × 3 = 48."],
		["Percentage", "A value increases from 80 to 100. What is the percentage increase?", "25%", ["20%", "22.5%", "30%"], "Increase is 20; 20/80 × 100 = 25%."],
		["Profit and Loss", "An item bought for ₹800 is sold at a 10% loss. What is its selling price?", "₹720", ["₹700", "₹740", "₹780"], "A 10% loss is ₹80, so the selling price is ₹800 - ₹80 = ₹720."],
		["Average", "The average of 6 numbers is 14. What is their sum?", "84", ["72", "80", "90"], "Sum = average × number of values = 14 × 6 = 84."],
		["Ratio", "If 4 notebooks cost ₹60, what do 10 notebooks cost at the same rate?", "₹150", ["₹120", "₹140", "₹160"], "One notebook costs ₹15; 10 cost ₹150."],
		["Simple Interest", "What is the simple interest on ₹1,500 at 4% per year for 2 years?", "₹120", ["₹100", "₹110", "₹140"], "SI = 1500 × 4 × 2 / 100 = ₹120."],
		["Speed and Distance", "How far does a train travel in 2.5 hours at 60 km/h?", "150 km", ["120 km", "140 km", "180 km"], "Distance = speed × time = 60 × 2.5 = 150 km."],
		["Time and Work", "A can finish a task in 10 days and works at a constant rate. What fraction does A finish in 4 days?", "2/5", ["1/5", "1/2", "3/5"], "Four days of work is 4/10 = 2/5 of the task."],
		["Number System", "What is the remainder when 257 is divided by 9?", "5", ["2", "3", "7"], "257 = 9 × 28 + 5, so the remainder is 5."],
		["Algebra", "If 2x + 5 = 17, what is x?", "6", ["5", "7", "11"], "2x = 12, therefore x = 6."],
		["Mensuration", "What is the area of a triangle with base 10 cm and height 8 cm?", "40 cm²", ["18 cm²", "36 cm²", "80 cm²"], "Area = 1/2 × base × height = 1/2 × 10 × 8 = 40 cm²."],
		["Data Interpretation", "A class has 18 girls and 12 boys. What fraction of the class are girls?", "3/5", ["2/5", "1/2", "2/3"], "There are 30 students; 18/30 reduces to 3/5."]
	],
	"Reasoning": [
		["Number Series", "Find the next number: 2, 4, 8, 16, 32, ?", "64", ["48", "54", "72"], "Each term is multiplied by 2, so the next term is 64."],
		["Number Series", "Find the next number: 3, 6, 12, 24, ?", "48", ["36", "42", "54"], "Each term doubles: 24 × 2 = 48."],
		["Number Series", "Find the next number: 5, 9, 13, 17, ?", "21", ["19", "20", "22"], "The sequence increases by 4 each time."],
		["Number Series", "Find the next number: 1, 4, 9, 16, ?", "25", ["20", "24", "36"], "These are consecutive square numbers: 1², 2², 3², 4², then 5²."],
		["Number Series", "Find the next number: 2, 5, 10, 17, 26, ?", "37", ["34", "35", "39"], "The differences are 3, 5, 7, 9; next add 11 to get 37."],
		["Analogy", "Book is related to Reading in the same way as Fork is related to:", "Eating", ["Writing", "Drawing", "Walking"], "A book is used for reading; a fork is used for eating."],
		["Analogy", "Bird is to Nest as Bee is to:", "Hive", ["Web", "Stable", "Burrow"], "A nest is a bird's home; a hive is a bee colony's home."],
		["Coding-Decoding", "If CAT is coded as DBU by shifting each letter one place forward, how is DOG coded?", "EPH", ["EPG", "FQH", "DNG"], "D→E, O→P and G→H, giving EPH."],
		["Coding-Decoding", "If each letter is replaced by the next letter, what does the code 'UFTU' represent?", "TEST", ["REST", "TEXT", "TENT"], "Shift each coded letter back by one: U→T, F→E, T→S, U→T."],
		["Direction Sense", "A person walks 4 km north, then 3 km east. In which direction is the person from the starting point?", "North-east", ["South-east", "North-west", "South-west"], "The final position is both north and east of the start."],
		["Direction Sense", "Facing west, you turn left. Which direction are you facing now?", "South", ["North", "East", "West"], "A left turn from west points south."],
		["Ordering", "Mira is taller than Neha; Neha is taller than Pooja. Who is the shortest?", "Pooja", ["Mira", "Neha", "Cannot be determined"], "The order is Mira > Neha > Pooja, so Pooja is shortest."],
		["Classification", "Which number does not belong: 4, 9, 16, 20?", "20", ["4", "9", "16"], "4, 9 and 16 are perfect squares; 20 is not."],
		["Classification", "Which word does not belong: January, March, Monday, July?", "Monday", ["January", "March", "July"], "The other three are months; Monday is a day of the week."],
		["Alphabet Series", "What letter comes next: A, C, E, G, ?", "I", ["H", "J", "K"], "The sequence advances two letters at a time."],
		["Alphabet Series", "What letter comes next: Z, X, V, T, ?", "R", ["S", "Q", "P"], "The sequence moves backward by two letters each time."],
		["Blood Relations", "Ravi is the brother of Sita. Sita is the mother of Aman. How is Ravi related to Aman?", "Maternal uncle", ["Father", "Brother", "Grandfather"], "Ravi is the brother of Aman's mother, so he is Aman's maternal uncle."],
		["Order and Ranking", "In a line of 20 people, Dev is 7th from the front. What is his position from the back?", "14th", ["13th", "15th", "16th"], "Position from back = 20 - 7 + 1 = 14."],
		["Syllogism", "All roses are flowers. Which statement must be true?", "Every rose is a flower", ["Every flower is a rose", "No rose is a flower", "Some flowers are not plants"], "The first statement directly establishes that every rose belongs to the group of flowers."],
		["Logical Deduction", "If today is Wednesday, what day will it be 10 days later?", "Saturday", ["Friday", "Sunday", "Monday"], "Ten days is one week plus three days; Wednesday plus three days is Saturday."],
		["Number Series", "Find the next number: 81, 27, 9, 3, ?", "1", ["0", "2", "6"], "Each term is divided by 3."],
		["Number Series", "Find the next number: 7, 14, 28, 56, ?", "112", ["84", "98", "120"], "Each term doubles: 56 × 2 = 112."],
		["Analogy", "Thermometer is to Temperature as Clock is to:", "Time", ["Distance", "Weight", "Speed"], "A thermometer measures temperature; a clock measures time."],
		["Direction Sense", "Facing north, you turn right and then right again. Which direction are you facing?", "South", ["East", "West", "North"], "Two right turns from north point south."],
		["Classification", "Which is the odd one out: 2, 3, 5, 9?", "9", ["2", "3", "5"], "2, 3 and 5 are prime numbers; 9 is composite."]
	],
	"English": [
		["Synonyms", "Choose the synonym of 'abundant'.", "Plentiful", ["Scarce", "Rare", "Limited"], "Abundant means plentiful or available in large quantities."],
		["Antonyms", "Choose the antonym of 'expand'.", "Contract", ["Increase", "Enlarge", "Extend"], "Contract means to become smaller, the opposite of expand."],
		["Synonyms", "Choose the synonym of 'brief'.", "Concise", ["Lengthy", "Unclear", "Ordinary"], "Brief means short in duration or concise in wording."],
		["Antonyms", "Choose the antonym of 'ancient'.", "Modern", ["Historic", "Old", "Former"], "Modern is the opposite of ancient."],
		["Vocabulary", "Choose the correctly spelled form of 'accommodation'.", "Accommodation", ["Accomodation", "Acommodation", "Accommadation"], "Accommodation is spelled with double c and double m."],
		["Vocabulary", "Choose the correctly spelled form of 'necessary'.", "Necessary", ["Neccessary", "Necesary", "Necessay"], "Necessary has one c and two s characters."],
		["Grammar", "Choose the correct verb: Each of the players ___ a uniform.", "has", ["have", "are having", "were"], "The subject 'each' is singular, so it takes 'has'."],
		["Grammar", "Choose the correct form: She ___ to the library every Saturday.", "goes", ["go", "going", "gone"], "A third-person singular subject takes 'goes' in the simple present."],
		["Grammar", "Choose the correct article: He is ___ honest officer.", "an", ["a", "the", "no article"], "'Honest' begins with a vowel sound, so 'an' is used."],
		["Grammar", "Choose the correct preposition: The meeting begins ___ 10 a.m.", "at", ["in", "on", "by"], "Use 'at' with a specific clock time."],
		["Grammar", "Choose the correct sentence.", "They have completed the assignment.", ["They has completed the assignment.", "They have complete the assignment.", "They completed has the assignment."], "The plural subject 'they' takes 'have' with the past participle 'completed'."],
		["Vocabulary", "What does 'reluctant' mean?", "Unwilling", ["Eager", "Certain", "Careless"], "Reluctant means hesitant or unwilling to do something."],
		["Synonyms", "Choose the synonym of 'diligent'.", "Hard-working", ["Lazy", "Forgetful", "Impatient"], "A diligent person works carefully and persistently."],
		["Antonyms", "Choose the antonym of 'optimistic'.", "Pessimistic", ["Hopeful", "Confident", "Positive"], "Pessimistic is the opposite of optimistic."],
		["Grammar", "Choose the correct plural form of 'criterion'.", "Criteria", ["Criterions", "Criterias", "Criterion"], "The standard plural of criterion is criteria."],
		["Grammar", "Choose the correct pronoun: This matter is between you and ___.", "me", ["I", "myself", "mine"], "The pronoun is the object of the preposition 'between', so 'me' is correct."],
		["Vocabulary", "What does the idiom 'once in a blue moon' mean?", "Very rarely", ["Every month", "At night", "Unexpectedly"], "The idiom means something that happens very rarely."],
		["Grammar", "Choose the correct passive form of 'The committee approved the plan'.", "The plan was approved by the committee.", ["The plan approved the committee.", "The committee was approved by the plan.", "The plan is approving the committee."], "In the simple past passive, use 'was' plus the past participle 'approved'."],
		["Vocabulary", "Choose the word closest in meaning to 'mitigate'.", "Lessen", ["Intensify", "Ignore", "Predict"], "Mitigate means to make something less severe or harmful."],
		["Grammar", "Choose the correct conjunction: It was raining, ___ we continued the match.", "yet", ["because", "unless", "so that"], "'Yet' introduces a contrast between the rain and continuing the match."]
	]
};

const QUESTIONS = Object.entries(QUESTION_SEEDS).flatMap(([subject, entries]) => entries.map((entry, index) => {
	const [topic, question, answer, distractors, explanation] = entry;
	const correctAnswer = (index * 7 + subject.length) % 4;
	const options = distractors.slice();
	options.splice(correctAnswer, 0, answer);
	const difficulty = ["Easy", "Moderate", "Difficult"][index % 3];
	return {
		id: `${subject === "General Awareness" ? "GA" : subject === "Quantitative Aptitude" ? "MATH" : subject === "Reasoning" ? "REASON" : "ENG"}${String(index + 1).padStart(3, "0")}`,
		exam: ["SSC CGL", "IBPS PO", "RRB NTPC", "SSC CHSL"][index % 4], subject, topic, difficulty,
		question, options, correctAnswer, explanation, marks: subject === "General Awareness" || subject === "Reasoning" ? 1 : 2,
		negativeMarks: subject === "General Awareness" || subject === "Reasoning" ? 0.25 : 0.5,
		sourceType: "Original Practice Question"
	};
}));

function filterQuestions(items = QUESTIONS, filters = {}) {
	return items.filter(question => Object.entries(filters).every(([key, value]) => {
		if (!value) return true;
		return String(question[key] || "").toLowerCase().includes(String(value).toLowerCase());
	}));
}