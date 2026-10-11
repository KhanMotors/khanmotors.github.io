/* ==========================================================================
   PLACEHOLDER IMAGES
   --------------------------------------------------------------------------
   Draws small, clearly labelled SVG illustrations for listings that have no
   real photos yet. They weigh a few kilobytes each, so pages stay fast.
   As soon as a listing has images[] filled in, real photos are used instead.
   ========================================================================== */

(function () {
  const FONT = "font-family='Figtree, Segoe UI, Arial, sans-serif'";

  function uri(svg) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function label(text, dark) {
    const fg = dark ? "#e8d3a2" : "#0f1b33";
    const bg = dark ? "rgba(10,16,30,.72)" : "rgba(255,253,249,.86)";
    const w = 28 + text.length * 8.9;
    return `<g ${FONT}><rect x='24' y='446' rx='3' width='${w}' height='30' fill='${bg}'/>` +
      `<text x='37' y='466' font-size='12.5' font-weight='600' letter-spacing='1.6' fill='${fg}'>${text.toUpperCase()}</text></g>`;
  }

  /* ---------- Vehicles ---------- */

  const BODY = {
    sedan: {
      body: "M118 334 L128 292 Q138 272 175 266 L268 256 Q318 206 360 197 L502 194 Q548 197 592 250 L662 262 Q702 270 707 300 L710 332 Q710 346 692 346 L126 346 Q108 346 118 334 Z",
      glass: ["M286 256 Q326 214 362 208 L432 206 L433 256 Z", "M446 206 L498 207 Q530 211 566 253 L447 256 Z"],
      wheels: [218, 602]
    },
    hatchback: {
      body: "M128 336 L134 292 Q142 268 178 262 L258 254 Q306 202 346 193 L520 190 Q560 193 590 238 L640 288 Q652 310 652 334 Q652 348 636 348 L136 348 Q118 348 128 336 Z",
      glass: ["M274 254 Q316 208 350 202 L428 200 L429 254 Z", "M442 200 L516 200 Q548 204 572 240 L584 254 L443 254 Z"],
      wheels: [222, 560]
    },
    suv: {
      body: "M108 336 L114 282 Q120 256 160 250 L248 244 L300 180 Q310 168 334 168 L566 168 Q592 170 612 198 L652 246 Q702 254 712 290 L714 336 Q714 350 696 350 L124 350 Q102 350 108 336 Z",
      glass: ["M306 244 L342 184 L444 184 L444 244 Z", "M458 184 L560 184 Q578 186 590 204 L624 244 L458 244 Z"],
      wheels: [214, 610]
    }
  };

  function wheel(cx, cy) {
    let spokes = "";
    for (let i = 0; i < 5; i++) {
      const a = (i * 72) * Math.PI / 180;
      spokes += `<line x1='${cx}' y1='${cy}' x2='${(cx + Math.cos(a) * 22).toFixed(1)}' y2='${(cy + Math.sin(a) * 22).toFixed(1)}' stroke='#9aa1ab' stroke-width='5' stroke-linecap='round'/>`;
    }
    return `<circle cx='${cx}' cy='${cy}' r='44' fill='#0b0d10'/><circle cx='${cx}' cy='${cy}' r='27' fill='#3b4048'/>${spokes}<circle cx='${cx}' cy='${cy}' r='6' fill='#c9a55c'/>`;
  }

  function stage(content, tag) {
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>` +
      `<defs><radialGradient id='g' cx='50%' cy='38%' r='75%'><stop offset='0' stop-color='#5b616c'/><stop offset='1' stop-color='#22252b'/></radialGradient>` +
      `<linearGradient id='f' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#202328'/><stop offset='1' stop-color='#0f1013'/></linearGradient></defs>` +
      `<rect width='800' height='500' fill='url(#g)'/><rect y='372' width='800' height='128' fill='url(#f)'/>` +
      `<line x1='0' y1='372' x2='800' y2='372' stroke='#c9a55c' stroke-opacity='.35'/>` +
      content + label(tag, true) + `</svg>`;
  }

  function vehicleSide(v) {
    const b = BODY[v.body] || BODY.sedan;
    const shadow = `<ellipse cx='410' cy='366' rx='320' ry='16' fill='#000' opacity='.5'/>`;
    const glass = b.glass.map(d => `<path d='${d}' fill='#1a2433' opacity='.92'/>`).join("");
    const shine = `<path d='M150 300 L690 300' stroke='#fff' stroke-opacity='.18' stroke-width='3'/>`;
    const lamp = `<rect x='672' y='280' width='26' height='9' rx='4' fill='#f3e3b5'/><rect x='120' y='296' width='18' height='9' rx='4' fill='#b8333a'/>`;
    return stage(shadow + `<path d='${b.body}' fill='${v.paint}'/>` + glass + shine + lamp +
      wheel(b.wheels[0], 346) + wheel(b.wheels[1], 346), "Demo image · Exterior");
  }

  function vehicleWheel(v) {
    const arch = `<path d='M120 372 Q120 120 400 110 Q680 120 680 372 Z' fill='${v.paint}'/><path d='M180 372 Q182 170 400 162 Q618 170 620 372 Z' fill='#0b0d10'/>`;
    let spokes = "";
    for (let i = 0; i < 10; i++) {
      const a = (i * 36) * Math.PI / 180;
      spokes += `<line x1='400' y1='300' x2='${(400 + Math.cos(a) * 112).toFixed(1)}' y2='${(300 + Math.sin(a) * 112).toFixed(1)}' stroke='#aeb4bd' stroke-width='${i % 2 ? 6 : 14}' stroke-linecap='round'/>`;
    }
    const rim = `<circle cx='400' cy='300' r='150' fill='#121418'/><circle cx='400' cy='300' r='122' fill='#2d3138'/>${spokes}<circle cx='400' cy='300' r='28' fill='#c9a55c'/><circle cx='400' cy='300' r='122' fill='none' stroke='#cfd3d9' stroke-width='3'/>`;
    return stage(arch + rim, "Demo image · Wheel detail");
  }

  function vehicleInterior(v) {
    const dash = `<path d='M0 300 Q400 230 800 300 L800 500 L0 500 Z' fill='#1b1d22'/><path d='M0 300 Q400 230 800 300' stroke='#c9a55c' stroke-opacity='.5' stroke-width='3' fill='none'/>`;
    const screen = `<rect x='440' y='250' width='170' height='92' rx='8' fill='#0d1a2b' stroke='#3c4656'/><rect x='454' y='264' width='70' height='8' rx='4' fill='#c9a55c' opacity='.7'/><rect x='454' y='282' width='120' height='6' rx='3' fill='#56637a'/><rect x='454' y='296' width='96' height='6' rx='3' fill='#56637a'/>`;
    const wheelS = `<circle cx='270' cy='370' r='112' fill='none' stroke='#0a0b0d' stroke-width='26'/><circle cx='270' cy='370' r='34' fill='#2a2e35'/><path d='M170 380 L236 372 M304 372 L370 380 M270 404 L270 470' stroke='#0a0b0d' stroke-width='22' stroke-linecap='round'/>`;
    const windshield = `<path d='M60 60 L740 60 L800 230 Q400 170 0 230 Z' fill='#4b5f78' opacity='.5'/><path d='M0 200 Q200 150 340 190 T800 170 L800 230 Q400 170 0 230 Z' fill='#2c3a4f' opacity='.8'/>`;
    const seatTrim = `<rect x='650' y='330' width='150' height='170' rx='14' fill='${v.paint}' opacity='.55'/>`;
    return stage(windshield + dash + screen + seatTrim + wheelS, "Demo image · Interior");
  }

  /* ---------- Properties ---------- */

  function sky(content, tag) {
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>` +
      `<defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#dfe5ec'/><stop offset='1' stop-color='#f7f3ec'/></linearGradient></defs>` +
      `<rect width='800' height='500' fill='url(#s)'/>` +
      `<path d='M0 300 Q110 200 230 250 T470 220 T800 210 L800 410 L0 410 Z' fill='#b8c1cc'/>` +
      `<path d='M0 330 Q160 260 330 300 T640 280 T800 290 L800 410 L0 410 Z' fill='#97a3b2'/>` +
      `<rect y='400' width='800' height='100' fill='#e6dfd2'/><line x1='0' y1='400' x2='800' y2='400' stroke='#0f1b33' stroke-opacity='.25'/>` +
      content + label(tag, false) + `</svg>`;
  }

  function windows(x0, y0, cols, rows, w, h, gx, gy, litEvery) {
    let s = "";
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const lit = ((r * cols + c) % litEvery) === 0;
      s += `<rect x='${x0 + c * (w + gx)}' y='${y0 + r * (h + gy)}' width='${w}' height='${h}' fill='${lit ? "#e7c77d" : "#2b3c5c"}'/>`;
    }
    return s;
  }

  function houseExterior() {
    return sky(
      `<rect x='160' y='360' width='480' height='40' fill='#d5cdbd'/>` +
      `<rect x='240' y='228' width='320' height='172' fill='#16264a'/>` +
      `<rect x='282' y='150' width='236' height='78' fill='#1d3160'/>` +
      `<rect x='272' y='142' width='256' height='10' fill='#c9a55c'/><rect x='230' y='220' width='340' height='10' fill='#c9a55c'/>` +
      windows(304, 168, 3, 1, 52, 40, 24, 0, 2) + windows(268, 256, 4, 1, 50, 46, 22, 0, 3) +
      `<rect x='372' y='320' width='56' height='80' fill='#0c1630'/><circle cx='418' cy='362' r='3' fill='#c9a55c'/>` +
      `<rect x='160' y='344' width='70' height='56' fill='#cfc6b4'/><rect x='570' y='344' width='70' height='56' fill='#cfc6b4'/>` +
      `<circle cx='130' cy='350' r='34' fill='#5f7360'/><rect x='127' y='370' width='6' height='30' fill='#4a3c2c'/>`,
      "Demo image · Exterior");
  }

  function apartmentExterior() {
    return sky(
      `<rect x='276' y='80' width='248' height='320' fill='#16264a'/><rect x='266' y='72' width='268' height='10' fill='#c9a55c'/>` +
      windows(298, 104, 4, 6, 38, 30, 18, 16, 3) +
      `<rect x='372' y='352' width='56' height='48' fill='#0c1630'/>` +
      `<rect x='540' y='200' width='150' height='200' fill='#2b3f6b' opacity='.75'/>` + windows(556, 220, 3, 4, 30, 24, 14, 18, 4) +
      `<circle cx='200' cy='356' r='36' fill='#5f7360'/><rect x='197' y='376' width='6' height='24' fill='#4a3c2c'/>`,
      "Demo image · Building");
  }

  function commercialExterior() {
    let shutters = "";
    for (let i = 0; i < 3; i++) {
      const x = 214 + i * 128;
      let lines = "";
      for (let y = 300; y < 392; y += 10) lines += `<line x1='${x}' y1='${y}' x2='${x + 108}' y2='${y}' stroke='#7d8796' stroke-width='2'/>`;
      shutters += `<rect x='${x}' y='292' width='108' height='108' fill='#b7bec8'/>${lines}`;
    }
    return sky(
      `<rect x='190' y='150' width='420' height='250' fill='#16264a'/>` +
      windows(214, 172, 4, 1, 82, 46, 24, 0, 2) +
      `<rect x='190' y='240' width='420' height='40' fill='#c9a55c'/><rect x='206' y='252' width='388' height='16' fill='#0f1b33' opacity='.2'/>` +
      shutters,
      "Demo image · Exterior");
  }

  function plotExterior() {
    return sky(
      `<polygon points='150,470 650,470 590,388 210,388' fill='#cdbf9f'/>` +
      `<polygon points='150,470 650,470 590,388 210,388' fill='none' stroke='#8a6a2a' stroke-width='3' stroke-dasharray='12 9'/>` +
      `<rect x='206' y='360' width='5' height='30' fill='#8a6a2a'/><rect x='589' y='360' width='5' height='30' fill='#8a6a2a'/>` +
      `<circle cx='110' cy='360' r='40' fill='#5f7360'/><rect x='107' y='384' width='6' height='30' fill='#4a3c2c'/>` +
      `<circle cx='700' cy='352' r='46' fill='#55695a'/><rect x='697' y='380' width='6' height='34' fill='#4a3c2c'/>`,
      "Demo image · Plot");
  }

  function propertyInterior(p) {
    const wall = p.type === "commercial" ? "#e9e4da" : "#efe7da";
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>` +
      `<rect width='800' height='500' fill='${wall}'/><rect y='380' width='800' height='120' fill='#c8b89a'/>` +
      `<line x1='0' y1='380' x2='800' y2='380' stroke='#8a6a2a' stroke-opacity='.4' stroke-width='2'/>` +
      `<rect x='470' y='90' width='230' height='200' fill='#dfe5ec' stroke='#16264a' stroke-width='8'/>` +
      `<path d='M478 230 Q560 170 620 200 T692 190 L692 282 L478 282 Z' fill='#97a3b2'/><line x1='585' y1='90' x2='585' y2='290' stroke='#16264a' stroke-width='6'/>` +
      (p.type === "commercial"
        ? `<rect x='90' y='290' width='300' height='16' fill='#16264a'/><rect x='110' y='306' width='12' height='74' fill='#16264a'/><rect x='358' y='306' width='12' height='74' fill='#16264a'/><rect x='160' y='250' width='90' height='40' fill='#2b3c5c'/>`
        : `<rect x='70' y='300' width='330' height='70' rx='12' fill='#16264a'/><rect x='70' y='262' width='330' height='52' rx='14' fill='#1d3160'/><rect x='92' y='278' width='80' height='40' rx='8' fill='#c9a55c'/>`) +
      `<line x1='300' y1='120' x2='300' y2='200' stroke='#16264a' stroke-width='3'/><path d='M270 200 L330 200 L318 236 L282 236 Z' fill='#c9a55c'/>` +
      label("Demo image · Interior", false) + `</svg>`;
  }

  function propertyPlan(p) {
    const room = (x, y, w, h, t) => `<rect x='${x}' y='${y}' width='${w}' height='${h}' fill='none' stroke='#e9edf3' stroke-width='3'/>` +
      (t ? `<text x='${x + w / 2}' y='${y + h / 2 + 5}' text-anchor='middle' font-size='14' letter-spacing='2' fill='#e8d3a2' ${FONT}>${t}</text>` : "");
    let grid = "";
    for (let x = 0; x <= 800; x += 40) grid += `<line x1='${x}' y1='0' x2='${x}' y2='500' stroke='#fff' stroke-opacity='.05'/>`;
    for (let y = 0; y <= 500; y += 40) grid += `<line x1='0' y1='${y}' x2='800' y2='${y}' stroke='#fff' stroke-opacity='.05'/>`;
    const rooms = p.type === "plot"
      ? room(160, 70, 480, 330, "PLOT BOUNDARY")
      : p.type === "commercial"
        ? room(160, 70, 480, 330, "") + room(160, 70, 300, 330, "OPEN FLOOR") + room(460, 70, 180, 150, "STORE") + room(460, 220, 180, 180, "WASHROOM")
        : room(140, 60, 520, 350, "") + room(140, 60, 220, 170, "BED") + room(360, 60, 300, 170, "LOUNGE") + room(140, 230, 160, 180, "KITCHEN") + room(300, 230, 200, 180, "BED") + room(500, 230, 160, 180, "BATH");
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><rect width='800' height='500' fill='#0f1b33'/>${grid}${rooms}` +
      label("Demo image · Layout sketch, not to scale", true) + `</svg>`;
  }

  const EXTERIOR = { house: houseExterior, apartment: apartmentExterior, commercial: commercialExterior, plot: plotExterior };

  window.KM_PLACEHOLDERS = {
    vehicle(v) {
      if (v.images && v.images.length) return v.images.map(src => ({ src, alt: v.year + " " + v.make + " " + v.model }));
      const t = v.year + " " + v.make + " " + v.model;
      return [
        { src: uri(vehicleSide(v)), alt: "Illustrated placeholder of a " + t + " (demo image, not the actual vehicle)" },
        { src: uri(vehicleInterior(v)), alt: "Illustrated placeholder of a car interior (demo image)" },
        { src: uri(vehicleWheel(v)), alt: "Illustrated placeholder of an alloy wheel (demo image)" }
      ];
    },
    property(p) {
      if (p.images && p.images.length) return p.images.map(src => ({ src, alt: p.title }));
      const list = [{ src: uri((EXTERIOR[p.type] || houseExterior)(p)), alt: "Illustrated placeholder for " + p.title + " (demo image, not the actual property)" }];
      if (p.type !== "plot") list.push({ src: uri(propertyInterior(p)), alt: "Illustrated placeholder of an interior (demo image)" });
      list.push({ src: uri(propertyPlan(p)), alt: "Illustrated layout sketch, not to scale (demo image)" });
      return list;
    }
  };
})();
