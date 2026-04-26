const internetMenuData = [
    {
        menuName: "การใช้งาน Internet & Hosxp",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" /></svg>`,
        groups: [
            {
                groupName: "WIFI โรงพยาบาล",
                readonlyGroup: true,
                fields: [
                    { index: 75, label: "ชื่อ WIFI โรงพยาบาล (ตามหอผู้ป่วยต่างๆ)", type: "text", width: "half" },
                    { index: 76, label: "Password Wifi โรงพยาบาล", type: "text", width: "half", isPassword: true },
                    { index: 77, label: "Username สำหรับ Login Wifi โรงพยาบาล", type: "text", width: "half" },
                    { index: 78, label: "Password สำหรับ Login Wifi โรงพยาบาล", type: "text", width: "half", isPassword: true },
                ]
            },
            {
                groupName: "ระบบ Hosxp",
                readonlyGroup: true,
                fields: [
                    { index: 83, label: "Hosxp Username", type: "text", width: "half" },
                    { index: 84, label: "Hosxp Password", type: "text", width: "half", isPassword: true },
                ]
            },
            {
                groupName: "WIFI ศูนย์แพทยศาสตร์ และหอพักนิสิตแพทย์",
                readonlyGroup: true,
                fields: [
                    { index: 79, label: "Wifi ตึกศูนย์แพทยศาสตร์ และ หอพักนิสิตแพทย์", type: "text", width: "half" },
                ]
            }
        ]
    }
];

function renderInternetForm() {
    const container = document.getElementById('formContainer');
    if (!container) return;
    container.innerHTML = '';

    const menu = internetMenuData[0];

    const consolidatedContent = document.createElement('div');
    consolidatedContent.className = 'space-y-6 pb-6';

    menu.groups.forEach(group => {
        const groupDiv = createGroupElement(group);

        if (group.groupName === "WIFI ศูนย์แพทยศาสตร์ และหอพักนิสิตแพทย์") {
            const gridDiv = groupDiv.querySelector('.grid');
            if (gridDiv) {
                const fieldDiv = document.createElement('div');
                fieldDiv.className = 'col-span-1 md:col-span-12';

                const label = document.createElement('label');
                label.className = 'block text-sm font-medium text-slate-700 mb-1';
                label.innerHTML = "รายละเอียดการสมัครใช้งาน Wifi ศูนย์แพทย์";
                fieldDiv.appendChild(label);

                const imgElement = document.createElement('img');
                imgElement.src = 'https://lh5.googleusercontent.com/d/1BjN1zLx5iez8nEgRjCMaZBIbGXdBXhng';
                imgElement.alt = 'วิธีการสมัครใช้งาน Wifi ศูนย์แพทย์';
                imgElement.className = 'w-full h-auto rounded-lg shadow-sm border border-slate-200';
                fieldDiv.appendChild(imgElement);

                gridDiv.appendChild(fieldDiv);
            }
        }
        consolidatedContent.appendChild(groupDiv);
    });

    container.appendChild(consolidatedContent);
}