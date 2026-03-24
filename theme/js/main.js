/* ============================================= */
/* SKAO Science Users Portal — Scroll Viewport   */
/* main.js v0.6 — Full interactivity              */
/* ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* -----------------------------------------
     * ANNOUNCEMENT BANNER DISMISS
     * ----------------------------------------- */
    var dismissBtn = document.querySelector('.announcement-close');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
            var banner = document.getElementById('announcementBanner');
            if (banner) {
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

});
