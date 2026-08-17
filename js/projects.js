const CATEGORY_LABELS = {
  personal: "Personal project",
  "family-friends": "For family & friends",
};

fetch("data/projects.json")
  .then((response) => response.json())
  .then((projects) => {
    const grid = document.getElementById("projectsGrid");

    projects.forEach((project) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const tags = project.tags
        .map((tag) => `<li>${tag}</li>`)
        .join("");

      card.innerHTML = `
        <img class="card-image" src="${project.image}" alt="${project.title}">
        <span class="category-badge">${CATEGORY_LABELS[project.category] || project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <ul class="tag-list">${tags}</ul>
        <div class="project-links">
          <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">Code</a>
        </div>
      `;

      grid.appendChild(card);
    });
  });
