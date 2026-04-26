let cachedElectricityData = null;

async function renderElectricityForm() {
    loadElectricityData();
}

async function loadElectricityData(forceRefresh = false) {
    const loading = document.getElementById('electricityLoading');
    const table = document.getElementById('electricityTable');
    const tbody = document.getElementById('electricityBody');
    const emptyMsg = document.getElementById('electricityEmpty');

    if (!loading) return;

    const renderTable = (bills, studentName, roomSlip) => {
        const nameLabel = document.getElementById('electricityStudentName');
        if (nameLabel) {
            if (studentName) {
                nameLabel.innerHTML = `<span class="font-semibold text-slate-700">ชื่อ-สกุล:</span> ${studentName}`;
                nameLabel.classList.remove('hidden');
            } else {
                nameLabel.classList.add('hidden');
            }
        }

        const slipSection = document.getElementById('roomSlipSection');
        const slipContent = document.getElementById('roomSlipContent');

        tbody.innerHTML = '';
        if (bills && bills.length > 0) {
            bills.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="py-3 px-4 text-left whitespace-nowrap">${item.month}</td>
                    <td class="py-3 px-4 text-left whitespace-nowrap">${item.price} บาท</td>
                `;
                tbody.appendChild(tr);
            });
            
            if (slipSection && slipContent) {
                slipSection.classList.remove('hidden');
                if (roomSlip && roomSlip.toString().startsWith('http')) {
                    slipContent.innerHTML = `
                        <div class="flex items-center gap-3">
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">อัปโหลดแล้ว</span>
                            <a href="${roomSlip}" target="_blank" class="text-blue-600 hover:text-blue-800 underline text-sm font-medium">ดูหลักฐานปัจจุบัน</a>
                        </div>
                        <div class="flex flex-col sm:flex-row items-center gap-2 ml-0 sm:ml-auto mt-3 sm:mt-0">
                            <span class="text-xs text-slate-500">ต้องการเปลี่ยนรูป?</span>
                            <input type="file" id="room_slip_upload" accept="image/*" class="hidden" onchange="uploadSlip(this)">
                            <button type="button" onclick="document.getElementById('room_slip_upload').click()" class="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold py-2 px-4 rounded shadow transition">อัปโหลดรูปใหม่</button>
                            <span id="room_upload_status" class="text-xs text-slate-500 hidden">กำลังอัปโหลด...</span>
                        </div>
                    `;
                } else {
                    slipContent.innerHTML = `
                        <input type="file" id="room_slip_upload" accept="image/*" class="hidden" onchange="uploadSlip(this)">
                        <button type="button" onclick="document.getElementById('room_slip_upload').click()" class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded shadow transition">แนบสลิปชำระเงิน</button>
                        <span id="room_upload_status" class="text-sm text-slate-500 hidden ml-3">กำลังอัปโหลด...</span>
                    `;
                }
            }
            table.classList.remove('hidden');
            emptyMsg.classList.add('hidden');
        } else {
            table.classList.add('hidden');
            emptyMsg.classList.remove('hidden');
        }
    };

    if (!forceRefresh && cachedElectricityData !== null) {
        renderTable(cachedElectricityData.bills, cachedElectricityData.studentName, cachedElectricityData.roomSlip);
        loading.classList.add('hidden');
        return;
    }

    loading.classList.remove('hidden');
    table.classList.add('hidden');
    emptyMsg.classList.add('hidden');

    const roomNumber = currentRowData[85] ? String(currentRowData[85]).trim() : ""; // หมายเลขห้อง (Column CH)

    if (!roomNumber) {
        emptyMsg.innerText = 'ไม่พบข้อมูลหมายเลขห้องของคุณ';
        loading.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: 'getElectricityBill',
                roomNumber: roomNumber
            })
        });

        const textResponse = await response.text();
        let result;
        try {
            result = JSON.parse(textResponse);
        } catch (e) {
            throw new Error("เซิร์ฟเวอร์ส่งข้อมูลผิดพลาด (อาจเป็น HTML)");
        }

        if (result.status === 'success') {
            cachedElectricityData = { bills: result.data, studentName: result.studentName || "", roomSlip: result.roomSlip || "" };
            renderTable(result.data, result.studentName || "", result.roomSlip || "");
        } else {
            throw new Error(result.message);
        }
    } catch (err) {
        console.error("Error loading electricity bills:", err);
        emptyMsg.innerText = 'เกิดข้อผิดพลาดในการโหลดข้อมูลค่าไฟ';
        emptyMsg.classList.remove('hidden');
    } finally {
        loading.classList.add('hidden');
    }
}

async function uploadSlip(inputElement) {
    if (!inputElement.files || inputElement.files.length === 0) return;
    
    const file = inputElement.files[0];
    const statusSpan = document.getElementById('room_upload_status');
    const uploadBtn = inputElement.nextElementSibling;
    
    if (statusSpan) statusSpan.classList.remove('hidden');
    if (uploadBtn) uploadBtn.classList.add('hidden');
    
    const roomNumber = currentRowData[85] ? String(currentRowData[85]).trim() : "";
    
    try {
        const uploadResult = await uploadSingleFile(inputElement, 'electricity');
        if (uploadResult.status === 'success') {
            const slipUrl = uploadResult.url;
            
            const response = await fetch(GAS_URL, {
                method: 'POST',
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    action: 'updateElectricitySlip',
                    roomNumber: roomNumber,
                    slipUrl: slipUrl
                })
            });
            
            const result = await response.json();
            if (result.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'อัปโหลดสำเร็จ',
                    text: 'แนบสลิป/อัปเดตสลิปเรียบร้อยแล้ว',
                    timer: 1500,
                    showConfirmButton: false
                });
                cachedElectricityData = null; // force reload
                loadElectricityData(true);
            } else {
                throw new Error(result.message);
            }
        } else {
            throw new Error(uploadResult.message || "อัปโหลดรูปภาพไม่สำเร็จ");
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: err.message, confirmButtonColor: '#1e3a8a' });
        if (statusSpan) statusSpan.classList.add('hidden');
        if (uploadBtn) uploadBtn.classList.remove('hidden');
        inputElement.value = ''; // Reset input
    }
}