let table;
let transportTypes;
let years = ['2021', '2022', '2023'];
let colors = {};

function preload() {
  table = loadTable('Book1.csv', 'csv', 'header');
}

function setup() {
  createCanvas(800, 500);
  background(150);
  textFont('Arial');

  // Get unique transport types
  transportTypes = [...new Set(table.getColumn('Transport'))];

  // Assign a color to each transport type
  for (let t of transportTypes) {
    colors[t] = color(random(100, 255), random(50, 200), random(100, 255));
  }

  let margin = 60;
  let chartWidth = width - 2 * margin;
  let chartHeight = height - 2 * margin;
  let maxUsers = 0;

  // First pass to get the max user count
  for (let row of table.getRows()) {
    let users = int(row.get('Users'));
    if (users > maxUsers) {
      maxUsers = users;
    }
  }

  let barGroupWidth = chartWidth / years.length;
  let barWidth = barGroupWidth / transportTypes.length - 5;

  // Draw the bars
  for (let y = 0; y < years.length; y++) {
    let year = years[y];
    let xBase = margin + y * barGroupWidth;

    // Draw year label
    fill(0);
    textAlign(CENTER);
    textSize(14);
    text(year, xBase + barGroupWidth / 2, height - 20);

    for (let t = 0; t < transportTypes.length; t++) {
      let transport = transportTypes[t];

      // Find the matching row
      let matchingRow = table.getRows().find(row =>
        row.get('Transport') === transport && row.get('Year') === year
      );

      if (matchingRow) {
        let users = int(matchingRow.get('Users'));
        let h = map(users, 0, maxUsers, 0, chartHeight - 50);
        let x = xBase + t * (barWidth + 5);
        let yPos = height - margin - h;

        fill(colors[transport]);
        rect(x, yPos, barWidth, h);

        // Draw label
        push();
        translate(x + barWidth / 2, yPos - 5);
        rotate(-PI / 4);
        fill(0);
        textSize(10);
        textAlign(RIGHT);
        text(transport, 0, 0);
        pop();
      }
    }
  }

  // Draw legend
  let legendY = 10;
  for (let i = 0; i < transportTypes.length; i++) {
    fill(colors[transportTypes[i]]);
    rect(20, legendY + i * 20, 12, 12);
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(transportTypes[i], 40, legendY + i * 20 + 6);
  }
}
