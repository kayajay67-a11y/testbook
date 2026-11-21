(function () {
  const SESSION_KEY = "activeTest";
  let intervalId = null;

  function loadSession() { return Store.get(SESSION_KEY, null); }
  function saveSession(session) { Store.set(SESSION_KEY, session); }
  function formatTime(seconds) {
    const safe = Math.max(0, seconds);
    return `${String(Math.floor(safe / 3600)).padStart(2, "0")}:${String(Math.floor((safe % 3600) / 60)).padStart(2, "0")}`;
  }
  function getQuestions(session) {
    const byId = new Map(QUESTIONS.map(question => [question.id, question]));
    return session.questionIds.map(id => byId.get(id)).filter(Boolean);
  }
  function setAnswer(index, value) {
    const session = loadSession();
    if (!session || session.submitted) return;
    if (value === null) delete session.answers[session.questionIds[index]];
    else session.answers[session.questionIds[index]] = Number(value);
    saveSession(session);
    renderQuestion();
  }
  function goTo(index) {
    const session = loadSession();
    if (!session) return;
    session.index = Math.min(Math.max(index, 0), session.questionIds.length - 1);
    session.visited = session.visited || [];
    if (!session.visited.includes(session.index)) session.visited.push(session.index);
    saveSession(session);
    renderQuestion();
  }
  function toggleReview(index, advance) {
    const session = loadSession();
    if (!session) return;
    const id = session.questionIds[index];
    session.review = session.review.includes(id) ? session.review.filter(item => item !== id) : [...session.review, id];
    if (advance) session.index = Math.min(index + 1, session.questionIds.length - 1);
    saveSession(session);
    renderQuestion();
  }
  function renderQuestion() {
    const session = loadSession();
    if (!session) return;
    const questions = getQuestions(session);
    const question = questions[session.index];
    const selected = session.answers[question.id];
    const review = session.review.includes(question.id);
    const content = document.getElementById("mockQuestion");
    const palette = document.getElementById("questionPalette");
    if (!content || !palette) return;
    document.getElementById("questionProgress").textContent = `Question ${session.index + 1} of ${questions.length}`;
    document.getElementById("mockSubject").textContent = question.subject;
    document.getElementById("mockQuestionNumber").textContent = `Question ${session.index + 1}`;
    document.getElementById("mockQuestionText").textContent = question.question;
    content.querySelectorAll(".option-row").forEach((row, index) => {
      row.querySelector(".option-text").textContent = question.options[index] || "";
      row.querySelector("input").value = String(index);
      row.querySelector("input").checked = selected === index;
      row.classList.toggle("selected", selected === index);
    });
    content.querySelector('[data-action="previous"]').disabled = session.index === 0;
    content.querySelector('[data-action="review"]').textContent = review ? "Remove review" : "Mark for review";
    palette.querySelectorAll("button").forEach((button, index) => {
      const id = session.questionIds[index];
      const classes = [session.answers[id] !== undefined ? "answered" : session.visited?.includes(index) ? "unanswered" : "", session.review.includes(id) ? "review" : "", session.index === index ? "current" : ""].filter(Boolean).join(" ");
      button.className = classes;
      button.setAttribute("aria-label", `Go to question ${index + 1}`);
    });
    document.getElementById("mockAnsweredCount").textContent = Object.keys(session.answers).length;
    document.getElementById("mockReviewCount").textContent = session.review.length;
  }
  function mount() {
    const area = document.getElementById("mockArea");
    if (!area) return;
    const session = loadSession();
    if (!session || session.submitted) return;
    session.visited = session.visited || [session.index];
    saveSession(session);
    area.classList.remove("d-none");
    document.getElementById("mockIntro")?.classList.add("d-none");
    document.getElementById("mockTestName").textContent = session.testName || session.exam;
    document.getElementById("mockTypeLabel").textContent = `${session.testType || "Mixed practice"} · timed practice`;
    document.getElementById("mockTimer").textContent = formatTime(session.remaining);
    area.addEventListener("change", event => {
      if (event.target.name === "answer") setAnswer(loadSession().index, event.target.value);
    });
    document.addEventListener("click", event => {
      if (event.target.closest('[data-action="confirm-submit"]')) {
        bootstrap.Modal.getOrCreateInstance(document.getElementById("submitConfirm")).hide();
        submit(false);
      }
    });
    area.addEventListener("click", event => {
      const action = event.target.closest("[data-action]")?.dataset.action;
      const questionIndex = event.target.closest("[data-question-index]")?.dataset.questionIndex;
      if (questionIndex !== undefined) goTo(Number(questionIndex));
      if (action === "previous") goTo(loadSession().index - 1);
      if (action === "next") goTo(loadSession().index + 1);
      if (action === "clear") setAnswer(loadSession().index, null);
      if (action === "review") toggleReview(loadSession().index, false);
      if (action === "submit") bootstrap.Modal.getOrCreateInstance(document.getElementById("submitConfirm")).show();
    });
    renderQuestion();
    intervalId = window.setInterval(() => {
      const current = loadSession();
      if (!current || current.submitted) { clearInterval(intervalId); return; }
      current.remaining -= 1;
      saveSession(current);
      const timer = document.getElementById("mockTimer");
      if (timer) timer.textContent = formatTime(current.remaining);
      if (current.remaining <= 0) submit(true);
    }, 1000);
  }
  function start(examId = "ssc-cgl", testType = "Full mock", testName = null, testDuration = null) {
    const exam = EXAMS.find(item => item.id === examId) || EXAMS[0];
    let chosen;
    if (testType === "Sectional") chosen = filterQuestions(QUESTIONS, { subject: "Quantitative Aptitude" }).slice(0, 10);
    else if (testType === "Topic practice") chosen = filterQuestions(QUESTIONS, { topic: "Percentage" }).slice(0, 10);
    else if (testType === "Daily quiz") chosen = filterQuestions(QUESTIONS, { subject: "General Awareness" }).slice(0, 10);
    else chosen = ["General Awareness", "Quantitative Aptitude", "Reasoning", "English"].flatMap(subject => filterQuestions(QUESTIONS, { subject }).slice(0, 5));
    const questionIds = chosen.map(question => question.id);
    const duration = testDuration || (testType === "Topic practice" || testType === "Daily quiz" ? 10 : 20);
    saveSession({ id: `attempt-${Date.now()}`, exam: exam.name, examId: exam.id, testType, testName, questionIds, answers: {}, review: [], visited: [0], index: 0, remaining: duration * 60, startedAt: Date.now(), submitted: false });
    window.location.href = "mock-test.html?run=1";
  }
  function submit(autoSubmitted) {
    const session = loadSession();
    if (!session || session.submitted) return;
    session.submitted = true;
    session.autoSubmitted = autoSubmitted;
    clearInterval(intervalId);
    const questions = getQuestions(session);
    let correct = 0, incorrect = 0, marks = 0;
    const subjectStats = {};
    const solutions = questions.map(question => {
      const answer = session.answers[question.id];
      const attempted = answer !== undefined;
      const isCorrect = attempted && answer === question.correctAnswer;
      if (isCorrect) { correct += 1; marks += question.marks; }
      else if (attempted) { incorrect += 1; marks -= question.negativeMarks; }
      const bucket = subjectStats[question.subject] || (subjectStats[question.subject] = { total: 0, correct: 0, attempted: 0 });
      bucket.total += 1;
      if (attempted) bucket.attempted += 1;
      if (isCorrect) bucket.correct += 1;
      return { ...question, userAnswer: attempted ? answer : null, isCorrect };
    });
    const attempted = correct + incorrect;
    const result = {
      id: session.id, exam: session.exam, examId: session.examId, date: new Date().toISOString(), total: questions.length,
      attempted, correct, incorrect, unattempted: questions.length - attempted, marks: Number(marks.toFixed(2)),
      maxMarks: questions.reduce((sum, question) => sum + question.marks, 0),
      accuracy: attempted ? Math.round(correct / attempted * 100) : 0,
      timeTaken: Math.max(0, Math.floor((Date.now() - session.startedAt) / 1000)), subjectStats, solutions,
      autoSubmitted: Boolean(autoSubmitted)
    };
    Store.addAttempt(result);
    Store.set("latestResult", result);
    Store.set(SESSION_KEY, session);
    window.location.href = "mock-result.html";
  }

  window.MockEngine = { mount, start, submit };
})();