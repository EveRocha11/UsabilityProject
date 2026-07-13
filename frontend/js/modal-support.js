(() => {
  const OVERLAY_ID = 'support-overlay';

  /* ── Markup for the injected overlay (kept in sync with modal-support.html) ── */
  function buildOverlayMarkup() {
    return `
      <div class="support-page" id="${OVERLAY_ID}">
        <div class="support-modal" role="dialog" aria-modal="true" aria-labelledby="support-title">
          <button type="button" class="support-modal-x" id="support-modal-close" aria-label="Close support video">×</button>

          <section class="support-banner" id="support-banner" aria-label="Welcome video">
            <div class="support-banner-copy"></div>

            <video class="support-video" id="support-video" preload="metadata">
              <source src="../assets/video/VideoSupport.mp4" type="video/mp4" />
              <track kind="captions" src="../assets/video/subtitulos-en.vtt" srclang="en" label="English" default />
              Your browser does not support the video tag.
            </video>

            <button type="button" class="support-play-main" id="support-play-main" aria-label="Play preview">
              <span class="support-play-main-ring"></span>
              <span class="support-play-main-core">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 5.5v13l11-6.5-11-6.5z" />
                </svg>
              </span>
            </button>

            <div class="support-controls" aria-label="Video controls">
              <button type="button" class="support-control support-control-play" id="support-control-play" aria-label="Play">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 5.5v13l11-6.5-11-6.5z" />
                </svg>
              </button>

              <span class="support-time support-time-current" id="support-time-current">0:00</span>

              <div class="support-progress" id="support-progress" role="slider" tabindex="0"
                   aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="support-progress-track"></div>
                <div class="support-progress-fill" id="support-progress-fill"></div>
                <span class="support-progress-thumb" id="support-progress-thumb"></span>
              </div>

              <span class="support-time support-time-total" id="support-time-total">1:45</span>

              <div class="support-volume-wrap" id="support-volume-wrap">
                <button type="button" class="support-control support-control-volume" id="support-control-volume"
                        aria-label="Mute" aria-haspopup="true" aria-expanded="false">
                  <svg class="vol-icon-on" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M4 9v6h4l5 4V5L8 9H4z" />
                    <path d="M17 8.5a4.5 4.5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                    <path d="M19.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                  <svg class="vol-icon-off" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="display:none">
                    <path d="M4 9v6h4l5 4V5L8 9H4z" />
                    <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                </button>

                <div class="support-volume-popover" id="support-volume-popover" hidden>
                  <input type="range" class="support-volume-slider" id="support-volume-slider"
                         min="0" max="100" step="1" value="100"
                         aria-label="Volume" aria-valuetext="100%" />
                </div>
              </div>

              <button type="button" class="support-control support-control-captions is-active" id="support-control-captions" aria-pressed="true" aria-label="Hide captions">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8" />
                  <path d="M7 10.3c-.9 0-1.7.7-1.7 1.7s.8 1.7 1.7 1.7c.5 0 1-.2 1.3-.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                  <path d="M13.6 10.3c-.9 0-1.7.7-1.7 1.7s.8 1.7 1.7 1.7c.5 0 1-.2 1.3-.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                </svg>
              </button>

              <button type="button" class="support-control support-control-fullscreen" id="support-control-fullscreen" aria-label="Fullscreen">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M4 9V4h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M20 9V4h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M4 15v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </section>

          <button type="button" class="support-skip" id="support-skip">SKIP</button>
        </div>
      </div>`;
  }

  /* ── Wires all video/control behaviour onto a root element that already
     contains the markup above (either the static page or the injected
     overlay). `onRequestClose` is only passed for the overlay case. ────── */
  function wireSupportModal(root, { onRequestClose } = {}) {
    const video         = root.querySelector('#support-video');
    if (!video) return null;

    const trackEl        = video.querySelector('track');
    const closeBtn       = root.querySelector('#support-modal-close');
    const playMainBtn    = root.querySelector('#support-play-main');
    const playBtn        = root.querySelector('#support-control-play');
    const volumeWrap      = root.querySelector('#support-volume-wrap');
    const volumeBtn       = root.querySelector('#support-control-volume');
    const volumePopover  = root.querySelector('#support-volume-popover');
    const volumeSlider   = root.querySelector('#support-volume-slider');
    const volIconOn       = volumeBtn ? volumeBtn.querySelector('.vol-icon-on')  : null;
    const volIconOff      = volumeBtn ? volumeBtn.querySelector('.vol-icon-off') : null;
    const captionsBtn     = root.querySelector('#support-control-captions');
    const fullscreenBtn  = root.querySelector('#support-control-fullscreen');
    const progress        = root.querySelector('#support-progress');
    const progressFill    = root.querySelector('#support-progress-fill');
    const progressThumb  = root.querySelector('#support-progress-thumb');
    const timeCurrentEl  = root.querySelector('#support-time-current');
    const timeTotalEl     = root.querySelector('#support-time-total');
    const skipBtn         = root.querySelector('#support-skip');
    const banner          = root.querySelector('#support-banner');

    const PLAY_ICON  = 'M8 5.5v13l11-6.5-11-6.5z';
    const PAUSE_ICON = 'M8 5h3v14H8zM13 5h3v14h-3z';

    function formatTime(seconds) {
      if (!Number.isFinite(seconds)) return '0:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function setPlayIcon(btn, playing) {
      const path = btn.querySelector('svg path');
      if (path) path.setAttribute('d', playing ? PAUSE_ICON : PLAY_ICON);
      btn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    }

    function syncPlayState() {
      const playing = !video.paused && !video.ended;
      setPlayIcon(playBtn, playing);
      playMainBtn.style.display = playing ? 'none' : '';
      playMainBtn.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
    }

    function togglePlay() {
      if (video.paused || video.ended) video.play();
      else video.pause();
    }

    playMainBtn.addEventListener('click', togglePlay);
    playBtn.addEventListener('click', togglePlay);
    video.addEventListener('play',  syncPlayState);
    video.addEventListener('pause', syncPlayState);
    video.addEventListener('ended', () => {
      syncPlayState();
      video.currentTime = 0;
    });

    /* ── Time / progress ─────────────────────────────────────────── */
    video.addEventListener('loadedmetadata', () => {
      timeTotalEl.textContent = formatTime(video.duration);
    });

    video.addEventListener('timeupdate', () => {
      timeCurrentEl.textContent = formatTime(video.currentTime);
      const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
      progressFill.style.width  = pct + '%';
      progressThumb.style.left  = pct + '%';
      progress.setAttribute('aria-valuenow', String(Math.round(pct)));
    });

    function seekToClientX(clientX) {
      const rect = progress.getBoundingClientRect();
      const fraction = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      if (video.duration) video.currentTime = fraction * video.duration;
    }

    progress.addEventListener('click', e => seekToClientX(e.clientX));

    progress.addEventListener('keydown', e => {
      if (!video.duration) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        video.currentTime = Math.min(video.duration, video.currentTime + 5);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        video.currentTime = Math.max(0, video.currentTime - 5);
      } else {
        return;
      }
      e.preventDefault();
    });

    /* ── Volume (popover + vertical slider) ─────────────────────────── */
    function syncVolumeUI() {
      const muted = video.muted || video.volume === 0;
      if (volIconOn)  volIconOn.style.display  = muted ? 'none' : '';
      if (volIconOff) volIconOff.style.display = muted ? '' : 'none';
      volumeBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');

      const pct = Math.round((video.muted ? 0 : video.volume) * 100);
      if (volumeSlider) {
        volumeSlider.value = String(pct);
        volumeSlider.setAttribute('aria-valuetext', pct + '%');
        volumeSlider.style.background =
          `linear-gradient(to top, #97d80f 0%, #97d80f ${pct}%, rgba(255,255,255,0.25) ${pct}%, rgba(255,255,255,0.25) 100%)`;
      }
    }

    function isVolumePopoverOpen() {
      return !!(volumePopover && !volumePopover.hidden);
    }

    function openVolumePopover() {
      if (!volumePopover) return;
      volumePopover.hidden = false;
      volumeBtn.setAttribute('aria-expanded', 'true');
      volumeSlider.focus();
      document.addEventListener('click', onDocClickCloseVolume, true);
      document.addEventListener('keydown', onVolumePopoverKeydown);
    }

    function closeVolumePopover(returnFocus) {
      if (!volumePopover) return;
      volumePopover.hidden = true;
      volumeBtn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onDocClickCloseVolume, true);
      document.removeEventListener('keydown', onVolumePopoverKeydown);
      if (returnFocus) volumeBtn.focus();
    }

    function onDocClickCloseVolume(e) {
      if (volumeWrap && !volumeWrap.contains(e.target)) closeVolumePopover(false);
    }

    function onVolumePopoverKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeVolumePopover(true);
      }
    }

    if (volumeBtn && volumePopover && volumeSlider) {
      volumeBtn.addEventListener('click', e => {
        e.stopPropagation();
        if (volumePopover.hidden) openVolumePopover();
        else closeVolumePopover(false);
      });

      volumeSlider.addEventListener('input', () => {
        const val = Number(volumeSlider.value);
        video.volume = val / 100;
        video.muted  = val === 0;
        syncVolumeUI();
      });

      video.addEventListener('volumechange', syncVolumeUI);
      syncVolumeUI();
    }

    /* ── Captions (CC) ────────────────────────────────────────────── */
    function getCaptionTrack() {
      return video.textTracks && video.textTracks.length ? video.textTracks[0] : null;
    }

    function syncCaptionsBtn() {
      const track = getCaptionTrack();
      const on = !track || track.mode !== 'hidden';
      captionsBtn.classList.toggle('is-active', on);
      captionsBtn.setAttribute('aria-pressed', String(on));
      captionsBtn.setAttribute('aria-label', on ? 'Hide captions' : 'Show captions');
    }

    if (captionsBtn) {
      captionsBtn.addEventListener('click', () => {
        const track = getCaptionTrack();
        if (!track) return;
        track.mode = track.mode === 'hidden' ? 'showing' : 'hidden';
        syncCaptionsBtn();
      });
      syncCaptionsBtn();
    }

    if (trackEl) {
      trackEl.addEventListener('error', () => {
        console.warn('Captions track failed to load:', trackEl.src);
      });
      trackEl.addEventListener('load', syncCaptionsBtn);
    }

    /* ── Fullscreen ───────────────────────────────────────────────── */
    /* Fullscreen the banner (video + custom controls), not the bare
       <video> element — fullscreening a plain <video> makes the browser
       show its own native control bar on top of ours. */
    fullscreenBtn.addEventListener('click', () => {
      const target = banner || video;
      if (target.requestFullscreen) target.requestFullscreen();
      else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
    });

    /* ── Close / Skip ─────────────────────────────────────────────── */
    function requestClose() {
      video.pause();
      if (onRequestClose) onRequestClose();
      else window.location.href = 'dashboard.html';
    }

    skipBtn.addEventListener('click', requestClose);
    if (closeBtn) closeBtn.addEventListener('click', requestClose);

    if (onRequestClose) {
      root.addEventListener('click', e => {
        if (e.target === root) requestClose();
      });
    }

    /* ── Space bar: global play/pause (YouTube-style) ────────────────
       Works while this modal is open, no matter which element has
       focus — except real form fields, where Space must keep its
       native behavior (typing, opening a <select>, etc). Escape closes
       the modal when it is an overlay (skipped while the volume
       popover — which has its own Escape handling — is open). */
    document.addEventListener('keydown', e => {
      if (onRequestClose && !root.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        if (onRequestClose && !isVolumePopoverOpen()) {
          e.preventDefault();
          requestClose();
        }
        return;
      }

      if (e.code !== 'Space' && e.key !== ' ') return;

      const target = e.target;
      const tag = target && target.tagName;
      const isFormField = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (target && target.isContentEditable);
      if (isFormField) return;

      e.preventDefault();
      togglePlay();
    });

    syncPlayState();
    return { requestClose };
  }

  /* ── Overlay open/close (used on every other page) ───────────────── */
  let lastFocusedEl = null;
  let overlayApi    = null;

  function closeSupportOverlay() {
    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay || !overlay.classList.contains('is-open')) return;
    overlay.classList.remove('is-open');
    const video = overlay.querySelector('#support-video');
    if (video) video.pause();
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  }

  function openSupportOverlay(trigger) {
    // Don't stack on top of the accessibility modal, if it happens to be open.
    const a11yOverlay = document.getElementById('a11y-overlay');
    if (a11yOverlay) a11yOverlay.classList.remove('is-open');

    let overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      const wrap = document.createElement('div');
      wrap.innerHTML = buildOverlayMarkup();
      overlay = wrap.firstElementChild;
      document.body.appendChild(overlay);
      overlayApi = wireSupportModal(overlay, { onRequestClose: closeSupportOverlay });
    }

    lastFocusedEl = trigger || document.activeElement;
    overlay.classList.add('is-open');

    const focusTarget = overlay.querySelector('#support-modal-close');
    if (focusTarget) focusTarget.focus();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Standalone page (modal-support.html itself): wire the static markup
    // already in the DOM, with no overlay/close behaviour — Skip/Close
    // navigate away, exactly like a normal page.
    const staticVideo = document.getElementById('support-video');
    if (staticVideo) {
      wireSupportModal(document, {});
    }

    // Any page with Help triggers: open the support modal as an overlay
    // instead of navigating. Works for links/buttons added later too,
    // since this is a single delegated listener, not a per-element one.
    document.addEventListener('click', e => {
      const trigger = e.target.closest('.nav-footer-item, [href="modal-support.html"], [data-open-support-modal]');
      if (!trigger) return;
      e.preventDefault();
      openSupportOverlay(trigger);
    });
  });
})();
