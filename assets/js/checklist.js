/* Vista de un checklist: render, marcado, notas, filtros y compartir. */
(function () {
  'use strict';

  var D = window.QA_DATA;
  var params = new URLSearchParams(location.search);
  var docId = params.get('doc') || D.documentos[0].id;
  var doc = D.documentos.filter(function (d) { return d.id === docId; })[0];

  if (!doc) {
    document.getElementById('lista').innerHTML =
      '<div class="vacio">No existe ese checklist. <a href="index.html">Volver al inicio</a>.</div>';
    return;
  }

  var estado = QAState.leer(doc.id);
  var compartido = false;         // true si el estado vino dentro del link
  var soloCriticos = false, soloPendientes = false;

  /* ------------------------------------------------------------ utilidades */
  var $ = function (id) { return document.getElementById(id); };

  var tiempoToast;
  function toast(msg) {
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('on');
    clearTimeout(tiempoToast);
    tiempoToast = setTimeout(function () { t.classList.remove('on'); }, 2600);
  }

  function persistir() {
    if (!QAState.guardar(estado)) {
      toast('No pude guardar en este navegador. Usa el link o exporta el resultado.');
    }
  }

  /* ------------------------------------------------------------ cabecera */
  function pintarCabecera() {
    $('titulo').childNodes[0].nodeValue = doc.titulo;
    $('resumen').textContent = doc.cuando;
    $('meta').innerHTML =
      '<span><b>Ítems</b> · ' + doc.total + '</span>' +
      '<span><b>Críticos</b> · ' + doc.criticos + '</span>' +
      '<span><b>Transversales</b> · ' + doc.transversales + '</span>' +
      '<span><b>Contenido</b> · ' + D.contenido + '</span>';
    document.title = 'QA ' + doc.corto + ' — LATO AI';
  }

  function pintarFicha() {
    $('fCliente').value = estado.ficha.cliente || '';
    $('fProyecto').value = estado.ficha.proyecto || '';
    $('fRevisor').value = estado.ficha.revisor || '';
    $('fFecha').value = estado.ficha.fecha || new Date().toISOString().slice(0, 10);
    estado.ficha.fecha = $('fFecha').value;
  }

  [['fCliente', 'cliente'], ['fProyecto', 'proyecto'],
   ['fRevisor', 'revisor'], ['fFecha', 'fecha']].forEach(function (par) {
    $(par[0]).addEventListener('input', function (e) {
      estado.ficha[par[1]] = e.target.value;
      persistir();
    });
  });

  /* ------------------------------------------------------------ lista */
  function visibles(items) {
    return items.filter(function (i) {
      if (soloCriticos && !i.critico) return false;
      if (soloPendientes && estado.marcados[i.id]) return false;
      return true;
    });
  }

  function pintarLista() {
    var cont = $('lista');
    cont.textContent = '';
    var algo = false;

    doc.bloques.forEach(function (b) {
      var items = visibles(b.items);
      if (!items.length) return;
      algo = true;

      var sec = document.createElement('section');
      sec.className = 'block ' + b.tipo;

      var head = document.createElement('div');
      head.className = 'bhead';
      var t = document.createElement('span');
      t.className = 'btitle'; t.textContent = b.titulo;
      head.appendChild(t);
      if (b.subtitulo) {
        var s = document.createElement('span');
        s.className = 'bsub'; s.textContent = b.subtitulo;
        head.appendChild(s);
      }
      var n = document.createElement('span');
      n.className = 'bn'; n.textContent = items.length;
      head.appendChild(n);
      sec.appendChild(head);

      items.forEach(function (i) { sec.appendChild(fila(i)); });
      cont.appendChild(sec);
    });

    if (!algo) {
      var v = document.createElement('div');
      v.className = 'vacio';
      v.textContent = soloPendientes
        ? 'No queda nada pendiente en este checklist.'
        : 'Ningún ítem coincide con el filtro.';
      cont.appendChild(v);
    }
    contar();
  }

  function fila(item) {
    var row = document.createElement('label');
    row.className = 'row' + (item.critico ? ' crit' : '') +
                    (estado.marcados[item.id] ? ' done' : '');
    row.dataset.id = item.id;

    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!estado.marcados[item.id];
    cb.setAttribute('aria-label', item.id + ': ' + item.texto);

    var rid = document.createElement('span');
    rid.className = 'rid'; rid.textContent = item.id;

    var txt = document.createElement('span');
    txt.className = 'texto';

    if (item.categoria) {
      var tag = document.createElement('span');
      tag.className = 'tag'; tag.textContent = item.categoria;
      txt.appendChild(tag);
    }
    var principal = document.createElement('span');
    principal.className = 'principal'; principal.textContent = item.texto;
    txt.appendChild(principal);

    var f = document.createElement('span');
    f.className = 'fuente'; f.textContent = item.fuente;
    txt.appendChild(f);

    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'notabtn';
    var hayNota = !!(estado.notas[item.id] || '').trim();
    btn.textContent = hayNota ? 'Editar nota' : '+ Nota';

    var ta = document.createElement('textarea');
    ta.className = 'nota' + (hayNota ? ' on' : '');
    ta.rows = 2;
    ta.placeholder = 'Qué encontraste, qué corregiste…';
    ta.value = estado.notas[item.id] || '';

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      ta.classList.toggle('on');
      if (ta.classList.contains('on')) ta.focus();
    });
    ta.addEventListener('click', function (e) { e.preventDefault(); });
    ta.addEventListener('input', function () {
      if (ta.value.trim()) estado.notas[item.id] = ta.value;
      else delete estado.notas[item.id];
      btn.textContent = ta.value.trim() ? 'Editar nota' : '+ Nota';
      persistir();
    });

    txt.appendChild(btn);
    txt.appendChild(ta);

    cb.addEventListener('change', function () {
      if (cb.checked) estado.marcados[item.id] = true;
      else delete estado.marcados[item.id];
      row.classList.toggle('done', cb.checked);
      persistir();
      if (soloPendientes && cb.checked) { pintarLista(); return; }
      contar();
    });

    row.appendChild(cb);
    row.appendChild(rid);
    row.appendChild(txt);
    return row;
  }

  function contar() {
    var hechos = 0, total = 0;
    doc.bloques.forEach(function (b) {
      b.items.forEach(function (i) { total++; if (estado.marcados[i.id]) hechos++; });
    });
    $('num').textContent = hechos + ' / ' + total;
    $('fill').style.width = total ? (hechos / total * 100) + '%' : '0%';
  }

  /* ------------------------------------------------------------ acciones */
  $('bCriticos').addEventListener('click', function (e) {
    soloCriticos = !soloCriticos;
    e.currentTarget.setAttribute('aria-pressed', String(soloCriticos));
    pintarLista();
  });

  $('bPendientes').addEventListener('click', function (e) {
    soloPendientes = !soloPendientes;
    e.currentTarget.setAttribute('aria-pressed', String(soloPendientes));
    pintarLista();
  });

  $('bLink').addEventListener('click', async function () {
    try {
      var payload = await QAState.empacar(estado);
      var url = location.origin + location.pathname +
                '?doc=' + encodeURIComponent(doc.id) + '#r=' + payload;
      var ok = false;
      try {
        await navigator.clipboard.writeText(url);
        ok = true;
      } catch (e) { /* sin permiso de portapapeles */ }
      if (ok) {
        toast('Link copiado. Quien lo abra ve esta revisión tal cual.');
      } else {
        window.prompt('Copia este link:', url);
      }
    } catch (e) {
      toast('No pude armar el link: ' + e.message);
    }
  });

  $('bCsv').addEventListener('click', function () { QAExport.csv(doc, estado); });
  $('bJson').addEventListener('click', function () { QAExport.json(doc, estado); });
  $('bPrint').addEventListener('click', function () { window.print(); });

  $('bReset').addEventListener('click', function () {
    if (!confirm('Se borra lo marcado y las notas de este checklist. ¿Sigo?')) return;
    estado = QAState.vacio(doc.id);
    estado.ficha.fecha = new Date().toISOString().slice(0, 10);
    QAState.borrar(doc.id);
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    compartido = false;
    $('banner').innerHTML = '';
    pintarFicha();
    pintarLista();
    toast('Checklist limpio.');
  });

  /* ------------------------------------------------------------ arranque */
  function pie() {
    $('pie').innerHTML =
      'Lo que marcas se guarda en este navegador, no en un servidor. Para compartir la revisión usa ' +
      '<b>Copiar link del resultado</b>: la URL lleva adentro lo marcado, las notas y la ficha. ' +
      'Las reglas transversales son las mismas en los cinco checklists y salen de ' +
      '<code>data/transversales.json</code>.';
  }

  async function arrancar() {
    var m = /(?:^|[#&])r=([^&]+)/.exec(location.hash);
    if (m) {
      try {
        var recibido = await QAState.desempacar(m[1]);
        if (recibido.doc === doc.id) {
          estado = recibido;
          compartido = true;
          var quien = estado.ficha.revisor ? ' de <b>' + estado.ficha.revisor + '</b>' : '';
          var que = [estado.ficha.cliente, estado.ficha.proyecto].filter(Boolean).join(' · ');
          $('banner').innerHTML =
            '<div class="banner">Estás viendo una revisión compartida' + quien +
            (que ? ' — <b>' + que + '</b>' : '') +
            '. Los cambios que hagas quedan en tu navegador; el link original no se modifica.</div>';
        }
      } catch (e) {
        $('banner').innerHTML =
          '<div class="banner">El link traía un resultado que no pude leer. ' +
          'Se abrió el checklist en blanco.</div>';
      }
    }
    pintarCabecera();
    pintarFicha();
    pintarLista();
    pie();
  }

  arrancar();
})();
