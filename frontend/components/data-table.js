/**
 * 📊 كبسولة بناء جداول البيانات الديناميكية (إكسل مخصص)
 * تتيح إنشاء جداول تفاعلية مع ميزات تصفية وبحث فوري خالية من الأخطاء البرمجية
 */

function buildAdvancedTable(containerId, headers, dataset) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) {
        console.error(`المجلد المستهدف غير موجود: ${containerId}`);
        return;
    }

    // بناء واجهة البحث العلوي والجدول بهيكل تايلوند CSS المنسق
    let structureHTML = `
        <div class="space-y-4 w-full">
            <!-- حقل البحث الفوري داخل الجدول -->
            <div class="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <input type="text" id="${containerId}-search" oninput="filterTableData('${containerId}')" 
                    class="w-full max-w-md px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" 
                    placeholder="🔍 ابحث في أي خلية داخل الجدول هنا فورا...">
            </div>

            <!-- هيكل الجدول المفرغ -->
            <div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
                <table class="w-full text-sm text-right text-slate-600" id="${containerId}-table">
                    <thead class="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                            ${headers.map(header => `<th class="px-6 py-3.5">\&lbrace;header\&rbrace;</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200">
                        ${dataset.map(row => `
                            <tr class="hover:bg-slate-50/80 transition table-row-item">
                                \${row.map(cell => `<td class="px-6 py-4 whitespace-nowrap cell-data">${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    targetContainer.innerHTML = structureHTML;
}

/**
 * 🔍 دالة الفرز والبحث التلقائي الفوري (تصفية الخلايا في لمح البصر أمام المدير)
 */
function filterTableData(containerId) {
    const inputSearch = document.getElementById(`${containerId}-search`);
    const filterText = inputSearch.value.toLowerCase().trim();
    const tableElement = document.getElementById(`${containerId}-table`);
    const rows = tableElement.getElementsByClassName('table-row-item');

    for (let i = 0; i < rows.length; i++) {
        let rowContainsText = false;
        const cells = rows[i].getElementsByClassName('cell-data');
        
        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(filterText)) {
                rowContainsText = true;
                break;
            }
        }
        
        // إخفاء الصف أو إظهاره بناء على النتيجة
        if (rowContainsText) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
