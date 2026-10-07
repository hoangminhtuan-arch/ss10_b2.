const circulationLogs = [
  { logId: "L01", studentCode: "SV001", bookIsbn: "B01", status: "BORROWING", fineAmount: 0, daysLate: 0, daysSinceCompleted: 0 },
  { logId: "L02", studentCode: "SV002", bookIsbn: "B02", status: "RETURNED", fineAmount: 0, daysLate: 0, daysSinceCompleted: 35 },
  { logId: "L03", studentCode: "SV003", bookIsbn: "B03", status: "LOST", fineAmount: 200000, daysLate: 0, daysSinceCompleted: 10 }
];

console.log("--- NHẬT KÝ LƯU CHUYỂN BAN ĐẦU ---");
console.table(circulationLogs);

const newLog = { 
  logId: "L04", 
  studentCode: "SV004", 
  bookIsbn: "B04", 
  status: "BORROWING", 
  fineAmount: 0, 
  daysLate: 0, 
  daysSinceCompleted: 0 
};
circulationLogs.push(newLog);

console.log("--- NHẬT KÝ SAU KHI GHI NHẬN MƯỢN MỚI L04 ---");
console.table(circulationLogs);

let lateLog = circulationLogs.find(log => log.logId === "L01");
if (lateLog) {
  lateLog.status = "RETURNED";
  lateLog.daysLate = 3;
  lateLog.fineAmount = lateLog.daysLate * 5000;
  lateLog.daysSinceCompleted = 1;
}

let lostLog = circulationLogs.find(log => log.logId === "L04");
if (lostLog) {
  lostLog.status = "LOST";
  lostLog.fineAmount = 200000;
  lostLog.daysSinceCompleted = 1;
}

console.log("--- NHẬT KÝ SAU KHI L01 TRẢ TRỄ VÀ L04 LÀM MẤT SÁCH ---");
console.table(circulationLogs);

for (let i = circulationLogs.length - 1; i >= 0; i--) {
  let log = circulationLogs[i];
  if ((log.status === "RETURNED" || log.status === "LOST") && log.daysSinceCompleted > 30) {
    circulationLogs.splice(i, 1);
  }
}

console.log("--- NHẬT KÝ SAU KHI DỌN DẸP BẢN GHI CŨ QUÁ 30 NGÀY ---");
console.table(circulationLogs);

const totalBorrowing = circulationLogs.filter(log => log.status === "BORROWING").length;
const totalFines = circulationLogs.reduce((sum, log) => sum + log.fineAmount, 0);

console.log("=========================================");
console.log("      BÁO CÁO LƯU CHUYỂN CUỐI NGÀY       ");
console.log("=========================================");
console.log(`Số sách đang được sinh viên mượn : ${totalBorrowing} cuốn`);
console.log(`Tổng số tiền phạt thu được       : ${totalFines.toLocaleString('vi-VN')} VNĐ`);
console.log("=========================================");
