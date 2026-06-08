/* =====================================================================
   Einfacher Klassen-Passwortschutz (weiche Sperre)
   --------------------------------------------------------------------
   - Passwort unten bei PASSWORT eintragen/ändern.
   - Jede geschützte Seite bindet diese Datei ein:
       <script src="gate.js"></script>        (Seiten im Hauptordner)
       <script src="../gate.js"></script>     (Seiten in einem Unterordner)
   - Hinweis: Das ist KEIN echter Schutz für sensible Daten. Die Dateien
     liegen weiterhin öffentlich. Es hält nur Zufallsbesucher & Suchmaschinen
     fern. Für echten Login: Cloudflare Access.
   ===================================================================== */
(function(){
  "use strict";
  const PASSWORT = "Ra_110";          // <— HIER das Klassen-Passwort ändern
  const KEY = "mcg_unlocked";

  // Schon in dieser Sitzung freigeschaltet? Dann nichts tun.
  try { if (sessionStorage.getItem(KEY) === "1") return; } catch(e){}

  const css = document.createElement("style");
  css.textContent =
    '#mcg-gate{position:fixed;inset:0;z-index:99999;background:linear-gradient(120deg,#ff7a18,#e85d04);display:flex;align-items:center;justify-content:center;font-family:"Segoe UI",system-ui,Arial,sans-serif;}' +
    '#mcg-gate .box{background:#fff;border-radius:16px;padding:26px 28px;max-width:340px;width:90%;text-align:center;box-shadow:0 12px 34px rgba(0,0,0,.28);}' +
    '#mcg-gate h2{margin:0 0 6px;color:#e85d04;font-size:1.25rem;}' +
    '#mcg-gate p{margin:0 0 14px;color:#555;font-size:.92rem;}' +
    '#mcg-gate input{width:100%;padding:10px 12px;border:1.5px solid #e2dccd;border-radius:10px;font-size:1rem;text-align:center;}' +
    '#mcg-gate button{margin-top:12px;width:100%;border:none;border-radius:24px;padding:11px;background:#e85d04;color:#fff;font-weight:700;font-size:1rem;cursor:pointer;}' +
    '#mcg-gate button:hover{background:#d24f03;}' +
    '#mcg-gate .err{color:#d7263d;font-size:.85rem;min-height:1.1em;margin-top:8px;}';
  document.documentElement.appendChild(css);

  function build(){
    const g = document.createElement("div");
    g.id = "mcg-gate";
    g.innerHTML =
      '<div class="box">' +
        '<h2>🔒 Geschützter Bereich</h2>' +
        '<p>Bitte das Klassen-Passwort eingeben.</p>' +
        '<input id="mcg-pw" type="password" autocomplete="off" placeholder="Passwort">' +
        '<div class="err" id="mcg-err"></div>' +
        '<button id="mcg-go">Öffnen</button>' +
      '</div>';
    document.body.appendChild(g);
    const inp = g.querySelector("#mcg-pw");
    const err = g.querySelector("#mcg-err");
    function tryOpen(){
      if (inp.value === PASSWORT){
        try { sessionStorage.setItem(KEY, "1"); } catch(e){}
        g.remove();
      } else {
        err.textContent = "Falsches Passwort. Bitte nochmal versuchen.";
        inp.value = ""; inp.focus();
      }
    }
    g.querySelector("#mcg-go").addEventListener("click", tryOpen);
    inp.addEventListener("keydown", e => { if (e.key === "Enter") tryOpen(); });
    inp.focus();
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
