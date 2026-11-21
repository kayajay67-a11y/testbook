(function () {
  const result = Store.get("latestResult", null);
  if (!result) return;

  const setText = (id, value) => {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  };

  setText("resultExam", `${result.exam}${result.autoSubmitted ? " · Auto-submitted" : ""}`);
  setText("resultTotal", result.total);
  setText("resultAttempted", result.attempted);
  setText("resultCorrect", result.correct);
  setText("resultIncorrect", result.incorrect);
  setText("resultUnattempted", result.unattempted);
  setText("resultMarks", `${result.marks} / ${result.maxMarks}`);
  setText("resultAccuracy", `${result.accuracy}%`);
  setText("resultTime", `${Math.floor(result.timeTaken / 60)}m ${result.timeTaken % 60}s`);

  const subjects = document.getElementById("subjectResults");
  subjects?.replaceChildren();
  Object.entries(result.subjectStats).forEach(([name, stats]) => {
    const group = document.createElement("div");
    group.className = "mb-3";
    const label = document.createElement("p");
    label.className = "small mb-1";
    label.textContent = `${name}: ${stats.correct}/${stats.total} correct`;
    const progress = document.createElement("div");
    progress.className = "progress";
    const bar = document.createElement("div");
    bar.className = "progress-bar bg-success";
    bar.style.width = `${stats.total ? stats.correct / stats.total * 100 : 0}%`;
    progress.append(bar);
    group.append(label, progress);
    subjects.append(group);
  });

  const solutions = document.getElementById("solutionList");
  solutions?.replaceChildren();
  result.solutions.forEach((question, index) => {
    const article = document.createElement("article");
    article.className = "surface content-card mb-3";
    const title = document.createElement("h2");
    title.className = "h6";
    title.textContent = `${index + 1}. ${question.question}`;
    const status = document.createElement("p");
    status.className = question.isCorrect ? "small text-success" : "small text-danger";
    status.textContent = question.userAnswer === null ? "Skipped" : question.isCorrect ? "Correct" : "Incorrect";
    const response = document.createElement("p");
    response.className = "small mb-1";
    response.textContent = `Your answer: ${question.userAnswer === null ? "Not answered" : question.options[question.userAnswer]}`;
    const correct = document.createElement("p");
    correct.className = "small mb-1";
    correct.textContent = `Correct answer: ${question.options[question.correctAnswer]}`;
    const explanation = document.createElement("p");
    explanation.className = "small text-secondary mb-0";
    explanation.textContent = question.explanation;
    article.append(title, status, response, correct, explanation);
    solutions.append(article);
  });
})();