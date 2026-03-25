/* ============================================= */
/* SKAO Science Users Portal — Scroll Viewport   */
/* main.js v1.0 — Full feature parity              */
/* ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------
     * DARK MODE TOGGLE
     * ----------------------------------------- */
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var isDark = document.documentElement.classList.toggle('dark');
            try { localStorage.setItem('skao-theme', isDark ? 'dark' : 'light'); } catch (e) {}
        });
    }

    /* -----------------------------------------
     * ANNOUNCEMENT BANNER DISMISS (with persistence)
     * ----------------------------------------- */
    var banner = document.getElementById('announcementBanner');
    var dismissBtn = document.querySelector('.announcement-close');

    function bannerKey() {
        /* Key derived from banner text so a new message reappears */
        if (!banner) return null;
        var txt = banner.textContent.replace(/\s+/g, ' ').trim().substring(0, 80);
        return 'skao-banner-' + txt.length + '-' + txt.replace(/\W/g, '').substring(0, 20);
    }

    /* Hide on load if previously dismissed */
    if (banner) {
        try {
            if (localStorage.getItem(bannerKey()) === '1') {
                banner.style.display = 'none';
            }
        } catch (e) { /* localStorage unavailable — show banner */ }
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
            if (banner) {
                try { localStorage.setItem(bannerKey(), '1'); } catch (e) {}
                banner.style.transition = 'opacity 0.3s, max-height 0.3s';
                banner.style.opacity = '0';
                banner.style.maxHeight = '0';
                banner.style.overflow = 'hidden';
                setTimeout(function () { banner.style.display = 'none'; }, 300);
            }
        });
    }

    /* -----------------------------------------
     * HERO SECTION COLLAPSE / EXPAND
     * ----------------------------------------- */
    var heroToggle = document.querySelector('.hero-toggle');
    var heroContent = document.querySelector('.hero-content');
    var heroCollapsed = document.querySelector('.hero-collapsed');

    if (heroToggle && heroContent) {
        heroToggle.addEventListener('click', function () {
            heroContent.style.display = 'none';
            if (heroCollapsed) heroCollapsed.style.display = 'block';
        });
    }

    if (heroCollapsed) {
        heroCollapsed.addEventListener('click', function () {
            heroContent.style.display = 'block';
            heroCollapsed.style.display = 'none';
        });
    }

    /* -----------------------------------------
     * DOCUMENTATION CATEGORIES TABS
     * ----------------------------------------- */
    var tabButtons = document.querySelectorAll('.cat-tab');
    var tabPanels = document.querySelectorAll('.cat-panel');

    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var target = this.getAttribute('data-tab');

            tabButtons.forEach(function (b) { b.classList.remove('cat-tab-active'); });
            tabPanels.forEach(function (p) { p.classList.remove('cat-panel-active'); });

            this.classList.add('cat-tab-active');
            var panel = document.getElementById('cat-' + target);
            if (panel) panel.classList.add('cat-panel-active');
        });
    });

    /* -----------------------------------------
     * BACK TO TOP BUTTON
     * ----------------------------------------- */
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('btt-visible');
            } else {
                backToTop.classList.remove('btt-visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* -----------------------------------------
     * SMOOTH SCROLL FOR ANCHOR LINKS
     * ----------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* -----------------------------------------
     * SEARCH MODAL
     * ----------------------------------------- */
    var searchModal = document.getElementById('searchModal');
    var searchModalInput = document.getElementById('searchModalInput');
    var searchModalClose = document.getElementById('searchModalClose');
    var searchModalBackdrop = document.getElementById('searchModalBackdrop');
    var openSearchBtn = document.getElementById('openSearchModal');
    var openSearchBtnMobile = document.getElementById('openSearchModalMobile');

    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.add('search-modal-open');
            document.body.style.overflow = 'hidden';
            if (searchModalInput) {
                setTimeout(function () { searchModalInput.focus(); }, 100);
            }
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('search-modal-open');
            document.body.style.overflow = '';
            /* Reset search state */
            if (searchModalInput) searchModalInput.value = '';
            var emptyEl = document.getElementById('searchEmpty');
            var loadingEl = document.getElementById('searchLoading');
            var resultsEl = document.getElementById('searchResults');
            var noResultsEl = document.getElementById('searchNoResults');
            if (emptyEl) emptyEl.style.display = '';
            if (loadingEl) loadingEl.style.display = 'none';
            if (resultsEl) { resultsEl.style.display = 'none'; resultsEl.innerHTML = ''; }
            if (noResultsEl) noResultsEl.style.display = 'none';
        }
    }

    if (openSearchBtn) openSearchBtn.addEventListener('click', openSearchModal);
    if (openSearchBtnMobile) openSearchBtnMobile.addEventListener('click', openSearchModal);
    if (searchModalClose) searchModalClose.addEventListener('click', closeSearchModal);
    if (searchModalBackdrop) searchModalBackdrop.addEventListener('click', closeSearchModal);

    /* Keyboard shortcut: Ctrl/Cmd+K to open search, Esc to close */
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchModal && searchModal.classList.contains('search-modal-open')) {
                closeSearchModal();
            } else {
                openSearchModal();
            }
        }
        if (e.key === 'Escape' && searchModal && searchModal.classList.contains('search-modal-open')) {
            closeSearchModal();
        }
    });

    /* -----------------------------------------
     * LIVE SEARCH via Confluence REST API
     * ----------------------------------------- */
    var searchTimer = null;
    var searchEmpty = document.getElementById('searchEmpty');
    var searchLoading = document.getElementById('searchLoading');
    var searchResults = document.getElementById('searchResults');
    var searchNoResults = document.getElementById('searchNoResults');
    var activeResultIndex = -1;

    function showSearchState(state) {
        if (searchEmpty) searchEmpty.style.display = (state === 'empty') ? '' : 'none';
        if (searchLoading) searchLoading.style.display = (state === 'loading') ? '' : 'none';
        if (searchResults) searchResults.style.display = (state === 'results') ? '' : 'none';
        if (searchNoResults) searchNoResults.style.display = (state === 'noResults') ? '' : 'none';
        activeResultIndex = -1;
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        var escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return text.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark>$1</mark>');
    }

    function extractExcerpt(body, query, maxLen) {
        maxLen = maxLen || 160;
        if (!body) return '';
        /* Strip HTML tags */
        var text = body.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
        if (!query) return text.substring(0, maxLen) + (text.length > maxLen ? '...' : '');
        /* Find the query in the text and show surrounding context */
        var idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text.substring(0, maxLen) + (text.length > maxLen ? '...' : '');
        var start = Math.max(0, idx - 60);
        var end = Math.min(text.length, idx + query.length + 100);
        var excerpt = (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
        return highlightMatch(excerpt, query);
    }

    function buildResultLink(result) {
        /* Scroll Viewport rewrites URLs, so use _links.webui or build from content ID */
        if (result._links && result._links.webui) {
            return contextPath + result._links.webui;
        }
        return contextPath + '/wiki/spaces/' + (result.space ? result.space.key : spaceKey) + '/pages/' + result.id;
    }

    function performSearch(query) {
        if (!query || query.length < 2) {
            showSearchState('empty');
            return;
        }

        showSearchState('loading');

        /* Use Confluence CQL search — search within the current space */
        var cql = 'type=page AND space="' + spaceKey + '" AND (title~"' + query + '" OR text~"' + query + '")';
        var url = contextPath + '/rest/api/content/search?cql=' + encodeURIComponent(cql) + '&limit=10&expand=body.view,space,ancestors';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-Atlassian-Token', 'nocheck');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    renderResults(data.results || [], query);
                } catch (e) {
                    /* If JSON parse fails, try the simple search fallback */
                    performSimpleSearch(query);
                }
            } else if (xhr.status === 403 || xhr.status === 401) {
                /* Auth issue — fall back to simple search page */
                performSimpleSearch(query);
            } else {
                showSearchState('noResults');
            }
        };

        xhr.onerror = function () {
            performSimpleSearch(query);
        };

        xhr.send();
    }

    function performSimpleSearch(query) {
        /* Fallback: use Confluence's older search API which may have looser auth */
        var url = contextPath + '/rest/api/content?spaceKey=' + spaceKey + '&title=' + encodeURIComponent(query) + '&limit=10&expand=body.view,space,ancestors';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    renderResults(data.results || [], query);
                } catch (e) {
                    showSearchState('noResults');
                }
            } else {
                showSearchState('noResults');
            }
        };

        xhr.onerror = function () {
            showSearchState('noResults');
        };

        xhr.send();
    }

    function renderResults(results, query) {
        if (!searchResults) return;

        if (results.length === 0) {
            showSearchState('noResults');
            return;
        }

        var html = '';
        for (var i = 0; i < results.length; i++) {
            var r = results[i];
            var title = highlightMatch(r.title || 'Untitled', query);
            var bodyHtml = (r.body && r.body.view) ? r.body.view.value : '';
            var excerpt = extractExcerpt(bodyHtml, query);
            var link = buildResultLink(r);

            /* Build breadcrumb from ancestors */
            var breadcrumb = '';
            if (r.ancestors && r.ancestors.length > 0) {
                var crumbs = [];
                for (var a = 0; a < r.ancestors.length; a++) {
                    crumbs.push(r.ancestors[a].title);
                }
                breadcrumb = crumbs.join(' › ');
            }

            html += '<a href="' + link + '" class="search-result" data-index="' + i + '">';
            html += '  <div class="search-result-icon">';
            html += '    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
            html += '  </div>';
            html += '  <div class="search-result-body">';
            if (breadcrumb) {
                html += '    <span class="search-result-breadcrumb">' + breadcrumb + '</span>';
            }
            html += '    <span class="search-result-title">' + title + '</span>';
            if (excerpt) {
                html += '    <span class="search-result-excerpt">' + excerpt + '</span>';
            }
            html += '  </div>';
            html += '  <div class="search-result-arrow">';
            html += '    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>';
            html += '  </div>';
            html += '</a>';
        }

        searchResults.innerHTML = html;
        showSearchState('results');
    }

    /* Keyboard navigation within results */
    if (searchModalInput) {
        searchModalInput.addEventListener('input', function () {
            var query = this.value.trim();
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                performSearch(query);
            }, 300);
        });

        searchModalInput.addEventListener('keydown', function (e) {
            if (!searchResults || searchResults.style.display === 'none') return;
            var items = searchResults.querySelectorAll('.search-result');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeResultIndex = Math.min(activeResultIndex + 1, items.length - 1);
                updateActiveResult(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeResultIndex = Math.max(activeResultIndex - 1, -1);
                updateActiveResult(items);
            } else if (e.key === 'Enter' && activeResultIndex >= 0) {
                e.preventDefault();
                items[activeResultIndex].click();
            }
        });
    }

    function updateActiveResult(items) {
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle('search-result-active', i === activeResultIndex);
        }
        if (activeResultIndex >= 0 && items[activeResultIndex]) {
            items[activeResultIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    /* -----------------------------------------
     * SLIDE-OUT SIDEBAR NAVIGATION
     * ----------------------------------------- */
    var navSidebar = document.getElementById('navSidebar');
    var navOverlay = document.getElementById('navOverlay');
    var navSidebarToggle = document.getElementById('navSidebarToggle');
    var navSidebarClose = document.getElementById('navSidebarClose');

    function openNavSidebar() {
        if (navSidebar) navSidebar.classList.add('nav-sidebar-open');
        if (navOverlay) navOverlay.classList.add('nav-overlay-open');
        if (navSidebarToggle) navSidebarToggle.style.opacity = '0';
        document.body.style.overflow = 'hidden';
    }

    function closeNavSidebar() {
        if (navSidebar) navSidebar.classList.remove('nav-sidebar-open');
        if (navOverlay) navOverlay.classList.remove('nav-overlay-open');
        if (navSidebarToggle) navSidebarToggle.style.opacity = '1';
        document.body.style.overflow = '';
    }

    if (navSidebarToggle) navSidebarToggle.addEventListener('click', openNavSidebar);
    if (navSidebarClose) navSidebarClose.addEventListener('click', closeNavSidebar);
    if (navOverlay) navOverlay.addEventListener('click', closeNavSidebar);

    /* Accordion sections in the sidebar */
    var sectionBtns = document.querySelectorAll('.nav-section-btn');
    sectionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var idx = this.getAttribute('data-nav-section');
            var panel = document.getElementById('navPanel-' + idx);
            var isExpanded = this.classList.contains('nav-section-expanded');

            sectionBtns.forEach(function (b) { b.classList.remove('nav-section-expanded'); });
            document.querySelectorAll('.nav-section-panel').forEach(function (p) {
                p.classList.remove('nav-section-panel-open');
            });

            if (!isExpanded && panel) {
                this.classList.add('nav-section-expanded');
                panel.classList.add('nav-section-panel-open');
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navSidebar && navSidebar.classList.contains('nav-sidebar-open')) {
            closeNavSidebar();
        }
    });

    /* -----------------------------------------
     * MOBILE MENU TOGGLE
     * ----------------------------------------- */
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var headerNav = document.getElementById('headerNav');

    if (mobileMenuBtn && headerNav) {
        mobileMenuBtn.addEventListener('click', function () {
            headerNav.classList.toggle('header-nav-open');
        });
    }

    /* -----------------------------------------
     * RECENT UPDATES — CATEGORY FILTER TABS
     * ----------------------------------------- */
    var filterTabs = document.querySelectorAll('.ru-filter-tab');
    var ruCards = document.querySelectorAll('.ru-card[data-category]');

    filterTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');

            /* Update active tab */
            filterTabs.forEach(function (t) { t.classList.remove('ru-filter-active'); });
            this.classList.add('ru-filter-active');

            /* Filter cards */
            ruCards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('ru-card-hidden');
                } else {
                    card.classList.add('ru-card-hidden');
                }
            });
        });
    });

    /* -----------------------------------------
     * RELATIVE DATE FORMATTING
     * ----------------------------------------- */
    function formatRelativeDate(dateStr) {
        if (!dateStr) return null;
        var date = new Date(dateStr + 'T00:00:00');
        if (isNaN(date.getTime())) return null;

        var now = new Date();
        var diff = Math.floor((now - date) / 1000); /* seconds */

        if (diff < 0) return 'Upcoming';
        if (diff < 60) return 'Just now';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        if (diff < 172800) return 'Yesterday';
        if (diff < 604800) return Math.floor(diff / 86400) + ' days ago';
        if (diff < 2592000) return Math.floor(diff / 604800) + ' week' + (Math.floor(diff / 604800) > 1 ? 's' : '') + ' ago';
        if (diff < 31536000) {
            var months = Math.floor(diff / 2592000);
            return months + ' month' + (months > 1 ? 's' : '') + ' ago';
        }
        return Math.floor(diff / 31536000) + ' year' + (Math.floor(diff / 31536000) > 1 ? 's' : '') + ' ago';
    }

    /* Apply relative dates to all elements with data-date */
    document.querySelectorAll('.ru-date[data-date]').forEach(function (el) {
        var dateStr = el.getAttribute('data-date');
        if (dateStr) {
            var relative = formatRelativeDate(dateStr);
            if (relative) {
                var textEl = el.querySelector('.ru-date-text');
                if (textEl) textEl.textContent = relative;
            }
        }
    });

    /* -----------------------------------------
     * ARTICLE DATE FORMATTING
     * Formats the raw Confluence date into a readable format
     * ----------------------------------------- */
    var articleDateEl = document.querySelector('.article-date');
    if (articleDateEl) {
        var rawDate = articleDateEl.getAttribute('data-raw-date');
        var textEl = articleDateEl.querySelector('.article-date-text');
        if (rawDate && textEl) {
            try {
                var d = new Date(rawDate);
                if (!isNaN(d.getTime())) {
                    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    textEl.textContent = 'Last updated: ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
                }
            } catch (e) { /* Keep fallback text */ }
        }
    }

    /* -----------------------------------------
     * AUTO-GENERATED TABLE OF CONTENTS
     * Scans .content-body for h2/h3 headings
     * and injects a TOC into the sidebar.
     * ----------------------------------------- */
    var contentBody = document.querySelector('.article .content-body');
    var sidebarInner = document.querySelector('.sidebar .sidebar-inner');

    /* Skip TOC on section pages (pages with child listings) — sidebar already has nav */
    var isSectionPage = document.querySelector('.section-children');

    if (contentBody && sidebarInner && !isSectionPage) {
        var headings = contentBody.querySelectorAll('h2, h3');
        if (headings.length >= 3) {
            /* Build TOC */
            var tocHtml = '<h4 class="sidebar-title sidebar-toc-title">On this page</h4><ul class="sidebar-toc">';
            for (var h = 0; h < headings.length; h++) {
                var heading = headings[h];
                /* Ensure each heading has an ID */
                if (!heading.id) {
                    heading.id = 'toc-' + heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                }
                var indent = heading.tagName === 'H3' ? ' sidebar-toc-h3' : '';
                tocHtml += '<li class="sidebar-toc-item' + indent + '"><a href="#' + heading.id + '" class="sidebar-toc-link">' + heading.textContent.trim() + '</a></li>';
            }
            tocHtml += '</ul>';

            /* Insert TOC before existing sidebar nav */
            var tocContainer = document.createElement('div');
            tocContainer.className = 'sidebar-toc-wrap';
            tocContainer.innerHTML = tocHtml;
            sidebarInner.insertBefore(tocContainer, sidebarInner.firstChild);

            /* Scroll-spy: highlight active heading */
            var tocLinks = tocContainer.querySelectorAll('.sidebar-toc-link');
            var tocObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        tocLinks.forEach(function (l) { l.classList.remove('sidebar-toc-active'); });
                        var activeLink = tocContainer.querySelector('a[href="#' + entry.target.id + '"]');
                        if (activeLink) activeLink.classList.add('sidebar-toc-active');
                    }
                });
            }, { rootMargin: '-80px 0px -60% 0px', threshold: 0 });

            headings.forEach(function (heading) { tocObserver.observe(heading); });
        }
    }

    /* -----------------------------------------
     * CODE BLOCK COPY-TO-CLIPBOARD
     * ----------------------------------------- */
    document.querySelectorAll('pre').forEach(function (pre) {
        /* Skip if already has a copy button */
        if (pre.querySelector('.code-copy-btn')) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrap';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        var btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

        btn.addEventListener('click', function () {
            var code = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code).then(function () {
                    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    setTimeout(function () {
                        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                    }, 2000);
                });
            }
        });

        wrapper.appendChild(btn);
    });

    /* -----------------------------------------
     * HELP BUTTON VISIBILITY
     * ----------------------------------------- */
    var helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                helpBtn.classList.add('help-visible');
            } else {
                helpBtn.classList.remove('help-visible');
            }
        });
        /* Show immediately if already scrolled */
        if (window.scrollY > 200) helpBtn.classList.add('help-visible');
    }

    /* -----------------------------------------
     * UPCOMING DEADLINES — COUNTDOWN BADGES
     * ----------------------------------------- */
    document.querySelectorAll('.ue-item').forEach(function (item) {
        var monthEl = item.querySelector('.ue-month');
        var dayEl = item.querySelector('.ue-day');
        if (!monthEl || !dayEl) return;

        var monthNames = { JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5, JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11 };
        var m = monthNames[monthEl.textContent.trim().toUpperCase()];
        var d = parseInt(dayEl.textContent.trim(), 10);
        if (m === undefined || isNaN(d)) return;

        var now = new Date();
        var eventDate = new Date(now.getFullYear(), m, d);
        /* If the date has passed this year, assume next year */
        if (eventDate < now) eventDate.setFullYear(now.getFullYear() + 1);

        var daysLeft = Math.ceil((eventDate - now) / 86400000);
        if (daysLeft <= 14 && daysLeft >= 0) {
            var titleEl = item.querySelector('.ue-title');
            if (titleEl) {
                var badge = document.createElement('span');
                badge.className = 'ue-countdown';
                badge.textContent = daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : daysLeft + ' days left';
                titleEl.appendChild(badge);
            }
        }
    });

    /* -----------------------------------------
     * UPCOMING EVENTS — CATEGORY FILTER TABS
     * ----------------------------------------- */
    var ueFilterTabs = document.querySelectorAll('.ue-filter-tab');
    var ueItems = document.querySelectorAll('.ue-item[data-ue-category]');

    ueFilterTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            var filter = this.getAttribute('data-ue-filter');

            ueFilterTabs.forEach(function (t) { t.classList.remove('ue-filter-active'); });
            this.classList.add('ue-filter-active');

            ueItems.forEach(function (item) {
                if (filter === 'all' || item.getAttribute('data-ue-category') === filter) {
                    item.classList.remove('ue-item-hidden');
                } else {
                    item.classList.add('ue-item-hidden');
                }
            });
        });
    });

    /* -----------------------------------------
     * PAGE FEEDBACK WIDGET
     * ----------------------------------------- */
    var pfWidget = document.getElementById('pageFeedback');
    if (pfWidget) {
        var pfForm = document.getElementById('pfForm');
        var pfThanks = document.getElementById('pfThanks');
        var pfComment = document.getElementById('pfComment');
        var pfSubmit = document.getElementById('pfSubmit');
        var pfSkip = document.getElementById('pfSkip');
        var pfVote = null;

        pfWidget.querySelectorAll('.pf-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                pfVote = this.getAttribute('data-vote');
                /* Highlight selected button */
                pfWidget.querySelectorAll('.pf-btn').forEach(function (b) { b.classList.remove('pf-selected'); });
                this.classList.add('pf-selected');
                /* Show comment form */
                if (pfForm) pfForm.style.display = '';
            });
        });

        function submitFeedback() {
            var comment = pfComment ? pfComment.value.trim() : '';
            var pageTitle = document.title || '';

            /* Log to console (Phase 1 — replace with API POST in Phase 2) */
            console.log('[Page Feedback]', { page: pageTitle, vote: pfVote, comment: comment });

            /* Hide form, show thanks */
            pfWidget.querySelector('.pf-question').style.display = 'none';
            if (pfForm) pfForm.style.display = 'none';
            if (pfThanks) pfThanks.style.display = '';
        }

        if (pfSubmit) pfSubmit.addEventListener('click', submitFeedback);
        if (pfSkip) pfSkip.addEventListener('click', submitFeedback);
    }

    /* -----------------------------------------
     * DYNAMIC ANNOUNCEMENTS — CQL blog feed
     * Fetches blog posts labelled 'portal-announcement'
     * from the current space. Falls back to static cards.
     * ----------------------------------------- */
    var ruGrid = document.getElementById('ruGrid');
    if (ruGrid) {
        (function loadDynamicAnnouncements() {
            /* Category mapping: Confluence labels → display categories */
            var labelMap = {
                'announcement': { label: 'Announcement', cls: 'ru-badge-announce', category: 'announcement',
                    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>' },
                'documentation': { label: 'Documentation', cls: '', category: 'documentation',
                    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>' },
                'software': { label: 'Software', cls: 'ru-badge-software', category: 'software',
                    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' },
                'tutorial': { label: 'Tutorial', cls: 'ru-badge-tutorial', category: 'tutorial',
                    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' }
            };

            var defaultMeta = labelMap['announcement'];

            var cql = 'type=blogpost AND space="' + spaceKey + '" AND label="portal-announcement" ORDER BY created DESC';
            var url = contextPath + '/rest/api/content/search?cql=' + encodeURIComponent(cql) + '&limit=6&expand=metadata.labels,history';

            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('X-Atlassian-Token', 'nocheck');
            xhr.timeout = 5000; /* 5s timeout — use static fallback if slow */

            xhr.onload = function () {
                if (xhr.status < 200 || xhr.status >= 300) return; /* Keep static */
                try {
                    var data = JSON.parse(xhr.responseText);
                    if (!data.results || data.results.length === 0) return; /* Keep static */
                    renderDynamicCards(data.results);
                } catch (e) { /* Keep static */ }
            };

            /* On error/timeout: just keep the static cards */
            xhr.onerror = function () {};
            xhr.ontimeout = function () {};
            xhr.send();

            function renderDynamicCards(posts) {
                var html = '';
                for (var i = 0; i < posts.length; i++) {
                    var post = posts[i];
                    var meta = defaultMeta;
                    var iconCls = '';

                    /* Determine category from labels */
                    if (post.metadata && post.metadata.labels && post.metadata.labels.results) {
                        var labels = post.metadata.labels.results;
                        for (var l = 0; l < labels.length; l++) {
                            var name = labels[l].name.toLowerCase();
                            if (labelMap[name]) {
                                meta = labelMap[name];
                                if (name === 'software') iconCls = ' ru-card-icon-sw';
                                if (name === 'tutorial') iconCls = ' ru-card-icon-tut';
                                break;
                            }
                        }
                    }

                    /* Extract date */
                    var dateStr = '';
                    var dateDisplay = '';
                    if (post.history && post.history.createdDate) {
                        var d = new Date(post.history.createdDate);
                        var y = d.getFullYear();
                        var m = ('0' + (d.getMonth() + 1)).slice(-2);
                        var day = ('0' + d.getDate()).slice(-2);
                        dateStr = y + '-' + m + '-' + day;
                        dateDisplay = d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
                    }

                    /* Build link */
                    var link = '#';
                    if (post._links && post._links.webui) {
                        link = contextPath + post._links.webui;
                    }

                    /* Check if recent (within 7 days) for "New" badge */
                    var isNew = false;
                    if (dateStr) {
                        var postDate = new Date(dateStr + 'T00:00:00');
                        var now = new Date();
                        isNew = ((now - postDate) / 86400000) <= 7;
                    }

                    html += '<div class="ru-card" data-category="' + meta.category + '" data-date="' + dateStr + '">';
                    html += '  <div class="ru-card-icon' + iconCls + '">' + meta.icon + '</div>';
                    html += '  <div class="ru-card-body">';
                    html += '    <div class="ru-card-meta">';
                    html += '      <span class="ru-badge ' + meta.cls + '">' + meta.label + '</span>';
                    if (isNew) html += '      <span class="ru-badge ru-badge-new">New</span>';
                    html += '      <span class="ru-date" data-date="' + dateStr + '">';
                    html += '        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';
                    html += '        <span class="ru-date-text">' + (dateDisplay || 'Recent') + '</span>';
                    html += '      </span>';
                    html += '    </div>';
                    html += '    <h3 class="ru-card-title"><a href="' + link + '">' + post.title + '</a></h3>';
                    html += '  </div>';
                    html += '</div>';
                }

                ruGrid.innerHTML = html;

                /* Re-bind filter tabs to the new cards */
                var newCards = ruGrid.querySelectorAll('.ru-card[data-category]');
                var tabs = document.querySelectorAll('.ru-filter-tab');
                tabs.forEach(function (tab) {
                    tab.addEventListener('click', function () {
                        var f = this.getAttribute('data-filter');
                        tabs.forEach(function (t) { t.classList.remove('ru-filter-active'); });
                        this.classList.add('ru-filter-active');
                        newCards.forEach(function (card) {
                            if (f === 'all' || card.getAttribute('data-category') === f) {
                                card.classList.remove('ru-card-hidden');
                            } else {
                                card.classList.add('ru-card-hidden');
                            }
                        });
                    });
                });

                /* Apply relative dates to newly injected cards */
                ruGrid.querySelectorAll('.ru-date[data-date]').forEach(function (el) {
                    var ds = el.getAttribute('data-date');
                    if (ds) {
                        var relative = formatRelativeDate(ds);
                        if (relative) {
                            var textEl = el.querySelector('.ru-date-text');
                            if (textEl) textEl.textContent = relative;
                        }
                    }
                });
            }
        })();
    }

    /* -----------------------------------------
     * FACETED SEARCH — Section filters
     * ----------------------------------------- */
    var searchFacetsAdded = false;

    function addSearchFacets() {
        if (searchFacetsAdded) return;
        var searchHeader = document.querySelector('.search-modal-header');
        if (!searchHeader) return;

        var facetBar = document.createElement('div');
        facetBar.className = 'search-facets';
        facetBar.innerHTML =
            '<button class="search-facet search-facet-active" data-facet="">All Sections</button>' +
            '<button class="search-facet" data-facet="Getting Started">Getting Started</button>' +
            '<button class="search-facet" data-facet="Data">Data</button>' +
            '<button class="search-facet" data-facet="Tools">Tools</button>' +
            '<button class="search-facet" data-facet="Support">Support</button>';

        searchHeader.appendChild(facetBar);
        searchFacetsAdded = true;

        facetBar.querySelectorAll('.search-facet').forEach(function (facetBtn) {
            facetBtn.addEventListener('click', function () {
                facetBar.querySelectorAll('.search-facet').forEach(function (f) { f.classList.remove('search-facet-active'); });
                this.classList.add('search-facet-active');
                /* Re-trigger search with current query */
                var q = document.getElementById('searchModalInput');
                if (q && q.value.trim().length >= 2) {
                    performFacetedSearch(q.value.trim(), this.getAttribute('data-facet'));
                }
            });
        });
    }

    function performFacetedSearch(query, facet) {
        showSearchState('loading');

        var cql = 'type=page AND space="' + spaceKey + '" AND (title~"' + query + '" OR text~"' + query + '")';
        if (facet) {
            cql += ' AND ancestor="' + facet + '"';
        }

        var url = contextPath + '/rest/api/content/search?cql=' + encodeURIComponent(cql) + '&limit=10&expand=body.view,space,ancestors';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-Atlassian-Token', 'nocheck');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    renderResults(data.results || [], query);
                } catch (e) {
                    showSearchState('noResults');
                }
            } else {
                showSearchState('noResults');
            }
        };
        xhr.onerror = function () { showSearchState('noResults'); };
        xhr.send();
    }

    /* Inject facets when search modal opens */
    var origOpen = openSearchModal;
    openSearchModal = function () {
        origOpen();
        addSearchFacets();
    };
    /* Re-bind buttons */
    if (openSearchBtn) {
        openSearchBtn.removeEventListener('click', origOpen);
        openSearchBtn.addEventListener('click', openSearchModal);
    }
    if (openSearchBtnMobile) {
        openSearchBtnMobile.removeEventListener('click', origOpen);
        openSearchBtnMobile.addEventListener('click', openSearchModal);
    }

    /* -----------------------------------------
     * 404 INTERACTIVE PHYSICS PAGE (Matter.js)
     * Bouncing SKAO pictorial marks with mouse
     * repulsion and drag-and-drop interaction
     * ----------------------------------------- */
    var nfContainer = document.getElementById('notFoundContainer');
    var nfCanvas = document.getElementById('nfCanvas');

    if (nfContainer && nfCanvas && typeof Matter !== 'undefined') {
        /* Hide header/footer — 404 is full-screen */
        var header = document.querySelector('.skao-header');
        var footer = document.querySelector('.skao-footer');
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';

        /* Resolve the real SKAO pictorial mark from theme assets */
        var themeBase = (function () {
            var link = document.querySelector('link[href*="/css/style.css"]');
            if (link) return link.href.replace('/css/style.css', '');
            return '';
        })();
        var markTextureURL = themeBase + '/images/skao-mark.png';

        /* Preload the texture before starting physics */
        var markImg = new Image();
        markImg.src = markTextureURL;
        markImg.onload = function () {
            initPhysics404(markTextureURL);
        };
    }

    function initPhysics404(textureURL) {
        var canvas = document.getElementById('nfCanvas');
        var container = document.getElementById('notFoundContainer');
        if (!canvas || !container) return;

        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Runner = Matter.Runner;

        /* Size canvas to container */
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;

        /* Create engine — tuned for snappy, satisfying physics */
        var engine = Engine.create({
            gravity: { x: 0, y: 0.9 },
            enableSleeping: false,
            constraintIterations: 3,
            positionIterations: 6,
            velocityIterations: 4,
            timing: { timeScale: 1 }
        });

        /* Create renderer */
        var render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: canvas.width,
                height: canvas.height,
                wireframes: false,
                background: 'transparent'
            }
        });

        /* Boundary walls — at exact visible edges */
        var wallT = 50;
        var cw = canvas.width, ch = canvas.height;
        var walls = [
            Bodies.rectangle(cw / 2, ch - wallT / 2, cw, wallT, { isStatic: true, restitution: 0.7, render: { fillStyle: 'transparent' } }),   /* bottom */
            Bodies.rectangle(cw / 2, wallT / 2, cw, wallT, { isStatic: true, restitution: 0.7, render: { fillStyle: 'transparent' } }),          /* top */
            Bodies.rectangle(wallT / 2, ch / 2, wallT, ch, { isStatic: true, restitution: 0.7, render: { fillStyle: 'transparent' } }),          /* left */
            Bodies.rectangle(cw - wallT / 2, ch / 2, wallT, ch, { isStatic: true, restitution: 0.7, render: { fillStyle: 'transparent' } })     /* right */
        ];
        World.add(engine.world, walls);

        /* Create SKAO marks */
        var markSize = 50;
        var markRadius = markSize / 2;
        var numMarks = 30;
        var marks = [];

        var groundY = ch - 150;
        var marksPerRow = 6;
        var spacing = markSize * 1.5;

        for (var i = 0; i < numMarks; i++) {
            var row = Math.floor(i / marksPerRow);
            var col = i % marksPerRow;
            var x = 150 + col * spacing + (row % 2) * (spacing / 2);
            var y = groundY - row * (markSize * 0.9);

            var mark = Bodies.circle(x, y, markRadius, {
                restitution: 0.7,
                friction: 0.02,
                frictionAir: 0.01,
                density: 0.0014,
                inertia: Infinity,
                slop: 0.05,
                render: {
                    sprite: {
                        texture: textureURL,
                        xScale: markSize / 200,
                        yScale: markSize / 200
                    }
                }
            });
            marks.push(mark);
        }
        World.add(engine.world, marks);

        /* Mouse constraint — instant drag response */
        var mouse = Mouse.create(canvas);
        var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 1.0,
                damping: 0.05,
                render: { visible: false }
            }
        });
        World.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        /* Track mouse position for repulsion */
        var mousePos = { x: -1000, y: -1000 };
        var lastMousePos = { x: -1000, y: -1000 };

        canvas.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            lastMousePos.x = mousePos.x;
            lastMousePos.y = mousePos.y;
            mousePos.x = e.clientX - rect.left;
            mousePos.y = e.clientY - rect.top;
        });
        canvas.addEventListener('mouseleave', function () {
            mousePos.x = -1000; mousePos.y = -1000;
            lastMousePos.x = -1000; lastMousePos.y = -1000;
        });

        /* Mouse repulsion — satisfying force with natural falloff */
        Events.on(engine, 'beforeUpdate', function () {
            for (var m = 0; m < marks.length; m++) {
                var mk = marks[m];
                var dx = mk.position.x - mousePos.x;
                var dy = mk.position.y - mousePos.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                var mvx = mousePos.x - lastMousePos.x;
                var mvy = mousePos.y - lastMousePos.y;
                var mSpeed = Math.sqrt(mvx * mvx + mvy * mvy);

                if (dist < 160 && dist > 0) {
                    var falloff = Math.pow((160 - dist) / 160, 1.5);
                    var baseForce = 0.016 * falloff;
                    var velBoost = 1 + (mSpeed * 0.08);
                    var force = baseForce * velBoost;

                    Body.applyForce(mk, mk.position, {
                        x: (dx / dist) * force,
                        y: (dy / dist) * force
                    });
                }
            }
            lastMousePos.x = mousePos.x;
            lastMousePos.y = mousePos.y;
        });

        /* Start engine + renderer */
        var runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        /* Handle window resize */
        window.addEventListener('resize', function () {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            var w = canvas.width, h = canvas.height;

            Body.setPosition(walls[0], { x: w / 2, y: h - wallT / 2 });
            Body.setVertices(walls[0], Bodies.rectangle(w / 2, h - wallT / 2, w, wallT).vertices);
            Body.setPosition(walls[1], { x: w / 2, y: wallT / 2 });
            Body.setVertices(walls[1], Bodies.rectangle(w / 2, wallT / 2, w, wallT).vertices);
            Body.setPosition(walls[2], { x: wallT / 2, y: h / 2 });
            Body.setVertices(walls[2], Bodies.rectangle(wallT / 2, h / 2, wallT, h).vertices);
            Body.setPosition(walls[3], { x: w - wallT / 2, y: h / 2 });
            Body.setVertices(walls[3], Bodies.rectangle(w - wallT / 2, h / 2, wallT, h).vertices);

            render.bounds.max.x = w;
            render.bounds.max.y = h;
            render.options.width = w;
            render.options.height = h;
            render.canvas.width = w;
            render.canvas.height = h;
        });
    }

});
