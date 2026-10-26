/* PJSM tracker: counts website visits and saves destination choices.
   Add to every page:  <script src="tracker.js"></script>  (after script.js) */
(function () {
  var API = 'http://localhost:8080/api';
  try { API = localStorage.getItem('pjsm_api') || API; } catch (e) {}

  function visitorId() {
    try {
      var v = localStorage.getItem('pjsm_vid');
      if (!v) {
        v = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2);
        localStorage.setItem('pjsm_vid', v);
      }
      return v;
    } catch (e) { return 'anon-' + Date.now(); }
  }

  // One visit per browser session per page (refreshing does not add visits)
  var page = location.pathname.split('/').pop() || 'first.html';
  if (page !== 'dashboard.html') {
    var counted = false;
    try { counted = !!sessionStorage.getItem('pjsm_visit_' + page); sessionStorage.setItem('pjsm_visit_' + page, '1'); } catch (e) {}
    if (!counted) {
      fetch(API + '/track/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({ visitorId: visitorId(), page: page })
      }).catch(function () {});
    }
  }

  // Use from your destination form:
  // pjsmSaveDestination({ name: 'Asha', phone: '9876543210', email: 'a@b.com', destination: 'Canada' })
  window.pjsmSaveDestination = function (data) {
    return fetch(API + '/destinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) throw new Error(j.error || 'Could not save');
        return j;
      });
    });
  };
})();