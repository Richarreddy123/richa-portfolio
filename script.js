async function loadJson(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`Failed to load ${path}`);
  return await res.json();
}

function el(tag, attrs = {}, children = []){
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if(k === "class") node.className = v;
    else if(k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  });
  children.forEach(c => node.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return node;
}

function uniq(arr){ return Array.from(new Set(arr)); }

let ALL_PROJECTS = [];
let ACTIVE_TAG = "All";

function renderTags(tags){
  const wrap = document.getElementById("tagChips");
  wrap.innerHTML = "";
  const all = ["All", ...tags];
  all.forEach(tag => {
    const chip = el("button", {
      class: `chip ${tag === ACTIVE_TAG ? "active" : ""}`,
      type: "button",
      onclick: () => {
        ACTIVE_TAG = tag;
        render();
      }
    }, [tag]);
    wrap.appendChild(chip);
  });
}

function projectCard(p){
  const tags = el("div", {class:"meta"}, p.tags.map(t => el("span", {class:"pill-sm"}, [t])));
  const actions = el("div", {class:"actions"}, [
    el("a", {class:"btn btn-sm", href: p.repo, target:"_blank", rel:"noreferrer"}, ["Repo"]),
  ]);

  if(p.live){
    actions.appendChild(el("a", {class:"btn btn-sm btn-ghost", href: p.live, target:"_blank", rel:"noreferrer"}, ["Live"]));
  }

  return el("div", {class:"card project"}, [
    el("h3", {}, [p.title]),
    el("p", {}, [p.description]),
    tags,
    actions
  ]);
}

function matches(project, q){
  if(!q) return true;
  const hay = (project.title + " " + project.description + " " + project.tags.join(" ")).toLowerCase();
  return hay.includes(q.toLowerCase());
}

function render(){
  const q = (document.getElementById("searchInput").value || "").trim();

  const filtered = ALL_PROJECTS
    .filter(p => ACTIVE_TAG === "All" ? true : p.tags.includes(ACTIVE_TAG))
    .filter(p => matches(p, q));

  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";

  if(filtered.length === 0){
    grid.appendChild(el("div", {class:"card"}, [
      el("h3", {}, ["No matches"]),
      el("p", {class:"muted"}, ["Try another search or choose a different tag."])
    ]));
    return;
  }

  filtered.forEach(p => grid.appendChild(projectCard(p)));
}

function setupMenu(){
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.hidden = open;
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    btn.setAttribute("aria-expanded", "false");
    nav.hidden = true;
  }));
}

function setupContact(profile){
  const form = document.getElementById("contactForm");
  const linkedin = document.getElementById("linkedinLink");

  linkedin.href = profile.linkedin || "#";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get("name");
    const subject = fd.get("subject");
    const message = fd.get("message");

    const to = profile.email || "richab952@gmail.com";
    const body = `Hi Richa,%0D%0A%0D%0A${encodeURIComponent(String(message))}%0D%0A%0D%0AThanks,%0D%0A${encodeURIComponent(String(name))}`;
    const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(String(subject))}&body=${body}`;
    window.location.href = url;
  });
}

function renderSkills(skills){
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  skills.groups.forEach(g => {
    const tags = el("div", {class:"tags"}, g.items.map(x => el("span", {class:"tag"}, [x])));
    grid.appendChild(el("div", {class:"card skill-group"}, [
      el("h3", {}, [g.title]),
      tags
    ]));
  });
}

(async function init(){
  setupMenu();

  document.getElementById("year").textContent = String(new Date().getFullYear());

  const [projects, skills, profile] = await Promise.all([
    loadJson("data/projects.json"),
    loadJson("data/skills.json"),
    loadJson("data/profile.json"),
  ]);

  ALL_PROJECTS = projects;

  const tags = uniq(projects.flatMap(p => p.tags)).sort();
  renderTags(tags);

  document.getElementById("searchInput").addEventListener("input", render);

  renderSkills(skills);
  setupContact(profile);
  render();
})();

