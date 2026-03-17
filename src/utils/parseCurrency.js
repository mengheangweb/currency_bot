const SYMBOL_MAP = {
  "$": "USD",
  "៛": "KHR",
  "฿": "THB",
  "¥": "CNY",
  "₫": "VND"
};

const WORD_MAP = {
  USD: "USD",
  DOLLAR: "USD",
  THB: "THB",
  BAHT: "THB",
  CNY: "CNY",
  RMB: "CNY",
  VND: "VND",
  EUR: "EUR",
  SGD: "SGD",
  MYR: "MYR",
  KHR: "KHR",
  RIEL: "KHR"
};

function parseCurrency(text) {
  text = text.trim().toUpperCase();

  // Replace symbols with currency codes
  Object.keys(SYMBOL_MAP).forEach(symbol => {
    if (text.includes(symbol)) {
      text = text.replace(symbol, ` ${SYMBOL_MAP[symbol]} `);
    }
  });

  // Normalize spacing
  text = text.replace(/([A-Z]+)(\d)/g, "$1 $2"); // USD10 → USD 10
  text = text.replace(/(\d)([A-Z]+)/g, "$1 $2"); // 10USD → 10 USD
  text = text.replace(/\s+/g, " ").trim();

  const parts = text.split(" ");

  let amount = null;
  let currency = null;

  parts.forEach(p => {
    if (!isNaN(p)) {
      amount = parseFloat(p);
    } else if (WORD_MAP[p]) {
      currency = WORD_MAP[p];
    }
  });

  if (!amount || !currency) return null;

  return { amount, currency };
}

module.exports = parseCurrency;