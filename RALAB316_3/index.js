// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    {
        text: 'catalog', href: '#', subLinks: [
            { text: 'all', href: '/catalog/all' },
            { text: 'top selling', href: '/catalog/top' },
            { text: 'search', href: '/catalog/search' },
        ]
    },
    {
        text: 'orders', href: '#', subLinks: [
            { text: 'new', href: '/orders/new' },
            { text: 'pending', href: '/orders/pending' },
            { text: 'history', href: '/orders/history' },
        ]
    },
    {
        text: 'account', href: '#', subLinks: [
            { text: 'profile', href: '/account/profile' },
            { text: 'sign out', href: '/account/signout' },
        ]
    },
];

document.addEventListener('DOMContentLoaded', function () {
    const mainEl = document.querySelector('main');
    mainEl.style.backgroundColor = 'var(--main-bg)';
    mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
    mainEl.classList.add('flex-ctr');

    const topMenuEl = document.getElementById('top-menu');
    topMenuEl.style.height = '100%';
    topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
    topMenuEl.classList.add('flex-around');

    const subMenuEl = document.getElementById('sub-menu');
    subMenuEl.style.height = '100%';
    subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
    subMenuEl.classList.add('flex-around');
    subMenuEl.style.position = 'absolute';
    subMenuEl.style.top = '0';

    function buildSubmenu(subLinks) {
        subMenuEl.innerHTML = '';
        subLinks.forEach(function (link) {
            const a = document.createElement('a');
            a.setAttribute('href', link.href);
            a.textContent = link.text;
            subMenuEl.appendChild(a);
        });
    }

    menuLinks.forEach(function (link) {
        const a = document.createElement('a');
        a.setAttribute('href', link.href);
        a.textContent = link.text;
        topMenuEl.appendChild(a);
    });

    const topMenuLinks = topMenuEl.querySelectorAll('a');

    topMenuEl.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.tagName !== 'A') return;
        console.log(evt.target.textContent);

        const clicked = evt.target;
        const wasActive = clicked.classList.contains('active');

        // cache the corresponding link object from menuLinks
        const linkObj = menuLinks.find(function (link) {
            return link.text === clicked.textContent;
        });

        // if the clicked link was not active when clicked, decide submenu visibility
        if (!wasActive) {
            if (linkObj && linkObj.subLinks) {
                subMenuEl.style.top = '100%';
                buildSubmenu(linkObj.subLinks);
            } else {
                subMenuEl.style.top = '0';
                const title = linkObj ? (linkObj.text.charAt(0).toUpperCase() + linkObj.text.slice(1)) : clicked.textContent;
                mainEl.innerHTML = `<h1>${title}</h1>`;
            }
        }

        topMenuLinks.forEach(function (link) {
            if (link !== clicked) link.classList.remove('active');
        });

        if (wasActive) {
            clicked.classList.remove('active');
        } else {
            clicked.classList.add('active');
        }
    });

    subMenuEl.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (evt.target.tagName !== 'A') return;

        const clickedSub = evt.target;
        console.log(clickedSub.textContent);

        subMenuEl.style.top = '0';

        topMenuLinks.forEach(function (link) {
            link.classList.remove('active');
        });

        mainEl.innerHTML = `<h1>${clickedSub.textContent}</h1>`;
    });
});

