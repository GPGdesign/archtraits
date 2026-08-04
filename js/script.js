// Loading screen — show for at least 1.2s, then fade out
(function () {
    const loader = document.getElementById('loader');
    const startTime = Date.now();
    const minDisplay = 2300;

    window.addEventListener('load', function () {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDisplay - elapsed);
        setTimeout(function () {
            // Step 1: fade the logo out
            const logo = document.getElementById('loader-logo');
            logo.style.transition = 'opacity 0.4s ease';
            logo.style.opacity = '0';
            // Step 2: 0.4s later, fade the black screen
            setTimeout(function () {
                loader.classList.add('fade-out');
                setTimeout(function () { loader.remove(); }, 800);
            }, 400);
        }, remaining);
    });
}());

let currentMagazine = 0;
let zoomLevel = 1;
let pageFlip = null;
let homeSlideshowInterval = null;
let homeSlideshowCurrentIndex = 0;

// Magazine data for 9 volumes (pages populated from images folder)
const magazines = [
    {
        title: 'Volume 1',
        slug: 'Archtraits Vol 1',
        issue: 'Issue 1 • 2024',
        pages: [
            'images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (1).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (2).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (3).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (4).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (5).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (6).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (7).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (8).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (9).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (10).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (11).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (12).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (13).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (14).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (15).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (16).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (17).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (18).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (19).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (20).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (21).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (22).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (23).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (24).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (25).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (26).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (27).webp','images/magazines/Archtraits Vol 1/ARCHTRAITS VOL 1 (28).webp'
        ]
    },
    {
        title: 'Volume 2',
        slug: 'Archtraits Vol 2',
        issue: 'Issue 2 • 2024',
        pages: [
            'images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (1).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (2).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (3).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (4).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (5).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (6).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (7).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (8).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (9).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (10).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (11).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (12).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (13).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (14).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (15).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (16).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (17).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (18).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (19).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (20).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (21).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (22).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (23).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (24).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (25).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (26).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (27).webp','images/magazines/Archtraits Vol 2/ARCHTRAITS VOL 2 (28).webp'
        ]
    },
    {
        title: 'Volume 3',
        slug: 'Archtraits Vol 3',
        issue: 'Issue 3 • 2024',
        pages: [
            'images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (1).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (2).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (3).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (4).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (5).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (6).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (7).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (8).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (9).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (10).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (11).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (12).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (13).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (14).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (15).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (16).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (17).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (18).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (19).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (20).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (21).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (22).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (23).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (24).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (25).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (26).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (27).webp','images/magazines/Archtraits Vol 3/ARCHTRAITS VOL 3 (28).webp'
        ]
    },
    {
        title: 'Volume 4',
        slug: 'Archtraits Vol 4',
        issue: 'Issue 4 • 2024',
        pages: [
            'images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (1).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (2).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (3).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (4).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (5).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (6).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (7).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (8).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (9).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (10).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (11).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (12).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (13).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (14).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (15).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (16).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (17).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (18).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (19).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (20).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (21).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (22).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (23).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (24).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (25).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (26).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (27).webp','images/magazines/Archtraits Vol 4/ARCHTRAITS VOL 4 (28).webp'
        ]
    },
    {
        title: 'Volume 5',
        slug: 'Archtraits Vol 5',
        issue: 'Issue 5 • 2025',
        pages: [
            'images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (1).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (2).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (3).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (4).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (5).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (6).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (7).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (8).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (9).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (10).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (11).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (12).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (13).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (14).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (15).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (16).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (17).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (18).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (19).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (20).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (21).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (22).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (23).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (24).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (25).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (26).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (27).webp','images/magazines/Archtraits Vol 5/ARCHTRAITS VOL 5 (28).webp'
        ]
    },
    {
        title: 'Volume 6',
        slug: 'Archtraits Vol 6',
        issue: 'Issue 6 • 2025',
        pages: [
            'images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (1).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (2).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (3).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (4).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (5).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (6).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (7).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (8).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (9).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (10).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (11).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (12).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (13).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (14).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (15).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (16).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (17).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (18).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (19).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (20).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (21).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (22).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (23).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (24).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (25).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (26).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (27).webp','images/magazines/Archtraits Vol 6/ARCHTRAITS VOL 6 (28).webp'
        ]
    },
    {
        title: 'Volume 7',
        slug: 'Archtraits Vol 7',
        issue: 'Issue 7 • 2025',
        pages: [
            'images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (1).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (2).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (3).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (4).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (5).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (6).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (7).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (8).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (9).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (10).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (11).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (12).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (13).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (14).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (15).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (16).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (17).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (18).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (19).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (20).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (21).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (22).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (23).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (24).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (25).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (26).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (27).webp','images/magazines/Archtraits Vol 7/ARCHTRAITS VOL 7 (28).webp'
        ]
    },
    {
        title: 'Volume 8',
        slug: 'Archtraits Vol 8',
        issue: 'Issue 8 • 2026',
        pages: [
            'images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (1).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (2).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (3).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (4).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (5).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (6).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (7).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (8).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (9).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (10).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (11).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (12).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (13).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (14).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (15).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (16).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (17).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (18).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (19).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (20).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (21).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (22).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (23).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (24).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (25).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (26).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (27).webp','images/magazines/Archtraits Vol 8/ARCHTRAITS VOL 8 (28).webp'
        ]
    },
    {
        title: 'Volume 9',
        slug: 'Archtraits Vol 9',
        issue: 'Issue 9 • 2026',
        pages: [
            'images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (1).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (2).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (3).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (4).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (5).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (6).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (7).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (8).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (9).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (10).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (11).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (12).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (13).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (14).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (15).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (16).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (17).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (18).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (19).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (20).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (21).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (22).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (23).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (24).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (25).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (26).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (27).webp','images/magazines/Archtraits Vol 9/ARCHTRAITS VOL 9 (28).webp'
        ]
    }
];

// Placeholder project data reusing existing portfolio photos and known
// locations — swap in real project names/locations/images later.
const portfolioProjects = [
    {
        slug: 'palazzo-della-civiltà-italiana',
        name: 'Palazzo della Civiltà Italiana',
        location: 'Rome',
        description: 'Architecture photography of Palazzo della Civiltà Italiana, the "Square Colosseum," in Rome, Italy, exploring its rhythmic travertine arches and monumental symmetry.',
        cover: { src: 'images/portfolio/palazzo-della-civiltà-italiana/7.webp', alt: "Woman in white peeking around a travertine column at Palazzo della Civiltà Italiana, with a classical statue in the background, Rome, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/1.webp', alt: "Palazzo della Civiltà Italiana's travertine facade with its inscribed motto, rising above pine trees against a clear sky, Rome, by ARCHTRAITS" },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/2.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/3.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/4.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/5.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/6.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/7.webp', alt: "Woman in white peeking around a travertine column at Palazzo della Civiltà Italiana, with a classical statue in the background, Rome, by ARCHTRAITS" },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/8.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/9.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/10.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/11.webp', alt: "Woman in a white dress walking through Palazzo della Civiltà Italiana's travertine colonnade at golden hour, Rome, by ARCHTRAITS" },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/12.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/13.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/14.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/15.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/16.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/17.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/palazzo-della-civiltà-italiana/18.webp', alt: 'Architecture photography of Palazzo della Civiltà Italiana, Rome, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'miami-dade-college',
        name: 'Miami Dade College Academic Support Center',
        location: 'Florida',
        description: 'Architecture photography of the Miami Dade College Academic Support Center in Florida, exploring its minimalist concrete forms and cantilevered volumes.',
        images: [
            { src: 'images/portfolio/miami-dade-college/1.webp', alt: 'Dramatic concrete cantilevered balconies at Miami Dade College with a woman standing on the lower balcony, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/2.webp', alt: 'Woman standing at the edge of an angular concrete stairwell landing, looking up through a geometric cutout, Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/3.webp', alt: 'Woman leaning over the edge of a cantilevered concrete balcony against a clear blue sky at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/4.webp', alt: 'Low-angle view looking up at a woman leaning over a concrete railing amid converging cantilevered beams, Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/5.webp', alt: 'Multiple-exposure composite of a woman descending a concrete staircase in sequential positions at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/6.webp', alt: 'Woman standing at a staircase landing amid the concrete structure of Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/7.webp', alt: 'Woman in sunglasses standing atop an angular concrete staircase against a clear sky at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/8.webp', alt: 'Close portrait of a woman leaning on a diagonal concrete railing in dramatic sunlight at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/9.webp', alt: 'Wide view of cantilevered concrete balconies with a woman standing small amid the dramatic architecture, Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/10.webp', alt: 'Woman standing on a balcony framed by converging concrete beams at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/11.webp', alt: 'Symmetric view looking up at converging concrete beams meeting at a corner where a woman stands, Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/12.webp', alt: 'Close portrait of a woman seated on a staircase in soft directional light at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/13.webp', alt: 'Aerial view down a narrow gap between concrete fins at a woman descending the stairs below, Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/14.webp', alt: 'Aerial view of a woman walking across a paved plaza with a long dramatic shadow at Miami Dade College, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/miami-dade-college/15.webp', alt: 'Aerial view of a woman walking across a paved plaza beneath a lamppost shadow at Miami Dade College, Florida, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'cantina-antinori-tuscany',
        name: 'Cantina Antinori',
        location: 'Tuscany',
        description: 'Architecture photography of Cantina Antinori, a winery in Tuscany, Italy, exploring the interplay between its cantilevered bronze roof and the surrounding vineyard.',
        cover: { src: 'images/portfolio/cantina-antinori-tuscany/1.webp', alt: "Looking up through vineyard leaves at Cantina Antinori's spiraling corten steel staircase and cantilevered roof, Tuscany, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/cantina-antinori-tuscany/1.webp', alt: "Looking up through vineyard leaves at Cantina Antinori's spiraling corten steel staircase and cantilevered roof, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/2.webp', alt: "Wide view of Cantina Antinori's spiraling corten steel staircase beneath its sweeping cantilevered roof, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/3.webp', alt: "Looking up through the oval skylight at Cantina Antinori's spiraling staircase levels, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/4.webp', alt: "Woman leaning on a railing of Cantina Antinori's spiral staircase, with the cantilevered roof and vineyard behind her, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/5.webp', alt: "Looking up at Cantina Antinori's spiraling corten steel staircase and oval skylight, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/6.webp', alt: "Aerial view down the center of Cantina Antinori's spiraling corten steel staircase, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/7.webp', alt: "Cantina Antinori's spiraling corten steel staircase beneath its cantilevered roof, overlooking the Tuscan hills, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/8.webp', alt: "Split view of Cantina Antinori's cantilevered roof and glass facade beside rows of vines, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/9.webp', alt: "Cantina Antinori's curved bronze roof and spiral staircase seen from the terrace overlooking the vineyard, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/10.webp', alt: "Cantina Antinori's sweeping roofline and spiral staircase rising above the vineyard at dusk, Tuscany, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/11.webp', alt: "Detail of Cantina Antinori's spiral staircase and cantilevered roof against the Tuscan hills, by ARCHTRAITS" },
            { src: 'images/portfolio/cantina-antinori-tuscany/12.webp', alt: "Cantina Antinori's grass-covered roof rising above rows of vines, framed symmetrically within the vineyard, Tuscany, by ARCHTRAITS" }
        ]
    },
    {
        slug: 'harpa-concert-hall',
        name: 'Harpa Concert Hall',
        location: 'Reykjavik',
        description: "Architecture photography of Harpa Concert Hall in Reykjavik, Iceland, exploring its honeycomb glass facade inspired by Iceland's basalt columns.",
        cover: { src: 'images/portfolio/harpa-concert-hall/7.webp', alt: "Woman's face reflected within Harpa Concert Hall's honeycomb glass facade, Reykjavik, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/harpa-concert-hall/1.webp', alt: "Harpa Concert Hall's honeycomb glass facade against an overcast sky, Reykjavik, by ARCHTRAITS" },
            { src: 'images/portfolio/harpa-concert-hall/2.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/3.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/4.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/5.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/6.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/7.webp', alt: "Woman's face reflected within Harpa Concert Hall's honeycomb glass facade, Reykjavik, by ARCHTRAITS" },
            { src: 'images/portfolio/harpa-concert-hall/8.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/9.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/10.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/11.webp', alt: "Close-up of Harpa Concert Hall's honeycomb glass facade with a figure silhouetted inside, Reykjavik, by ARCHTRAITS" },
            { src: 'images/portfolio/harpa-concert-hall/12.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/13.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/14.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' },
            { src: 'images/portfolio/harpa-concert-hall/15.webp', alt: 'Architecture photography of Harpa Concert Hall, Reykjavik, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'FIU-school-of-architecture',
        name: 'FIU School of Architecture',
        location: 'Miami',
        description: 'Architecture photography of the FIU School of Architecture in Miami, Florida, exploring its bold red, yellow, and orange tiled volumes.',
        coverPosition: '75% center',
        cover: { src: 'images/portfolio/FIU-school-of-architecture/9.webp', alt: 'Wide view of a red-and-orange striped tile facade with a woman standing in a window opening at FIU School of Architecture, Miami, by ARCHTRAITS' },
        images: [
            { src: 'images/portfolio/FIU-school-of-architecture/1.webp', alt: 'Portrait of a woman in a black vest against a red-and-yellow checkerboard tile wall at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/2.webp', alt: 'Woman walking away from a red-and-yellow checkerboard tile wall at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/3.webp', alt: 'Woman peering around the corner of a glossy red tile wall at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/4.webp', alt: 'Woman standing in an orange-tiled doorway opening at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/5.webp', alt: 'Woman standing small against a towering red tile wall at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/6.webp', alt: 'Looking up at a red tile wall corner and pink canopy edges with a woman peeking around it, FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/7.webp', alt: 'Woman standing on a concrete staircase against a red tile wall at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/8.webp', alt: 'Detail of a red-and-orange tiled corner against a blue sky with a cloud, FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/9.webp', alt: 'Wide view of a red-and-orange striped tile facade with a woman standing in a window opening at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/10.webp', alt: 'Woman standing in a window opening of an orange tile facade at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/11.webp', alt: 'Aerial view up a square concrete stairwell with a woman standing at the top, FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/12.webp', alt: 'Woman descending a concrete staircase with black railings at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/13.webp', alt: 'Woman standing at the base of a dramatic yellow-tiled triangular volume at FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/14.webp', alt: 'Woman in profile against a sunlit yellow tile wall with a tree shadow, FIU School of Architecture, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/FIU-school-of-architecture/15.webp', alt: 'Woman standing against a yellow-tiled triangular volume looking upward, FIU School of Architecture, Miami, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'parco-della-musica',
        name: 'Parco della Musica',
        location: 'Rome',
        description: 'Architecture photography of Auditorium Parco della Musica in Rome, Italy, exploring the three scarab-shaped concert hall shells designed by Renzo Piano.',
        cover: { src: 'images/portfolio/parco-della-musica/6.webp', alt: "Woman descending a staircase between Auditorium Parco della Musica's zinc-clad concert hall shells, Rome, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/parco-della-musica/1.webp', alt: "Woman leaning against a brick wall overlooking Auditorium Parco della Musica's zinc-clad concert hall shells, Rome, by ARCHTRAITS" },
            { src: 'images/portfolio/parco-della-musica/2.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/3.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/4.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/5.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/6.webp', alt: "Woman descending a staircase between Auditorium Parco della Musica's zinc-clad concert hall shells, Rome, by ARCHTRAITS" },
            { src: 'images/portfolio/parco-della-musica/7.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/8.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/9.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/10.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/11.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/12.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/13.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/14.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' },
            { src: 'images/portfolio/parco-della-musica/15.webp', alt: 'Architecture photography of Auditorium Parco della Musica, Rome, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'innovation-science-technology-bldg',
        name: 'Innovation, Science, and Technology Building',
        location: 'Miami',
        description: 'Architecture photography of the Innovation, Science, and Technology Building in Miami, Florida, exploring its Calatrava-designed white ribbed canopy over a reflecting lake.',
        cover: { src: 'images/portfolio/innovation-science-technology-bldg/6.webp', alt: "Person walking beneath the Innovation, Science, and Technology Building's curved white ribbed canopy walkway, Miami, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/innovation-science-technology-bldg/1.webp', alt: "Exterior view of the Innovation, Science, and Technology Building's white ribbed canopy reflected in its surrounding lake, Miami, by ARCHTRAITS" },
            { src: 'images/portfolio/innovation-science-technology-bldg/2.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/3.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/4.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/5.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/6.webp', alt: "Person walking beneath the Innovation, Science, and Technology Building's curved white ribbed canopy walkway, Miami, by ARCHTRAITS" },
            { src: 'images/portfolio/innovation-science-technology-bldg/7.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/8.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/9.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/10.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/11.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/12.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/13.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/14.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/15.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/16.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/17.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' },
            { src: 'images/portfolio/innovation-science-technology-bldg/18.webp', alt: 'Architecture photography of the Innovation, Science, and Technology Building, Miami, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'setas-de-sevilla',
        name: 'Metropol Parasol',
        location: 'Seville',
        description: 'Architecture photography of Metropol Parasol (Setas de Sevilla) in Seville, Spain, exploring its undulating wooden lattice canopy, said to be the largest wooden structure in the world.',
        cover: { src: 'images/portfolio/setas-de-sevilla/2.webp', alt: "Underside of Metropol Parasol's curved wooden lattice canopy bathed in warm light, Seville, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/setas-de-sevilla/1.webp', alt: "Birds flying past Metropol Parasol's curved wooden lattice canopy, Seville, by ARCHTRAITS" },
            { src: 'images/portfolio/setas-de-sevilla/2.webp', alt: "Underside of Metropol Parasol's curved wooden lattice canopy bathed in warm light, Seville, by ARCHTRAITS" },
            { src: 'images/portfolio/setas-de-sevilla/3.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' },
            { src: 'images/portfolio/setas-de-sevilla/4.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' },
            { src: 'images/portfolio/setas-de-sevilla/5.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' },
            { src: 'images/portfolio/setas-de-sevilla/6.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' },
            { src: 'images/portfolio/setas-de-sevilla/7.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' },
            { src: 'images/portfolio/setas-de-sevilla/8.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' },
            { src: 'images/portfolio/setas-de-sevilla/9.webp', alt: 'Architecture photography of Metropol Parasol, Seville, by ARCHTRAITS' }
        ]
    },
    {
        slug: '1111-lincoln-road',
        name: '1111 Lincoln Road',
        location: 'Miami Beach',
        description: "Architecture photography of 1111 Lincoln Road in Miami Beach, Florida, set within Herzog & de Meuron's sculptural open-air parking structure.",
        cover: { src: 'images/portfolio/1111-lincoln-road/14.webp', alt: 'Woman in red reaching up toward a sloped concrete ceiling at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
        images: [
            { src: 'images/portfolio/1111-lincoln-road/1.webp', alt: 'Woman in red stretching against a concrete column, a motorcycle parked in the background at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/2.webp', alt: 'Close portrait of a woman in red leaning against a concrete column, a motorcycle parked behind her, at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/3.webp', alt: 'Woman in red sitting cross-legged against a concrete column with a motorcycle parked behind her, 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/4.webp', alt: 'Woman in red kicking one leg up against a diagonal concrete column, triangular pillars of 1111 Lincoln Road in the background, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/5.webp', alt: 'Close portrait of a woman in red with her arm raised overhead against a bare concrete wall at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/6.webp', alt: 'Aerial view of a woman in red leaning against a concrete wall with one leg raised, in a receding hallway at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/7.webp', alt: 'Close crop of a woman in red crouching to tie her shoelace at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/8.webp', alt: 'Woman in red crouching low to tie her shoe against a concrete wall at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/9.webp', alt: "Woman in red performing a high kick against a concrete wall, composed to look like she's climbing it, at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS" },
            { src: 'images/portfolio/1111-lincoln-road/10.webp', alt: 'Woman in red leaping mid-air against a bare concrete wall at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/11.webp', alt: 'Woman in red in a dynamic wide stance with hands raised against a concrete wall at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/12.webp', alt: 'Close-up of a woman in red tying her shoelace while crouching at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/13.webp', alt: 'Woman in red in a low lunge with hands on the ground, looking up, at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS', gridPosition: 'left center' },
            { src: 'images/portfolio/1111-lincoln-road/14.webp', alt: 'Woman in red reaching up toward a sloped concrete ceiling at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/1111-lincoln-road/15.webp', alt: 'Woman in red pressing a hand to the wall in a wall-walking illusion pose, with a receding staircase behind her, at 1111 Lincoln Road, Miami Beach, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'winter-park-library',
        name: 'Winter Park Library',
        location: 'Florida',
        description: 'Architecture photography of the Winter Park Library in Florida, capturing its sweeping curved concrete roofline.',
        images: [
            { src: 'images/portfolio/winter-park-library/1.webp', alt: "Detail of Winter Park Library's textured concrete fins converging overhead, Florida, by ARCHTRAITS" },
            { src: 'images/portfolio/winter-park-library/2.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/3.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/4.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/5.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/6.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/7.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/8.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/9.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/10.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/11.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/12.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/13.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/14.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' },
            { src: 'images/portfolio/winter-park-library/15.webp', alt: 'Architecture photography of Winter Park Library, Florida, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'new-world-center',
        name: 'New World Center',
        location: 'Miami Beach',
        description: 'Architecture photography of New World Center in Miami Beach, Florida, exploring the geometric bougainvillea-covered trellis walkway of its adjacent SoundScape Park.',
        cover: { src: 'images/portfolio/new-world-center/1.webp', alt: "Woman in a red coat walking through the bougainvillea-covered trellis tunnel at New World Center's SoundScape Park, Miami Beach, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/new-world-center/1.webp', alt: "Woman in a red coat walking through the bougainvillea-covered trellis tunnel at New World Center's SoundScape Park, Miami Beach, by ARCHTRAITS" },
            { src: 'images/portfolio/new-world-center/2.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/3.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/4.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/5.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/6.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/7.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/8.webp', alt: "Woman in a pink dress framed against New World Center's angular white canopy, Miami Beach, by ARCHTRAITS" },
            { src: 'images/portfolio/new-world-center/9.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/10.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/11.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/12.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/13.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/14.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' },
            { src: 'images/portfolio/new-world-center/15.webp', alt: 'Architecture photography of New World Center, Miami Beach, by ARCHTRAITS' }
        ]
    },
    {
        slug: 'museum-garage',
        name: 'Museum Garage',
        location: 'Miami',
        description: "Architecture photography of Museum Garage in Miami's Design District, exploring its vivid pink, yellow, and red geometric facades.",
        cover: { src: 'images/portfolio/museum-garage/9.webp', alt: "Woman in yellow sitting atop Museum Garage's perforated white parapet, overlooking its red-and-white striped rooftop, Miami Design District, by ARCHTRAITS" },
        images: [
            { src: 'images/portfolio/museum-garage/1.webp', alt: "Woman in yellow standing on Museum Garage's pink-and-yellow striped rooftop, Miami Design District, by ARCHTRAITS" },
            { src: 'images/portfolio/museum-garage/2.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/3.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/4.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/5.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/6.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/7.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/8.webp', alt: 'Architecture photography of Museum Garage, Miami Design District, by ARCHTRAITS' },
            { src: 'images/portfolio/museum-garage/9.webp', alt: "Woman in yellow sitting atop Museum Garage's perforated white parapet, overlooking its red-and-white striped rooftop, Miami Design District, by ARCHTRAITS" }
        ]
    }
];

function renderPortfolioGrid() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    grid.innerHTML = portfolioProjects.map(project => {
        const cover = project.cover || project.images[0];
        return `
        <div class="portfolio-item">
            <a href="/images/portfolio/${project.slug}" class="portfolio-square" onclick="openProject('${project.slug}'); return false;">
                <img src="${cover.src}" alt="${cover.alt}" loading="lazy" decoding="async"${project.coverPosition ? ` style="object-position: ${project.coverPosition}"` : ''}>
            </a>
            <div class="portfolio-info">
                <h2 class="portfolio-name">${project.name}</h2>
                <p class="portfolio-location">${project.location}</p>
            </div>
        </div>
    `;
    }).join('');
}

renderPortfolioGrid();

const sectionPaths = {
    Home: '/',
    Portfolio: '/images/portfolio',
    Magazines: '/images/magazines',
    About: '/about',
    Contact: '/contact'
};

const sectionSEO = {
    Home: {
        title: 'ARCHTRAITS - Architecture Photography Portfolio',
        description: 'Browse the ARCHTRAITS architecture photography portfolio, capturing the beauty of architectural spaces through the essence of human experience.'
    },
    Portfolio: {
        title: 'Portfolio - ARCHTRAITS Architecture Photography',
        description: 'A curated portfolio of ARCHTRAITS architecture photography projects, featuring buildings and spaces from around the world.'
    },
    Magazines: {
        title: 'Magazines - ARCHTRAITS Architecture Photography',
        description: 'Explore ARCHTRAITS digital magazines, editorial photo essays capturing architecture and the essence of human experience.'
    },
    About: {
        title: 'About - ARCHTRAITS Architecture Photography',
        description: 'ARCHTRAITS is an architecture photography portfolio and digital magazine, capturing the beauty of architectural spaces through the essence of human experience.'
    },
    Contact: {
        title: 'Contact - ARCHTRAITS Architecture Photography',
        description: 'Get in touch with ARCHTRAITS for architecture photography commissions, editorial work, and collaborations.'
    }
};

function applySEO(title, description, path) {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute('content', description);

    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute('content', title);

    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) ogDescriptionTag.setAttribute('content', description);

    const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) twitterTitleTag.setAttribute('content', title);

    const twitterDescriptionTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescriptionTag) twitterDescriptionTag.setAttribute('content', description);

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute('href', 'https://archtraits.com' + path);

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) ogUrlTag.setAttribute('content', 'https://archtraits.com' + path);
}

function updateSEOTags(item) {
    const seo = sectionSEO[item];
    if (!seo) return;
    applySEO(seo.title, seo.description, sectionPaths[item] || '/');
}

function getAllSections() {
    return {
        Home: document.getElementById('homePage'),
        Portfolio: document.getElementById('portfolioPage'),
        Magazines: document.getElementById('magazinesPage'),
        About: document.getElementById('aboutPage'),
        Contact: document.getElementById('contactPage'),
        Project: document.getElementById('projectPage')
    };
}

function showSection(item, pushState) {
    const sections = getAllSections();

    Object.values(sections).forEach(s => s.classList.remove('active-section'));

    window.scrollTo({ top: 0, behavior: 'instant' });

    const target = sections[item];
    if (target) {
        target.classList.add('active-section');

        if (item === 'Home') {
            initHomeSlideshow();
        } else {
            stopHomeSlideshow();
        }
    }

    updateSEOTags(item);

    if (pushState !== false) {
        const path = sectionPaths[item] || '/';
        history.pushState({ section: item }, '', path);
    }
}

function handleMenuClick(item) {
    closeMobileNav();
    showSection(item, true);
}

function toggleMobileNav() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileNav() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', (e) => {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    if (!nav || !toggle || !nav.classList.contains('open')) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMobileNav();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileNav();
});

function openProject(slug, pushState) {
    const project = portfolioProjects.find(p => p.slug === slug);
    if (!project) return;

    Object.values(getAllSections()).forEach(s => s.classList.remove('active-section'));
    window.scrollTo({ top: 0, behavior: 'instant' });
    stopHomeSlideshow();

    const projectPage = document.getElementById('projectPage');
    projectPage.classList.add('active-section');
    projectPage.classList.remove('gallery-mode');
    document.getElementById('projectName').textContent = project.name;
    document.getElementById('projectLocation').textContent = project.location;
    document.getElementById('projectDescription').textContent = project.description || '';

    const grid = document.getElementById('projectGrid');
    grid.innerHTML = project.images.map((image, i) => `
        <a href="#" class="portfolio-square" onclick="openProjectGalleryAt(${i}); return false;">
            <img src="${image.src}" alt="${image.alt}" loading="${i < 6 ? 'eager' : 'lazy'}" decoding="async"${image.gridPosition ? ` style="object-position: ${image.gridPosition}"` : ''}>
        </a>
    `).join('');

    const gallery = document.getElementById('projectGallery');
    gallery.innerHTML = project.images.map((image, i) => `
        <img src="${image.src}" alt="${image.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
    `).join('');
    gallery.scrollLeft = 0;

    const path = '/images/portfolio/' + slug;
    applySEO(
        project.name + ' - ARCHTRAITS Architecture Photography',
        project.name + ', ' + project.location + ' — architecture photography by ARCHTRAITS.',
        path
    );

    if (pushState !== false) {
        history.pushState({ project: slug }, '', path);
    }
}

function openProjectGalleryAt(index) {
    const projectPage = document.getElementById('projectPage');
    projectPage.classList.add('gallery-mode');

    const gallery = document.getElementById('projectGallery');
    const images = gallery.querySelectorAll('img');
    if (images[index]) {
        images[index].scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' });
    }

    startProjectAutoScroll();
}

function closeProjectGalleryView() {
    document.getElementById('projectPage').classList.remove('gallery-mode');
}

// Slow ambient right-to-left drift through the project gallery. Any real user
// input (wheel/touch/drag/arrow keys) takes over immediately and the drift
// resumes on its own once they've been idle for a bit.
//
// Rather than trying to catch every possible input event (wheel, touch,
// pointer, momentum scrolling, keyboard) individually — which is exactly what
// broke this the first two times, since events get coalesced/delayed
// differently across real trackpads vs. synthetic input vs. momentum phases —
// this just compares the actual scroll position against what we last set it
// to, every single frame. Any mismatch, whatever caused it, is treated as "the
// user (or the browser) is moving this," which both pauses the drift and
// adopts the new position as the baseline to resume from later.
let projectAutoScrollRAF = null;
let projectAutoScrollPausedUntil = 0;
const PROJECT_AUTO_SCROLL_SPEED = 0.6; // px per frame (~36px/s at 60fps)
const PROJECT_AUTO_SCROLL_RESUME_DELAY = 800; // ms of idle before drift resumes

// gallery.scrollLeft is reported/stored as an integer by the browser, so adding
// a sub-pixel amount (0.4) to a value read back from scrollLeft itself rounds
// away every frame and never accumulates. Tracking the precise position
// ourselves and only ever writing the rounded result avoids that.
let projectAutoScrollPosition = 0;
let projectAutoScrollLastWritten = -1; // sentinel: no comparison on the very first frame

function stepProjectAutoScroll() {
    const gallery = document.getElementById('projectGallery');
    const projectPage = document.getElementById('projectPage');
    const isShowingGallery = projectPage.classList.contains('active-section') && projectPage.classList.contains('gallery-mode');
    if (!isShowingGallery || !gallery) {
        projectAutoScrollRAF = null;
        return;
    }

    const actual = gallery.scrollLeft;
    if (projectAutoScrollLastWritten !== -1 && Math.abs(actual - projectAutoScrollLastWritten) > 1) {
        projectAutoScrollPosition = actual;
        pauseProjectAutoScroll();
    }

    // A mouse button held down (even without moving yet, mid-drag-attempt) should
    // freeze the drift entirely — not just until the resume timer elapses.
    if (projectGalleryDragging) {
        projectAutoScrollPosition = actual;
        projectAutoScrollLastWritten = actual;
        projectAutoScrollRAF = requestAnimationFrame(stepProjectAutoScroll);
        return;
    }

    if (performance.now() >= projectAutoScrollPausedUntil) {
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        if (maxScroll > 0) {
            projectAutoScrollPosition += PROJECT_AUTO_SCROLL_SPEED;
            if (projectAutoScrollPosition >= maxScroll) projectAutoScrollPosition = 0;
            gallery.scrollLeft = projectAutoScrollPosition;
        }
    }
    projectAutoScrollLastWritten = gallery.scrollLeft;

    projectAutoScrollRAF = requestAnimationFrame(stepProjectAutoScroll);
}

function startProjectAutoScroll() {
    if (projectAutoScrollRAF) cancelAnimationFrame(projectAutoScrollRAF);
    const gallery = document.getElementById('projectGallery');
    // Start from wherever the gallery already is (e.g. just jumped to a clicked
    // image) rather than snapping back to the beginning.
    projectAutoScrollPosition = gallery ? gallery.scrollLeft : 0;
    projectAutoScrollLastWritten = -1;
    // Give the user a moment to look at what they clicked before it starts drifting.
    projectAutoScrollPausedUntil = performance.now() + PROJECT_AUTO_SCROLL_RESUME_DELAY;
    projectAutoScrollRAF = requestAnimationFrame(stepProjectAutoScroll);
}

function pauseProjectAutoScroll() {
    projectAutoScrollPausedUntil = performance.now() + PROJECT_AUTO_SCROLL_RESUME_DELAY;
}

const projectGalleryEl = document.getElementById('projectGallery');

// Click-and-drag with a mouse: plain overflow-x scroll containers don't support
// this natively (only wheel/touch do), so a desktop mouse user would otherwise
// have no way to move the gallery at all. Releasing carries a bit of momentum
// (decaying velocity) instead of stopping dead where the cursor let go, so it
// reads as a natural glide rather than hitting a wall.
let projectGalleryDragging = false;
let projectGalleryDragStartX = 0;
let projectGalleryDragStartScroll = 0;
let projectGalleryDragLastX = 0;
let projectGalleryDragLastTime = 0;
let projectGalleryDragVelocity = 0; // px/ms, positive = scrollLeft increasing
let projectGalleryMomentumRAF = null;
let projectGalleryMomentumPosition = 0;
const MOMENTUM_DECAY_PER_MS = 0.995; // ~9% of speed left after 500ms of glide
const MOMENTUM_STOP_THRESHOLD = 0.02; // px/ms

function stopProjectGalleryMomentum() {
    if (projectGalleryMomentumRAF) {
        cancelAnimationFrame(projectGalleryMomentumRAF);
        projectGalleryMomentumRAF = null;
    }
}

function stepProjectGalleryMomentum(lastTime) {
    const now = performance.now();
    const dt = now - lastTime;
    const maxScroll = projectGalleryEl.scrollWidth - projectGalleryEl.clientWidth;

    projectGalleryDragVelocity *= Math.pow(MOMENTUM_DECAY_PER_MS, dt);

    if (Math.abs(projectGalleryDragVelocity) < MOMENTUM_STOP_THRESHOLD || maxScroll <= 0) {
        projectGalleryMomentumRAF = null;
        return;
    }

    projectGalleryMomentumPosition += projectGalleryDragVelocity * dt;
    projectGalleryMomentumPosition = Math.max(0, Math.min(maxScroll, projectGalleryMomentumPosition));
    projectGalleryEl.scrollLeft = projectGalleryMomentumPosition;

    if (projectGalleryMomentumPosition <= 0 || projectGalleryMomentumPosition >= maxScroll) {
        projectGalleryMomentumRAF = null;
        return;
    }

    projectGalleryMomentumRAF = requestAnimationFrame(() => stepProjectGalleryMomentum(now));
}

projectGalleryEl.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    stopProjectGalleryMomentum();
    projectGalleryDragging = true;
    projectGalleryDragStartX = e.clientX;
    projectGalleryDragStartScroll = projectGalleryEl.scrollLeft;
    projectGalleryDragLastX = e.clientX;
    projectGalleryDragLastTime = performance.now();
    projectGalleryDragVelocity = 0;
    projectGalleryEl.classList.add('dragging');
    projectGalleryEl.setPointerCapture(e.pointerId);
    e.preventDefault();
});

projectGalleryEl.addEventListener('pointermove', function (e) {
    if (!projectGalleryDragging) return;
    const now = performance.now();
    const dt = now - projectGalleryDragLastTime;
    if (dt > 0) {
        const instVelocity = -(e.clientX - projectGalleryDragLastX) / dt;
        // Blend with the previous sample so one jittery move event doesn't
        // dominate the release velocity.
        projectGalleryDragVelocity = projectGalleryDragVelocity * 0.7 + instVelocity * 0.3;
    }
    projectGalleryDragLastX = e.clientX;
    projectGalleryDragLastTime = now;
    projectGalleryEl.scrollLeft = projectGalleryDragStartScroll - (e.clientX - projectGalleryDragStartX);
});

function endProjectGalleryDrag() {
    if (!projectGalleryDragging) return;
    projectGalleryDragging = false;
    projectGalleryEl.classList.remove('dragging');

    if (Math.abs(projectGalleryDragVelocity) > MOMENTUM_STOP_THRESHOLD) {
        projectGalleryMomentumPosition = projectGalleryEl.scrollLeft;
        projectGalleryMomentumRAF = requestAnimationFrame(() => stepProjectGalleryMomentum(performance.now()));
    }
}
projectGalleryEl.addEventListener('pointerup', endProjectGalleryDrag);
projectGalleryEl.addEventListener('pointercancel', endProjectGalleryDrag);

window.addEventListener('popstate', function (e) {
    if (e.state && e.state.project) {
        openProject(e.state.project, false);
        return;
    }
    if (e.state && e.state.magazine !== undefined) {
        openReader(e.state.magazine, false);
        return;
    }
    closeReader();
    const item = (e.state && e.state.section) || 'Home';
    showSection(item, false);
});

// On initial load, show the section (or project/magazine) matching the current URL path
(function () {
    const path = decodeURIComponent(window.location.pathname.replace(/\/$/, '') || '/');
    const projectMatch = path.match(/^\/images\/portfolio\/([\p{L}0-9-]+)$/iu);

    if (projectMatch && portfolioProjects.some(p => p.slug === projectMatch[1])) {
        openProject(projectMatch[1], false);
        history.replaceState({ project: projectMatch[1] }, '', window.location.pathname);
        return;
    }

    const magazineMatch = path.match(/^\/images\/magazines\/(Archtraits Vol [1-9])$/i);
    const magazineIndex = magazineMatch ? magazines.findIndex(m => m.slug.toLowerCase() === magazineMatch[1].toLowerCase()) : -1;

    if (magazineIndex !== -1) {
        showSection('Magazines', false);
        openReader(magazineIndex, false);
        history.replaceState({ magazine: magazineIndex }, '', window.location.pathname);
        return;
    }

    const initial = Object.keys(sectionPaths).find(k => sectionPaths[k] === path) || 'Home';
    showSection(initial, false);
    // Replace the initial history entry with section state so popstate works
    history.replaceState({ section: initial }, '', window.location.pathname);
}());

// Keyboard arrows scroll the project gallery when the project page is open
document.addEventListener('keydown', function (e) {
    const projectPage = document.getElementById('projectPage');
    if (!projectPage.classList.contains('active-section')) return;

    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    const gallery = document.getElementById('projectGallery');
    const scrollAmount = gallery.clientWidth * 0.8;
    pauseProjectAutoScroll();
    gallery.scrollBy({ left: e.key === 'ArrowRight' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
});

function tickHomeSlideshow(direction) {
    const slides = document.querySelectorAll('#homeSlideshow .slideshow-slide');
    if (slides.length <= 1) return;

    slides[homeSlideshowCurrentIndex].classList.remove('active');
    homeSlideshowCurrentIndex = ((homeSlideshowCurrentIndex + direction) % slides.length + slides.length) % slides.length;
    slides[homeSlideshowCurrentIndex].classList.add('active');
}

function startHomeSlideshowInterval() {
    stopHomeSlideshow();
    homeSlideshowInterval = setInterval(() => tickHomeSlideshow(1), 4000);
}

function initHomeSlideshow() {
    const slides = document.querySelectorAll('#homeSlideshow .slideshow-slide');
    if (!slides.length) return;

    homeSlideshowCurrentIndex = 0;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === 0));

    startHomeSlideshowInterval();
}

function stopHomeSlideshow() {
    if (homeSlideshowInterval) {
        clearInterval(homeSlideshowInterval);
        homeSlideshowInterval = null;
    }
}

// Clicking the left/right half of the slideshow steps back/forward manually;
// the auto-advance timer restarts from there so it doesn't double-jump right after.
function advanceHomeSlideshow(direction) {
    tickHomeSlideshow(direction);
    startHomeSlideshowInterval();
}

const homeSlideshowEl = document.getElementById('homeSlideshow');
if (homeSlideshowEl) {
    homeSlideshowEl.addEventListener('click', function (e) {
        const rect = homeSlideshowEl.getBoundingClientRect();
        const isLeftHalf = (e.clientX - rect.left) < rect.width / 2;
        advanceHomeSlideshow(isLeftHalf ? -1 : 1);
    });
}

if (document.getElementById('homePage').classList.contains('active-section')) {
    initHomeSlideshow();
}

// TODO: replace YOUR_FORM_ID with your real Formspree form ID from https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
const FORM_NOT_CONFIGURED = FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID');

function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;

    if (FORM_NOT_CONFIGURED) {
        console.warn('[ARCHTRAITS] Contact form not configured — set FORMSPREE_ENDPOINT in js/script.js to a real Formspree form ID.');
        btn.textContent = "Form isn't connected yet";
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 4000);
        return;
    }

    btn.disabled = true;

    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
        .then(response => {
            if (!response.ok) throw new Error('Form submission failed');
            btn.textContent = 'Sent!';
            setTimeout(() => {
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        })
        .catch(() => {
            btn.textContent = 'Error - try again';
            btn.disabled = false;
            setTimeout(() => { btn.textContent = originalText; }, 3000);
        });
}

// The flipbook reader is the only feature that needs page-flip, so it's
// fetched on first use instead of blocking every page load with it.
let pageFlipLoaderPromise = null;
function loadPageFlipLibrary() {
    if (window.St && window.St.PageFlip) return Promise.resolve();
    if (pageFlipLoaderPromise) return pageFlipLoaderPromise;

    pageFlipLoaderPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.min.js';
        script.onload = resolve;
        script.onerror = () => {
            pageFlipLoaderPromise = null;
            reject(new Error('Failed to load page-flip library'));
        };
        document.head.appendChild(script);
    });
    return pageFlipLoaderPromise;
}

function openReader(magazineIndex, pushState) {
    const magazine = magazines[magazineIndex];
    const path = '/images/magazines/' + magazine.slug;
    applySEO(
        magazine.title + ' - ARCHTRAITS Architecture Photography',
        magazine.issue + ' — ' + magazine.title + ', an ARCHTRAITS digital magazine capturing the beauty of architecture and the essence of human experience.',
        path
    );

    if (pushState !== false) {
        history.pushState({ magazine: magazineIndex }, '', path);
    }

    loadPageFlipLibrary()
        .then(() => renderReader(magazineIndex))
        .catch(err => console.error('[ARCHTRAITS]', err.message));
}

function renderReader(magazineIndex) {
    // Destroy existing PageFlip instance
    if (pageFlip) {
        pageFlip.destroy();
        pageFlip = null;
    }

    currentMagazine = magazineIndex;
    const overlay = document.getElementById('readerOverlay');
    const flipbookContainer = document.getElementById('flipbook-container');
    const magazine = magazines[magazineIndex];

    // Replace the bookSpread element entirely so PageFlip has a clean slate
    // (destroy() leaves internal wrapper elements behind that corrupt reinit)
    const oldSpread = document.getElementById('bookSpread');
    if (oldSpread) oldSpread.remove();
    const container = document.createElement('div');
    container.id = 'bookSpread';
    flipbookContainer.appendChild(container);

    zoomLevel = 1;
    flipbookContainer.style.transform = '';

    // Create pages
    if (magazine.pages && magazine.pages.length > 0) {
        magazine.pages.forEach((imagePath, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `Page ${index + 1}`;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
            img.decoding = 'sync';
            img.loading = 'eager';
            pageDiv.appendChild(img);
            container.appendChild(pageDiv);
        });

        setTimeout(() => {
            const isVolume8 = magazineIndex === 7;
            const isMobile = window.innerWidth <= 768;
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
                flippingTime: isMobile ? 1800 : 600,
                useMouseEvents: true,
                autoSize: true,
                maxShadowOpacity: 0.5,
                showPageCorners: true,
                disableFlipByClick: false
            });

            pageFlip.loadFromHTML(container.querySelectorAll('.page'));

            pageFlip.on('flip', () => {
                updatePageIndicator();
            });

            // Show overlay only after PageFlip has rendered — no black flash
            overlay.classList.add('active');
            updatePageIndicator();
        }, 80);
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
    if (history.state && history.state.magazine !== undefined) {
        showSection('Magazines', true);
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

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
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