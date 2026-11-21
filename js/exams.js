const EXAMS = [
  { id: "ssc-cgl", name: "SSC CGL", category: "SSC", stage: "Tier I", questions: 100, duration: 60, marks: 200, negative: 0.5, icon: "bi-building" },
  { id: "ssc-chsl", name: "SSC CHSL", category: "SSC", stage: "Tier I", questions: 100, duration: 60, marks: 200, negative: 0.5, icon: "bi-building" },
  { id: "rrb-ntpc", name: "RRB NTPC", category: "Railway", stage: "CBT 1", questions: 100, duration: 90, marks: 100, negative: 0.33, icon: "bi-train-front" },
  { id: "ibps-po", name: "IBPS PO", category: "Banking", stage: "Prelims", questions: 100, duration: 60, marks: 100, negative: 0.25, icon: "bi-bank" },
  { id: "ibps-clerk", name: "IBPS Clerk / CSA", category: "Banking", stage: "Prelims", questions: 100, duration: 60, marks: 100, negative: 0.25, icon: "bi-bank" },
  { id: "sbi-po", name: "SBI PO", category: "Banking", stage: "Prelims", questions: 100, duration: 60, marks: 100, negative: 0.25, icon: "bi-bank" },
  { id: "sbi-clerk", name: "SBI Clerk", category: "Banking", stage: "Prelims", questions: 100, duration: 60, marks: 100, negative: 0.25, icon: "bi-bank" },
  { id: "rrb-group-d", name: "RRB Group D", category: "Railway", stage: "CBT", questions: 100, duration: 90, marks: 100, negative: 0.33, icon: "bi-train-front" },
  { id: "ssc-mts", name: "SSC MTS", category: "SSC", stage: "CBT", questions: 90, duration: 90, marks: 270, negative: 1, icon: "bi-building" },
  { id: "rrb-alp", name: "RRB ALP", category: "Railway", stage: "CBT 1", questions: 75, duration: 60, marks: 75, negative: 0.33, icon: "bi-train-front" },
  { id: "ibps-rrb-po", name: "IBPS RRB PO", category: "Banking", stage: "Prelims", questions: 80, duration: 45, marks: 80, negative: 0.25, icon: "bi-bank" },
  { id: "ibps-rrb-office", name: "IBPS RRB Office Assistant", category: "Banking", stage: "Prelims", questions: 80, duration: 45, marks: 80, negative: 0.25, icon: "bi-bank" },
  { id: "ibps-so", name: "IBPS SO", category: "Banking", stage: "Prelims", questions: 150, duration: 120, marks: 125, negative: 0.25, icon: "bi-bank" },
  { id: "ssc-cpo", name: "SSC CPO", category: "SSC", stage: "Paper I", questions: 200, duration: 120, marks: 200, negative: 0.25, icon: "bi-building" },
  { id: "ssc-gd", name: "SSC GD", category: "SSC", stage: "CBT", questions: 80, duration: 60, marks: 160, negative: 0.25, icon: "bi-building" },
  { id: "ssc-selection-post", name: "SSC Selection Post", category: "SSC", stage: "CBT", questions: 100, duration: 60, marks: 200, negative: 0.5, icon: "bi-building" },
  { id: "rrb-technician", name: "RRB Technician", category: "Railway", stage: "CBT", questions: 100, duration: 90, marks: 100, negative: 0.33, icon: "bi-train-front" }
];

const EXAM_PATTERNS = {
  "ssc-cgl": [{ subject: "General Intelligence and Reasoning", questions: 25 }, { subject: "General Awareness", questions: 25 }, { subject: "Quantitative Aptitude", questions: 25 }, { subject: "English Comprehension", questions: 25 }],
  "ssc-chsl": [{ subject: "English Language", questions: 25 }, { subject: "General Intelligence", questions: 25 }, { subject: "Quantitative Aptitude", questions: 25 }, { subject: "General Awareness", questions: 25 }],
  "rrb-ntpc": [{ subject: "General Awareness", questions: 40 }, { subject: "Mathematics", questions: 30 }, { subject: "General Intelligence and Reasoning", questions: 30 }],
  "ibps-po": [{ subject: "English Language", questions: 30 }, { subject: "Quantitative Aptitude", questions: 35 }, { subject: "Reasoning Ability", questions: 35 }],
  "ibps-clerk": [{ subject: "English Language", questions: 30 }, { subject: "Numerical Ability", questions: 35 }, { subject: "Reasoning Ability", questions: 35 }],
  "sbi-po": [{ subject: "English Language", questions: 40 }, { subject: "Quantitative Aptitude", questions: 30 }, { subject: "Reasoning Ability", questions: 30 }],
  "sbi-clerk": [{ subject: "English Language", questions: 30 }, { subject: "Numerical Ability", questions: 35 }, { subject: "Reasoning Ability", questions: 35 }]
};

function filterQuestions(items, filters = {}) {
  return items.filter(item => Object.entries(filters).every(([key, value]) => !value || String(item[key] || "").toLowerCase() === String(value).toLowerCase()));
}