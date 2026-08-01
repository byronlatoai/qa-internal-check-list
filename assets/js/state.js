/* Estado de una revisión: se guarda en localStorage y se puede empaquetar en un link.
   No hay servidor ni base de datos: todo vive en el navegador o dentro de la URL. */
(function (global) {
  'use strict';

  var CLAVE = 'lato-qa:v1:';

  function vacio(docId) {
    return {
      doc: docId,
      ficha: { cliente: '', proyecto: '', revisor: '', fecha: '' },
      marcados: {},   // id -> true
      notas: {},      // id -> texto
      guardado: null, // ISO
    };
  }

  function leer(docId) {
    try {
      var raw = localStorage.getItem(CLAVE + docId);
      if (!raw) return vacio(docId);
      var s = JSON.parse(raw);
      return {
        doc: docId,
        ficha: Object.assign(vacio(docId).ficha, s.ficha || {}),
        marcados: s.marcados || {},
        notas: s.notas || {},
        guardado: s.guardado || null,
      };
    } catch (e) {
      return vacio(docId);
    }
  }

  function guardar(estado) {
    estado.guardado = new Date().toISOString();
    try {
      localStorage.setItem(CLAVE + estado.doc, JSON.stringify(estado));
      return true;
    } catch (e) {
      return false;   // modo incógnito o cuota llena
    }
  }

  function borrar(docId) {
    try { localStorage.removeItem(CLAVE + docId); } catch (e) {}
  }

  function resumen(docId, doc) {
    var s = leer(docId), n = 0, t = 0;
    doc.bloques.forEach(function (b) {
      b.items.forEach(function (i) { t++; if (s.marcados[i.id]) n++; });
    });
    return { hechos: n, total: t, guardado: s.guardado, ficha: s.ficha };
  }

  /* ---------------- empaquetado para compartir por link ---------------- */

  function b64url(bytes) {
    var s = '', paso = 0x8000;
    for (var i = 0; i < bytes.length; i += paso) {
      s += String.fromCharCode.apply(null, bytes.subarray(i, i + paso));
    }
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function debase64url(txt) {
    var s = txt.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    var bin = atob(s), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  // Payload compacto: nombres de campo cortos para que el link no crezca de más.
  function compactar(estado) {
    return {
      d: estado.doc,
      f: estado.ficha,
      m: Object.keys(estado.marcados).filter(function (k) { return estado.marcados[k]; }),
      n: estado.notas,
      t: estado.guardado,
    };
  }

  function expandir(p) {
    var marcados = {};
    (p.m || []).forEach(function (id) { marcados[id] = true; });
    return {
      doc: p.d,
      ficha: Object.assign(vacio(p.d).ficha, p.f || {}),
      marcados: marcados,
      notas: p.n || {},
      guardado: p.t || null,
    };
  }

  async function empacar(estado) {
    var bytes = new TextEncoder().encode(JSON.stringify(compactar(estado)));
    if (typeof CompressionStream === 'undefined') return 'j' + b64url(bytes);
    var cs = new CompressionStream('deflate-raw');
    var w = cs.writable.getWriter();
    w.write(bytes); w.close();
    var buf = await new Response(cs.readable).arrayBuffer();
    return 'z' + b64url(new Uint8Array(buf));
  }

  async function desempacar(txt) {
    var marca = txt.charAt(0), cuerpo = debase64url(txt.slice(1)), json;
    if (marca === 'z') {
      var ds = new DecompressionStream('deflate-raw');
      var w = ds.writable.getWriter();
      w.write(cuerpo); w.close();
      json = await new Response(ds.readable).text();
    } else {
      json = new TextDecoder().decode(cuerpo);
    }
    return expandir(JSON.parse(json));
  }

  global.QAState = {
    vacio: vacio, leer: leer, guardar: guardar, borrar: borrar, resumen: resumen,
    empacar: empacar, desempacar: desempacar,
  };
})(window);
