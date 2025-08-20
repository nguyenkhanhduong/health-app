const { faker } = require("@faker-js/faker");
const fs = require("fs");

function generateMealRecords(count) {
  return [
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l03.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/l01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/s01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l03.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/l01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/s01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l03.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/l01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/s01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l03.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/l01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Morning",
      url: "/images/m01.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Lunch",
      url: "/images/l02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Dinner",
      url: "/images/d02.jpg",
    },
    {
      id: faker.string.uuid(),
      date: new Date(),
      type: "Snack",
      url: "/images/s01.jpg",
    },
  ];
}

function generateYearlyData() {
  return [
    { month: "6月", line1: 95, line2: 100 },
    { month: "7月", line1: 75, line2: 90 },
    { month: "8月", line1: 68, line2: 82 },
    { month: "9月", line1: 82, line2: 85 },
    { month: "10月", line1: 65, line2: 78 },
    { month: "11月", line1: 62, line2: 72 },
    { month: "12月", line1: 55, line2: 68 },
    { month: "1月", line1: 48, line2: 62 },
    { month: "2月", line1: 42, line2: 58 },
    { month: "3月", line1: 35, line2: 55 },
    { month: "4月", line1: 32, line2: 48 },
    { month: "5月", line1: 28, line2: 52 },
  ];
}

const db = {
  meals: generateMealRecords(),
  "yearly-report": generateYearlyData(),
};

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
