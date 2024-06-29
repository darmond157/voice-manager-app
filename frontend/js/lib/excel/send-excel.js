
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet([
    ['#','فاکتور','فاکتور','فاکتور'],
    ["John", 30,'س'],
    ["Alice", 28],
    ["Bob", 35],

]);

// تنظیم کردن زمینه رنگ سلول‌ها با استفاده از CSS
worksheet.t = { patternType: "solid", fgColor: '#111111',direction:'rtl'}; // رنگ زمینه زرد
console.log(worksheet)
XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// ذخیره workbook به عنوان فایل اکسل

document.querySelector('a.test').addEventListener('click',function (){
    XLSX.writeFile(workbook, 'output.xlsx');
})
