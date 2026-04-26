const studentMenuData = [
    {
        menuName: "ข้อมูลนิสิต",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
        consolidatedView: true,
        groups: [
            {
                groupName: "ไฟล์สัญญาการเป็นนักศึกษาเพื่อศึกษาวิชาแพทย์ศาสตร์ ตามโครงการร่วมผลิตแพทย์เพิ่มเพื่อชาวชนบท",
                fields: [
                    {
                        index: 63,
                        label: "ไฟล์สัญญา สามารถดาวโหลดได้ที่ <a href='https://med.nu.ac.th/sys/sa/' target='_blank' class='text-blue-600 underline hover:text-blue-800'>https://med.nu.ac.th/sys/sa/</a> โดยใช้ Username/Password ของระบบ (REG)",
                        type: "file", accept: ".pdf,.doc,.docx,image/*", fullWidth: true
                    },
                ]
            },
            {
                groupName: "ข้อมูลส่วนตัว",
                fields: [
                    { index: 1, label: "รหัสนิสิต", type: "text", readonly: true, width: "third" },
                    { index: 3, label: "CID (รหัสบัตรประชาชน)", type: "text", readonly: true, width: "third" },
                    { index: 2, label: "รุ่น", type: "text", readonly: true, width: "third" },
                    { index: 51, label: "ปีที่เข้าศึกษา", type: "text", readonly: true, width: "half" },
                    { index: 50, label: "สถานะ", type: "text", readonly: true, width: "half" },
                    { index: 4, label: "คำนำหน้า", type: "select", required: true, options: ["นาย", "นางสาว", "นาง"], width: "third" },
                    { index: 5, label: "ชื่อ", type: "text", required: true, width: "third" },
                    { index: 6, label: "สกุล", type: "text", required: true, width: "third" },
                    { index: 8, label: "Fullname (ภาษาอังกฤษ)", type: "text", required: true, width: "third" },
                    { index: 9, label: "ชื่อเล่น", type: "text", required: true, width: "third" },
                    { index: 10, label: "วันเดือนปีเกิด (ปี ค.ศ.)", type: "date", required: true, width: "third" },
                    { index: 11, label: "สถานะภาพ", type: "select", options: ["โสด", "สมรส", "หย่าร้าง", "หม้าย"], required: true, width: "third" },
                    { index: 12, label: "ศาสนา", type: "select", options: ["พุทธ", "คริสต์", "อิสลาม", "พราหมณ์-ฮินดู", "ไม่นับถือศาสนา", "อื่นๆ"], required: true, width: "third" },
                    { index: 74, label: "อาหาร", type: "select", options: ["อาหารปกติ", "อาหารฮาลาล", "อาหารมังสวิรัติ", "อาหารเจ", "อื่นๆ"], required: true, width: "third" },
                ]
            },
            {
                groupName: "ข้อมูลการติดต่อ",
                fields: [
                    { index: 64, label: "บ้านเลขที่", type: "text" , required: true },
                    { index: 65, label: "หมู่", type: "text" },
                    { index: 66, label: "ซอย", type: "text" },
                    { index: 67, label: "ถนน", type: "text" },
                    { index: 68, label: "ตำบล", type: "text" , required: true },
                    { index: 69, label: "อำเภอ", type: "text" , required: true },
                    { index: 70, label: "จังหวัด", type: "text" , required: true },
                    { index: 71, label: "รหัสไปรษณีย์", type: "text" , required: true },
                    { index: 14, label: "เบอร์โทรศัพท์", type: "text" , required: true },
                    { index: 15, label: "อีเมล์ (สถานศึกษา)", type: "email" },
                    { index: 16, label: "อีเมล์ส่วนตัว", type: "email" },
                    { index: 17, label: "Line ID", type: "text" },
                ]
            },
            {
                groupName: "ข้อมูลสุขภาพ",
                fields: [
                    { index: 18, label: "หมู่เลือด", type: "select", options: ["A", "B", "AB", "O"], required: true, width: "half" },
                    { index: 22, label: "สิทธิการรักษา", type: "select", options: ["บัตรทอง/30 บาท", "ประกันสังคม", "ข้าราชการ", "ประกันสุขภาพเอกชน"], required: true, width: "half" },
                    { index: 19, label: "โรคประจำตัว (ถ้ามี)", type: "text", fullWidth: true },
                    { index: 20, label: "การรักษา (ถ้ามี)", type: "text", fullWidth: true },
                    { index: 21, label: "การให้ยา (ถ้ามี)", type: "text", fullWidth: true },
                ]
            },
            {
                groupName: "ข้อมูลครอบครัว",
                fields: [
                    { index: 23, label: "ชื่อ-สกุล บิดา", type: "text", width: "half" },
                    { index: 25, label: "โทรศัพท์บิดา", type: "text", width: "half" },
                    { index: 26, label: "ชื่อ-สกุล มารดา", type: "text", width: "half" },
                    { index: 28, label: "โทรศัพท์มารดา", type: "text", width: "half" },
                    { index: 29, label: "สถานะครอบครัว", type: "select", options: ["สมรส", "หย่าร้าง/แยกทาง", "บิดาเสียชีวิต", "มารดาเสียชีวิต", "บิดาและมารดาเสียชีวิต"], width: "half" },
                ]
            },
            {
                groupName: "ผู้ติดต่อฉุกเฉิน",
                fields: [
                    { index: 30, label: "ชื่อ-สกุล ผู้ติดต่อฉุกเฉิน", type: "text" },
                    { index: 31, label: "สถานะผู้ติดต่อฉุกเฉิน", type: "text", placeholder: "เช่น ลุง, อา, พี่ชาย" },
                    { index: 33, label: "เบอร์โทรผู้ติดต่อฉุกเฉิน", type: "text" },
                ]
            },
            {
                groupName: "ข้อมูลการศึกษาก่อนหน้า",
                fields: [
                    { index: 34, label: "การศึกษาขั้นสูงสุด", type: "select", options: ["ปริญญาตรี", "ปริญญาโท", "ปริญญาเอก"], width: "third" , required: true },
                    { index: 35, label: "ชื่อวุฒิการศึกษา", type: "text", width: "third" , required: true },
                    { index: 36, label: "มหาวิทยาลัย", type: "text", width: "third" , required: true },
                    { index: 37, label: "สาขา", type: "text" },
                ]
            },
            {
                groupName: "ทุนการศึกษาปัจจุบัน",
                fields: [
                    { index: 38, label: "ทุนปัจจุบัน", type: "text" , required: true },
                    { index: 39, label: "สถานที่ใช้ทุน", type: "text" , required: true },
                    { index: 40, label: "จังหวัดที่ใช้ทุน", type: "text" , required: true },
                ]
            },
            {
                groupName: "ประวัติการทำงาน",
                fields: [
                    { index: 41, label: "ที่ทำงานที่ 1", type: "text" },
                    { index: 42, label: "ตำแหน่งงานที่ 1", type: "text" },
                    { index: 43, label: "ระยะเวลาทำงานที่ 1", type: "text", placeholder: "เช่น 1 ปี 2 เดือน" },
                    { index: 44, label: "ที่ทำงานที่ 2 (ถ้ามี)", type: "text" },
                    { index: 45, label: "ตำแหน่งงานที่ 2 (ถ้ามี)", type: "text" },
                    { index: 46, label: "ระยะเวลาทำงานที่ 2 (ถ้ามี)", type: "text" },
                    { index: 47, label: "ที่ทำงานที่ 3 (ถ้ามี)", type: "text" },
                    { index: 48, label: "ตำแหน่งงานที่ 3 (ถ้ามี)", type: "text" },
                    { index: 49, label: "ระยะเวลาทำงานที่ 3 (ถ้ามี)", type: "text" },
                ]
            },
            {
                groupName: "ทะเบียนรถ (กรณีนำรถมาใช้)",
                fields: [
                    { index: 72, label: "ทะเบียนรถยนต์", type: "text", fullWidth: true},
                    { index: 73, label: "ทะเบียนรถจักรยานยนต์", type: "text", fullWidth: true},
                ]
            }
        ]
    }
];

function renderStudentForm() {
    const container = document.getElementById('formContainer');
    if(!container) return;
    container.innerHTML = '';

    const menu = studentMenuData[0];

    const consolidatedContent = document.createElement('div');
    consolidatedContent.className = 'space-y-6';

    menu.groups.forEach(group => {
        const groupDiv = createGroupElement(group);
        consolidatedContent.appendChild(groupDiv);
    });

    const actionDiv = document.createElement('div');
    actionDiv.className = 'mt-8 flex justify-end border-t pt-6';
    const savePartBtn = document.createElement('button');
    savePartBtn.type = 'button';
    savePartBtn.className = 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 flex items-center gap-2 text-base';
    savePartBtn.innerHTML = `
        <span>บันทึกข้อมูลนิสิตทั้งหมด</span>
        <svg class="animate-spin h-5 w-5 text-white hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    `;
    savePartBtn.onclick = (e) => saveData(e);
    actionDiv.appendChild(savePartBtn);
    consolidatedContent.appendChild(actionDiv);

    container.appendChild(consolidatedContent);
}

function createGroupElement(group) {
    const groupDiv = document.createElement('div');
    groupDiv.className = `bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200`;

    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold text-primary mb-4 border-b pb-2 whitespace-normal';
    title.innerText = group.groupName;
    groupDiv.appendChild(title);

    const gridDiv = document.createElement('div');
    gridDiv.className = 'grid grid-cols-1 md:grid-cols-12 gap-4';

    group.fields.forEach(field => {
        const fieldDiv = document.createElement('div');

        let colClass = 'col-span-1 md:col-span-4';
        if (field.width === 'half') colClass = 'col-span-1 md:col-span-6';
        else if (field.width === 'third') colClass = 'col-span-1 md:col-span-4';
        else if (field.fullWidth) colClass = 'col-span-1 md:col-span-12';

        fieldDiv.className = colClass;

        const label = document.createElement('label');
        label.className = 'block text-sm font-medium text-slate-700 mb-1';
        if (field.required) {
            label.innerHTML = `${field.label} <span class="text-red-500">*</span>`;
        } else {
            label.innerHTML = field.label;
        }
        fieldDiv.appendChild(label);

        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            input.id = 'input_' + field.index;
            input.className = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary outline-none transition bg-white`;
            if (field.required) input.required = true;

            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.text = "-- กรุณาเลือก --";
            defaultOption.disabled = true;
            defaultOption.selected = true;
            input.appendChild(defaultOption);

            let hasOtherOption = false;

            if (field.options) {
                field.options.forEach(optText => {
                    const option = document.createElement('option');
                    option.value = optText;
                    option.text = optText;
                    input.appendChild(option);
                    if (optText === 'อื่นๆ') hasOtherOption = true;
                });
            }

            fieldDiv.appendChild(input);

            if (hasOtherOption) {
                const otherInput = document.createElement('input');
                otherInput.type = 'text';
                otherInput.id = 'other_' + field.index;
                otherInput.placeholder = 'โปรดระบุ...';
                otherInput.className = 'w-full px-3 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-secondary outline-none transition bg-white hidden';

                fieldDiv.appendChild(otherInput);

                input.addEventListener('change', function () {
                    if (this.value === 'อื่นๆ') {
                        otherInput.classList.remove('hidden');
                        if (field.required) otherInput.required = true;
                    } else {
                        otherInput.classList.add('hidden');
                        otherInput.required = false;
                        otherInput.value = '';
                    }
                });
            }
        } else {
            if (group.readonlyGroup) {
                if (field.isPassword) {
                    input = document.createElement('div');
                    input.className = 'relative flex items-center w-full';

                    const pwdInput = document.createElement('input');
                    pwdInput.type = 'password';
                    pwdInput.id = 'input_' + field.index;
                    pwdInput.readOnly = true;
                    pwdInput.className = 'w-full px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 font-medium min-h-[42px] pr-10 outline-none';

                    const toggleBtn = document.createElement('button');
                    toggleBtn.type = 'button';
                    toggleBtn.title = 'แสดง/ซ่อนรหัสผ่าน';
                    toggleBtn.className = 'absolute right-3 text-blue-500 hover:text-blue-700 focus:outline-none transition';
                    const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`;
                    const eyeSlashIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>`;
                    toggleBtn.innerHTML = eyeIcon;

                    toggleBtn.onclick = function() {
                        const isPassword = pwdInput.type === 'password';
                        pwdInput.type = isPassword ? 'text' : 'password';
                        toggleBtn.innerHTML = isPassword ? eyeSlashIcon : eyeIcon;
                    };

                    input.appendChild(pwdInput);
                    input.appendChild(toggleBtn);
                } else {
                    input = document.createElement('div');
                    input.id = 'input_' + field.index;
                    input.className = 'w-full px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-blue-900 font-medium min-h-[42px] flex items-center break-all';
                }
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.id = 'input_' + field.index;
                input.className = `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-secondary outline-none transition ${field.readonly ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'}`;

                if (field.placeholder) input.placeholder = field.placeholder;
                if (field.readonly) input.readOnly = true;
                if (field.required) input.required = true;
                if (field.type === 'file' && field.accept) input.accept = field.accept;
            }
        }

        fieldDiv.appendChild(input);

        if (field.type === 'file') {
            const linkDiv = document.createElement('div');
            linkDiv.id = 'link_' + field.index;
            linkDiv.className = 'text-xs mt-1 hidden';
            fieldDiv.appendChild(linkDiv);
        }

        gridDiv.appendChild(fieldDiv);
    });

    groupDiv.appendChild(gridDiv);
    return groupDiv;
}

function populateData(dataMenus) {
    if (!dataMenus) return;
    dataMenus.forEach(menu => {
        menu.groups.forEach(group => {
            group.fields.forEach(field => {
                const rawValue = currentRowData[field.index];

                if (field.type === 'file') {
                    if (rawValue && String(rawValue).startsWith('http')) {
                        const linkDiv = document.getElementById('link_' + field.index);
                        if (linkDiv) { // Update link text
                            linkDiv.innerHTML = `ไฟล์ปัจจุบัน: <a href="${rawValue}" target="_blank" class="text-blue-500 underline">คลิกดูไฟล์</a> (หากต้องการเปลี่ยน ให้เลือกไฟล์ใหม่)`;
                            linkDiv.classList.remove('hidden');
                        }
                    }
                } else if (field.type === 'date') {
                    const input = document.getElementById('input_' + field.index);
                    if (input && rawValue) {
                        try {
                            const d = new Date(rawValue);
                            if (!isNaN(d.getTime())) {
                                const year = d.getFullYear();
                                const month = String(d.getMonth() + 1).padStart(2, '0');
                                const day = String(d.getDate()).padStart(2, '0');
                                input.value = `${year}-${month}-${day}`;
                            } else {
                                input.value = rawValue;
                            }
                        } catch (e) {
                            input.value = rawValue;
                        }
                    }
                } else if (field.type === 'select') {
                    const input = document.getElementById('input_' + field.index);
                    const otherInput = document.getElementById('other_' + field.index);

                    if (input && rawValue) {
                        const optionExists = Array.from(input.options).some(opt => opt.value === String(rawValue));

                        if (optionExists) {
                            input.value = rawValue;
                            if (otherInput) otherInput.classList.add('hidden');
                        } else {
                            input.value = "อื่นๆ";
                            if (otherInput) {
                                otherInput.classList.remove('hidden');
                                otherInput.value = rawValue;
                            }
                        }
                    }
                } else {
                    const input = document.getElementById('input_' + field.index);
                    if (input && rawValue !== undefined) {
                        if (input.tagName === 'DIV') {
                            input.innerText = rawValue || '-';
                        } else {
                            input.value = rawValue;
                        }
                    }
                }
            });
        });
    });
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function uploadSingleFile(fileInput, folderType = 'student') {
    const file = fileInput.files[0];
    const base64 = await fileToBase64(file);

    const response = await fetch(GAS_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'upload',
            data: base64,
            filename: currentRowData[1] + '_' + file.name,
            mimeType: file.type,
            folderType: folderType
        })
    });
    return await response.json();
}

async function saveData(e) {
    if (e) e.preventDefault();

    // การแสดง Loading
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');
    const btnSpan = btn.querySelector('span');
    const btnSvg = btn.querySelector('svg');
    if(btnSpan) btnSpan.classList.add('hidden');
    if(btnSvg) btnSvg.classList.remove('hidden');

    const statusText = document.getElementById('uploadStatus');

    try {
        // This function now only saves student data
        let targetSchemaGroups = studentMenuData[0].groups;
        const fileFields = targetSchemaGroups.flatMap(g => g.fields).filter(f => f.type === 'file');
        let isUploading = false;

        for (let field of fileFields) {
            const fileInput = document.getElementById('input_' + field.index);
            if (fileInput && fileInput.files.length > 0) {
                if (!isUploading) {
                    if (statusText) statusText.classList.remove('hidden');
                    isUploading = true;
                }

                const uploadResult = await uploadSingleFile(fileInput);
                if (uploadResult.status === 'success') {
                    currentRowData[field.index] = uploadResult.url;
                } else {
                    throw new Error("อัปโหลดไม่สำเร็จ: " + (uploadResult.message || "ไม่ทราบสาเหตุ"));
                }
            }
        }

        targetSchemaGroups.forEach(group => {
            if (group.readonlyGroup) return;

            group.fields.forEach(field => {
                if (field.type !== 'file') {
                    const input = document.getElementById('input_' + field.index);
                    if (input) {
                        if (field.type === 'select' && input.value === 'อื่นๆ') {
                            const otherInput = document.getElementById('other_' + field.index);
                            currentRowData[field.index] = otherInput && otherInput.value ? otherInput.value : input.value;
                        } else {
                            currentRowData[field.index] = input.value;
                        }
                    }
                }
            });
        });

        if (statusText) statusText.innerText = "กำลังบันทึกข้อมูล...";

        const response = await fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'save', rowIndex: currentRowIndex, data: currentRowData })
        });

        const result = await response.json();
        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'บันทึกข้อมูลนิสิตสำเร็จ!',
                text: 'ข้อมูลของคุณถูกอัปเดตลงในระบบเรียบร้อยแล้ว',
                confirmButtonColor: '#1e3a8a'
            });
            populateData(studentMenuData);
        } else {
            Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: result.message, confirmButtonColor: '#1e3a8a' });
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'บันทึกไม่สำเร็จ', text: err.message, confirmButtonColor: '#1e3a8a' });
    } finally {
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
        if(btnSpan) btnSpan.classList.remove('hidden');
        if(btnSvg) btnSvg.classList.add('hidden');

        if (statusText) {
            statusText.classList.add('hidden');
            statusText.innerText = "กำลังอัปโหลดไฟล์... กรุณารอสักครู่";
        }
    }
}