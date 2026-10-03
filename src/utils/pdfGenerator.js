import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, formatNumber } from './currency';

export const generateMealPDF = async (reportData) => {
  const {
    messName = 'MealMate Mess',
    month = 'October',
    year = 2026,
    totalBazar = 0,
    totalMeals = 0,
    mealRate = 0,
    memberCount = 0,
    members = [],
    settlement = {}
  } = reportData;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let currentY = 16;

  const primaryColor = [5, 150, 105];
  const darkSlate = [15, 23, 42];
  const mutedSlate = [100, 116, 139];
  const lightBg = [248, 250, 252];
  const borderSlate = [226, 232, 240];

  // 1. BRAND HEADER
  doc.setFillColor(...primaryColor);
  doc.roundedRect(margin, currentY, 10, 10, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('M', margin + 3.2, currentY + 6.8);

  doc.setTextColor(...darkSlate);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(messName.toUpperCase(), margin + 14, currentY + 6.5);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedSlate);
  doc.text('MONTHLY MEAL CALCULATION REPORT', margin + 14, currentY + 11);

  const badgeText = `${month.toUpperCase()} ${year}`;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  const badgeWidth = doc.getTextWidth(badgeText) + 10;
  const badgeX = pageWidth - margin - badgeWidth;
  
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.3);
  doc.roundedRect(badgeX, currentY, badgeWidth, 9, 2, 2, 'FD');
  doc.setTextColor(...primaryColor);
  doc.text(badgeText, badgeX + 5, currentY + 6.2);

  currentY += 17;

  doc.setDrawColor(...borderSlate);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  // 2. KPI CARDS
  const cardWidth = (pageWidth - (margin * 2) - 9) / 4;
  const cardHeight = 18;
  const kpis = [
    { label: 'TOTAL BAZAR', value: formatCurrency(totalBazar) },
    { label: 'TOTAL MEALS', value: formatNumber(totalMeals) },
    { label: 'MEAL RATE', value: formatCurrency(mealRate) },
    { label: 'MEMBERS', value: `${memberCount} Persons` }
  ];

  kpis.forEach((kpi, idx) => {
    const cardX = margin + (idx * (cardWidth + 3));
    doc.setFillColor(...lightBg);
    doc.setDrawColor(...borderSlate);
    doc.setLineWidth(0.3);
    doc.roundedRect(cardX, currentY, cardWidth, cardHeight, 2, 2, 'FD');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...mutedSlate);
    doc.text(kpi.label, cardX + 3.5, currentY + 5.5);

    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkSlate);
    doc.text(kpi.value, cardX + 3.5, currentY + 13.5);
  });

  currentY += cardHeight + 8;

  // 3. MEMBER TABLE
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkSlate);
  doc.text('Member Breakdown & Individual Calculation', margin, currentY);
  currentY += 3;

  const tableColumns = [
    { header: '#', dataKey: 'index' },
    { header: 'Member Name', dataKey: 'name' },
    { header: 'Bazar Contrib.', dataKey: 'bazar' },
    { header: 'Meals', dataKey: 'meals' },
    { header: 'Meal Cost', dataKey: 'mealCost' },
    { header: 'Balance', dataKey: 'balance' },
    { header: 'Status', dataKey: 'status' }
  ];

  const tableRows = members.map((m, idx) => ({
    index: (idx + 1).toString(),
    name: m.name,
    bazar: formatCurrency(m.bazar),
    meals: formatNumber(m.meals),
    mealCost: formatCurrency(m.mealCost),
    balance: formatCurrency(m.balance, true, true),
    status: m.status === 'GET BACK' ? 'GET BACK' : m.status === 'PAY' ? 'PAY' : 'SETTLED'
  }));

  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    columns: tableColumns,
    body: tableRows,
    theme: 'plain',
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 3,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2
    },
    headStyles: {
      fillColor: [241, 245, 249],
      textColor: [15, 23, 42],
      fontStyle: 'bold',
      fontSize: 8.5,
      lineColor: [203, 213, 225],
      lineWidth: 0.3
    },
    columnStyles: {
      index: { halign: 'center', cellWidth: 10 },
      name: { halign: 'left', fontStyle: 'bold', cellWidth: 38 },
      bazar: { halign: 'right', cellWidth: 26 },
      meals: { halign: 'center', cellWidth: 18 },
      mealCost: { halign: 'right', cellWidth: 26 },
      balance: { halign: 'right', fontStyle: 'bold', cellWidth: 28 },
      status: { halign: 'center', fontStyle: 'bold', cellWidth: 26 }
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.dataKey === 'status') {
        const text = data.cell.raw;
        if (text === 'GET BACK') {
          doc.setTextColor(5, 150, 105);
        } else if (text === 'PAY') {
          doc.setTextColor(220, 38, 38);
        } else {
          doc.setTextColor(100, 116, 139);
        }
      }
    }
  });

  currentY = doc.lastAutoTable.finalY + 8;

  if (currentY + 55 > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }

  // 4. SETTLEMENT BOX
  const settlementBoxWidth = pageWidth - (margin * 2);
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...borderSlate);
  doc.setLineWidth(0.3);
  
  const recCount = settlement.receivers?.length || 0;
  const payCount = settlement.payers?.length || 0;
  const maxRows = Math.max(recCount, payCount, 1);
  const settlementHeight = 26 + (maxRows * 5.5);

  doc.roundedRect(margin, currentY, settlementBoxWidth, settlementHeight, 2, 2, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkSlate);
  doc.text('Settlement Summary', margin + 5, currentY + 7);

  const colHalf = (settlementBoxWidth - 14) / 2;
  const leftX = margin + 5;
  const rightX = margin + 7 + colHalf;
  let itemY = currentY + 14;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(5, 150, 105);
  doc.text('Members Getting Money Back (Receivers):', leftX, itemY);

  doc.setTextColor(220, 38, 38);
  doc.text('Members Who Need to Pay (Payers):', rightX, itemY);
  itemY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  if (settlement.receivers && settlement.receivers.length > 0) {
    settlement.receivers.forEach(r => {
      doc.setTextColor(...darkSlate);
      doc.text(`• ${r.name}`, leftX, itemY);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(5, 150, 105);
      doc.text(formatCurrency(r.balance), leftX + colHalf - 8, itemY, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      itemY += 5;
    });
  } else {
    doc.setTextColor(...mutedSlate);
    doc.text('No members to receive.', leftX, itemY);
  }

  let payerY = currentY + 19;
  if (settlement.payers && settlement.payers.length > 0) {
    settlement.payers.forEach(p => {
      doc.setTextColor(...darkSlate);
      doc.text(`• ${p.name}`, rightX, payerY);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(220, 38, 38);
      doc.text(formatCurrency(Math.abs(p.balance)), rightX + colHalf - 8, payerY, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      payerY += 5;
    });
  } else {
    doc.setTextColor(...mutedSlate);
    doc.text('No members need to pay.', rightX, payerY);
  }

  const bottomTotalY = currentY + settlementHeight - 5;
  doc.setDrawColor(...borderSlate);
  doc.line(margin + 5, bottomTotalY - 3, margin + settlementBoxWidth - 5, bottomTotalY - 3);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkSlate);
  doc.text(`Total Receive: ${formatCurrency(settlement.totalReceive || 0)}`, leftX, bottomTotalY);
  doc.text(`Total Pay: ${formatCurrency(settlement.totalPay || 0)}`, rightX, bottomTotalY);

  currentY += settlementHeight + 7;

  if (currentY + 22 > pageHeight - 20) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, currentY, settlementBoxWidth, 14, 2, 2, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkSlate);
  doc.text('Calculation Formulae:', margin + 4, currentY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedSlate);
  doc.text(
    `Meal Rate = Total Bazar (${formatCurrency(totalBazar)}) / Total Meals (${formatNumber(totalMeals)}) = ${formatCurrency(mealRate)} per meal.`,
    margin + 4,
    currentY + 9.5
  );

  const totalPages = doc.internal.getNumberOfPages();
  const generatedDate = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(...borderSlate);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedSlate);
    doc.text(
      `MealMate • ${messName} • Monthly Meal Calculation (${month} ${year})`,
      margin,
      pageHeight - 7
    );
    doc.text(
      `Generated on ${generatedDate} • Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 7,
      { align: 'right' }
    );
  }

  const safeMess = messName.replace(/[^a-zA-Z0-9]/g, '-');
  const filename = `${safeMess}-Meal-Report-${month}-${year}.pdf`;
  doc.save(filename);
  return filename;
};
