function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

fetch("data/wonders.json")
  .then((response) => response.json())
  .then((wonderLists) => {
    const allWonders = wonderLists.flatMap((list) => list.wonders);
    const total = allWonders.length;
    const visitedCount = allWonders.filter((wonder) => wonder.visited).length;
    document.getElementById("progressCount").textContent = `${visitedCount} / ${total} seen`;

    const progressBar = document.getElementById("progressBar");
    const checklists = document.getElementById("checklists");
    const details = document.getElementById("wonderDetails");

    wonderLists.forEach((list, index) => {
      const listVisited = list.wonders.filter((wonder) => wonder.visited).length;
      const markerHtml = `<span class="list-color-marker" style="background:${list.color}"></span>`;

      // one coloured segment per wonder list, sized by how many wonders it has
      const segment = document.createElement("div");
      segment.className = "progress-segment";
      segment.style.flexGrow = list.wonders.length;
      segment.style.background = list.lightColor;

      const fill = document.createElement("div");
      fill.className = "progress-segment-fill";
      fill.style.width = `${(listVisited / list.wonders.length) * 100}%`;
      fill.style.background = list.color;
      segment.appendChild(fill);
      progressBar.appendChild(segment);

      // notepad-style checklist block — all four of these are appended one after another
      const checklist = document.createElement("div");
      checklist.className = "wonder-checklist";
      checklist.innerHTML = `<h3>${markerHtml}${list.name}<span class="checklist-count">${listVisited}/${list.wonders.length}</span></h3>`;

      const notepad = document.createElement("ul");
      notepad.className = "notepad-list";

      // detail section for this list, tinted with its light colour
      const section = document.createElement("section");
      section.id = list.id;
      section.className = "section";
      section.style.background = list.lightColor;

      const wrapper = document.createElement("div");
      wrapper.className = "container";
      wrapper.innerHTML = `<h2>${markerHtml}${list.name}</h2>`;

      const grid = document.createElement("div");
      grid.className = "wonders-grid";

      list.wonders.forEach((wonder) => {
        const slug = slugify(wonder.name);
        const dotStyle = `border-color:${list.color};${wonder.visited ? `background:${list.color};` : ""}`;

        const item = document.createElement("li");
        item.innerHTML = `
          <a href="#${slug}" style="--row-hover:${list.lightColor}">
            <span class="status-dot" style="${dotStyle}"></span>
            ${wonder.name}
          </a>
        `;
        notepad.appendChild(item);

        const card = document.createElement("article");
        card.className = "wonder-card";
        card.id = slug;
        card.style.borderLeftColor = list.color;
        card.innerHTML = `
          <img class="card-image" src="${wonder.images[0]}" alt="${wonder.name}">
          <div class="wonder-heading">
            <span class="status-dot" style="${dotStyle}"></span>
            <h3>${wonder.name}</h3>
          </div>
          <p class="wonder-location">${wonder.country} · ${wonder.location}</p>
          <p>${wonder.intro}</p>
        `;
        grid.appendChild(card);
      });

      checklist.appendChild(notepad);
      checklists.appendChild(checklist);

      wrapper.appendChild(grid);
      section.appendChild(wrapper);
      details.appendChild(section);
    });
  });
