Promise.all([
  fetch("data/skills.json").then((response) => response.json()),
  fetch("data/certificates.json").then((response) => response.json()),
]).then(([categories, certificates]) => {
  const container = document.getElementById("skillsSections");

  categories.forEach((category, index) => {
    const section = document.createElement("section");
    section.id = category.id;
    section.className = index % 2 === 1 ? "section section-alt" : "section";

    const wrapper = document.createElement("div");
    wrapper.className = "container";

    if (index === 0) {
      const pageTitle = document.createElement("h1");
      pageTitle.textContent = "Skills";
      wrapper.appendChild(pageTitle);
    }

    const heading = document.createElement("h2");
    heading.textContent = category.heading;
    wrapper.appendChild(heading);

    const skillList = document.createElement("ul");
    skillList.className = "tag-list";
    category.skills.forEach((skill) => {
      const item = document.createElement("li");
      item.textContent = skill;
      skillList.appendChild(item);
    });
    wrapper.appendChild(skillList);

    const certsForCategory = certificates.filter((cert) => cert.category === category.id);
    if (certsForCategory.length > 0) {
      const subHeading = document.createElement("h3");
      subHeading.textContent = "Certifications";
      wrapper.appendChild(subHeading);

      const certList = document.createElement("ul");
      certList.className = "cert-list";
      certsForCategory.forEach((cert) => {
        const item = document.createElement("li");
        item.className = "cert-card";
        item.innerHTML = `
          <h4>${cert.name}</h4>
          <p class="cert-issuer">${cert.issuer}</p>
          <p class="cert-date">${cert.date}</p>
          <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer">View credential</a>
        `;
        certList.appendChild(item);
      });
      wrapper.appendChild(certList);
    }

    section.appendChild(wrapper);
    container.appendChild(section);
  });
});
