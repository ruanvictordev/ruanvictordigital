lucide.createIcons();

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 50 ? 'rgba(13,13,13,.85)' : 'transparent';
    navbar.style.backdropFilter = window.scrollY > 50 ? 'blur(12px)' : 'none';
});

// Mobile menu
const mm = document.getElementById('mobile-menu');
document.getElementById('hamburger').addEventListener('click', () => mm.classList.add('open'));
document.getElementById('close-menu').addEventListener('click', () => mm.classList.remove('open'));
mm.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mm.classList.remove('open')));

// Scroll spy
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const spyObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
            });
        }
    });
}, { threshold: .3 });
sections.forEach(s => spyObs.observe(s));

// Reveal on scroll
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Portfolio filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(c => {
            c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none';
        });
    });
});

// Video cover play
document.querySelectorAll('.video-cover').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('[data-video-id]');
        if (!card) return;
        const videoId = card.dataset.videoId;
        if (!videoId) return;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.className = 'w-full h-full';
        iframe.style.border = 'none';

        const frameContainer = card.querySelector('.video-frame');
        frameContainer.innerHTML = '';
        frameContainer.appendChild(iframe);
        frameContainer.classList.remove('hidden');
        btn.classList.add('hidden');
    });
});

// Function to create project card HTML
function createProjectCard(project) {
    const article = document.createElement('article');
    article.className = 'project-card reveal';
    article.setAttribute('data-category', project.category);

    const cardDiv = document.createElement('div');
    cardDiv.className = 'canva-card relative rounded-md border border-[#88888040] overflow-hidden';
    cardDiv.style.aspectRatio = '4/3';

    if (project.type === 'video') {
        cardDiv.setAttribute('data-video-id', project.videoId);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'video-cover absolute inset-0 w-full h-full border-none p-0 m-0 bg-transparent cursor-pointer';
        button.setAttribute('aria-label', `Reproduzir ${project.title}`);

        const img = document.createElement('img');
        img.src = `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
        img.alt = `Capa do vídeo ${project.title}`;
        img.className = 'w-full h-full object-cover';

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0';

        const playDiv = document.createElement('div');
        playDiv.className = 'absolute inset-0 flex items-center justify-center';

        const playCircle = document.createElement('div');
        playCircle.className = 'w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center';

        const playSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        playSvg.setAttribute('width', '24');
        playSvg.setAttribute('height', '24');
        playSvg.setAttribute('viewBox', '0 0 24 24');
        playSvg.setAttribute('fill', 'none');
        playSvg.setAttribute('stroke', 'currentColor');
        playSvg.setAttribute('stroke-width', '2');
        playSvg.setAttribute('stroke-linecap', 'round');
        playSvg.setAttribute('stroke-linejoin', 'round');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '5 3 19 12 5 21 5 3');

        playSvg.appendChild(polygon);
        playCircle.appendChild(playSvg);
        playDiv.appendChild(playCircle);
        button.appendChild(img);
        button.appendChild(overlay);
        button.appendChild(playDiv);

        const videoFrame = document.createElement('div');
        videoFrame.className = 'video-frame hidden absolute inset-0';

        cardDiv.appendChild(button);
        cardDiv.appendChild(videoFrame);
    } else if (project.type === 'design') {
        const link = document.createElement('a');
        link.href = project.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'block';

        const img = document.createElement('img');
        img.loading = 'lazy';
        img.className = 'canva-image w-full h-full object-cover';
        img.src = project.imageUrl;
        img.alt = project.title;

        const overlay = document.createElement('div');
        overlay.className = 'overlay absolute inset-0 bg-black/50 flex items-center justify-center';

        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', 'arrow-up-right');
        icon.style.width = '24px';
        icon.style.height = '24px';
        icon.style.color = '#F5F5F0';

        overlay.appendChild(icon);
        link.appendChild(img);
        link.appendChild(overlay);
        cardDiv.appendChild(link);
    }

    const textDiv = document.createElement('div');
    textDiv.className = 'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent';

    const titleP = document.createElement('p');
    titleP.className = 'canva-text text-md';
    titleP.style.color = 'rgb(245, 245, 240)';
    titleP.textContent = project.title;

    const categorySpan = document.createElement('span');
    categorySpan.className = 'canva-tag text-xs tracking-wider';
    categorySpan.style.color = 'rgb(245, 245, 240)';
    categorySpan.textContent = project.category === 'video' ? 'Vídeo' : 'Design';

    textDiv.appendChild(titleP);
    textDiv.appendChild(categorySpan);
    cardDiv.appendChild(textDiv);
    article.appendChild(cardDiv);

    return article;
}

// Load projects
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('projects.json');
        const projectsData = await response.json();
        const projectsGrid = document.getElementById('projects-grid');
        projectsData.forEach(project => {
            const card = createProjectCard(project);
            projectsGrid.appendChild(card);
        });

        // Reinitialize Lucide icons for dynamic content
        lucide.createIcons();

        // Observe new reveal elements
        document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

        // Add event listeners for video covers after creating cards
        document.querySelectorAll('.video-cover').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('[data-video-id]');
                if (!card) return;
                const videoId = card.dataset.videoId;
                if (!videoId) return;

                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                iframe.className = 'w-full h-full';
                iframe.style.border = 'none';

                const frameContainer = card.querySelector('.video-frame');
                frameContainer.innerHTML = '';
                frameContainer.appendChild(iframe);
                frameContainer.classList.remove('hidden');
                btn.classList.add('hidden');
            });
        });
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
});