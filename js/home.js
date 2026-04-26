const appNavMenus = [
    {
        name: "ข้อมูลนิสิต",
        view: "studentdata",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
        onLoad: () => {
            renderStudentForm();
            populateData(studentMenuData);
        }
    },
    {
        name: "Internet WIFI",
        view: "internet",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" /></svg>`,
        onLoad: () => {
            renderInternetForm();
            populateData(internetMenuData);
        }
    },
    {
        name: "ค่าไฟฟ้า",
        view: "electricity",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>`,
        onLoad: () => {
            if (typeof renderElectricityForm === 'function') renderElectricityForm();
        }
    },
    {
        name: "แจ้งซ่อม",
        view: "repair",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M15.17 11.42a7.11 7.11 0 01-4.83 1.91 7.127 7.127 0 01-7.18-7.18 7.11 7.11 0 011.91-4.83m10.1 10.1a7.11 7.11 0 001.91-4.83 7.127 7.127 0 00-7.18-7.18 7.11 7.11 0 00-4.83 1.91" /></svg>`,
        onLoad: () => {
            if (typeof renderRepairForm === 'function') renderRepairForm();
        }
    },
    {
        name: "ดาวโหลดเอกสาร",
        view: "download",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>`,
        onLoad: () => {
            if (typeof renderDownloadView === 'function') renderDownloadView();
        }
    },
    {
        name: "ประกาศ",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1 3.627 1.115c1.068.45 2.392.09 2.984-1.07l.07-.132a2.25 2.25 0 0 0-.115-2.224A18.064 18.064 0 0 1 15 12a18.064 18.064 0 0 1-1.785-3.327 2.25 2.25 0 0 0 .115-2.224l-.07-.132c-.592-1.16-1.916-1.52-2.984-1.07a18.03 18.03 0 0 1-3.627 1.115" /></svg>`,
        isExternal: true,
        url: "https://sites.google.com/cpird.in.th/phichit/services/announcement"
    },
     {
        name: "Simulation",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>`,
        isExternal: true,
        url: "https://phichitmec-app.github.io/Simulation-Phichit/"
    },
];

function initHome() {
    renderSideNav();
    navigateTo(appNavMenus[0].view); // Load default view
}

function renderSideNav() {
    const navList = document.getElementById('mainNavList');
    if (!navList) return;
    navList.innerHTML = '';

    appNavMenus.forEach((menu, index) => {
        const li = document.createElement('li');
        li.className = 'flex-1 md:flex-none md:border-b md:border-slate-100 last:border-0';
        
        const isExternalLink = menu.isExternal && menu.url;
        const navElement = isExternalLink ? document.createElement('a') : document.createElement('button');
        
        navElement.id = `main-menu-btn-${index}`;
        navElement.title = menu.name; // เพิ่มคำอธิบายเมื่อเอาเมาส์ชี้ (Tooltip) เผื่อตอนซ่อนเมนู
        navElement.className = `w-full text-left px-4 py-3 md:py-4 font-medium transition-all flex items-center justify-center md:justify-start gap-3 whitespace-nowrap border-b-4 md:border-b-0 md:border-l-4 border-transparent`;
        navElement.innerHTML = `
            <span class="text-slate-400" id="main-menu-icon-${index}">${menu.icon || ''}</span> 
            <span class="hidden md:inline-block nav-menu-text">${menu.name}</span>
            <span class="md:hidden text-sm">${menu.name.length > 15 ? menu.name.substring(0, 15) + '...' : menu.name}</span>
        `;

        if (isExternalLink) {
            navElement.href = menu.url;
            navElement.target = '_blank';
            navElement.rel = 'noopener noreferrer';
        } else {
            navElement.onclick = (e) => {
                e.preventDefault();
                navigateTo(menu.view);
            };
        }

        li.appendChild(navElement);
        navList.appendChild(li);
    });
}

async function navigateTo(viewName) {
    const contentArea = document.getElementById('viewContent');
    if (!contentArea) return;

    const menu = appNavMenus.find(m => m.view === viewName);
    if (!menu) {
        console.error(`Menu with view '${viewName}' not found.`);
        contentArea.innerHTML = `<p class="text-red-500">Error: View not found.</p>`;
        return;
    }

    try {
        if (menu.isEmbed && menu.embedUrl) {
            contentArea.innerHTML = `
                <div class="mb-4 flex justify-end">
                    <button onclick="toggleFullScreen('embedContainer')" class="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        แสดงเต็มจอ (Full Screen)
                    </button>
                </div>
                <div id="embedContainer" class="w-full h-[80vh] min-h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <iframe src="${menu.embedUrl}" class="w-full h-full border-0 bg-white" title="${menu.name}" allowfullscreen></iframe>
                </div>
            `;
        } else {
            // โค้ดเดิมสำหรับโหลดจากไฟล์ HTML
            const response = await fetch(`views/${viewName}.html`);
            if (!response.ok) throw new Error(`Could not load ${viewName}.html`);
            contentArea.innerHTML = await response.text();
        }

        if (typeof menu.onLoad === 'function') {
            menu.onLoad();
        }
        updateActiveNav(viewName);

    } catch (error) {
        console.error("Navigation error:", error);
        contentArea.innerHTML = `<p class="text-red-500">Error loading view: ${error.message}</p>`;
    }
}

function updateActiveNav(activeView) {
    appNavMenus.forEach((menu, index) => {
        const btn = document.getElementById(`main-menu-btn-${index}`);
        const icon = document.getElementById(`main-menu-icon-${index}`);
        if (!btn || !icon) return;

        if (menu.view === activeView) {
            btn.classList.add('bg-blue-50', 'text-blue-700', 'border-blue-600');
            btn.classList.remove('text-slate-600', 'hover:bg-slate-50', 'border-transparent');
            icon.classList.replace('text-slate-400', 'text-blue-600');
        } else {
            btn.classList.remove('bg-blue-50', 'text-blue-700', 'border-blue-600');
            btn.classList.add('text-slate-600', 'hover:bg-slate-50', 'border-transparent');
            icon.classList.replace('text-blue-600', 'text-slate-400');
        }
    });
}

function toggleNavBar() {
    const navDiv = document.getElementById('sideNav');
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const menuTexts = document.querySelectorAll('.nav-menu-text');
    const toggleText = document.querySelector('.nav-toggle-text');
    const mainButtons = document.querySelectorAll('#sideNav ul button');
    const navHeader = document.getElementById('nav-header');

    if (!navDiv) return;
    const isCollapsed = navDiv.classList.contains('md:w-20');

    if (isCollapsed) {
        navDiv.classList.replace('md:w-20', 'md:w-64');
        toggleBtn.querySelector('svg').style.transform = 'rotate(0deg)';
        menuTexts.forEach(text => text.classList.add('md:inline-block'));
        if (toggleText) toggleText.classList.remove('hidden');
        if (navHeader) navHeader.classList.replace('justify-center', 'justify-between');
        mainButtons.forEach(btn => {
            btn.classList.remove('md:justify-center');
            btn.classList.add('md:justify-start');
        });
    } else {
        navDiv.classList.replace('md:w-64', 'md:w-20');
        toggleBtn.querySelector('svg').style.transform = 'rotate(180deg)';
        menuTexts.forEach(text => text.classList.remove('md:inline-block'));
        if (toggleText) toggleText.classList.add('hidden');
        if (navHeader) navHeader.classList.replace('justify-between', 'justify-center');
        mainButtons.forEach(btn => {
            btn.classList.remove('md:justify-start');
            btn.classList.add('md:justify-center');
        });
    }
}

function toggleFullScreen(elementId) {
    const elem = document.getElementById(elementId);
    if (!elem) return;

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}