const details = ({txnId, tinNumber, dateIssued, issuedBy, cash, change, total}) => ({
  'TXN ID': txnId,
  'TIN NUMBER': tinNumber,
  'DATE ISSUED': dateIssued,
  'ISSUED BY': issuedBy,
  CASH: cash,
  CHANGE: change,
  TOTAL: total,
});

module.exports = details;
