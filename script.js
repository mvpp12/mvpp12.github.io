(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.classList.add('js');

    /* ---------- Theme ---------- */

    var themeBtn = document.getElementById('theme-toggle');
    var themeMeta = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0b0d0b' : '#f4f4ee');
    }

    applyTheme(root.getAttribute('data-theme') || 'dark');

    themeBtn.addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    /* ---------- Mobile menu ---------- */

    var menuBtn = document.getElementById('menu-btn');
    var menu = document.getElementById('mobile-menu');

    function setMenu(open) {
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
            menu.hidden = false;
            requestAnimationFrame(function () { menu.classList.add('is-open'); });
        } else {
            menu.classList.remove('is-open');
            setTimeout(function () { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 350);
        }
    }

    menuBtn.addEventListener('click', function () {
        setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
            setMenu(false);
            menuBtn.focus();
        }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
        if (mq.matches) setMenu(false);
    });

    /* ---------- Nav: background, hide on scroll down, progress ---------- */

    var nav = document.getElementById('nav');
    var progressBar = document.querySelector('.scroll-progress');
    var lastY = window.scrollY;
    var ticking = false;

    function onScroll() {
        var y = window.scrollY;
        var max = document.documentElement.scrollHeight - window.innerHeight;

        nav.classList.toggle('is-scrolled', y > 20);
        var menuOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        nav.classList.toggle('is-hidden', !menuOpen && y > 400 && y > lastY + 4);
        if (y < lastY - 4 || y < 400) nav.classList.remove('is-hidden');

        // Set on the bar itself so a scroll doesn't restyle the whole page
        if (progressBar) progressBar.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : 0);
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    // Keep the nav visible when a keyboard user tabs into it
    nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); });

    /* ---------- Active section in nav ---------- */

    var navLinks = document.querySelectorAll('[data-nav]');
    var sections = Array.prototype.map.call(navLinks, function (a) {
        return document.querySelector(a.getAttribute('href'));
    });

    function setActive(id) {
        navLinks.forEach(function (a) {
            var active = a.getAttribute('href') === '#' + id;
            a.classList.toggle('is-active', active);
            if (active) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
        });
    }

    // At the very bottom the last section may never cross the middle band
    window.addEventListener('scroll', function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY >= max - 4) setActive('contact');
    }, { passive: true });

    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { if (s) sectionObserver.observe(s); });
    }

    /* ---------- Reveal on scroll ---------- */

    var revealEls = document.querySelectorAll('.reveal');

    // Stagger siblings that enter together
    document.querySelectorAll('.projects, .skills, .hero__copy').forEach(function (group) {
        group.querySelectorAll(':scope > .reveal').forEach(function (el, i) {
            el.style.setProperty('--d', (i * 0.08) + 's');
        });
    });

    if (!reduceMotion && 'IntersectionObserver' in window) {
        // Above-the-fold content animates in right away
        requestAnimationFrame(function () {
            document.querySelectorAll('.hero .reveal').forEach(function (el) { el.classList.add('is-visible'); });
        });

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Rotating word in the headline ---------- */

    var words = document.querySelectorAll('.rotator__word');
    var wordIndex = 0;

    if (words.length > 1 && !reduceMotion) {
        setInterval(function () {
            if (document.hidden) return;
            var current = words[wordIndex];
            wordIndex = (wordIndex + 1) % words.length;
            var next = words[wordIndex];

            current.classList.remove('is-active');
            current.classList.add('is-leaving');
            current.setAttribute('aria-hidden', 'true');
            next.classList.remove('is-leaving');
            next.classList.add('is-active');
            next.removeAttribute('aria-hidden');

            setTimeout(function () { current.classList.remove('is-leaving'); }, 650);
        }, 2600);
    }

    /* ---------- Local time in the Philippines ---------- */

    var timeEl = document.getElementById('local-time');
    if (timeEl) {
        var fmt;
        try {
            fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Manila' });
        } catch (e) { fmt = null; }

        var tick = function () {
            if (fmt) timeEl.textContent = fmt.format(new Date());
            else timeEl.parentNode.textContent = 'Philippines';
        };
        tick();
        setInterval(tick, 30000);
    }

    /* ---------- Spotlight follows the cursor on cards ---------- */

    if (window.matchMedia('(hover: hover)').matches) {
        document.querySelectorAll('.spotlight').forEach(function (card) {
            card.addEventListener('pointermove', function (e) {
                var r = card.getBoundingClientRect();
                card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
                card.style.setProperty('--my', (e.clientY - r.top) + 'px');
            });
        });
    }

    /* ---------- Hero portrait: viewfinder entrance once the photo has loaded ---------- */

    var stage = document.getElementById('stage');
    if (stage) {
        var portraitImg = stage.querySelector('.viewfinder img');
        var ready = function () { requestAnimationFrame(function () { stage.classList.add('is-ready'); }); };
        if (portraitImg.complete) ready();
        else {
            portraitImg.addEventListener('load', ready);
            portraitImg.addEventListener('error', ready);
        }
    }

    /* ---------- About photo: light scroll parallax ---------- */

    var photo = document.querySelector('.photo');
    if (photo && !reduceMotion) {
        var photoImg = photo.querySelector('img');
        var photoTick = false;
        var updatePhoto = function () {
            var r = photo.getBoundingClientRect();
            var vh = window.innerHeight;
            if (r.bottom > 0 && r.top < vh) {
                // -1 when the photo enters at the bottom, +1 when it leaves at the top
                var p = (vh - r.top) / (vh + r.height) * 2 - 1;
                photoImg.style.setProperty('--shift', (p * -24).toFixed(1) + 'px');
            }
            photoTick = false;
        };
        window.addEventListener('scroll', function () {
            if (!photoTick) {
                requestAnimationFrame(updatePhoto);
                photoTick = true;
            }
        }, { passive: true });
        updatePhoto();
    }

    /* ---------- Copy email ---------- */

    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        var label = btn.querySelector('.copy-btn__label');
        var original = label.textContent;
        var timer;

        btn.addEventListener('click', function () {
            var text = btn.getAttribute('data-copy');
            var done = function () {
                btn.classList.add('is-copied');
                label.textContent = 'Copied to clipboard';
                clearTimeout(timer);
                timer = setTimeout(function () {
                    btn.classList.remove('is-copied');
                    label.textContent = original;
                }, 2200);
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(done, function () { window.location.href = 'mailto:' + text; });
            } else {
                window.location.href = 'mailto:' + text;
            }
        });
    });

    /* ---------- Award photos: viewer ---------- */

    var lightbox = document.getElementById('lightbox');
    var zoomLinks = document.querySelectorAll('[data-zoom]');

    if (lightbox && zoomLinks.length && typeof lightbox.showModal === 'function') {
        var lbImg = lightbox.querySelector('.lightbox__img');
        var lbText = lightbox.querySelector('.lightbox__text');
        var lbCount = lightbox.querySelector('.lightbox__count');
        var lbIndex = 0;

        var showPhoto = function (i) {
            lbIndex = (i + zoomLinks.length) % zoomLinks.length;
            var link = zoomLinks[lbIndex];
            var thumb = link.querySelector('img');
            var full = link.getAttribute('href');
            lightbox.classList.remove('is-zoomed');
            lbImg.alt = thumb ? thumb.alt : '';

            // Show the photo already on the page right away, then swap in the full-size file
            if (thumb && thumb.currentSrc) {
                lbImg.src = thumb.currentSrc;
                var loader = new Image();
                loader.onload = function () { if (zoomLinks[lbIndex] === link) lbImg.src = full; };
                loader.src = full;
            } else {
                lbImg.src = full;
            }
            lbText.textContent = link.getAttribute('data-caption') || '';
            lbCount.textContent = (lbIndex + 1) + ' / ' + zoomLinks.length;
        };

        zoomLinks.forEach(function (link, i) {
            link.addEventListener('click', function (e) {
                // Leave "open in new tab" clicks alone
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
                e.preventDefault();
                showPhoto(i);
                document.body.style.overflow = 'hidden';
                lightbox.showModal();
            });
        });

        lightbox.querySelector('.lightbox__close').addEventListener('click', function () { lightbox.close(); });
        lightbox.querySelector('.lightbox__prev').addEventListener('click', function () { showPhoto(lbIndex - 1); });
        lightbox.querySelector('.lightbox__next').addEventListener('click', function () { showPhoto(lbIndex + 1); });

        // Click the photo to switch between fit-to-screen and full size
        lbImg.addEventListener('click', function () { lightbox.classList.toggle('is-zoomed'); });

        // Click the dark area around the photo to close
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox__figure')) lightbox.close();
        });
        lightbox.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
            if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
        });
        lightbox.addEventListener('close', function () {
            document.body.style.overflow = '';
            lightbox.classList.remove('is-zoomed');
        });
    }

    /* ---------- Contact form ---------- */

    var form = document.getElementById('contact-form');

    if (form && window.fetch) {
        var formStatus = form.querySelector('.contact-form__status');
        var formBtn = form.querySelector('button[type="submit"]');
        var formEmail = 'mvplaza12@gmail.com';

        var setStatus = function (text, state) {
            formStatus.textContent = text;
            formStatus.className = 'contact-form__status' + (state ? ' is-' + state : '');
        };

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (form.elements._honey.value) return;

            var payload = {
                name: form.elements.name.value.trim(),
                email: form.elements.email.value.trim(),
                message: form.elements.message.value.trim(),
                _subject: 'Portfolio message from ' + form.elements.name.value.trim(),
                _template: 'table',
                _captcha: 'false'
            };

            formBtn.disabled = true;
            setStatus('Sending…');

            fetch(form.getAttribute('data-endpoint'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(function (res) {
                    return res.json().then(function (body) { return { ok: res.ok, body: body }; });
                })
                .then(function (res) {
                    var failed = !res.ok || String(res.body.success) !== 'true' || /activat/i.test(res.body.message || '');
                    if (failed) throw new Error('not delivered');
                    form.reset();
                    setStatus("Message sent. I'll reply to your email.", 'ok');
                })
                .catch(function () {
                    setStatus('', 'error');
                    var link = document.createElement('a');
                    link.href = 'mailto:' + formEmail + '?subject=' + encodeURIComponent('Hello from your portfolio') +
                        '&body=' + encodeURIComponent(payload.message);
                    link.textContent = formEmail;
                    formStatus.appendChild(document.createTextNode('Message not sent. Email me at '));
                    formStatus.appendChild(link);
                    formStatus.appendChild(document.createTextNode(' instead.'));
                })
                .then(function () { formBtn.disabled = false; });
        });
    }

    /* ---------- Live GitHub numbers (refreshed daily by the profile repo's workflow) ---------- */

    var ghStat = document.getElementById('gh-stat');

    if (ghStat && window.fetch) {
        fetch('https://raw.githubusercontent.com/mvpp12/mvpp12/main/data.json')
            .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
            .then(function (d) {
                if (!d.public_repos) return;
                ghStat.textContent = d.public_repos + ' repos · ' + d.contributions_year + ' contributions';
                ghStat.title = 'Public repositories and contributions in the last 12 months, updated ' + d.updated;
            })
            .catch(function () {});
    }

    /* ---------- Visitor analytics (GoatCounter: no cookies, no personal data) ---------- */

    // Put your GoatCounter site code here (the "name" in name.goatcounter.com) to turn counting on.
    var GOATCOUNTER_CODE = '';

    if (GOATCOUNTER_CODE && location.hostname === 'mvpp12.github.io') {
        var counter = document.createElement('script');
        counter.async = true;
        counter.src = 'https://gc.zgo.at/count.js';
        counter.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
        document.head.appendChild(counter);

        // Count clicks on project, hero and contact links as events
        document.addEventListener('click', function (e) {
            var link = e.target.closest('.project__links a, .hero__ctas a, .contact__list a, .more a');
            if (!link || !window.goatcounter || !window.goatcounter.count) return;
            var project = link.closest('.project');
            var name = (project ? project.querySelector('.project__title').textContent + ': ' : '') +
                link.textContent.replace(/\s+/g, ' ').trim();
            window.goatcounter.count({ path: 'click/' + name, title: name, event: true });
        });
    }

    /* ---------- Footer year ---------- */

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
