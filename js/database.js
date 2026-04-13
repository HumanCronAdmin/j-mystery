(() => {
  let products = [];

  const SUBGENRE_LABEL = {
    honkaku: "Honkaku (Orthodox)", "shakai-ha": "Shakai-ha (Social)",
    "hard-boiled": "Hard-Boiled", cozy: "Cozy", "police-procedural": "Police Procedural",
    psychological: "Psychological", historical: "Historical", "locked-room": "Locked-Room"
  };
  const ERA_LABEL = { classic: "Classic (pre-1980)", modern: "Modern (1980-2010)", contemporary: "Contemporary (2010+)" };
  const AVAIL_LABEL = { "in-print": "In Print", "out-of-print": "Out of Print", "digital-only": "Digital Only" };

  const $ = id => document.getElementById(id);

  function populateFilters() {
    const subs = [...new Set(products.map(p => p.subgenre))].sort();
    const eras = [...new Set(products.map(p => p.era))].sort();
    const avails = [...new Set(products.map(p => p.availability))].sort();

    subs.forEach(s => $("subgenre").innerHTML += `<option value="${s}">${SUBGENRE_LABEL[s] || s}</option>`);
    eras.forEach(e => $("era").innerHTML += `<option value="${e}">${ERA_LABEL[e] || e}</option>`);
    avails.forEach(a => $("availability").innerHTML += `<option value="${a}">${AVAIL_LABEL[a] || a}</option>`);
  }

  function getFiltered() {
    const q = $("search").value.toLowerCase();
    const sub = $("subgenre").value;
    const era = $("era").value;
    const avail = $("availability").value;
    const sort = $("sort").value;

    let list = products.filter(p => {
      if (sub && p.subgenre !== sub) return false;
      if (era && p.era !== era) return false;
      if (avail && p.availability !== avail) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.author.toLowerCase().includes(q) && !(p.name_ja || "").includes(q)) return false;
      return true;
    });

    if (sort === "year-asc") list.sort((a, b) => a.year_published - b.year_published);
    else if (sort === "year-desc") list.sort((a, b) => b.year_published - a.year_published);
    else if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "author-asc") list.sort((a, b) => a.author.localeCompare(b.author));

    return list;
  }

  function renderCard(p) {
    const awardsHtml = (p.awards || []).map(a => `<span class="award-tag">${a}</span>`).join("");
    const prosHtml = (p.pros || []).map(pr => `<li>${pr}</li>`).join("");
    const expertHtml = p.expert_note ? `<div class="expert-note">${p.expert_note}</div>` : "";
    const seriesHtml = p.series ? `<span>Series: ${p.series}</span>` : "";
    const availClass = p.availability === "out-of-print" ? "badge-avail-oop" : p.availability === "digital-only" ? "badge-avail-digital" : "badge-avail";
    const nameJa = p.name_ja ? ` <span style="font-size:.85rem;color:var(--muted)">(${p.name_ja})</span>` : "";

    return `<div class="product-card">
      <div class="author">${p.author}</div>
      <div class="author-ja">${p.author_ja || ""}</div>
      <h3>${p.name}${nameJa}</h3>
      <div class="badges">
        <span class="badge badge-subgenre">${SUBGENRE_LABEL[p.subgenre] || p.subgenre}</span>
        <span class="badge badge-era">${ERA_LABEL[p.era] || p.era}</span>
        <span class="badge ${availClass}">${AVAIL_LABEL[p.availability] || p.availability}</span>
      </div>
      <div class="product-meta">
        <span>Published: ${p.year_published}</span>
        <span>Translated: ${p.year_translated}</span>
        <span>${p.pages} pages</span>
        ${seriesHtml}
      </div>
      <div class="product-meta"><span>Translator: ${p.translator}</span><span>Publisher: ${p.publisher}</span></div>
      ${awardsHtml ? `<div class="product-awards">${awardsHtml}</div>` : ""}
      <ul class="product-pros">${prosHtml}</ul>
      <div class="product-best"><strong>Best for:</strong> ${p.best_for}</div>
      ${expertHtml}
      <div class="product-link"><a href="${p.amazon_url}" target="_blank" rel="noopener">Find on Amazon</a></div>
    </div>`;
  }

  function render() {
    const list = getFiltered();
    $("resultCount").textContent = `${list.length} novel${list.length !== 1 ? "s" : ""} found`;
    $("grid").innerHTML = list.map(renderCard).join("");
  }

  function init() {
    fetch("data/products.json")
      .then(r => r.json())
      .then(data => {
        products = data;
        populateFilters();
        render();
      })
      .catch(err => {
        $("grid").innerHTML = `<p style="padding:24px;color:#78716C">Could not load novels. ${err.message}</p>`;
      });

    ["search", "subgenre", "era", "availability", "sort"].forEach(id => {
      $(id).addEventListener(id === "search" ? "input" : "change", render);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
