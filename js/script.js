let currentMagazine = 0;
let zoomLevel = 1;
let pageFlip = null;

// Magazine data for 8 volumes (pages populated from images folder)
const magazines = [
    {
        title: 'Volume 1',
        issue: 'Issue 1 • 2024',
        pages: [
            'images/ARCHTRAITS VOL 1 (1).jpg','images/ARCHTRAITS VOL 1 (2).jpg','images/ARCHTRAITS VOL 1 (3).jpg','images/ARCHTRAITS VOL 1 (4).jpg','images/ARCHTRAITS VOL 1 (5).jpg','images/ARCHTRAITS VOL 1 (6).jpg','images/ARCHTRAITS VOL 1 (7).jpg','images/ARCHTRAITS VOL 1 (8).jpg','images/ARCHTRAITS VOL 1 (9).jpg','images/ARCHTRAITS VOL 1 (10).jpg','images/ARCHTRAITS VOL 1 (11).jpg','images/ARCHTRAITS VOL 1 (12).jpg','images/ARCHTRAITS VOL 1 (13).jpg','images/ARCHTRAITS VOL 1 (14).jpg','images/ARCHTRAITS VOL 1 (15).jpg','images/ARCHTRAITS VOL 1 (16).jpg','images/ARCHTRAITS VOL 1 (17).jpg','images/ARCHTRAITS VOL 1 (18).jpg','images/ARCHTRAITS VOL 1 (19).jpg','images/ARCHTRAITS VOL 1 (20).jpg','images/ARCHTRAITS VOL 1 (21).jpg','images/ARCHTRAITS VOL 1 (22).jpg','images/ARCHTRAITS VOL 1 (23).jpg','images/ARCHTRAITS VOL 1 (24).jpg','images/ARCHTRAITS VOL 1 (25).jpg','images/ARCHTRAITS VOL 1 (26).jpg','images/ARCHTRAITS VOL 1 (27).jpg','images/ARCHTRAITS VOL 1 (28).jpg'
        ]
    },
    {
        title: 'Volume 2',
        issue: 'Issue 2 • 2024',
        pages: [
            'images/ARCHTRAITS VOL 2 (1).jpg','images/ARCHTRAITS VOL 2 (2).jpg','images/ARCHTRAITS VOL 2 (3).jpg','images/ARCHTRAITS VOL 2 (4).jpg','images/ARCHTRAITS VOL 2 (5).jpg','images/ARCHTRAITS VOL 2 (6).jpg','images/ARCHTRAITS VOL 2 (7).jpg','images/ARCHTRAITS VOL 2 (8).jpg','images/ARCHTRAITS VOL 2 (9).jpg','images/ARCHTRAITS VOL 2 (10).jpg','images/ARCHTRAITS VOL 2 (11).jpg','images/ARCHTRAITS VOL 2 (12).jpg','images/ARCHTRAITS VOL 2 (13).jpg','images/ARCHTRAITS VOL 2 (14).jpg','images/ARCHTRAITS VOL 2 (15).jpg','images/ARCHTRAITS VOL 2 (16).jpg','images/ARCHTRAITS VOL 2 (17).jpg','images/ARCHTRAITS VOL 2 (18).jpg','images/ARCHTRAITS VOL 2 (19).jpg','images/ARCHTRAITS VOL 2 (20).jpg','images/ARCHTRAITS VOL 2 (21).jpg','images/ARCHTRAITS VOL 2 (22).jpg','images/ARCHTRAITS VOL 2 (23).jpg','images/ARCHTRAITS VOL 2 (24).jpg','images/ARCHTRAITS VOL 2 (25).jpg','images/ARCHTRAITS VOL 2 (26).jpg','images/ARCHTRAITS VOL 2 (27).jpg','images/ARCHTRAITS VOL 2 (28).jpg'
        ]
    },
    {
        title: 'Volume 3',
        issue: 'Issue 3 • 2024',
        pages: [
            'images/ARCHTRAITS VOL 3 (1).jpg','images/ARCHTRAITS VOL 3 (2).jpg','images/ARCHTRAITS VOL 3 (3).jpg','images/ARCHTRAITS VOL 3 (4).jpg','images/ARCHTRAITS VOL 3 (5).jpg','images/ARCHTRAITS VOL 3 (6).jpg','images/ARCHTRAITS VOL 3 (7).jpg','images/ARCHTRAITS VOL 3 (8).jpg','images/ARCHTRAITS VOL 3 (9).jpg','images/ARCHTRAITS VOL 3 (10).jpg','images/ARCHTRAITS VOL 3 (11).jpg','images/ARCHTRAITS VOL 3 (12).jpg','images/ARCHTRAITS VOL 3 (13).jpg','images/ARCHTRAITS VOL 3 (14).jpg','images/ARCHTRAITS VOL 3 (15).jpg','images/ARCHTRAITS VOL 3 (16).jpg','images/ARCHTRAITS VOL 3 (17).jpg','images/ARCHTRAITS VOL 3 (18).jpg','images/ARCHTRAITS VOL 3 (19).jpg','images/ARCHTRAITS VOL 3 (20).jpg','images/ARCHTRAITS VOL 3 (21).jpg','images/ARCHTRAITS VOL 3 (22).jpg','images/ARCHTRAITS VOL 3 (23).jpg','images/ARCHTRAITS VOL 3 (24).jpg','images/ARCHTRAITS VOL 3 (25).jpg','images/ARCHTRAITS VOL 3 (26).jpg','images/ARCHTRAITS VOL 3 (27).jpg','images/ARCHTRAITS VOL 3 (28).jpg'
        ]
    },
    {
        title: 'Volume 4',
        issue: 'Issue 4 • 2024',
        pages: [
            'images/ARCHTRAITS VOL 4 (1).jpg','images/ARCHTRAITS VOL 4 (2).jpg','images/ARCHTRAITS VOL 4 (3).jpg','images/ARCHTRAITS VOL 4 (4).jpg','images/ARCHTRAITS VOL 4 (5).jpg','images/ARCHTRAITS VOL 4 (6).jpg','images/ARCHTRAITS VOL 4 (7).jpg','images/ARCHTRAITS VOL 4 (8).jpg','images/ARCHTRAITS VOL 4 (9).jpg','images/ARCHTRAITS VOL 4 (10).jpg','images/ARCHTRAITS VOL 4 (11).jpg','images/ARCHTRAITS VOL 4 (12).jpg','images/ARCHTRAITS VOL 4 (13).jpg','images/ARCHTRAITS VOL 4 (14).jpg','images/ARCHTRAITS VOL 4 (15).jpg','images/ARCHTRAITS VOL 4 (16).jpg','images/ARCHTRAITS VOL 4 (17).jpg','images/ARCHTRAITS VOL 4 (18).jpg','images/ARCHTRAITS VOL 4 (19).jpg','images/ARCHTRAITS VOL 4 (20).jpg','images/ARCHTRAITS VOL 4 (21).jpg','images/ARCHTRAITS VOL 4 (22).jpg','images/ARCHTRAITS VOL 4 (23).jpg','images/ARCHTRAITS VOL 4 (24).jpg','images/ARCHTRAITS VOL 4 (25).jpg','images/ARCHTRAITS VOL 4 (26).jpg','images/ARCHTRAITS VOL 4 (27).jpg','images/ARCHTRAITS VOL 4 (28).jpg'
        ]
    },
    {
        title: 'Volume 5',
        issue: 'Issue 5 • 2025',
        pages: [
            'images/ARCHTRAITS VOL 5 (1).jpg','images/ARCHTRAITS VOL 5 (2).jpg','images/ARCHTRAITS VOL 5 (3).jpg','images/ARCHTRAITS VOL 5 (4).jpg','images/ARCHTRAITS VOL 5 (5).jpg','images/ARCHTRAITS VOL 5 (6).jpg','images/ARCHTRAITS VOL 5 (7).jpg','images/ARCHTRAITS VOL 5 (8).jpg','images/ARCHTRAITS VOL 5 (9).jpg','images/ARCHTRAITS VOL 5 (10).jpg','images/ARCHTRAITS VOL 5 (11).jpg','images/ARCHTRAITS VOL 5 (12).jpg','images/ARCHTRAITS VOL 5 (13).jpg','images/ARCHTRAITS VOL 5 (14).jpg','images/ARCHTRAITS VOL 5 (15).jpg','images/ARCHTRAITS VOL 5 (16).jpg','images/ARCHTRAITS VOL 5 (17).jpg','images/ARCHTRAITS VOL 5 (18).jpg','images/ARCHTRAITS VOL 5 (19).jpg','images/ARCHTRAITS VOL 5 (20).jpg','images/ARCHTRAITS VOL 5 (21).jpg','images/ARCHTRAITS VOL 5 (22).jpg','images/ARCHTRAITS VOL 5 (23).jpg','images/ARCHTRAITS VOL 5 (24).jpg','images/ARCHTRAITS VOL 5 (25).jpg','images/ARCHTRAITS VOL 5 (26).jpg','images/ARCHTRAITS VOL 5 (27).jpg','images/ARCHTRAITS VOL 5 (28).jpg'
        ]
    },
    {
        title: 'Volume 6',
        issue: 'Issue 6 • 2025',
        pages: [
            'images/ARCHTRAITS VOL 6 (1).jpg','images/ARCHTRAITS VOL 6 (2).jpg','images/ARCHTRAITS VOL 6 (3).jpg','images/ARCHTRAITS VOL 6 (4).jpg','images/ARCHTRAITS VOL 6 (5).jpg','images/ARCHTRAITS VOL 6 (6).jpg','images/ARCHTRAITS VOL 6 (7).jpg','images/ARCHTRAITS VOL 6 (8).jpg','images/ARCHTRAITS VOL 6 (9).jpg','images/ARCHTRAITS VOL 6 (10).jpg','images/ARCHTRAITS VOL 6 (11).jpg','images/ARCHTRAITS VOL 6 (12).jpg','images/ARCHTRAITS VOL 6 (13).jpg','images/ARCHTRAITS VOL 6 (14).jpg','images/ARCHTRAITS VOL 6 (15).jpg','images/ARCHTRAITS VOL 6 (16).jpg','images/ARCHTRAITS VOL 6 (17).jpg','images/ARCHTRAITS VOL 6 (18).jpg','images/ARCHTRAITS VOL 6 (19).jpg','images/ARCHTRAITS VOL 6 (20).jpg','images/ARCHTRAITS VOL 6 (21).jpg','images/ARCHTRAITS VOL 6 (22).jpg','images/ARCHTRAITS VOL 6 (23).jpg','images/ARCHTRAITS VOL 6 (24).jpg','images/ARCHTRAITS VOL 6 (25).jpg','images/ARCHTRAITS VOL 6 (26).jpg','images/ARCHTRAITS VOL 6 (27).jpg','images/ARCHTRAITS VOL 6 (28).jpg'
        ]
    },
    {
        title: 'Volume 7',
        issue: 'Issue 7 • 2025',
        pages: [
            'images/ARCHTRAITS VOL 7 (1).jpg','images/ARCHTRAITS VOL 7 (2).jpg','images/ARCHTRAITS VOL 7 (3).jpg','images/ARCHTRAITS VOL 7 (4).jpg','images/ARCHTRAITS VOL 7 (5).jpg','images/ARCHTRAITS VOL 7 (6).jpg','images/ARCHTRAITS VOL 7 (7).jpg','images/ARCHTRAITS VOL 7 (8).jpg','images/ARCHTRAITS VOL 7 (9).jpg','images/ARCHTRAITS VOL 7 (10).jpg','images/ARCHTRAITS VOL 7 (11).jpg','images/ARCHTRAITS VOL 7 (12).jpg','images/ARCHTRAITS VOL 7 (13).jpg','images/ARCHTRAITS VOL 7 (14).jpg','images/ARCHTRAITS VOL 7 (15).jpg','images/ARCHTRAITS VOL 7 (16).jpg','images/ARCHTRAITS VOL 7 (17).jpg','images/ARCHTRAITS VOL 7 (18).jpg','images/ARCHTRAITS VOL 7 (19).jpg','images/ARCHTRAITS VOL 7 (20).jpg','images/ARCHTRAITS VOL 7 (21).jpg','images/ARCHTRAITS VOL 7 (22).jpg','images/ARCHTRAITS VOL 7 (23).jpg','images/ARCHTRAITS VOL 7 (24).jpg','images/ARCHTRAITS VOL 7 (25).jpg','images/ARCHTRAITS VOL 7 (26).jpg','images/ARCHTRAITS VOL 7 (27).jpg','images/ARCHTRAITS VOL 7 (28).jpg'
        ]
    },
    {
        title: 'Volume 8',
        issue: 'Issue 8 • 2026',
        pages: [
            'images/ARCHTRAITS VOL 8 (1).jpg','images/ARCHTRAITS VOL 8 (2).jpg','images/ARCHTRAITS VOL 8 (3).jpg','images/ARCHTRAITS VOL 8 (4).jpg','images/ARCHTRAITS VOL 8 (5).jpg','images/ARCHTRAITS VOL 8 (6).jpg','images/ARCHTRAITS VOL 8 (7).jpg','images/ARCHTRAITS VOL 8 (8).jpg','images/ARCHTRAITS VOL 8 (9).jpg','images/ARCHTRAITS VOL 8 (10).jpg','images/ARCHTRAITS VOL 8 (11).jpg','images/ARCHTRAITS VOL 8 (12).jpg','images/ARCHTRAITS VOL 8 (13).jpg','images/ARCHTRAITS VOL 8 (14).jpg','images/ARCHTRAITS VOL 8 (15).jpg','images/ARCHTRAITS VOL 8 (16).jpg','images/ARCHTRAITS VOL 8 (17).jpg','images/ARCHTRAITS VOL 8 (18).jpg','images/ARCHTRAITS VOL 8 (19).jpg','images/ARCHTRAITS VOL 8 (20).jpg','images/ARCHTRAITS VOL 8 (21).jpg','images/ARCHTRAITS VOL 8 (22).jpg','images/ARCHTRAITS VOL 8 (23).jpg','images/ARCHTRAITS VOL 8 (24).jpg','images/ARCHTRAITS VOL 8 (25).jpg','images/ARCHTRAITS VOL 8 (26).jpg','images/ARCHTRAITS VOL 8 (27).jpg','images/ARCHTRAITS VOL 8 (28).jpg'
        ]
    }
];

function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('active');
}

function handleMenuClick(item) {
    const portfolioPage = document.getElementById('portfolioPage');
    const magazinesPage = document.getElementById('magazinesPage');
    const contactPage = document.getElementById('contactPage');

    portfolioPage.style.display = 'none';
    magazinesPage.style.display = 'none';
    contactPage.style.display = 'none';

    if (item === 'Portfolio') {
        portfolioPage.style.display = 'block';
    } else if (item === 'Magazines') {
        magazinesPage.style.display = 'block';
    } else if (item === 'Contact') {
        contactPage.style.display = 'block';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector('.form-submit');
    btn.textContent = 'Sent!';
    btn.disabled = true;
    setTimeout(() => {
        event.target.reset();
        btn.textContent = 'Submit';
        btn.disabled = false;
    }, 3000);
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const toggle = document.querySelector('.menu-toggle');
    if (!menu || !toggle) return;
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('active');
    }
});

function openReader(magazineIndex) {
    currentMagazine = magazineIndex;
    const overlay = document.getElementById('readerOverlay');
    const container = document.getElementById('bookSpread');
    const magazine = magazines[magazineIndex];

    overlay.classList.add('active');
    zoomLevel = 1;

    // Clear previous content
    container.innerHTML = '';

    // Create pages
    if (magazine.pages && magazine.pages.length > 0) {
        magazine.pages.forEach((imagePath, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            pageDiv.innerHTML = `<img src="${imagePath}" alt="Page ${index + 1}" style="width: 100%; height: 100%; object-fit: cover;">`;
            container.appendChild(pageDiv);
        });

        // Initialize PageFlip
        const isVolume8 = magazineIndex === 7;
        pageFlip = new St.PageFlip(container, {
            width: isVolume8 ? 2550 : 850,
            height: isVolume8 ? 3300 : 1100,
            size: 'stretch',
            minWidth: 100,
            maxWidth: 2550,
            minHeight: 150,
            maxHeight: 3300,
            showCover: true,
            mobileScrollSupport: false,
            swipeDistance: 30,
            clickEventForward: true,
            usePortrait: false,
            startPage: 0,
            drawShadow: true,
            flippingTime: 600,
            useMouseEvents: true,
            autoSize: true,
            maxShadowOpacity: 0.5,
            showPageCorners: true,
            disableFlipByClick: false
        });

        pageFlip.loadFromHTML(container.querySelectorAll('.page'));

        // Update page indicator on flip
        pageFlip.on('flip', () => {
            updatePageIndicator();
        });

        updatePageIndicator();
    }
}

function updatePageIndicator() {
    if (!pageFlip) return;

    const currentPage = pageFlip.getCurrentPageIndex();
    const totalPages = magazines[currentMagazine].pages.length;

    const pageIndicator = document.getElementById('pageIndicator');
    if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages - 1;
}

function closeReader() {
    const overlay = document.getElementById('readerOverlay');
    overlay.classList.remove('active');
    if (pageFlip) {
        pageFlip.destroy();
        pageFlip = null;
    }
}

function nextPage() {
    if (pageFlip) {
        pageFlip.flipNext();
    }
}

function previousPage() {
    if (pageFlip) {
        pageFlip.flipPrev();
    }
}


function zoomIn() {
    if (zoomLevel < 1.5) {
        zoomLevel += 0.1;
        const container = document.getElementById('flipbook-container');
        container.style.transform = `scale(${zoomLevel})`;
    }
}

function zoomOut() {
    if (zoomLevel > 0.7) {
        zoomLevel -= 0.1;
        const container = document.getElementById('flipbook-container');
        container.style.transform = `scale(${zoomLevel})`;
    }
}

function toggleFullscreen() {
    const elem = document.getElementById('readerOverlay');
    const btn = document.getElementById('fullscreenBtn');
   
    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            btn.textContent = 'Exit Fullscreen';
        }).catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            btn.textContent = 'Fullscreen';
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    const overlay = document.getElementById('readerOverlay');
    if (!overlay.classList.contains('active')) return;

    switch(e.key) {
        case 'Escape':
            closeReader();
            break;
        case 'ArrowRight':
            nextPage();
            break;
        case 'ArrowLeft':
            previousPage();
            break;
        case '+':
        case '=':
            zoomIn();
            break;
        case '-':
        case '_':
            zoomOut();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
    }
});

// Prevent body scroll when reader is open
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            const overlay = document.getElementById('readerOverlay');
            if (overlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
});
observer.observe(document.getElementById('readerOverlay'), { attributes: true });

// Tap-to-flip for mobile: tap right half = next page, tap left half = previous page
(function () {
    let startX = 0, startY = 0, startTime = 0;
    const overlay = document.getElementById('readerOverlay');

    overlay.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    }, { passive: true });

    overlay.addEventListener('touchend', function (e) {
        if (!pageFlip) return;
        // Don't intercept taps on buttons or links (close, nav, zoom)
        if (e.target.closest('button, a')) return;
        const t = e.changedTouches[0];
        const dx = Math.abs(t.clientX - startX);
        const dy = Math.abs(t.clientY - startY);
        const dt = Date.now() - startTime;
        // Only act on short taps with minimal movement (not swipes)
        if (dx < 20 && dy < 20 && dt < 300) {
            if (t.clientX > window.innerWidth / 2) {
                pageFlip.flipNext();
            } else {
                pageFlip.flipPrev();
            }
        }
    }, { passive: true });
}());