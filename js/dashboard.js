// ฟังก์ชันสำหรับ Render ข้อมูลบน Dashboard
async function initDashboard() {
    if (typeof currentRowData === 'undefined' || !currentRowData) {
        return;
    }

    // เตรียมข้อมูลพื้นฐานของนิสิต (เพิ่ม .trim() เพื่อป้องกันช่องว่างส่วนเกินที่ทำให้ค้นหาข้อมูลไม่เจอ)
    const studentId = (currentRowData[1] != null && currentRowData[1] !== '') ? String(currentRowData[1]).trim() : '';
    const firstName = currentRowData[5] ? String(currentRowData[5]).trim() : '';
    const lastName = currentRowData[6] ? String(currentRowData[6]).trim() : '';
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : (firstName || lastName);

    // แสดงชื่อ-สกุล และรหัสนิสิต
    const dashNameEl = document.getElementById('dashName');
    if (dashNameEl) dashNameEl.innerText = fullName || 'นิสิต';
    
    const dashStudentIdEl = document.getElementById('dashStudentId');
    if (dashStudentIdEl) dashStudentIdEl.innerText = studentId || '-';

    // แสดงรูปโปรไฟล์จาก Column A (index 0)
    const profileImageUrl = currentRowData[0] ? String(currentRowData[0]).trim() : '';
    const dashProfileImg = document.getElementById('dashProfileImg');
    const dashProfileIcon = document.getElementById('dashProfileIcon');
    const dashProfileContainer = document.getElementById('dashProfileContainer');
    
    if (profileImageUrl.startsWith('http') && dashProfileImg && dashProfileIcon && dashProfileContainer) {
        dashProfileImg.src = profileImageUrl;
        dashProfileImg.classList.remove('hidden');
        dashProfileIcon.classList.add('hidden');
        dashProfileContainer.classList.remove('p-4'); // เอา padding ออกเพื่อให้รูปแสดงเต็มวงกลมพอดี
    }

    // แสดงหมายเลขห้อง (Column CH -> index 85)
    const roomNumber = (currentRowData[85] != null && currentRowData[85] !== '') ? String(currentRowData[85]).trim() : '-';
    const dashRoomEl = document.getElementById('dashRoom');
    if (dashRoomEl) dashRoomEl.innerText = roomNumber;

    // โหลดข้อมูลแบบขนานทั้งค่าไฟและประวัติแจ้งซ่อม
    await Promise.all([
        loadDashboardElectricity(studentId, roomNumber),
        loadDashboardActiveRepairs(fullName, roomNumber)
    ]);
}

async function loadDashboardElectricity(studentId, roomNumber) {
    const container = document.getElementById('dashElecContainer');
    if (!container) return;

    if (!roomNumber || roomNumber === '-') {
        container.innerHTML = `
            <div class="text-center py-6">
                <div class="bg-slate-200 p-3 rounded-full inline-block mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p class="text-sm text-slate-500">ไม่พบข้อมูลหมายเลขห้อง</p>
            </div>`;
        return;
    }

    try {
        let data = { bills: [], roomSlip: "" };
        if (typeof getSharedElectricityData === 'function') {
            const res = await getSharedElectricityData(roomNumber, studentId, false);
            // ป้องกันกรณี res เป็น undefined
            if (res) data = res;
        } else {
            // Fallback: เพิ่ม Content-Type แก้ปัญหา CORS บน Google Apps Script
            const response = await fetch(GAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'getElectricityBill', roomNumber: roomNumber, studentId: studentId })
            });
            const result = await response.json();
            if (result.status === 'success') {
                data = { bills: result.data || [], roomSlip: result.roomSlip || "" };
            } else throw new Error();
        }

        renderDashboardElectricityData(container, data.bills, data.roomSlip);
    } catch (err) {
        console.error("Dashboard Electricity Error:", err);
        container.innerHTML = `<div class="text-center py-6 text-red-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><p class="text-sm">ไม่สามารถโหลดข้อมูลค่าไฟได้</p></div>`;
    }
}

function renderDashboardElectricityData(container, bills, roomSlip) {
    if (bills && bills.length > 0) {
        const latestBill = bills[bills.length - 1];

        let uploadStatusHtml = '';
        if (roomSlip && roomSlip.startsWith('http')) {
            uploadStatusHtml = `<span class="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-green-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ชำระเงินและแนบสลิปแล้ว
            </span>`;
        } else {
            uploadStatusHtml = `<span class="px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm border border-red-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                รอการแนบสลิปชำระเงิน
            </span>`;
        }

        container.className = "flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-100 h-full w-full";
        container.innerHTML = `
            <div class="text-center w-full">
                <p class="text-sm text-slate-500 font-medium mb-1">ประจำเดือน</p>
                <p class="text-xl md:text-2xl font-bold text-[#1e3a8a] mb-4">${latestBill.month || '-'}</p>
                
                <div class="bg-blue-50/50 rounded-xl p-4 mb-5 border border-blue-100 w-full">
                    <p class="text-xs text-blue-600 font-medium mb-1 uppercase tracking-wider">ยอดชำระทั้งหมด</p>
                    <p class="text-3xl md:text-4xl font-extrabold text-blue-700">${latestBill.price || '0'} <span class="text-lg md:text-xl font-medium text-blue-500">บาท</span></p>
                </div>
                
                <div class="flex justify-center">
                    ${uploadStatusHtml}
                </div>
            </div>`;
    } else {
        container.innerHTML = `
            <div class="text-center py-6">
                <div class="bg-blue-50 p-3 rounded-full inline-block mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <p class="text-sm text-slate-500 font-medium">ยังไม่มียอดค้างชำระ</p>
            </div>`;
    }
}

async function loadDashboardActiveRepairs(studentName, roomNumber) {
    const container = document.getElementById('dashActiveRepairsContainer');
    if (!container) return;

    if (!roomNumber || roomNumber === '-') {
        container.innerHTML = `
            <div class="flex-1 flex flex-col justify-center items-center text-center py-6 h-full">
                <div class="bg-slate-200 p-3 rounded-full inline-block mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <p class="text-sm text-slate-500">ไม่พบข้อมูลหมายเลขห้อง</p>
            </div>`;
        return;
    }

    const renderEmptyBox = () => {
        container.className = "flex-1 flex flex-col text-slate-500 min-h-[180px] h-full bg-white rounded-xl";
        container.innerHTML = `
            <div onclick="document.getElementById('navRepair')?.click()" class="cursor-pointer flex-1 flex flex-col justify-center items-center text-center p-6 h-full w-full hover:bg-slate-50 transition-colors rounded-xl border-2 border-dashed border-slate-300 group">
                <div class="bg-blue-50 p-4 rounded-full inline-block mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M15.17 11.42a7.11 7.11 0 01-4.83 1.91 7.127 7.127 0 01-7.18-7.18 7.11 7.11 0 011.91-4.83m10.1 10.1a7.11 7.11 0 001.91-4.83 7.127 7.127 0 00-7.18-7.18 7.11 7.11 0 00-4.83 1.91"/></svg>
                </div>
                <p class="text-base text-slate-700 font-semibold mb-1 group-hover:text-blue-700 transition-colors">ไม่มีรายการที่กำลังแจ้งซ่อม</p>
                <p class="text-xs font-medium text-blue-600 mt-2 flex items-center gap-1 bg-blue-50 py-1.5 px-3 rounded-full group-hover:bg-blue-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
                    คลิกเพื่อแจ้งซ่อมใหม่
                </p>
            </div>`;
    };

    try {
        let data = [];
        if (typeof getSharedRepairData === 'function') {
            const res = await getSharedRepairData(studentName, roomNumber, false);
            // จัดการข้อมูลให้รองรับทั้งกรณีที่คืนค่ามาเป็น Array ทันที หรือ คืนค่าแบบ { status: 'success', data: [...] }
            data = Array.isArray(res) ? res : (res?.data || []);
        } else {
            // เพิ่ม Headers text/plain สำคัญมากสำหรับ GAS เพื่อป้องกัน CORS error
            const response = await fetch(GAS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'getRepairHistory', studentName: studentName, roomNumber: roomNumber })
            });
            const result = await response.json();
            if (result.status === 'success') {
                data = result.data || [];
            } else {
                throw new Error("API returns non-success status");
            }
        }

        if (Array.isArray(data) && data.length > 0) {
            // คัดกรองงานซ่อมที่ยังไม่เสร็จสิ้น
            const activeRepairs = data.filter(row => {
                const status = String(row[3] || 'รอดำเนินการ').trim();
                return status !== 'เสร็จสิ้น' && status !== 'เรียบร้อย' && status !== 'ยกเลิก';
            });

            if (activeRepairs.length > 0) {
                container.className = "flex-1 flex flex-col gap-3 h-full overflow-y-auto pr-1 bg-slate-50 rounded-xl border border-slate-100 p-4 min-h-[180px]";
                let htmlContent = '';

                activeRepairs.forEach(row => {
                    const dateStr = row[0] ? new Date(row[0]).toLocaleString('th-TH') : '-';
                    const details = row[1] || '-';
                    const status = row[3] || 'รอดำเนินการ';

                    htmlContent += `
                        <div onclick="document.getElementById('navRepair')?.click()" class="cursor-pointer bg-white rounded-lg p-4 shadow-sm border border-slate-100 flex flex-col transition hover:shadow-md hover:border-blue-300 group">
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs text-slate-500 font-medium flex items-center gap-1 group-hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>${dateStr}</span>
                                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full text-[10px] font-bold flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    ${status}
                                </span>
                            </div>
                            <p class="text-sm text-slate-700 line-clamp-2 leading-relaxed group-hover:text-blue-800 transition-colors">${details}</p>
                        </div>`;
                });

                container.innerHTML = htmlContent;
            } else {
                renderEmptyBox();
            }
        } else {
            renderEmptyBox();
        }
    } catch (err) {
        console.error("Dashboard Repair Error:", err);
        renderEmptyBox();
    }
}