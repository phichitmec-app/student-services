document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
    const sessionDataString = localStorage.getItem('userSession');
    if (!sessionDataString) {
        console.log("No session found. Showing login page.");
        return; // No session, do nothing, login form will be visible.
    }

    const sessionData = JSON.parse(sessionDataString);
    const now = new Date().getTime();

    if (now > sessionData.expiry) {
        console.log("Session expired. Clearing storage.");
        localStorage.removeItem('userSession');
        return; // Session expired, show login page.
    }

    // Session is valid, proceed to log the user in automatically.
    console.log("Valid session found. Logging in automatically.");
    try {
        currentRowData = sessionData.data;
        currentRowIndex = sessionData.rowIndex;

        const userName = currentRowData[7] || currentRowData[5];
        document.getElementById('displayUserName').innerText = userName;
        document.getElementById('userProfile').classList.remove('hidden');

        // Load the main app layout (SPA)
        const viewResponse = await fetch('home.html');
        document.getElementById('app').innerHTML = await viewResponse.text();
        initHome(); // This function is in home.js
    } catch (err) {
        console.error("Failed to restore session:", err);
        localStorage.removeItem('userSession');
        location.reload();
    }
}

function confirmLogout() {
    Swal.fire({
        title: 'ต้องการออกจากระบบหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1e3a8a',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'ใช่, ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('userSession');
            location.reload();
        }
    })
}

async function login() {
    const cid = document.getElementById('loginCid').value;
    const studentId = document.getElementById('loginStudentId').value;

    if (!cid || !studentId) {
        Swal.fire({ icon: 'warning', title: 'แจ้งเตือน', text: 'กรุณากรอก CID และ รหัสนิสิต ให้ครบถ้วน', confirmButtonColor: '#1e3a8a' });
        return;
    }

    toggleLoading('login', true);

    try {
        const response = await fetch(GAS_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', cid: cid, studentId: studentId })
        });

        const result = await response.json();

        if (result.status === 'success') {
            currentRowData = result.data;
            currentRowIndex = result.rowIndex;

            // Store session in localStorage for 24 hours
            const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
            const sessionData = {
                data: result.data,
                rowIndex: result.rowIndex,
                expiry: expiry
            };
            localStorage.setItem('userSession', JSON.stringify(sessionData));

            const userName = currentRowData[7] || currentRowData[5];
            document.getElementById('displayUserName').innerText = userName;

            document.getElementById('userProfile').classList.remove('hidden');

            // Load the main app layout (SPA)
            const viewResponse = await fetch('home.html');
            document.getElementById('app').innerHTML = await viewResponse.text();
            initHome(); // This function is in home.js

            Swal.fire({
                icon: 'success',
                title: 'เข้าสู่ระบบสำเร็จ',
                text: `ยินดีต้อนรับ ${userName}`,
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({ icon: 'error', title: 'เข้าสู่ระบบไม่สำเร็จ', text: result.message, confirmButtonColor: '#1e3a8a' });
        }
    } catch (err) {
        Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', confirmButtonColor: '#1e3a8a' });
    } finally {
        toggleLoading('login', false);
    }
}

function toggleLoading(type, isLoading) {
    const btnText = document.getElementById(type + 'BtnText');
    const spinner = document.getElementById(type + 'Spinner');
    const btn = type === 'login' ? document.getElementById('btnLogin') : document.getElementById('btnSave');
    
    if(!btn) return; // ป้องกันข้อผิดพลาดกรณี DOM เปลี่ยนไปแล้ว

    if (isLoading) {
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        btn.disabled = true;
        btn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
        btn.disabled = false;
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}