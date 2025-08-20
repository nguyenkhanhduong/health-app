const { faker } = require("@faker-js/faker");
const fs = require("fs");

function generateMealRecords() {
  const urls = [
    "/images/m01.jpg", // 1
    "/images/l02.jpg", // 2
    "/images/d01.jpg", // 3
    "/images/s01.jpg", // 4
    "/images/m02.jpg", // 5
    "/images/l03.jpg", // 6
    "/images/d02.jpg", // 7
  ];
  const types = ["Morning", "Lunch", "Dinner", "Snack"];
  const records = [];
  for (let i = 0; i < 28; i++) {
    records.push({
      id: faker.string.uuid(),
      date: new Date(),
      type: types[i % types.length],
      url: urls[i % urls.length],
    });
  }
  return records;
}

function generateYearlyData() {
  return [
    { time: "6月", line1: 95, line2: 100 },
    { time: "7月", line1: 75, line2: 90 },
    { time: "8月", line1: 68, line2: 82 },
    { time: "9月", line1: 82, line2: 85 },
    { time: "10月", line1: 65, line2: 78 },
    { time: "11月", line1: 62, line2: 72 },
    { time: "12月", line1: 55, line2: 68 },
    { time: "1月", line1: 48, line2: 62 },
    { time: "2月", line1: 42, line2: 58 },
    { time: "3月", line1: 35, line2: 55 },
    { time: "4月", line1: 32, line2: 48 },
    { time: "5月", line1: 28, line2: 52 },
  ];
}
function generateDailyData() {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: faker.string.uuid(),
    time: `${i + 1}時`, // 1時, 2時, ..., 24時
    line1: faker.number.int({ min: 30, max: 100 }),
    line2: faker.number.int({ min: 30, max: 100 }),
  }));
}

function generateWeeklyData() {
  const daysOfWeek = ["月", "火", "水", "木", "金", "土", "日"];
  return daysOfWeek.map((day) => ({
    id: faker.string.uuid(),
    time: day,
    line1: faker.number.int({ min: 30, max: 100 }),
    line2: faker.number.int({ min: 30, max: 100 }),
  }));
}

function generateMonthlyData() {
  return Array.from({ length: 30 }).map((_, i) => ({
    id: faker.string.uuid(),
    time: `${i + 1}日`,
    line1: faker.number.int({ min: 30, max: 100 }),
    line2: faker.number.int({ min: 30, max: 100 }),
  }));
}

function generateDailyData() {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: faker.string.uuid(),
    time: `${i + 1}時`,
    line1: faker.number.int({ min: 30, max: 100 }),
    line2: faker.number.int({ min: 30, max: 100 }),
  }));
}
function generateExercise() {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: faker.string.uuid(),
    name: "家事全般（立位・軽い）",
    duration: 10,
    calories: 26,
  }));
}
function generateDiary() {
  return Array.from({ length: 24 }).map((_, i) => ({
    id: faker.string.uuid(),
    date: new Date(),
    title: "私の日記の記録が一部表示されます。",
    des: "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト トテキスト トテキストテキスト トテキスト",
  }));
}
function generatePosts() {
  const urls = [
    "/images/column-1.jpg",
    "/images/column-2.jpg",
    "/images/column-3.jpg",
    "/images/column-4.jpg",
    "/images/column-5.jpg",
    "/images/column-6.jpg",
    "/images/column-7.jpg",
    "/images/column-8.jpg",
  ];
  const posts = [];
  for (let i = 0; i < 28; i++) {
    posts.push({
      id: faker.string.uuid(),
      title: "魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…",
      tags: ["#魚料理", "#和食", "#DHA"],
      date: new Date(),
      url: urls[i % urls.length],
    });
  }
  return posts;
}
const db = {
  meals: generateMealRecords(),
  "yearly-report": generateYearlyData(),
  "body-report": {
    y: generateYearlyData(),
    m: generateMonthlyData(),
    w: generateWeeklyData(),
    d: generateDailyData(),
  },
  exercises: generateExercise(),
  diaries: generateDiary(),
  post: generatePosts(),
};

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
