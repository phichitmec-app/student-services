let cachedElectricityData = null;
let electricityFetchPromise = null;

async function getSharedElectricityData(roomNumber, studentId, forceRefresh = false) {
    if (forceRefresh) {
        cachedElectricityData = null;
    }

    if (cachedElectricityData !== null) {
        return cachedElectricityData;
    }

    if (!electricityFetchPromise) {
        electricityFetchPromise = fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'getElectricityBill',
                roomNumber: roomNumber,
                studentId: studentId
            })
        })
        .then(async res => {
            const textResponse = await res.text();
            try {
                return JSON.parse(textResponse);
            } catch (e) {
                throw new Error("เซิร์ฟเวอร์ส่งข้อมูลผิดพลาด (อาจเป็น HTML)");
            }
        })
        .then(result => {
            electricityFetchPromise = null;
            if (result.status === 'success') {
                cachedElectricityData = { bills: result.data || [], studentName: result.studentName || "", roomSlip: result.roomSlip || "" };
                return cachedElectricityData;
            } else {
                throw new Error(result.message);
            }
        })
        .catch(err => {
            electricityFetchPromise = null;
            throw err;
        });
    }

    return electricityFetchPromise;
}

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
    const studentId = currentRowData[1] ? String(currentRowData[1]).trim() : ""; // รหัสนิสิต (Column B)

    if (!roomNumber) {
        emptyMsg.innerText = 'ไม่พบข้อมูลหมายเลขห้องของคุณ';
        loading.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
        return;
    }

    try {
        const data = await getSharedElectricityData(roomNumber, studentId, forceRefresh);
        renderTable(data.bills, data.studentName, data.roomSlip);
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
    
    if (statusSpan) {
        statusSpan.classList.remove('hidden');
        statusSpan.innerHTML = `
            <div class="flex flex-col w-24 sm:w-32 ml-3 justify-center">
                <span class="text-xs text-slate-500 mb-1 font-medium" id="elecPercentText">อัปโหลด... 0%</span>
                <div class="w-full bg-slate-200 rounded-full h-1.5 shadow-inner">
                    <div id="elecProgressBar" class="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>
        `;
    }
    if (uploadBtn) uploadBtn.classList.add('hidden');
    
    const roomNumber = currentRowData[85] ? String(currentRowData[85]).trim() : "";
    
    try {
        const uploadResult = await uploadSingleFile(inputElement, 'electricity', (percent) => {
            const pText = document.getElementById('elecPercentText');
            const pBar = document.getElementById('elecProgressBar');
            if (pText) pText.innerText = `อัปโหลด... ${Math.round(percent)}%`;
            if (pBar) pBar.style.width = `${percent}%`;
        });

        if (uploadResult.status === 'success') {
            const slipUrl = uploadResult.url;
            
            if (statusSpan) {
                const pText = document.getElementById('elecPercentText');
                if (pText) pText.innerText = `กำลังจัดคิวบันทึก...`;
            }

            const response = await fetch(GAS_URL, {
                method: 'POST',
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
        if (statusSpan) {
            statusSpan.classList.add('hidden');
            statusSpan.innerHTML = 'กำลังอัปโหลด...';
        }
        if (uploadBtn) uploadBtn.classList.remove('hidden');
        inputElement.value = ''; // Reset input
    }
}