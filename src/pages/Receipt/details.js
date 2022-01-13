const details = ({txnId, txnDiscount, tinNumber, dateIssued, issuedBy, total}) => ({
  'TXN ID': txnId,
  'TXN DISCOUNT': txnDiscount,
  'TIN NUMBER': tinNumber,
  'DATE ISSUED': dateIssued,
  'ISSUED BY': issuedBy,
  TOTAL: total,
});

module.exports = details;
