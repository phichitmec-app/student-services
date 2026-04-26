const documentList = [
    {
        title: "ใบลานิสิตแพทย์",
        url: "https://drive.google.com/file/d/10orkULIRzTZNFWpghIDV1eyUeVMBqdNw/view",
        description: "แบบฟอร์มสำหรับใช้ยื่นลากิจหรือลาป่วย"
    },
    {
        title: "ใบคำร้องขอศึกษารายวิชาเลือก",
        url: "https://drive.google.com/file/d/1JPP3K_XbHlW1vk3-_DDxgGM8OBpvIRlk/view",
        description: "แบบฟอร์มเพื่อขอลงทะเบียนเรียนในรายวิชาเลือก (Elective)"
    },
    {
        title: "แบบคำร้องขออุทธรณ์ในรายวิชา",
        url: "https://drive.google.com/file/d/1_NSaxVDv3HR9eHND-9OKYLa85x1udfwM/view",
        description: "แบบฟอร์มสำหรับใช้ประกอบการยื่นเรื่องขออุทธรณ์รายวิชา"
    }
];

function renderDownloadView() {
    const container = document.getElementById('downloadContainer');
    if (!container) return;
    container.innerHTML = '';

    documentList.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow bg-slate-50 flex flex-col h-full';
        
        card.innerHTML = `
            <div class="flex flex-col mb-4 flex-grow">
                <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-slate-800 leading-snug mb-2">${doc.title}</h3>
                <p class="text-sm text-slate-600">${doc.description}</p>
            </div>
            <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex justify-center items-center gap-2 shadow-sm">
                ดูและดาวน์โหลด
            </a>
        `;
        
        container.appendChild(card);
    });
}