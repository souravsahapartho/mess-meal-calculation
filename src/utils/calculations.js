import { round2 } from './currency';

export const calculateTotalBazar = (members) => {
  if (!Array.isArray(members)) return 0;
  const total = members.reduce((sum, m) => {
    const val = parseFloat(m.bazar);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  return round2(total);
};

export const calculateTotalMeals = (members) => {
  if (!Array.isArray(members)) return 0;
  const total = members.reduce((sum, m) => {
    const val = parseFloat(m.meals);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  return round2(total);
};

export const calculateMealRate = (totalBazar, totalMeals) => {
  if (!totalMeals || totalMeals <= 0) return 0;
  return round2(totalBazar / totalMeals);
};

export const calculateMemberMealCost = (meals, mealRate) => {
  const m = parseFloat(meals) || 0;
  return round2(m * mealRate);
};

export const calculateMemberBalance = (bazar, mealCost) => {
  const b = parseFloat(bazar) || 0;
  return round2(b - mealCost);
};

export const getMemberStatus = (balance) => {
  if (balance > 0.005) {
    return 'GET BACK';
  } else if (balance < -0.005) {
    return 'PAY';
  }
  return 'SETTLED';
};

export const calculateTransfers = (memberResults) => {
  const debtors = [];
  const creditors = [];

  memberResults.forEach(m => {
    if (m.balance < -0.005) {
      debtors.push({ name: m.name, amount: round2(Math.abs(m.balance)) });
    } else if (m.balance > 0.005) {
      creditors.push({ name: m.name, amount: round2(m.balance) });
    }
  });

  const transfers = [];
  let dIdx = 0;
  let cIdx = 0;

  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx];
    const creditor = creditors[cIdx];

    const amount = round2(Math.min(debtor.amount, creditor.amount));
    if (amount > 0) {
      transfers.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount
      });
    }

    debtor.amount = round2(debtor.amount - amount);
    creditor.amount = round2(creditor.amount - amount);

    if (debtor.amount <= 0.005) dIdx++;
    if (creditor.amount <= 0.005) cIdx++;
  }

  return transfers;
};

export const calculateMonthlySummary = ({
  month = 'October',
  year = new Date().getFullYear(),
  messName = 'MealMate Mess',
  members = []
}) => {
  const validMembers = members.filter(m => m.name && m.name.trim() !== '');

  const totalBazar = calculateTotalBazar(validMembers);
  const totalMeals = calculateTotalMeals(validMembers);
  const mealRate = calculateMealRate(totalBazar, totalMeals);

  let totalIndividualCost = 0;
  let totalReceive = 0;
  let totalPay = 0;

  const processedMembers = validMembers.map((m, idx) => {
    const bazar = round2(parseFloat(m.bazar) || 0);
    const meals = round2(parseFloat(m.meals) || 0);
    const mealCost = calculateMemberMealCost(meals, mealRate);
    const balance = calculateMemberBalance(bazar, mealCost);
    const status = getMemberStatus(balance);

    totalIndividualCost = round2(totalIndividualCost + mealCost);

    if (balance > 0.005) {
      totalReceive = round2(totalReceive + balance);
    } else if (balance < -0.005) {
      totalPay = round2(totalPay + Math.abs(balance));
    }

    return {
      id: m.id || `m_${idx}_${Date.now()}`,
      name: m.name.trim(),
      bazar,
      meals,
      mealCost,
      balance,
      status
    };
  });

  const roundingDifference = round2(Math.abs(totalReceive - totalPay));

  const settlement = {
    totalReceive,
    totalPay,
    roundingDifference,
    receivers: processedMembers.filter(m => m.status === 'GET BACK'),
    payers: processedMembers.filter(m => m.status === 'PAY'),
    settled: processedMembers.filter(m => m.status === 'SETTLED'),
    transfers: calculateTransfers(processedMembers)
  };

  return {
    id: `${month}-${year}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    messName: messName.trim() || 'MealMate Mess',
    month,
    year: parseInt(year, 10) || new Date().getFullYear(),
    totalBazar,
    totalMeals,
    mealRate,
    memberCount: processedMembers.length,
    members: processedMembers,
    settlement
  };
};
