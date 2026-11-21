(function () {
  const page = document.body.dataset.page;
  const hasStore = typeof Store !== "undefined";

  function showToast(message) {
    const node = document.createElement("div");
    node.className = "toast-message";
    node.setAttribute("role", "status");
    node.textContent = message;
    document.body.append(node);
    window.setTimeout(() => node.remove(), 2600);
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  if (hasStore) {
    const profile = Store.get("profile", null);
    const account = document.querySelector(".nav-search + div");
    if (profile && account) {
      account.replaceChildren();
      const wrapper = document.createElement("div"); wrapper.className = "dropdown";
      const toggle = document.createElement("button"); toggle.className = "btn btn-sm btn-outline-navy dropdown-toggle"; toggle.type = "button"; toggle.dataset.bsToggle = "dropdown"; toggle.textContent = profile.name;
      const menu = document.createElement("ul"); menu.className = "dropdown-menu dropdown-menu-end";
      const dashboardItem = document.createElement("li"); const dashboardLink = document.createElement("a"); dashboardLink.className = "dropdown-item"; dashboardLink.href = "student-dashboard.html"; dashboardLink.textContent = "Student dashboard"; dashboardItem.append(dashboardLink);
      const logoutItem = document.createElement("li"); const logout = document.createElement("button"); logout.type = "button"; logout.className = "dropdown-item"; logout.dataset.logout = ""; logout.textContent = "Log out"; logoutItem.append(logout);
      menu.append(dashboardItem, logoutItem); wrapper.append(toggle, menu); account.append(wrapper);
    }
  }

  if (page === "exams") {
    const category = document.getElementById("examCategory");
    const query = document.getElementById("examQuery");
    const items = [...document.querySelectorAll(".exam-item")];
    const update = () => {
      const term = (query?.value || new URLSearchParams(location.search).get("q") || "").toLowerCase();
      const selectedCategory = category?.value || new URLSearchParams(location.search).get("category") || "";
      let visible = 0;
      items.forEach(item => {
        const shown = (!selectedCategory || item.dataset.category === selectedCategory) && item.dataset.name.toLowerCase().includes(term);
        item.classList.toggle("d-none", !shown);
        if (shown) visible += 1;
      });
      setText("examCount", `${visible} examinations`);
      document.getElementById("emptyExams")?.classList.toggle("d-none", visible > 0);
    };
    category?.addEventListener("change", update);
    query?.addEventListener("input", update);
    if (category) category.value = new URLSearchParams(location.search).get("category") || "";
    if (query) query.value = new URLSearchParams(location.search).get("q") || "";
    update();
  }

  if (page === "series") {
    const filters = [document.getElementById("seriesCategory"), document.getElementById("seriesType")];
    const grid = document.getElementById("seriesGrid");
    if (hasStore && grid) Store.get("demoTests", []).forEach(test => {
      const column = document.createElement("div"); column.className = "col-md-6 col-xl-4 series-item"; column.dataset.category = test.category; column.dataset.type = "Full mock";
      const article = document.createElement("article"); article.className = "surface content-card h-100";
      const tag = document.createElement("span"); tag.className = "category-tag"; tag.textContent = `${test.category} · Admin demo`;
      const title = document.createElement("h2"); title.className = "h5 mt-3"; title.textContent = test.name;
      const details = document.createElement("p"); details.textContent = `20 original practice questions · ${test.duration} minutes · Up to 30 marks`;
      const start = document.createElement("button"); start.className = "btn btn-accent"; start.type = "button"; start.dataset.customTest = test.id; start.textContent = "Start test";
      article.append(tag, title, details, start); column.append(article); grid.append(column);
    });
    const update = () => document.querySelectorAll(".series-item").forEach(item => {
      const category = filters[0]?.value || "";
      const type = filters[1]?.value || "";
      item.classList.toggle("d-none", Boolean(category && item.dataset.category !== category) || Boolean(type && item.dataset.type !== type));
    });
    filters.forEach(filter => filter?.addEventListener("change", update));
    update();
  }

  if (page === "details" && typeof EXAMS !== "undefined") {
    const examId = new URLSearchParams(location.search).get("exam") || "ssc-cgl";
    const exam = EXAMS.find(item => item.id === examId) || EXAMS[0];
    setText("detailExamTitle", exam.name);
    const category = document.querySelector(".page-heading .category-tag");
    if (category) category.textContent = `${exam.category} · ${exam.stage}`;
    const override = hasStore ? Store.get("patternOverrides", {})[exam.id] : null;
    const duration = override?.duration || exam.duration;
    document.querySelectorAll(".col-lg-4 .surface p")[1]?.replaceChildren(`${duration} minute duration`);
    const rows = typeof EXAM_PATTERNS === "undefined" ? null : EXAM_PATTERNS[exam.id];
    const tableBody = document.querySelector("table tbody");
    if (rows && tableBody) {
      tableBody.replaceChildren();
      rows.forEach(section => {
        const row = document.createElement("tr");
        const name = document.createElement("td"); name.textContent = section.subject;
        const count = document.createElement("td"); count.className = "text-end"; count.textContent = section.questions;
        row.append(name, count); tableBody.append(row);
      });
    }
    const footerCells = document.querySelectorAll("table tfoot td");
    if (footerCells[0]) footerCells[0].textContent = `Total · ${duration} minutes`;
    if (footerCells[1]) footerCells[1].textContent = exam.questions;
    const markNote = document.querySelector(".col-lg-8 .content-card p.small.text-secondary");
    if (markNote) markNote.textContent = `Total marks: ${exam.marks} · Negative marking starter: ${exam.negative} per incorrect response.`;
    const glance = document.querySelectorAll(".col-lg-4 .surface p");
    if (glance[0]) glance[0].textContent = `${exam.stage} · ${exam.questions} questions`;
    if (glance[1]) glance[1].textContent = `${duration} minute duration`;
    if (glance[2]) glance[2].textContent = `${exam.marks} total marks`;
    const mockLink = document.querySelector('.col-lg-8 a[href^="mock-test.html?exam="]');
    if (mockLink) mockLink.href = `mock-test.html?exam=${encodeURIComponent(exam.id)}`;
  }

  if (page === "mock" && typeof MockEngine !== "undefined") {
    const params = new URLSearchParams(location.search);
    const session = hasStore ? Store.get("activeTest", null) : null;
    if (params.has("custom") && hasStore) {
      const custom = Store.get("demoTests", []).find(test => test.id === params.get("custom"));
      if (custom) MockEngine.start(custom.examId, "Full mock", custom.name, custom.duration);
    } else if (params.has("exam") && !params.has("run")) {
      MockEngine.start(params.get("exam"), params.get("type") || "Full mock");
    } else if (session && !session.submitted) {
      MockEngine.mount();
    }
  }

  document.addEventListener("click", event => {
    const start = event.target.closest("[data-start-exam]");
    if (start && typeof MockEngine !== "undefined") {
      event.preventDefault();
      MockEngine.start(start.dataset.startExam, start.dataset.testType || "Full mock");
    }
    const customTest = event.target.closest("[data-custom-test]");
    if (customTest && hasStore) {
      const test = Store.get("demoTests", []).find(item => item.id === customTest.dataset.customTest);
      if (test && typeof MockEngine !== "undefined") MockEngine.start(test.examId, "Full mock", test.name, test.duration);
      else if (test) location.href = `mock-test.html?custom=${encodeURIComponent(test.id)}`;
    }
    if (event.target.closest("[data-logout]") && hasStore) { Store.remove("profile"); location.href = "index.html"; }
  });

  if (page === "practice") {
    const card = document.querySelector("[data-practice-card]");
    const subject = document.getElementById("questionSubject");
    const difficulty = document.getElementById("questionDifficulty");
    const topic = document.getElementById("questionTopic");
    const questionText = card?.querySelector("h2");
    const options = card ? [...card.querySelectorAll("[data-practice-answer]")] : [];
    const feedback = document.getElementById("practiceFeedback");
    let activeQuestion = null;
    const updateQuestion = () => {
      if (typeof QUESTIONS === "undefined" || !card) return;
      const filters = { subject: subject?.value || "", difficulty: difficulty?.value === "All levels" ? "" : difficulty?.value || "", topic: topic?.value || "" };
      const match = filterQuestions(QUESTIONS, filters)[0];
      if (!match) { card.classList.add("d-none"); return; }
      activeQuestion = match;
      card.classList.remove("d-none"); card.dataset.practiceCard = match.id; card.dataset.correctAnswer = match.correctAnswer;
      if (questionText) questionText.textContent = match.question;
      const tag = card.querySelector(".category-tag"); if (tag) tag.textContent = `${match.subject} · ${match.topic} · ${match.difficulty}`;
      options.forEach((button, index) => { button.disabled = false; button.classList.remove("border-success", "border-danger"); button.textContent = `${String.fromCharCode(65 + index)}. ${match.options[index]}`; });
      if (feedback) { feedback.textContent = match.explanation; feedback.classList.add("d-none"); }
    };
    [subject, difficulty].forEach(select => select?.addEventListener("change", updateQuestion));
    topic?.addEventListener("input", updateQuestion);
    updateQuestion();
    card?.querySelectorAll("[data-practice-answer]").forEach(button => button.addEventListener("click", () => {
      if (button.disabled) return;
      const correct = Number(button.dataset.practiceAnswer) === Number(card.dataset.correctAnswer);
      card.querySelectorAll("[data-practice-answer]").forEach(option => { option.disabled = true; });
      button.classList.add(correct ? "border-success" : "border-danger");
      if (feedback) { feedback.textContent = `${correct ? "Correct. " : "Not quite. "}${activeQuestion?.explanation || "Review the explanation."}`; feedback.classList.remove("d-none"); }
      if (hasStore) {
        const progress = Store.get("practiceProgress", []);
        progress.push({ id: card.dataset.practiceCard, correct, date: Date.now() });
        Store.set("practiceProgress", progress.slice(-200));
      }
    }));
    document.getElementById("practiceBookmark")?.addEventListener("click", event => {
      if (!hasStore) return;
      const id = card?.dataset.practiceCard;
      const bookmarks = Store.get("bookmarks", []);
      Store.set("bookmarks", bookmarks.includes(id) ? bookmarks.filter(item => item !== id) : [...bookmarks, id]);
      event.currentTarget.textContent = bookmarks.includes(id) ? "Bookmark" : "Bookmarked";
    });
  }

  if (page === "ncert" && hasStore) {
    const completed = Store.get("ncertProgress", []);
    const key = "Class 6:History:Early societies and sources";
    setText("ncertProgressCount", completed.length);
    const bar = document.getElementById("ncertProgressBar");
    if (bar) bar.style.width = `${Math.min(100, completed.length * 10)}%`;
    document.getElementById("completeChapter")?.addEventListener("click", () => {
      const current = Store.get("ncertProgress", []);
      if (!current.includes(key)) current.push(key);
      Store.set("ncertProgress", current);
      setText("ncertProgressCount", current.length);
      if (bar) bar.style.width = `${Math.min(100, current.length * 10)}%`;
      showToast("Chapter progress saved");
    });
  }

  if (page === "current") {
    const period = document.getElementById("affairsPeriod");
    const category = document.getElementById("affairsCategory");
    const limits = { daily: 1, weekly: 7, monthly: 31 };
    const now = new Date("2026-10-31T12:00:00");
    const update = () => document.querySelectorAll(".affairs-item").forEach(item => {
      const age = (now - new Date(`${item.dataset.date}T12:00:00`)) / 86400000;
      item.classList.toggle("d-none", Boolean(category?.value && item.dataset.category !== category.value) || Boolean(limits[period?.value] && age > limits[period.value]));
    });
    period?.addEventListener("change", update);
    category?.addEventListener("change", update);
    document.getElementById("affairsAnswerButton")?.addEventListener("click", () => document.getElementById("affairsAnswer")?.classList.toggle("d-none"));
  }

  if (page === "books") {
    document.querySelectorAll("[data-book-preview]").forEach(button => button.addEventListener("click", () => {
      setText("bookTitle", button.dataset.bookPreview);
      bootstrap.Modal.getOrCreateInstance(document.getElementById("bookModal")).show();
    }));
  }

  if ((page === "login" || page === "register") && hasStore) {
    document.getElementById("authForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const email = form.elements.email.value;
      const name = form.elements.name?.value || email.split("@")[0];
      Store.set("profile", { name, email });
      showToast("Demo profile saved. Password was not stored.");
      window.setTimeout(() => { location.href = "student-dashboard.html"; }, 250);
    });
  }

  if (page === "dashboard" && hasStore) {
    const profile = Store.get("profile", null);
    if (profile) setText("dashboardGreeting", `Welcome, ${profile.name}`);
    const attempts = Store.get("attempts", []);
    const average = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + item.marks, 0) / attempts.length) : 0;
    const accuracy = attempts.length ? Math.round(attempts.reduce((sum, item) => sum + item.accuracy, 0) / attempts.length) : 0;
    setText("dashTests", attempts.length);
    setText("dashMarks", average);
    setText("dashAccuracy", `${accuracy}%`);
    setText("dashChapters", Store.get("ncertProgress", []).length);
    setText("dashBookmarks", Store.get("bookmarks", []).length);
    const progress = document.getElementById("dashProgress");
    if (progress) progress.style.width = `${Math.min(100, Store.get("ncertProgress", []).length * 10)}%`;
    const tbody = document.getElementById("recentAttempts");
    if (tbody && attempts.length) {
      tbody.replaceChildren();
      attempts.slice(0, 5).forEach(attempt => {
        const row = document.createElement("tr");
        [attempt.exam, new Date(attempt.date).toLocaleDateString(), `${attempt.marks}/${attempt.maxMarks}`, `${attempt.accuracy}%`].forEach(value => {
          const cell = document.createElement("td"); cell.textContent = value; row.append(cell);
        });
        tbody.append(row);
      });
    }
    document.getElementById("logoutButton")?.addEventListener("click", () => { Store.remove("profile"); location.href = "index.html"; });
  }

  if (page === "admin" && hasStore) {
    document.getElementById("adminQuestionForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const questions = Store.get("customQuestions", []);
      questions.push({ id: `CUSTOM-${Date.now()}`, question: form.elements.question.value, subject: form.elements.subject.value, topic: form.elements.topic.value, options: [0,1,2,3].map(index => form.elements[`option${index}`].value), correctAnswer: Number(form.elements.correct.value), explanation: form.elements.explanation.value, difficulty: "Moderate", marks: 1, negativeMarks: .25, sourceType: "Original Practice Question" });
      Store.set("customQuestions", questions);
      setText("adminQuestionList", `${questions.length} custom question${questions.length === 1 ? "" : "s"} saved locally.`);
      form.reset();
    });
    document.getElementById("questionFile")?.addEventListener("change", event => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const incoming = JSON.parse(reader.result);
          if (!Array.isArray(incoming) || incoming.some(item => !item.question || !Array.isArray(item.options) || item.options.length !== 4 || !Number.isInteger(item.correctAnswer) || item.correctAnswer < 0 || item.correctAnswer > 3 || !item.explanation)) throw new Error("Each question needs four options, a valid answer index and an explanation.");
          Store.set("customQuestions", [...Store.get("customQuestions", []), ...incoming]);
          setText("importMessage", `${incoming.length} questions imported.`);
        } catch (error) { setText("importMessage", error.message); }
      };
      reader.readAsText(file);
    });
    document.getElementById("patternForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const id = document.getElementById("patternExam").value;
      const overrides = Store.get("patternOverrides", {});
      overrides[id] = { duration: Number(document.getElementById("patternDuration").value) };
      Store.set("patternOverrides", overrides);
      showToast("Pattern override saved locally");
    });
    document.getElementById("customTestForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const tests = Store.get("demoTests", []);
      const examId = form.elements.examId.value;
      const exam = typeof EXAMS === "undefined" ? null : EXAMS.find(item => item.id === examId);
      tests.push({ id: `DEMO-${Date.now()}`, name: form.elements.name.value, examId, duration: Number(form.elements.duration.value), category: exam?.category || "Banking" });
      Store.set("demoTests", tests);
      showToast("Mock test saved locally");
    });
    document.getElementById("courseForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const courses = Store.get("demoCourses", []);
      courses.push({ title: event.currentTarget.elements.title.value, category: event.currentTarget.elements.category.value });
      Store.set("demoCourses", courses);
      showToast("Course card saved locally");
    });
  }
})();