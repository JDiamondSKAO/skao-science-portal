/* =============================================================
   SKA Sensitivity Calculator — JavaScript
   Scoped to elements inside .ska-calc container.
   ============================================================= */
(function () {
    'use strict';

    var root = document.querySelector('.ska-calc');
    if (!root) return;

    // State
    var state = {
        telescope: 'mid',
        mode: 'continuum',
        calcMode: 'sensitivity',
        freqUnit: 'GHz',
        bwUnit: 'GHz',
        intUnit: 's',
        sensUnit: 'mJy',
        isLoading: false
    };

    // DOM refs (scoped)
    var telescopeToggles = root.querySelectorAll('[data-telescope]');
    var modeToggles      = root.querySelectorAll('[data-mode]');
    var calcModeRadios   = root.querySelectorAll('input[name="calc-mode"]');
    var freqUnitBtns     = root.querySelectorAll('[data-freq-unit]');
    var bwUnitBtns       = root.querySelectorAll('[data-bw-unit]');
    var intUnitBtns      = root.querySelectorAll('[data-int-unit]');
    var sensUnitBtns     = root.querySelectorAll('[data-sens-unit]');
    var calculateBtn     = root.querySelector('#calculate-btn');
    var resetBtn         = root.querySelector('#reset-btn');
    var errorPanel       = root.querySelector('#error-panel');
    var resultsPanel     = root.querySelector('#results-panel');
    var receiverBandGrp  = root.querySelector('#receiver-band-group');
    var numStationsGrp   = root.querySelector('#num-stations-group');
    var integrationGrp   = root.querySelector('#integration-group');
    var sensitivityGrp   = root.querySelector('#sensitivity-group');

    /* ---- Generic toggle helper ---- */
    function bindToggle(buttons, key, cb) {
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                state[key] = btn.dataset[key] || btn.getAttribute('data-' + key);
                if (cb) cb();
            });
        });
    }

    bindToggle(telescopeToggles, 'telescope', updateUIForTelescope);
    bindToggle(modeToggles, 'mode');

    freqUnitBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            freqUnitBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.freqUnit = btn.dataset.freqUnit;
        });
    });
    bwUnitBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            bwUnitBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.bwUnit = btn.dataset.bwUnit;
        });
    });
    intUnitBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            intUnitBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.intUnit = btn.dataset.intUnit;
        });
    });
    sensUnitBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            sensUnitBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            state.sensUnit = btn.dataset.sensUnit;
        });
    });

    calcModeRadios.forEach(function (radio) {
        radio.addEventListener('change', function (e) {
            state.calcMode = e.target.value;
            updateCalcModeUI();
        });
    });

    calculateBtn.addEventListener('click', handleCalculate);

    resetBtn.addEventListener('click', function () {
        root.querySelector('#freq-value').value = '';
        root.querySelector('#bandwidth-value').value = '';
        root.querySelector('#ra').value = '';
        root.querySelector('#dec').value = '';
        root.querySelector('#elevation').value = '15';
        root.querySelector('#integration-value').value = '';
        root.querySelector('#sensitivity-value').value = '';
        root.querySelector('#array-config').value = 'AA4';
        root.querySelector('#receiver-band').value = 'Band_1';
        root.querySelector('#num-stations').value = '512';
        errorPanel.classList.remove('show');
        resultsPanel.classList.remove('show');
    });

    /* ---- UI helpers ---- */
    function updateUIForTelescope() {
        if (state.telescope === 'mid') {
            receiverBandGrp.style.display = 'block';
            numStationsGrp.style.display  = 'none';
        } else {
            receiverBandGrp.style.display = 'none';
            numStationsGrp.style.display  = 'block';
        }
    }

    function updateCalcModeUI() {
        if (state.calcMode === 'sensitivity') {
            integrationGrp.style.display = 'block';
            sensitivityGrp.style.display = 'none';
        } else {
            integrationGrp.style.display = 'none';
            sensitivityGrp.style.display = 'block';
        }
    }

    function showError(msg) {
        errorPanel.innerHTML = msg;
        errorPanel.classList.add('show');
    }
    function clearError() { errorPanel.classList.remove('show'); }

    /* ---- Unit conversions ---- */
    function toHz(val, unit) {
        if (unit === 'GHz') return val * 1e9;
        if (unit === 'MHz') return val * 1e6;
        if (unit === 'kHz') return val * 1e3;
        return val;
    }
    function toSeconds(val, unit) {
        if (unit === 'min') return val * 60;
        if (unit === 'h')   return val * 3600;
        return val;
    }
    function toJy(val, unit) {
        if (unit === 'mJy') return val / 1000;
        if (unit === '\u03BCJy') return val / 1e6;
        return val;
    }
    function fmtSensitivity(val, unit) {
        if (unit === 'Jy')  return val.toFixed(6) + ' Jy';
        if (unit === 'mJy') return (val * 1000).toFixed(3) + ' mJy';
        if (unit === '\u03BCJy') return (val * 1e6).toFixed(1) + ' \u03BCJy';
        return val;
    }
    function fmtIntegration(s) {
        if (s < 60)   return s.toFixed(2) + ' s';
        if (s < 3600) return (s / 60).toFixed(2) + ' min';
        return (s / 3600).toFixed(2) + ' h';
    }

    /* ---- Calculate ---- */
    function handleCalculate() {
        clearError();

        var freqValue = parseFloat(root.querySelector('#freq-value').value);
        var bwValue   = parseFloat(root.querySelector('#bandwidth-value').value);
        var ra        = root.querySelector('#ra').value;
        var dec       = root.querySelector('#dec').value;
        var elevation = parseFloat(root.querySelector('#elevation').value);

        if (isNaN(freqValue) || freqValue <= 0) { showError('Please enter a valid central frequency'); return; }
        if (isNaN(bwValue)   || bwValue <= 0)   { showError('Please enter a valid bandwidth'); return; }
        if (!ra || !dec)                          { showError('Please enter pointing centre coordinates (RA and Dec)'); return; }

        var freqHz = toHz(freqValue, state.freqUnit);
        var bwHz   = toHz(bwValue, state.bwUnit);

        var integrationTime = null;
        var sensitivity     = null;

        if (state.calcMode === 'sensitivity') {
            var intVal = parseFloat(root.querySelector('#integration-value').value);
            if (isNaN(intVal) || intVal <= 0) { showError('Please enter a valid integration time'); return; }
            integrationTime = toSeconds(intVal, state.intUnit);
        } else {
            var sensVal = parseFloat(root.querySelector('#sensitivity-value').value);
            if (isNaN(sensVal) || sensVal <= 0) { showError('Please enter a valid sensitivity value'); return; }
            sensitivity = toJy(sensVal, state.sensUnit);
        }

        var tele = state.telescope;
        var mode = state.mode === 'continuum' ? 'continuum' : 'zoom';
        var endpoint = 'https://sensitivity-calculator.skao.int/api/v11/' + tele + '/' + mode + '/calculate';

        var params = [];
        params.push('freq_centre_hz=' + encodeURIComponent(freqHz));
        params.push('bandwidth_hz='   + encodeURIComponent(bwHz));
        params.push('pointing_centre=' + encodeURIComponent(ra + ' ' + dec));
        params.push('elevation_limit=' + encodeURIComponent(elevation));
        params.push('subarray_configuration=' + encodeURIComponent(root.querySelector('#array-config').value));

        if (tele === 'mid') {
            params.push('rx_band=' + encodeURIComponent(root.querySelector('#receiver-band').value));
        } else {
            var ns = parseInt(root.querySelector('#num-stations').value, 10);
            if (!isNaN(ns) && ns > 0) params.push('num_stations=' + ns);
        }

        if (integrationTime !== null) {
            params.push('integration_time_s=' + encodeURIComponent(integrationTime));
        } else if (sensitivity !== null) {
            params.push('sensitivity=' + encodeURIComponent(sensitivity));
        }

        var url = endpoint + '?' + params.join('&');

        state.isLoading = true;
        calculateBtn.disabled = true;
        calculateBtn.innerHTML = '<span class="spinner"></span>Calculating\u2026';

        fetch(url)
            .then(function (res) {
                if (!res.ok) throw new Error('API returned status ' + res.status);
                return res.json();
            })
            .then(function (data) { displayResults(data); })
            .catch(function (err) {
                showError('Error: ' + err.message + '. Please check your inputs and try again. If the problem persists, use the <a href="https://sensitivity-calculator.skao.int" target="_blank">official calculator</a>.');
            })
            .finally(function () {
                state.isLoading = false;
                calculateBtn.disabled = false;
                calculateBtn.textContent = 'Calculate';
            });
    }

    function displayResults(data) {
        var rc = root.querySelector('#results-content');
        rc.innerHTML = '';

        if (state.calcMode === 'sensitivity' && data.sensitivity != null) {
            rc.appendChild(makeRow('Sensitivity', fmtSensitivity(data.sensitivity, state.sensUnit)));
        } else if (state.calcMode === 'integration' && data.integration_time_s != null) {
            rc.appendChild(makeRow('Integration Time', fmtIntegration(data.integration_time_s)));
        }

        if (data.beam_size != null)
            rc.appendChild(makeRow('Beam Size', data.beam_size.toFixed(3) + ' arcsec'));
        if (data.surface_brightness_sensitivity != null)
            rc.appendChild(makeRow('Surface Brightness', data.surface_brightness_sensitivity.toFixed(3) + ' K'));
        if (data.confusion_noise != null)
            rc.appendChild(makeRow('Confusion Noise', fmtSensitivity(data.confusion_noise, 'mJy')));

        if (data.warning) {
            var w = document.createElement('div');
            w.style.cssText = 'margin-top:16px;padding:12px;background:#fffbeb;border-left:4px solid #f59e0b;border-radius:8px;font-size:13px;color:#92400e';
            w.textContent = data.warning;
            rc.appendChild(w);
        }

        resultsPanel.classList.add('show');
    }

    function makeRow(label, value) {
        var d = document.createElement('div');
        d.className = 'result-item';
        d.innerHTML = '<div class="result-label">' + label + '</div><div class="result-value">' + value + '</div>';
        return d;
    }

    // Init
    updateUIForTelescope();
    updateCalcModeUI();
})();
