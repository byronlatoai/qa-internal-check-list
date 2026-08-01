/* Exportar el resultado de una revisión: CSV (se abre en Excel) y JSON. */
(function (global) {
  'use strict';

  function bajar(nombre, contenido, mime) {
    var blob = new Blob([contenido], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = nombre;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function celda(v) {
    v = (v === null || v === undefined) ? '' : String(v);
    return '"' + v.replace(/"/g, '""') + '"';
  }

  function nombreArchivo(doc, ficha, ext) {
    var partes = ['QA', doc.corto.replace(/[^\w]+/g, '-')];
    if (ficha.cliente) partes.push(ficha.cliente.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-'));
    partes.push((ficha.fecha || new Date().toISOString().slice(0, 10)));
    return partes.join('_') + '.' + ext;
  }

  function csv(doc, estado) {
    var L = [];
    L.push(['QA CHECKLIST — LATO AI'].map(celda).join(';'));
    L.push(['Documento', doc.titulo].map(celda).join(';'));
    L.push(['Cliente', estado.ficha.cliente].map(celda).join(';'));
    L.push(['Proyecto', estado.ficha.proyecto].map(celda).join(';'));
    L.push(['Revisor', estado.ficha.revisor].map(celda).join(';'));
    L.push(['Fecha', estado.ficha.fecha].map(celda).join(';'));

    var hechos = 0, total = 0;
    doc.bloques.forEach(function (b) {
      b.items.forEach(function (i) { total++; if (estado.marcados[i.id]) hechos++; });
    });
    L.push(['Revisados', hechos + ' de ' + total].map(celda).join(';'));
    L.push('');
    L.push(['Bloque', '#', 'Categoría', 'Crítico', 'Qué revisar',
            'Revisado', 'Notas', 'Por qué / de dónde sale'].map(celda).join(';'));

    doc.bloques.forEach(function (b) {
      b.items.forEach(function (i) {
        L.push([
          b.titulo, i.id, i.categoria, i.critico ? 'CRÍTICO' : '',
          i.texto, estado.marcados[i.id] ? 'Sí' : '',
          estado.notas[i.id] || '', i.fuente,
        ].map(celda).join(';'));
      });
    });

    // BOM para que Excel en Windows abra los acentos bien
    bajar(nombreArchivo(doc, estado.ficha, 'csv'), '﻿' + L.join('\r\n'),
          'text/csv;charset=utf-8');
  }

  function json(doc, estado) {
    var salida = {
      generado: new Date().toISOString(),
      documento: { id: doc.id, titulo: doc.titulo },
      ficha: estado.ficha,
      resultados: [],
    };
    doc.bloques.forEach(function (b) {
      b.items.forEach(function (i) {
        salida.resultados.push({
          bloque: b.titulo, id: i.id, categoria: i.categoria, critico: i.critico,
          texto: i.texto, revisado: !!estado.marcados[i.id],
          nota: estado.notas[i.id] || '',
        });
      });
    });
    bajar(nombreArchivo(doc, estado.ficha, 'json'),
          JSON.stringify(salida, null, 2), 'application/json');
  }

  global.QAExport = { csv: csv, json: json, bajar: bajar };
})(window);
